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
    icon: 'mdi-emoticon-excited',
    color: '#009966',
    desc: 'GOOD_AIR_POLLUTION_DESCRIPTION'
  },
  MODERATE: {
    id: 1,
    label: 'MODERATE',
    icon: 'mdi-emoticon-happy',
    color: '#FFDE33',
    desc: 'MODERATE_AIR_POLLUTION_DESCRIPTION'
  },
  UNHEALTHY_SENSITIVE_GROUPS: {
    id: 2,
    label: 'UNHEALTHY_SENSITIVE_GROUPS',
    icon: 'mdi-emoticon-neutral',
    color: '#FF9933',
    desc: 'UNHEALTHY_SENSITIVE_GROUPS_AIR_POLLUTION_DESCRIPTION'
  },
  UNHEALTHY: {
    id: 3,
    label: 'UNHEALTHY',
    icon: 'mdi-emoticon-sad',
    color: '#CC0033',
    desc: 'UNHEALTHY_AIR_POLLUTION_DESCRIPTION'
  },
  VERY_UNHEALTHY: {
    id: 4,
    label: 'VERY_UNHEALTHY',
    icon: 'mdi-emoticon-angry',
    color: '#CC0033',
    desc: 'VERY_UNHEALTHY_AIR_POLLUTION_DESCRIPTION'
  },
  VERY_UNHEALTHYY: {
    id: 5,
    label: 'VERY_UNHEALTHYY',
    icon: 'mdi-emoticon-angry',
    color: '#660099',
    desc: 'VERY_UNHEALTHY_AIR_POLLUTION_DESCRIPTION'
  },
  HAZARDOUS: {
    id: 6,
    label: 'HAZARDOUS',
    icon: 'mdi-emoticon-dead',
    color: '#7E0023',
    desc: 'HAZARDOUS_AIR_POLLUTION_DESCRIPTION'
  },
  EMPTY: {
    id: 7,
    label: 'EMPTY',
    icon: 'mdi-',
    color: '#',
    desc: ''
  }
}

export {
  APL,
  APLDescription
}