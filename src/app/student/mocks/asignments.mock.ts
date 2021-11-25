import { ASIGNMENT_STATUS, Week } from '../model/week.model';

export const ASIGNMENTS_MOCK_DATA: Week[] = [
  {
    week_id: 1,
    asignments: [
      {
        id: 1,
        title: 'internet solution',
        short_desc: 'Unsp fx shaft of r tibia, 7thF',
        left_days: 10,
        expire_date: '2021/03/11',
        status: ASIGNMENT_STATUS.NOT_SUBMITED,
      },
      {
        id: 2,
        title: 'Ergonomic',
        short_desc: 'Anaplastic large cell lymphoma, ALK-neg, nodes mult site',
        left_days: 4,
        expire_date: '2021/02/02',
        status: ASIGNMENT_STATUS.SUBMITED,
      },
      {
        id: 3,
        title: 'Advanced',
        short_desc: 'Acquired absence of upper limb above wrist',
        left_days: 19,
        expire_date: '2020/07/13',
        status: ASIGNMENT_STATUS.EXPIRED,
      },
    ],
  },
  {
    week_id: 2,
    asignments: [
      {
        id: 4,
        title: 'didactic',
        short_desc: 'Crushing injury of left ankle',
        left_days: 14,
        expire_date: '2021/06/30',
        status: ASIGNMENT_STATUS.NOT_SUBMITED,
      },
      {
        id: 5,
        title: 'Upgradable',
        short_desc: 'Other chronic cystitis without hematuria',
        left_days: 15,
        expire_date: '2021/01/24',
        status: ASIGNMENT_STATUS.SUBMITED,
      },
    ],
  },
  {
    week_id: 3,
    asignments: [
      {
        id: 6,
        title: 'attitude',
        short_desc: 'Chronic bullous disease of childhood',
        left_days: 2,
        expire_date: '2021/03/13',
        status: ASIGNMENT_STATUS.NOT_SUBMITED,
      },
      {
        id: 7,
        title: '24 hour',
        short_desc: 'Oth physeal fracture of lower end of left tibia, init',
        left_days: 8,
        expire_date: '2021/03/18',
        status: ASIGNMENT_STATUS.SUBMITED,
      },
      {
        id: 8,
        title: 'client-server',
        short_desc: 'Nondisp fx of low epiphy (separation) of unsp femr, 7thH',
        left_days: 8,
        expire_date: '2021/11/01',
        status: ASIGNMENT_STATUS.NOT_SUBMITED,
      },
      {
        id: 9,
        title: 'Business-focused',
        short_desc:
          'Oth injury of blood vessel of unspecified thumb, subs encntr',
        left_days: 9,
        expire_date: '2021/10/04',
        status: ASIGNMENT_STATUS.NOT_SUBMITED,
      },
    ],
  },
  {
    week_id: 4,
    asignments: [
      {
        id: 10,
        title: 'Customer-focused',
        short_desc:
          'Oth physl fx low end humer, r arm, subs for fx w routn heal',
        left_days: 20,
        expire_date: '2020/08/19',
        status: ASIGNMENT_STATUS.SUBMITED,
      },
    ],
  },
  {
    week_id: 5,
    asignments: [
      {
        id: 11,
        title: 'local',
        short_desc: 'Other disorders of retroperitoneum',
        left_days: 20,
        expire_date: '2021/02/24',
        status: ASIGNMENT_STATUS.NOT_SUBMITED,
      },
      {
        id: 12,
        title: 'focus group',
        short_desc: 'Sprain of tarsal ligament of right foot, sequela',
        left_days: 16,
        expire_date: '2020/10/03',
        status: ASIGNMENT_STATUS.SUBMITED,
      },
      {
        id: 13,
        title: 'intranet',
        short_desc: 'Unspecified fracture of unspecified thoracic vertebra',
        left_days: 4,
        expire_date: '2021/04/11',
        status: ASIGNMENT_STATUS.NOT_SUBMITED,
      },
      {
        id: 14,
        title: 'Organized',
        short_desc: 'Nondisp fx of r radial styloid pro, 7thM',
        left_days: 9,
        expire_date: '2020/08/17',
        status: ASIGNMENT_STATUS.SUBMITED,
      },
      {
        id: 15,
        title: 'well-modulated',
        short_desc: 'Unspecified juvenile rheumatoid arthritis, right hand',
        left_days: 5,
        expire_date: '2021/01/05',
        status: ASIGNMENT_STATUS.SUBMITED,
      },
    ],
  },
  {
    week_id: 6,
    asignments: [
      {
        id: 16,
        title: 'Innovative',
        short_desc: 'Corrosion of third degree of right thigh, subs encntr',
        left_days: 13,
        expire_date: '2020/06/20',
        status: ASIGNMENT_STATUS.SUBMITED,
      },
      {
        id: 17,
        title: 'Centralized',
        short_desc: 'Fall from skateboard, initial encounter',
        left_days: 5,
        expire_date: '2021/02/12',
        status: ASIGNMENT_STATUS.SUBMITED,
      },
    ],
  },
  {
    week_id: 7,
    asignments: [
      {
        id: 18,
        title: 'concept',
        short_desc:
          'Athscl nonaut bio bypass of left leg w ulcer oth prt low leg',
        left_days: 19,
        expire_date: '2021/06/22',
        status: ASIGNMENT_STATUS.SUBMITED,
      },
      {
        id: 19,
        title: 'orchestration',
        short_desc: 'Minor laceration of right carotid artery',
        left_days: 11,
        expire_date: '2021/09/04',
        status: ASIGNMENT_STATUS.NOT_SUBMITED,
      },
      {
        id: 20,
        title: 'Phased',
        short_desc: 'Major laceration of celiac artery',
        left_days: 3,
        expire_date: '2020/01/27',
        status: ASIGNMENT_STATUS.NOT_SUBMITED,
      },
    ],
  },
  {
    week_id: 8,
    asignments: [
      {
        id: 21,
        title: 'Triple-buffered',
        short_desc: 'Disp fx of prox phalanx of l lit fngr, 7thG',
        left_days: 17,
        expire_date: '2020/02/18',
        status: ASIGNMENT_STATUS.NOT_SUBMITED,
      },
      {
        id: 22,
        title: 'contingency',
        short_desc:
          'Mtrcy passenger injured in collision w unsp mv in traf, init',
        left_days: 11,
        expire_date: '2021/02/05',
        status: ASIGNMENT_STATUS.NOT_SUBMITED,
      },
      {
        id: 23,
        title: 'Implemented',
        short_desc:
          'Other dislocation of unspecified shoulder joint, subs encntr',
        left_days: 14,
        expire_date: '2021/10/12',
        status: ASIGNMENT_STATUS.NOT_SUBMITED,
      },
      {
        id: 24,
        title: 'throughput',
        short_desc: 'Driver of bus injured in collision w ped/anml in traf',
        left_days: 13,
        expire_date: '2020/06/18',
        status: ASIGNMENT_STATUS.NOT_SUBMITED,
      },
      {
        id: 25,
        title: 'functionalities',
        short_desc: 'Unspecified dislocation of right middle finger',
        left_days: 14,
        expire_date: '2020/04/20',
        status: ASIGNMENT_STATUS.NOT_SUBMITED,
      },
    ],
  },
  {
    week_id: 9,
    asignments: [
      {
        id: 26,
        title: 'firmware',
        short_desc: 'Activity, rugby',
        left_days: 4,
        expire_date: '2021/09/06',
        status: ASIGNMENT_STATUS.NOT_SUBMITED,
      },
      {
        id: 27,
        title: 'Virtual',
        short_desc:
          'Subluxation of unsp interphaln joint of r rng fngr, sequela',
        left_days: 8,
        expire_date: '2021/09/29',
        status: ASIGNMENT_STATUS.NOT_SUBMITED,
      },
    ],
  },
  {
    week_id: 10,
    asignments: [
      {
        id: 28,
        title: '24 hour',
        short_desc: 'Toxic effect of chloroform, undetermined',
        left_days: 15,
        expire_date: '2020/09/19',
        status: ASIGNMENT_STATUS.NOT_SUBMITED,
      },
      {
        id: 29,
        title: 'focus group',
        short_desc: 'Neoplasm of uncertain behavior of bladder',
        left_days: 6,
        expire_date: '2021/09/09',
        status: ASIGNMENT_STATUS.NOT_SUBMITED,
      },
      {
        id: 30,
        title: 'Mandatory',
        short_desc:
          'Subluxation of distal interphalangeal joint of right thumb',
        left_days: 10,
        expire_date: '2021/06/08',
        status: ASIGNMENT_STATUS.NOT_SUBMITED,
      },
    ],
  },
];
