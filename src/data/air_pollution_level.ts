enum APL {
  GOOD,
  MODERATE,
  UNHEALTHY_SENSITIVE_GROUPS,
  UNHEALTHY,
  VERY_UNHEALTHY,
  VERY_UNHEALTHYY,
  HAZARDOUS
}

const APLDescription = {
  GOOD: {
    id: 0,
    label: 'GOOD',
    color: '#',
    desc: 'GOOD_AIR_POLLUTION_DESCRIPTION'
  },
  MODERATE: {
    id: 1,
    label: 'MODERATE',
    color: '#',
    desc: 'MODERATE_AIR_POLLUTION_DESCRIPTION'
  },
  UNHEALTHY_SENSITIVE_GROUPS: {
    id: 2,
    label: 'UNHEALTHY_SENSITIVE_GROUPS',
    color: '#',
    desc: 'UNHEALTHY_SENSITIVE_GROUPS_AIR_POLLUTION_DESCRIPTION'
  },
  UNHEALTHY: {
    id: 3,
    label: 'UNHEALTHY',
    color: '#',
    desc: 'UNHEALTHY_AIR_POLLUTION_DESCRIPTION'
  },
  VERY_UNHEALTHY: {
    id: 4,
    label: 'VERY_UNHEALTHY',
    color: '#',
    desc: 'VERY_UNHEALTHY_AIR_POLLUTION_DESCRIPTION'
  },
  VERY_UNHEALTHYy: {
    id: 5,
    label: 'VERY_UNHEALTHYY',
    color: '#',
    desc: 'VERY_UNHEALTHY_AIR_POLLUTION_DESCRIPTION'
  },
  HAZARDOUS: {
    id: 6,
    label: 'HAZARDOUS',
    color: '#',
    desc: 'HAZARDOUS_AIR_POLLUTION_DESCRIPTION'
  },
  EMPTY: {
    id: 7,
    label: 'EMPTY',
    color: '#',
    desc: 'EMPTY_AIR_POLLUTION_DESCRIPTION'
  }
}

export {
  APL,
  APLDescription
}