(function (window, document) {
  const DATA = window.HR_MOCK_DATA;

  function getRole() {
    return localStorage.getItem('hr_role') || '플래너';
  }

  function roleCanViewPrivate() {
    const role = getRole();
    return role.includes('담당') || role.includes('팀장');
  }

  function layoutInit(pageKey, title) {
    const root = document.querySelector('#app');
    if (!root) return;
    root.innerHTML = `
      <div class="layout">
        <header class="header">
          <div class="header-inner">
            <h1 class="page-title">${title}</h1>
            <div>
              <span class="badge-role">권한: ${getRole()}</span>
              <button id="logoutBtn" class="btn-ghost" style="margin-left:8px;">로그아웃</button>
            </div>
          </div>
        </header>
        <main id="pageContent"></main>
      </div>
      ${nav(pageKey)}
      <div id="modal" class="modal"><div id="modalContent" class="modal-content"></div></div>
    `;

    document.getElementById('logoutBtn').addEventListener('click', () => {
      localStorage.removeItem('hr_role');
      location.href = 'index.html';
    });

    const modal = document.getElementById('modal');
    modal.addEventListener('click', (e) => {
      if (e.target.id === 'modal') modal.classList.remove('show');
    });
  }

  function nav(active) {
    const items = [
      ['front', '대시보드', 'front.html'],
      ['employee', '직원관리', 'employee.html'],
      ['org', '조직관리', 'org.html'],
      ['onoff', '온오프관리', 'onoff.html'],
      ['pos', '매장', 'pos.html'],
      ['office', '사무실', 'office.html'],
      ['approval', '승인', 'approval.html']
    ];
    return `<nav class="bottom-nav"><div class="inner">${items.map(([k, label, href]) => `<a class="nav-link ${active === k ? 'active' : ''}" href="${href}">${label}</a>`).join('')}</div></nav>`;
  }

  function statusBadge(status) {
    const map = { ON: 'on', OFF: 'off', 오픈지연: 'delay', 프리데이: 'free', '승인 대기': 'wait' };
    return `<span class="badge ${map[status] || 'off'}">${status}</span>`;
  }

  function openModal(html) {
    document.getElementById('modalContent').innerHTML = html;
    document.getElementById('modal').classList.add('show');
  }

  function requestApproval(payload) {
    const list = JSON.parse(localStorage.getItem('approval_employee_edit') || '[]');
    list.push({ id: `REQ-${Date.now()}`, ...payload, status: '승인 대기' });
    localStorage.setItem('approval_employee_edit', JSON.stringify(list));
    alert('수정 요청이 접수되었습니다. 승인 대기로 전환됩니다.');
  }

  function requestStoreApproval(payload) {
    const list = JSON.parse(localStorage.getItem('approval_store_edit') || '[]');
    list.push({ id: `REQ-${Date.now()}`, ...payload, status: '승인 대기' });
    localStorage.setItem('approval_store_edit', JSON.stringify(list));
    alert('매장 수정 요청이 접수되었습니다. 승인 대기 상태입니다.');
  }

  window.HR_COMMON = {
    DATA,
    getRole,
    roleCanViewPrivate,
    layoutInit,
    statusBadge,
    openModal,
    requestApproval,
    requestStoreApproval
  };
}(window, document));
