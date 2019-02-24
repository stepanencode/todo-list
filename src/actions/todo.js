
import uuidv4 from "uuid";
// Action types

export const FETCH_TODO_BEGIN = "FETCH_TODO_BEGIN";
export const FETCH_TODO_SUCCESS = "FETCH_TODO_SUCCESS";
export const FETCH_TODO_FAILURE = "FETCH_TODO_FAILURE";
export const DELETE_TODO_BEGIN = "DELETE_TODO_BEGIN";
export const DELETE_TODO_SUCCESS = "DELETE_TODO_SUCCESS";
export const DELETE_TODO_FAILURE = "DELETE_TODO_FAILURE";

export const SET_FILTER_DUE_TOMORROW = "SET_FILTER_DUE_TOMORROW";
export const UNSET_FILTER_DUE_TOMORROW = "UNSET_FILTER_DUE_TOMORROW";
export const SET_FILTER_DUE_TODAY = "SET_FILTER_DUE_TODAY";
export const UNSET_FILTER_DUE_TODAY = "UNSET_FILTER_DUE_TODAY";
export const SET_FILTER_IMPORTANT = "SET_FILTER_IMPORTANT";
export const UNSET_FILTER_IMPORTANT = "UNSET_FILTER_IMPORTANT";
export const TOGGLE_RELAX_BUTTON = "TOGGLE_RELAX_BUTTON";
export const VISIBLE_WELLDONE_MESSAGE = "VISIBLE_WELLDONE_MESSAGE";
export const UNVISIBLE_WELLDONE_MESSAGE = "UNVISIBLE_WELLDONE_MESSAGE";
export const FILTER_COMPLETED_ALL = "FILTER_COMPLETED_ALL";
export const FILTER_COMPLETED_ACTIVE = "FILTER_COMPLETED_ACTIVE";
export const FILTER_COMPLETED_DONE = "FILTER_COMPLETED_DONE";
export const SET_TERM = "SET_TERM";
export const ADD_TODO = "ADD_TODO";
export const TOGGLE_ITEM_IMPORTANT = "TOGGLE_ITEM_IMPORTANT";
export const SET_ITEM_COMPLETE = "SET_ITEM_COMPLETE";
export const CLEAR_COMPLETED_ITEMS = "CLEAR_COMPLETED_ITEMS";
export const SET_DUE_TODAY_ITEM = "SET_DUE_TODAY_ITEM";
export const SET_DUE_TOMORROW_ITEM = "SET_DUE_TOMORROW_ITEM";
export const UNSET_DUE_TODAY_ITEM = "UNSET_DUE_TODAY_ITEM";
export const UNSET_DUE_TOMORROW_ITEM = "UNSET_DUE_TOMORROW_ITEM";
export const SET_CHANGE_ITEM = "SET_CHANGE_ITEM";
export const LOGIN_FORM_FILLING_EMAIL = "LOGIN_FORM_FILLING_EMAIL";
export const LOGIN_FORM_FILLING_PASSWORD = "LOGIN_FORM_FILLING_PASSWORD";


// Action creators
export function fetchTodoBegin() {
  return { type: FETCH_TODO_BEGIN };
}

export function fetchTodoSuccess(message) {
  return { type: FETCH_TODO_SUCCESS, message: message };
}

export function fetchTodoFailure(error) {
  return { type: FETCH_TODO_FAILURE, error: error };
}

export function deleteTodoBegin(id) {
  return { type: DELETE_TODO_BEGIN, id: id };
}

export function deleteTodoSuccess(id) {
  return { type: DELETE_TODO_SUCCESS, id: id };
}

export function deleteTodoFailure(error) {
  return { type: DELETE_TODO_FAILURE, error: error };
}

export function setFilterDueTomorrow() {
  return { type: SET_FILTER_DUE_TOMORROW };
}

export function unsetFilterDueTomorrow() {
  return { type: UNSET_FILTER_DUE_TOMORROW };
}

export function setFilterDueToday() {
  return { type: SET_FILTER_DUE_TODAY };
}

export function unsetFilterDueToday() {
  return { type: UNSET_FILTER_DUE_TODAY };
}

export function setFilterImportant() {
  return { type: SET_FILTER_IMPORTANT };
}

export function unsetFilterImportant() {
  return { type: UNSET_FILTER_IMPORTANT };
}

export function toggleRelaxButton() {
  return { type: TOGGLE_RELAX_BUTTON };
}

export function loginFormFillingEmail(email) {
  return {
    type: LOGIN_FORM_FILLING_EMAIL,
    payload: email
   };
}
export function loginFormFillingPassword(password) {
  return {
    type: LOGIN_FORM_FILLING_PASSWORD,
    payload: password
   };
}

export function visibleWelldoneMessage() {
  return { type: VISIBLE_WELLDONE_MESSAGE };
}

export function unvisibleWelldoneMessage() {
  return { type: UNVISIBLE_WELLDONE_MESSAGE };
}

export function filterCompletedAll() {
  return { type: FILTER_COMPLETED_ALL };
}

export function filterCompletedActive() {
  return { type: FILTER_COMPLETED_ACTIVE };
}

export function filterCompletedDone() {
  return { type: FILTER_COMPLETED_DONE };
}

export function setTerm(term) {
  return { type: SET_TERM, term: term };
}

// one argument - object
export function addTodo(item) {
  return {
    type: ADD_TODO,
    text: item.text,
    isCompleted: item.isCompleted,
    isImportant: item.isImportant,
    uuid: uuidv4(),
    isDueToday: item.isDueToday,
    isDueTomorrow: item.isDueTomorrow
  };
}

export function toggleItemImportant(uuid) {
  return { type: TOGGLE_ITEM_IMPORTANT, uuid: uuid};
}

export function setItemComplete(uuid) {
  return { type: SET_ITEM_COMPLETE, uuid: uuid};
}

export function clearCompletedItems() {
  return { type: CLEAR_COMPLETED_ITEMS};
}

export function setDueTodayItem(uuid) {
  return { type: SET_DUE_TODAY_ITEM, uuid: uuid};
}

export function setDueTomorrowItem(uuid) {
  return { type: SET_DUE_TOMORROW_ITEM, uuid: uuid};
}

export function unsetDueTodayItem(uuid) {
  return { type: UNSET_DUE_TODAY_ITEM, uuid: uuid};
}

export function unsetDueTomorrowItem(uuid) {
  return { type: UNSET_DUE_TOMORROW_ITEM, uuid: uuid};
}

export function setChangeItem(uuid, text) {
  return { type: SET_CHANGE_ITEM, uuid: uuid, text: text};
}
