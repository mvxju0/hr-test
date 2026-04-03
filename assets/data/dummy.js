window.HR_DATA = (() => {
  const stores = [
    { code: '가홈', name: '가경동_삼거리점', status: '운영중', teamLead: '이승헌', manager: '박근우' },
    { code: '강서', name: '가경동_하나병원점', status: '운영중', teamLead: '이승헌', manager: '박근우' },
    { code: '가터', name: '가경동_터미널점', status: '운영중', teamLead: '이승헌', manager: '박근우' },
    { code: '가아', name: '가경동_아이파크점', status: '운영중', teamLead: '이승헌', manager: '박근우' },
    { code: '율칸', name: '주성동_대원칸타빌점', status: '운영중', teamLead: '정연우', manager: '박근우' },
    { code: '율롯', name: '율량동_롯데슈퍼점', status: '운영중', teamLead: '정연우', manager: '박근우' },
    { code: '사창', name: '사창동_국민은행점', status: '운영중', teamLead: '정연우', manager: '박근우' },
    { code: '두진', name: '사창동_두진하트리움점', status: '운영중', teamLead: '정연우', manager: '박근우' },
    { code: '중흥', name: '용암동_중흥마을점', status: '운영중', teamLead: '정연우', manager: '박근우' },
    { code: '시장', name: '사창동_사창시장점', status: '운영중', teamLead: '정연우', manager: '박근우' },
    { code: '복대', name: '복대동_복대시장점', status: '운영중', teamLead: '원준기', manager: '박근우' },
    { code: '강터', name: '강서동_터미널점', status: '운영중', teamLead: '원준기', manager: '박근우' },
    { code: '청대', name: '우암동_청대점', status: '운영중', teamLead: '원준기', manager: '박근우' },
    { code: '송절', name: '송절동_테크노폴리스점', status: '운영중', teamLead: '원준기', manager: '박근우' },
    { code: '비하', name: '비하동_자이아파트점', status: '운영중', teamLead: '원준기', manager: '박근우' },
    { code: '가경', name: '가경동_롯데마트점', status: '운영중', teamLead: '원준기', manager: '박근우' },
    { code: '금광', name: '금천동_금천광장점', status: '운영중', teamLead: '김민석', manager: '박근우' },
    { code: '용암', name: '용암동_농협사거리점', status: '운영중', teamLead: '김민석', manager: '박근우' },
    { code: '산남', name: '산남동_우리은행점', status: '운영중', teamLead: '김민석', manager: '박근우' },
    { code: '동남', name: '용암동_동남신협점', status: '운영중', teamLead: '김민석', manager: '박근우' },
    { code: '분평', name: '분평동_주민센터점', status: '운영중', teamLead: '김민석', manager: '박근우' },
    { code: '우암', name: '우암동_사거리점', status: '운영중', teamLead: '이명건', manager: '박근우' },
    { code: '용롯', name: '용암동_롯데마트점', status: '운영중', teamLead: '이명건', manager: '박근우' },
    { code: '금천', name: '금천동_국민은행점', status: '운영중', teamLead: '담당직속', manager: '박근우' },
    { code: '지웰', name: '복대동_지웰시티몰점', status: '운영중', teamLead: '담당직속', manager: '박근우' },
    { code: '충주', name: '칠금동_충주터미널점', status: '운영중', teamLead: '조다해', manager: '유종호' },
    { code: '연수', name: '연수동_유원아파트점', status: '운영중', teamLead: '조다해', manager: '유종호' },
    { code: '용산', name: '용산동_충주여고점', status: '운영중', teamLead: '조다해', manager: '유종호' },
    { code: '호암', name: '호암동_풍경채점', status: '운영중', teamLead: '조다해', manager: '유종호' },
    { code: '증평', name: '증평읍_증평우체국점', status: '운영중', teamLead: '고준', manager: '유종호' },
    { code: '만수', name: '오송읍_만수리점', status: '운영중', teamLead: '고준', manager: '유종호' }
  ];

  const storeLeaders = {
    가홈: '김민성', 강서: '이선재', 가터: '전다영', 가아: '강민호', 율칸: '김수만', 율롯: '강석주', 사창: '차명호', 두진: '조민제', 중흥: '윤종우', 시장: '김시원',
    복대: '정미정', 강터: '유현우', 청대: '최준희', 송절: '홍인기', 비하: '유지연', 가경: '정인태', 금광: '김사랑', 용암: '김민서', 산남: '김민지', 동남: '이승효',
    분평: '김재환', 우암: '김성호', 용롯: '이가은', 금천: '김택민', 지웰: '김지하', 충주: '정희찬', 연수: '김요한', 용산: '이정혁', 호암: '권지수', 증평: '최혁준', 만수: '임민우'
  };

  const officeMembers = [
    { name: '박근우', role: '담당', task: '현장 총괄 및 승인', status: '진행중' },
    { name: '유종호', role: '담당', task: '충주권 운영 승인', status: '진행중' },
    { name: '이승헌', role: '팀장', task: '청주 서부 운영 관리', status: '정상' },
    { name: '정연우', role: '팀장', task: '청주 중심권 운영 관리', status: '정상' },
    { name: '원준기', role: '팀장', task: '청주 북부 운영 관리', status: '정상' },
    { name: '김민석', role: '팀장', task: '청주 남부 운영 관리', status: '정상' }
  ];

  const firstNames = ['민준', '서준', '예준', '지우', '서연', '하은', '지민', '준호', '나현', '도윤'];
  const lastNames = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임'];
  const grades = ['SP2', 'SP1.5', 'SP1'];
  const rand = (seed) => Math.abs(Math.sin(seed * 9999)) % 1;
  const phone = (i) => `010-${String(1000 + (i * 37) % 9000)}-${String(1000 + (i * 91) % 9000)}`;
  const hireDate = (i) => `${2019 + (i % 7)}-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i * 3 % 27)).padStart(2, '0')}`;

  const employees = [];
  let empSeq = 1001;
  stores.forEach((s, i) => {
    const leader = storeLeaders[s.code];
    employees.push({
      empNo: `E${empSeq++}`,
      name: leader,
      role: '점장',
      grade: '-',
      storeCode: s.code,
      storeName: s.name,
      teamLead: s.teamLead,
      manager: s.manager,
      contact: phone(i),
      email: `${leader}@hrmock.co.kr`,
      joinDate: hireDate(i),
      address: `충북 청주시 ${i + 1}번길 ${10 + i}`,
      status: '활동',
      history: [{ type: '직급변경', editor: '박근우', before: 'SP2', after: '점장', date: `2025-0${(i % 9) + 1}-12` }]
    });

    const spCount = i % 2 === 0 ? 2 : 3;
    for (let n = 0; n < spCount; n++) {
      const id = i * 3 + n + 1;
      const spName = `${lastNames[id % lastNames.length]}${firstNames[id % firstNames.length]}`;
      employees.push({
        empNo: `E${empSeq++}`,
        name: spName,
        role: '플래너',
        grade: grades[Math.floor(rand(id) * grades.length)],
        storeCode: s.code,
        storeName: s.name,
        teamLead: s.teamLead,
        manager: leader,
        contact: phone(id + 40),
        email: `${spName}${id}@hrmock.co.kr`,
        joinDate: hireDate(id + 20),
        address: `충북 청주시 흥덕구 ${id}로 ${20 + id}`,
        status: id % 5 === 0 ? '교육중' : '활동',
        history: [
          { type: '매장이동', editor: '정연우', before: '교육센터', after: s.code, date: `2026-0${(id % 3) + 1}-03` },
          { type: '소속변경', editor: leader, before: '미배정', after: s.teamLead, date: `2026-0${(id % 4) + 1}-11` }
        ]
      });
    }
  });

  const onoffLogs = [];
  const baseList = employees.slice(0, 70);
  for (let d = 1; d <= 30; d++) {
    const date = `2026-04-${String(d).padStart(2, '0')}`;
    baseList.forEach((e, i) => {
      const key = (i + d) % 13;
      const isDelay = key === 0 || key === 7;
      const isOff = key === 10;
      const isFreeday = key === 11;
      const delayMin = isDelay ? 5 + ((i + d) % 26) : 0;
      onoffLogs.push({
        date,
        empNo: e.empNo,
        name: e.name,
        storeCode: e.storeCode,
        on: isOff || isFreeday ? '-' : (isDelay ? `09:${String(5 + (delayMin % 40)).padStart(2, '0')}` : '08:58'),
        off: isOff || isFreeday ? '-' : `18:${String((i + d) % 50).padStart(2, '0')}`,
        status: isOff ? 'OFF' : isFreeday ? '프리데이' : isDelay ? '지연출근' : '정상출근',
        isNormal: !(isDelay || isOff || isFreeday),
        arrivedAt: isDelay ? `09:${String(5 + (delayMin % 40)).padStart(2, '0')}` : '-',
        delayMin,
        note: isDelay ? '오픈지연 보고 완료' : isFreeday ? '사전 승인된 프리데이' : '-'
      });
    });
  }

  const monthlySummary = Object.values(onoffLogs.reduce((acc, r) => {
    if (!acc[r.empNo]) acc[r.empNo] = { name: r.name, normalCount: 0, delayCount: 0, totalDelayMin: 0 };
    if (r.status === '정상출근') acc[r.empNo].normalCount += 1;
    if (r.status === '지연출근') { acc[r.empNo].delayCount += 1; acc[r.empNo].totalDelayMin += r.delayMin; }
    return acc;
  }, {})).slice(0, 50);

  const approvals = {
    signup: [
      { id: 'S-100', type: '가입', target: '한예린', request: '신규 계정 생성', requester: '정연우', status: '승인 대기' },
      { id: 'S-101', type: '가입', target: '문도윤', request: '신규 계정 생성', requester: '원준기', status: '승인 대기' }
    ],
    employee: [
      { id: 'E-901', type: '직원', target: '김민서', request: '연락처 변경', before: '010-2222-1111', after: '010-8841-3392', requester: '김민서', status: '승인 대기' },
      { id: 'E-902', type: '직원', target: '최준희', request: '소속변경', before: '청대', after: '송절', requester: '원준기', status: '승인 대기' }
    ],
    store: [
      { id: 'P-410', type: '매장', target: '가홈', request: '운영 메모 수정', before: '기본 운영', after: '주말 인력 증원', requester: '김민성', status: '승인 대기' },
      { id: 'P-411', type: '매장', target: '충주', request: '실적 목표 조정', before: '월 850', after: '월 930', requester: '정희찬', status: '승인 대기' }
    ]
  };

  const performance = stores.map((s, i) => ({
    storeCode: s.code,
    monthlySales: 700 + (i * 23 % 350),
    members: employees.filter((e) => e.storeCode === s.code).length
  }));

  const pendingAll = [...approvals.signup, ...approvals.employee, ...approvals.store];

  return { stores, storeLeaders, employees, onoffLogs, monthlySummary, approvals, pendingAll, officeMembers, performance };
})();
