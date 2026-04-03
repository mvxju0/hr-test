(() => {
  const page = document.body.dataset.page;
  const role = localStorage.getItem('role') || '플래너';

  const navItems = [
    ['front.html', '대시보드'],
    ['employee.html', '직원관리'],
    ['org.html', '조직관리'],
    ['onoff.html', '온오프관리'],
    ['pos.html', '매장'],
    ['office.html', '사무실'],
    ['approval.html', '가입/승인']
  ];

  window.HR = {
    role,
    canViewPrivate: ['담당', '팀장'].includes(role),
    canEdit: role !== '플래너',
    requestApproval(type, payload) {
      const key = `req_${type}`;
      const old = JSON.parse(localStorage.getItem(key) || '[]');
      old.unshift({ ...payload, status: '승인 대기', at: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(old));
      alert('수정 요청이 등록되었습니다. 승인 후 반영됩니다.');
      location.href = 'approval.html';
    },
    applyLayout(title) {
      const app = document.querySelector('.app');
      if (!app) return;
      const now = new Date();
      const top = document.createElement('header');
      top.className = 'header';
      top.innerHTML = `
        <div class='head-left'>
          <span class='brand-pill'>U+ HR</span>
          <div>
            <div class='title'>${title}</div>
            <div class='sub'>실개발 전 시연용 운영 목업</div>
          </div>
        </div>
        <div class='head-right'>
          <span class='role-chip'>${role}</span>
          <span class='sub'>${now.toLocaleDateString('ko-KR')}</span>
        </div>`;
      app.prepend(top);

      const nav = document.createElement('nav');
      nav.className = 'nav';
      nav.innerHTML = `<div class="nav-inner">${navItems.map(([href, label]) => `<a href="${href}" class="${page===href ? 'active' : ''}">${label}</a>`).join('')}</div>`;
      document.body.appendChild(nav);
    },
    badge(text) { return `<span class="badge b-${text}">${text}</span>`; }
  };
})();
