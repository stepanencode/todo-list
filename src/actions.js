
import uuidv4 from "uuid";
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
  ADD_TODO: "ADD_TODO",
  DELETE_ITEM: "DELETE_ITEM",
  TOGGLE_ITEM_IMPORTANT: "TOGGLE_ITEM_IMPORTANT",
  SET_ITEM_COMPLETE: "SET_ITEM_COMPLETE",
  CLEAR_COMPLETED_ITEMS: "CLEAR_COMPLETED_ITEMS",
  SET_DUE_TODAY_ITEM: "SET_DUE_TODAY_ITEM",
  SET_DUE_TOMORROW_ITEM: "SET_DUE_TOMORROW_ITEM",
  UNSET_DUE_TODAY_ITEM: "UNSET_DUE_TODAY_ITEM",
  UNSET_DUE_TOMORROW_ITEM: "UNSET_DUE_TOMORROW_ITEM",
  SET_CHANGE_ITEM: "SET_CHANGE_ITEM",

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

// one argument - object
export function addTodo(item) {
  return {
    type: constants.ADD_TODO,
    text: item.text,
    isCompleted: item.isCompleted,
    isImportant: item.isImportant,
    uuid: uuidv4(),
    isDueToday: item.isDueToday,
    isDueTomorrow: item.isDueTomorrow
  }
}

export function deleteItem(uuid) {
  return { type: constants.DELETE_ITEM, uuid: uuid }
}

export function toggleItemImportant(uuid) {
  return { type: constants.TOGGLE_ITEM_IMPORTANT, uuid: uuid}
}

export function setItemComplete(uuid) {
  return { type: constants.SET_ITEM_COMPLETE, uuid: uuid}
}

export function clearCompletedItems() {
  return { type: constants.CLEAR_COMPLETED_ITEMS}
}

export function setDueTodayItem(uuid) {
  return { type: constants.SET_DUE_TODAY_ITEM, uuid: uuid}
}

export function setDueTomorrowItem(uuid) {
  return { type: constants.SET_DUE_TOMORROW_ITEM, uuid: uuid}
}

export function unsetDueTodayItem(uuid) {
  return { type: constants.UNSET_DUE_TODAY_ITEM, uuid: uuid}
}

export function unsetDueTomorrowItem(uuid) {
  return { type: constants.UNSET_DUE_TOMORROW_ITEM, uuid: uuid}
}

export function setChangeItem(uuid, text) {
  return { type: constants.SET_CHANGE_ITEM, uuid: uuid, text: text}
}


export default constants;
