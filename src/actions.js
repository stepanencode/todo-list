// Action types
const constants = {
  SET_FILTER_DUE_TOMORROW: 'SET_FILTER_DUE_TOMORROW',
  UNSET_FILTER_DUE_TOMORROW: 'UNSET_FILTER_DUE_TOMORROW'
}
// Action creators
export function setFilterDueTomorrow() {
  return { type: constants.SET_FILTER_DUE_TOMORROW }
}

export function unsetFilterDueTomorrow() {
  return { type: constants.UNSET_FILTER_DUE_TOMORROW }
}

export default constants;
