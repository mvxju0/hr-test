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
    byId('pendingCount').textContent = data.pendingAll.length;
    byId('storeCount').textContent = data.stores.length;
    const today = byId('workDate')?.value || '2026-04-03';
    const delays = data.onoffLogs.filter((r) => r.date === today && r.status === '지연출근').length;
    byId('delayCount').textContent = delays;

    byId('quickCards').innerHTML = [
      ['금일 정상출근', `${data.onoffLogs.filter(r => r.date === '2026-04-03' && r.status === '정상출근').length}명`],
      ['금일 프리데이', `${data.onoffLogs.filter(r => r.date === '2026-04-03' && r.status === '프리데이').length}명`],
      ['승인 처리율', '87%'],
      ['이번달 누적 지연분', `${data.onoffLogs.filter(r=>r.status==='지연출근').reduce((a,b)=>a+b.delayMin,0)}분`]
    ].map(([t,v]) => `<div class='card'><h3>${t}</h3><div class='kpi'>${v}</div></div>`).join('');

    byId('recentApv').innerHTML = data.pendingAll.slice(0, 6).map((r) =>
      `<tr><td>${r.type}</td><td>${r.target}</td><td>${r.request}</td><td>${r.requester}</td><td>${HR.badge('승인대기')}</td></tr>`
    ).join('');
  };

  const renderEmployee = () => {
    HR.applyLayout('직원관리');
    const tbody = byId('empBody');
    const q = byId('q');
    const role = byId('roleFilter');
    const store = byId('storeFilter');

    const stores = [...new Set(data.employees.map((e) => e.storeCode))];
    store.innerHTML += stores.map((s) => `<option>${s}</option>`).join('');

    function draw() {
      const kw = q.value.trim();
      const rv = role.value;
      const sv = store.value;
      const list = data.employees.filter((e) =>
        (!kw || `${e.name}${e.storeCode}`.includes(kw)) &&
        (!rv || e.role === rv) &&
        (!sv || e.storeCode === sv)
      );
      tbody.innerHTML = list.slice(0, 120).map((e) => `
        <tr>
          <td><button class='detail' data-id='${e.empNo}'>${e.name}</button></td>
          <td>${e.storeCode} (${e.storeName})</td>
          <td>${e.contact}</td>
          <td><a href='tel:${e.contact}'><button>전화</button></a></td>
          <td><button ${HR.canEdit ? '' : 'disabled'} class='edit' data-id='${e.empNo}'>편집요청</button></td>
        </tr>`).join('');
    }

    draw();
    q.oninput = draw;
    role.onchange = draw;
    store.onchange = draw;

    tbody.onclick = (ev) => {
      const detailBtn = ev.target.closest('.detail');
      const editBtn = ev.target.closest('.edit');
      if (detailBtn) {
        const e = data.employees.find((v) => v.empNo === detailBtn.dataset.id);
        byId('detail').innerHTML = `
          <h4>${e.name} (${e.empNo})</h4>
          <p class='muted'>공개 정보: 연락처 ${e.contact} / 입사일 ${e.joinDate} / 소속 ${e.storeCode} / 직급 ${e.role}</p>
          <p class='muted'>개인정보: ${HR.canViewPrivate ? `${e.email} / ${e.address}` : '담당/팀장만 열람 가능'}</p>
          <h5>변경 히스토리</h5>
          <ul>${e.history.map((h) => `<li>${h.date} | ${h.type} | ${h.editor} | ${h.before} → ${h.after}</li>`).join('')}</ul>`;
      }
      if (editBtn) {
        const e = data.employees.find((v) => v.empNo === editBtn.dataset.id);
        HR.requestApproval('employee', { id: `E-REQ-${Date.now()}`, target: e.name, request: '직원 정보 수정 요청', requester: HR.role, type: '직원' });
      }
    };
  };

  const renderOrg = () => {
    HR.applyLayout('조직관리');
    const field = {};
    data.stores.forEach((s) => {
      if (!field[s.manager]) field[s.manager] = {};
      if (!field[s.manager][s.teamLead]) field[s.manager][s.teamLead] = [];
      field[s.manager][s.teamLead].push(`${s.code} (${data.storeLeaders[s.code]})`);
    });
    byId('fieldTree').innerHTML = Object.entries(field).map(([mgr, teams]) =>
      `<li><b>담당: ${mgr}</b><ul>${Object.entries(teams).map(([tl, ss]) => `<li>팀장: ${tl}<ul>${ss.map((v)=>`<li>${v} → 플래너 2~3명(SP2/SP1.5/SP1)</li>`).join('')}</ul></li>`).join('')}</ul></li>`
    ).join('');
  };

  const renderOnoff = () => {
    HR.applyLayout('온오프관리');
    const body = byId('onoffBody');
    const filter = byId('statusFilter');
    const dateInput = byId('workDate');
    const mode = byId('viewMode');

    const drawDaily = () => {
      const st = filter.value;
      const dt = dateInput.value;
      const rows = data.onoffLogs.filter((r) => r.date === dt && (!st || r.status === st));
      body.innerHTML = rows.map((r) => `<tr>
        <td>${r.name}</td><td>${r.storeCode}</td><td>${r.on}</td><td>${r.off}</td>
        <td>${HR.badge(r.isNormal ? '정상출근' : '지연출근')}</td>
        <td>${r.isNormal ? '-' : r.arrivedAt}</td><td>${r.isNormal ? 0 : r.delayMin}분</td><td>${r.note}</td>
      </tr>`).join('');
    };

    const drawMonthly = () => {
      byId('monthlyBody').innerHTML = data.monthlySummary.map((m) =>
        `<tr><td>${m.name}</td><td>${m.normalCount}</td><td>${m.delayCount}</td><td>${m.totalDelayMin}분</td></tr>`
      ).join('');
    };

    const render = () => {
      const isMonthly = mode.value === 'monthly';
      byId('monthlySummary').style.display = isMonthly ? 'block' : 'none';
      drawDaily();
      if (isMonthly) drawMonthly();
    };

    render();
    filter.onchange = render;
    dateInput.onchange = render;
    mode.onchange = render;
  };

  const renderPos = () => {
    HR.applyLayout('매장');
    byId('storeCards').innerHTML = data.stores.map((s) => {
      const perf = data.performance.find((p) => p.storeCode === s.code);
      return `<div class='card'><h3>${s.code} (${s.name})</h3>
      <p>${HR.badge(s.status)} 점장: ${data.storeLeaders[s.code]}</p>
      <p class='muted'>팀장: ${s.teamLead} / 담당: ${s.manager}</p>
      <p>월 실적: ${perf.monthlySales} / 매장 인원 수: ${perf.members}</p>
      <button class='req' data-code='${s.code}'>수정 요청</button></div>`;
    }).join('');
    byId('storeCards').onclick = (e) => {
      const b = e.target.closest('.req');
      if (!b) return;
      HR.requestApproval('store', { id: `P-REQ-${Date.now()}`, target: b.dataset.code, request: '매장 정보 수정 요청', requester: HR.role, type: '매장' });
    };
  };

  const renderOffice = () => {
    HR.applyLayout('사무실');
    byId('officeBody').innerHTML = data.officeMembers.map((o) => `<tr><td>${o.name}</td><td>${o.role}</td><td>${o.task}</td><td>${HR.badge(o.status)}</td></tr>`).join('');
    byId('taskList').innerHTML = data.officeMembers.map((o, i) => `<li>${i + 1}. ${o.name} - ${o.task}</li>`).join('');
  };

  const renderApproval = () => {
    HR.applyLayout('가입/승인');
    const tabs = document.querySelectorAll('[data-tab]');
    const contents = document.querySelectorAll('.tab-content');
    tabs.forEach((t) => t.onclick = () => {
      tabs.forEach((v) => v.classList.remove('primary'));
      t.classList.add('primary');
      contents.forEach((c) => c.style.display = c.id === t.dataset.tab ? 'block' : 'none');
    });
    tabs[0].click();

    const localEmp = JSON.parse(localStorage.getItem('req_employee') || '[]');
    const localStore = JSON.parse(localStorage.getItem('req_store') || '[]');
    const drawRows = (id, list) => {
      byId(id).innerHTML = list.map((r) =>
        `<tr><td>${r.id}</td><td>${r.target}</td><td>${r.request}</td><td>${r.requester}</td><td>${HR.badge('승인대기')}</td><td><button class='ok'>승인</button> <button class='danger no'>반려</button></td></tr>`
      ).join('');
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
