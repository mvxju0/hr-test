(function (window) {
  const stores = [
    { code: '가홈', fullName: '가경동_삼거리점', status: '운영중', teamLead: '이승헌', owner: '박근우' },
    { code: '강서', fullName: '가경동_하나병원점', status: '운영중', teamLead: '이승헌', owner: '박근우' },
    { code: '가터', fullName: '가경동_터미널점', status: '운영중', teamLead: '이승헌', owner: '박근우' },
    { code: '가아', fullName: '가경동_아이파크점', status: '운영중', teamLead: '이승헌', owner: '박근우' },
    { code: '율칸', fullName: '주성동_대원칸타빌점', status: '운영중', teamLead: '정연우', owner: '박근우' },
    { code: '율롯', fullName: '율량동_롯데슈퍼점', status: '운영중', teamLead: '정연우', owner: '박근우' },
    { code: '사창', fullName: '사창동_국민은행점', status: '운영중', teamLead: '정연우', owner: '박근우' },
    { code: '두진', fullName: '사창동_두진하트리움점', status: '운영중', teamLead: '정연우', owner: '박근우' },
    { code: '중흥', fullName: '용암동_중흥마을점', status: '운영중', teamLead: '정연우', owner: '박근우' },
    { code: '시장', fullName: '사창동_사창시장점', status: '운영중', teamLead: '정연우', owner: '박근우' },
    { code: '복대', fullName: '복대동_복대시장점', status: '운영중', teamLead: '원준기', owner: '박근우' },
    { code: '강터', fullName: '강서동_터미널점', status: '운영중', teamLead: '원준기', owner: '박근우' },
    { code: '청대', fullName: '우암동_청대점', status: '운영중', teamLead: '원준기', owner: '박근우' },
    { code: '송절', fullName: '송절동_테크노폴리스점', status: '운영중', teamLead: '원준기', owner: '박근우' },
    { code: '비하', fullName: '비하동_자이아파트점', status: '운영중', teamLead: '원준기', owner: '박근우' },
    { code: '가경', fullName: '가경동_롯데마트점', status: '운영중', teamLead: '원준기', owner: '박근우' },
    { code: '금광', fullName: '금천동_금천광장점', status: '운영중', teamLead: '김민석', owner: '박근우' },
    { code: '용암', fullName: '용암동_농협사거리점', status: '운영중', teamLead: '김민석', owner: '박근우' },
    { code: '산남', fullName: '산남동_우리은행점', status: '운영중', teamLead: '김민석', owner: '박근우' },
    { code: '동남', fullName: '용암동_동남신협점', status: '운영중', teamLead: '김민석', owner: '박근우' },
    { code: '분평', fullName: '분평동_주민센터점', status: '운영중', teamLead: '김민석', owner: '박근우' },
    { code: '우암', fullName: '우암동_사거리점', status: '운영중', teamLead: '이명건', owner: '박근우' },
    { code: '용롯', fullName: '용암동_롯데마트점', status: '운영중', teamLead: '이명건', owner: '박근우' },
    { code: '금천', fullName: '금천동_국민은행점', status: '운영중', teamLead: '담당직속', owner: '박근우' },
    { code: '지웰', fullName: '복대동_지웰시티몰점', status: '운영중', teamLead: '담당직속', owner: '박근우' },
    { code: '충주', fullName: '칠금동_충주터미널점', status: '운영중', teamLead: '조다해', owner: '유종호' },
    { code: '연수', fullName: '연수동_유원아파트점', status: '운영중', teamLead: '조다해', owner: '유종호' },
    { code: '용산', fullName: '용산동_충주여고점', status: '운영중', teamLead: '조다해', owner: '유종호' },
    { code: '호암', fullName: '호암동_풍경채점', status: '운영중', teamLead: '조다해', owner: '유종호' },
    { code: '증평', fullName: '증평읍_증평우체국점', status: '운영중', teamLead: '고준', owner: '유종호' },
    { code: '만수', fullName: '오송읍_만수리점', status: '운영중', teamLead: '고준', owner: '유종호' }
  ];

  const managers = [
    { name: '김민성', storeCode: '가홈' }, { name: '이선재', storeCode: '강서' }, { name: '전다영', storeCode: '가터' },
    { name: '강민호', storeCode: '가아' }, { name: '김수만', storeCode: '율칸' }, { name: '강석주', storeCode: '율롯' },
    { name: '차명호', storeCode: '사창' }, { name: '조민제', storeCode: '두진' }, { name: '윤종우', storeCode: '중흥' },
    { name: '김시원', storeCode: '시장' }, { name: '정미정', storeCode: '복대' }, { name: '유현우', storeCode: '강터' },
    { name: '최준희', storeCode: '청대' }, { name: '홍인기', storeCode: '송절' }, { name: '유지연', storeCode: '비하' },
    { name: '정인태', storeCode: '가경' }, { name: '김사랑', storeCode: '금광' }, { name: '김민서', storeCode: '용암' },
    { name: '김민지', storeCode: '산남' }, { name: '이승효', storeCode: '동남' }, { name: '김재환', storeCode: '분평' },
    { name: '김성호', storeCode: '우암' }, { name: '이가은', storeCode: '용롯' }, { name: '김택민', storeCode: '금천' },
    { name: '김지하', storeCode: '지웰' }, { name: '정희찬', storeCode: '충주' }, { name: '김요한', storeCode: '연수' },
    { name: '이정혁', storeCode: '용산' }, { name: '권지수', storeCode: '호암' }, { name: '최혁준', storeCode: '증평' },
    { name: '임민우', storeCode: '만수' }
  ];

  const officeStaff = [
    { name: '박근우', role: '담당', duty: '현장 운영 총괄', status: '진행중' },
    { name: '유종호', role: '담당', duty: '충주권 운영 총괄', status: '진행중' },
    { name: '서지원', role: '팀장', duty: '채용/가입 승인 관리', status: '검토중' },
    { name: '한지민', role: '책임', duty: '시스템/권한 정책 관리', status: '완료' },
    { name: '송하늘', role: '선임', duty: '교육 운영/온보딩', status: '진행중' },
    { name: '유도현', role: '사원/CSM', duty: '매장 문의 응대', status: '대기' }
  ];

  const statuses = ['ON', 'OFF', '오픈지연', '프리데이'];
  const spGrades = ['SP2', 'SP1.5', 'SP1'];
  const surnames = ['김', '이', '박', '최', '정', '한', '윤', '조', '신', '오'];
  const given = ['현우', '도윤', '서준', '하린', '지수', '나은', '예준', '태윤', '지호', '수빈'];
  const historyTypes = ['매장이동', '소속변경', '직급변경'];

  const approvalHub = {
    signup: [
      { id: 'SU-001', name: '박민지', requestedRole: '담당', requestedAt: '2026-04-01', status: '승인 대기' },
      { id: 'SU-002', name: '이채원', requestedRole: '팀장', requestedAt: '2026-04-02', status: '승인 대기' }
    ],
    employeeEdit: [
      { id: 'EM-101', target: '김민성', field: '직급', before: '점장', after: '팀장', requester: '한지민', status: '승인 대기' },
      { id: 'EM-102', target: '김민서', field: '소속', before: '용암', after: '산남', requester: '유도현', status: '승인 대기' }
    ],
    storeEdit: [
      { id: 'ST-201', target: '지웰', field: '점장', before: '김지하', after: '정미정', requester: '서지원', status: '승인 대기' }
    ]
  };

  function seeded(index, offset) { return (index * 17 + offset * 13) % 100; }
  function pad(n) { return String(n).padStart(2, '0'); }

  function createEmployeeBase() {
    const employees = [];
    const today = new Date('2026-04-03');

    managers.forEach((m, idx) => {
      const store = stores.find((s) => s.code === m.storeCode);
      employees.push({
        id: `E${String(idx + 1).padStart(4, '0')}`,
        name: m.name,
        role: '점장',
        storeCode: m.storeCode,
        contact: `010-${pad((idx + 10) % 100)}${pad((idx + 30) % 100)}-${pad((idx + 50) % 100)}${pad((idx + 70) % 100)}`,
        email: `${m.name}@demohr.co.kr`,
        joinDate: `20${12 + (idx % 12)}-${pad((idx % 12) + 1)}-${pad((idx % 26) + 1)}`,
        address: `충북 청주시 ${store.fullName.split('_')[0]} ${idx + 10}번길`,
        dept: store.teamLead,
        manager: store.owner,
        status: idx % 10 === 0 ? '휴면' : '재직'
      });

      const spCount = idx % 2 === 0 ? 2 : 3;
      for (let i = 0; i < spCount; i += 1) {
        const name = `${surnames[(idx + i) % surnames.length]}${given[(idx * 2 + i) % given.length]}`;
        const eidx = employees.length + 1;
        employees.push({
          id: `E${String(eidx).padStart(4, '0')}`,
          name,
          role: `플래너 (${spGrades[(idx + i) % spGrades.length]})`,
          storeCode: m.storeCode,
          contact: `010-${pad((eidx + 11) % 100)}${pad((eidx + 39) % 100)}-${pad((eidx + 52) % 100)}${pad((eidx + 81) % 100)}`,
          email: `${name}${eidx}@demohr.co.kr`,
          joinDate: `20${15 + (eidx % 10)}-${pad((eidx % 12) + 1)}-${pad((eidx % 26) + 1)}`,
          address: `충북 ${store.fullName.split('_')[0]} ${eidx}로`,
          dept: m.name,
          manager: m.name,
          status: seeded(eidx, 4) > 92 ? '교육중' : '재직'
        });
      }
    });

    officeStaff.forEach((o, idx) => {
      const eidx = employees.length + 1;
      employees.push({
        id: `E${String(eidx).padStart(4, '0')}`,
        name: o.name,
        role: `사무실 ${o.role}`,
        storeCode: '사무실',
        contact: `010-77${pad(idx + 10)}-66${pad(idx + 20)}`,
        email: `${o.name}@office.demohr.co.kr`,
        joinDate: `20${10 + idx}-${pad(idx + 2)}-${pad(idx + 5)}`,
        address: `충북 청주시 흥덕구 사무실로 ${idx + 1}`,
        dept: '사무실',
        manager: idx < 2 ? '대표' : '박근우',
        status: '재직'
      });
    });

    return employees.map((e, idx) => ({
      ...e,
      history: [
        {
          type: historyTypes[idx % 3],
          editor: idx % 2 === 0 ? '서지원' : '한지민',
          before: idx % 2 === 0 ? e.storeCode : e.role,
          after: idx % 2 === 0 ? `${e.storeCode}(조정)` : `${e.role}(조정)`,
          date: `2026-03-${pad((idx % 25) + 1)}`
        }
      ],
      onoffStatus: statuses[idx % 4],
      note: idx % 5 === 0 ? '예외 요청 있음' : '-',
      modifiedAt: `2026-04-${pad((idx % 3) + 1)} 10:${pad(idx % 60)}`,
      performance: 72 + (idx % 26),
      staffCount: 3 + (idx % 5)
    }));
  }

  const employees = createEmployeeBase();

  const org = {
    field: {
      title: '현장 조직',
      tree: [
        {
          name: '플래너(SP)',
          children: [
            {
              name: '점장',
              children: [
                { name: '팀장', children: [{ name: '담당' }] }
              ]
            }
          ]
        }
      ]
    },
    office: {
      title: '사무실 조직',
      tree: [
        {
          name: '사원/CSM',
          children: [
            {
              name: '선임',
              children: [
                { name: '책임', children: [{ name: '팀장', children: [{ name: '담당' }] }] }
              ]
            }
          ]
        }
      ]
    }
  };

  window.HR_MOCK_DATA = {
    stores,
    managers,
    employees,
    officeStaff,
    approvalHub,
    org,
    getToday: () => todayToString(new Date('2026-04-03'))
  };

  function todayToString(date) {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} (${days[date.getDay()]})`;
  }
}(window));
