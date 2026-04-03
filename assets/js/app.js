(() => {
  const data = window.HR_DATA;
  const page = document.body.dataset.page;
  if (!data) return;

  const byId = (id) => document.getElementById(id);

  const renderFront = () => {
    HR.applyLayout('HR / 운영관리 시스템');
    byId('hello').textContent = `${HR.role}님, 오늘도 안정적인 운영을 응원합니다.`;
    byId('today').textContent = new Date().toLocaleDateString('ko-KR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    byId('empCount').textContent = data.employees.length;
    const pending = data.approvals.signup.length + data.approvals.employee.length + data.approvals.store.length;
    byId('pendingCount').textContent = pending;
    byId('storeCount').textContent = data.stores.length;
  };

  const renderEmployee = () => {
    HR.applyLayout('직원관리');
    const tbody = byId('empBody');
    const q = byId('q');
    const role = byId('roleFilter');

    function draw() {
      const kw = q.value.trim();
      const rv = role.value;
      const list = data.employees.filter(e => (!kw || `${e.name}${e.storeCode}${e.empNo}`.includes(kw)) && (!rv || e.role === rv));
      tbody.innerHTML = list.slice(0, 120).map((e) => `
        <tr>
          <td>${e.empNo}</td><td>${e.name}</td><td>${e.role}${e.grade !== '-' ? `(${e.grade})` : ''}</td>
          <td>${e.storeCode}</td><td>${e.teamLead}</td><td>${e.manager}</td>
          <td>${e.contact}</td><td>${e.joinDate}</td><td>${HR.badge(e.status)}</td>
          <td><button data-id="${e.empNo}" class="detail">상세</button></td>
        </tr>`).join('');
    }

    draw();
    q.oninput = draw; role.onchange = draw;

    tbody.onclick = (ev) => {
      const b = ev.target.closest('.detail');
      if (!b) return;
      const e = data.employees.find(v => v.empNo === b.dataset.id);
      byId('detail').innerHTML = `
        <h4>${e.name} (${e.empNo})</h4>
        <p class="muted">공개 정보: ${e.contact} / 입사일 ${e.joinDate} / 소속 ${e.storeCode}</p>
        <p class="muted">개인정보: ${HR.canViewPrivate ? `${e.email} / ${e.address}` : '담당/팀장만 열람 가능'}</p>
        <h5>변경 히스토리</h5>
        <ul>${e.history.map(h => `<li>${h.date} | ${h.type} | ${h.editor} | ${h.before} → ${h.after}</li>`).join('')}</ul>
        <button ${HR.canEdit ? '' : 'disabled'} id="reqEdit">수정 요청</button>`;
      const reqBtn = byId('reqEdit');
      if (reqBtn) reqBtn.onclick = () => HR.requestApproval('employee', { id: `E-REQ-${Date.now()}`, target: e.name, request: '직원 정보 수정 요청', requester: HR.role });
    };
  };

  const renderOrg = () => {
    HR.applyLayout('조직관리');
    const field = {};
    data.stores.forEach((s) => {
      if (!field[s.manager]) field[s.manager] = {};
      if (!field[s.manager][s.teamLead]) field[s.manager][s.teamLead] = [];
      field[s.manager][s.teamLead].push(`${s.code}(${data.storeLeaders[s.code]})`);
    });
    byId('fieldTree').innerHTML = Object.entries(field).map(([mgr, teams]) =>
      `<li><b>담당: ${mgr}</b><ul>${Object.entries(teams).map(([tl, ss]) => `<li>팀장: ${tl}<ul>${ss.map(v=>`<li>${v} → 플래너 2~3명(SP2/SP1.5/SP1)</li>`).join('')}</ul></li>`).join('')}</ul></li>`
    ).join('');
  };

  const renderOnoff = () => {
    HR.applyLayout('온오프관리');
    const body = byId('onoffBody');
    const filter = byId('statusFilter');
    function draw() {
      const st = filter.value;
      const rows = data.onoff.filter(r => !st || r.status === st);
      body.innerHTML = rows.map((r, i) => `<tr>
        <td>${r.name}</td><td>${r.on}</td><td>${r.off}</td><td>${HR.badge(r.status)}</td><td>${r.note}</td>
        <td>${r.editHistory}</td><td><button class="exception" data-idx="${i}">예외 처리</button></td></tr>`).join('');
    }
    draw();
    filter.onchange = draw;
    body.onclick = (e) => {
      const b = e.target.closest('.exception');
      if (!b) return;
      alert('예외 처리 요청이 생성되었습니다. 승인 허브에서 확인하세요.');
    };
  };

  const renderPos = () => {
    HR.applyLayout('매장');
    byId('storeCards').innerHTML = data.stores.map((s) => {
      const perf = data.performance.find(p => p.storeCode === s.code);
      return `<div class="card"><h3>${s.code} (${s.name})</h3>
      <p>${HR.badge(s.status)} 점장: ${data.storeLeaders[s.code]}</p>
      <p class="muted">팀장: ${s.teamLead} / 담당: ${s.manager}</p>
      <p>월 실적: ${perf.monthlySales} / 인원수: ${perf.members}</p>
      <button class="req" data-code="${s.code}">수정 요청</button></div>`;
    }).join('');
    byId('storeCards').onclick = (e) => {
      const b = e.target.closest('.req');
      if (!b) return;
      HR.requestApproval('store', { id: `P-REQ-${Date.now()}`, target: b.dataset.code, request: '매장 정보 수정 요청', requester: HR.role });
    };
  };

  const renderOffice = () => {
    HR.applyLayout('사무실');
    byId('officeBody').innerHTML = data.officeMembers.map((o) => `<tr><td>${o.name}</td><td>${o.role}</td><td>${o.task}</td><td>${HR.badge(o.status)}</td></tr>`).join('');
    byId('taskList').innerHTML = data.officeMembers.map((o, i) => `<li>${i+1}. ${o.name} - ${o.task}</li>`).join('');
  };

  const renderApproval = () => {
    HR.applyLayout('가입/승인');
    const tabs = document.querySelectorAll('[data-tab]');
    const contents = document.querySelectorAll('.tab-content');
    tabs.forEach((t) => t.onclick = () => {
      tabs.forEach(v=>v.classList.remove('primary')); t.classList.add('primary');
      contents.forEach(c => c.style.display = c.id === t.dataset.tab ? 'block' : 'none');
    });
    tabs[0].click();

    const localEmp = JSON.parse(localStorage.getItem('req_employee') || '[]');
    const localStore = JSON.parse(localStorage.getItem('req_store') || '[]');

    const drawRows = (id, list) => {
      byId(id).innerHTML = list.map((r) => `<tr><td>${r.id}</td><td>${r.target}</td><td>${r.request}</td><td>${r.requester}</td><td>${HR.badge('승인대기')}</td><td><button class='ok'>승인</button> <button class='danger no'>반려</button></td></tr>`).join('');
    };
    drawRows('signupBody', data.approvals.signup);
    drawRows('empApvBody', [...data.approvals.employee, ...localEmp]);
    drawRows('storeApvBody', [...data.approvals.store, ...localStore]);

    document.querySelectorAll('tbody').forEach((tb) => tb.onclick = (e) => {
      if (e.target.tagName !== 'BUTTON') return;
      const tr = e.target.closest('tr');
      tr.children[4].innerHTML = HR.badge(e.target.classList.contains('no') ? '반려' : '승인');
    });
  };

  const map = {
    'front.html': renderFront,
    'employee.html': renderEmployee,
    'org.html': renderOrg,
    'onoff.html': renderOnoff,
    'pos.html': renderPos,
    'office.html': renderOffice,
    'approval.html': renderApproval
  };
  if (map[page]) map[page]();
})();
