
// Action types

const constants = {
  SET_FILTER_DUE_TOMORROW: 'SET_FILTER_DUE_TOMORROW',
  UNSET_FILTER_DUE_TOMORROW: 'UNSET_FILTER_DUE_TOMORROW',
  SET_FILTER_DUE_TODAY: 'SET_FILTER_DUE_TODAY',
  UNSET_FILTER_DUE_TODAY: 'UNSET_FILTER_DUE_TODAY',
  SET_FILTER_IMPORTANT: 'SET_FILTER_IMPORTANT',
  UNSET_FILTER_IMPORTANT: 'UNSET_FILTER_IMPORTANT',
  TOGGLE_RELAX_BUTTON: 'TOGGLE_RELAX_BUTTON',
  VISIBLE_WELLDONE_MESSAGE: "VISIBLE_WELLDONE_MESSAGE",
  UNVISIBLE_WELLDONE_MESSAGE: "UNVISIBLE_WELLDONE_MESSAGE",
  FILTER_COMPLETED_ALL: "FILTER_COMPLETED_ALL",
  FILTER_COMPLETED_ACTIVE: "FILTER_COMPLETED_ACTIVE",
  FILTER_COMPLETED_DONE: "FILTER_COMPLETED_DONE",
  SET_TERM: "SET_TERM",
}
// Action creators
export function setFilterDueTomorrow() {
  return { type: constants.SET_FILTER_DUE_TOMORROW }
}

export function unsetFilterDueTomorrow() {
  return { type: constants.UNSET_FILTER_DUE_TOMORROW }
}

export function setFilterDueToday() {
  return { type: constants.SET_FILTER_DUE_TODAY }
}

export function unsetFilterDueToday() {
  return { type: constants.UNSET_FILTER_DUE_TODAY }
}

export function setFilterImportant() {
  return { type: constants.SET_FILTER_IMPORTANT }
}

export function unsetFilterImportant() {
  return { type: constants.UNSET_FILTER_IMPORTANT }
}

export function toggleRelaxButton() {
  return { type: constants.TOGGLE_RELAX_BUTTON }
}

export function visibleWelldoneMessage() {
  return { type: constants.VISIBLE_WELLDONE_MESSAGE }
}

export function unvisibleWelldoneMessage() {
  return { type: constants.UNVISIBLE_WELLDONE_MESSAGE }
}

export function filterCompletedAll() {
  return { type: constants.FILTER_COMPLETED_ALL }
}

export function filterCompletedActive() {
  return { type: constants.FILTER_COMPLETED_ACTIVE }
}

export function filterCompletedDone() {
  return { type: constants.FILTER_COMPLETED_DONE }
}

export function setTerm(term) {
  return { type: constants.SET_TERM, term: term }
}


export default constants;
