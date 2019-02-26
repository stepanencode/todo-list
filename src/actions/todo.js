
// Action types

export const FETCH_TODO_BEGIN = "FETCH_TODO_BEGIN";
export const FETCH_TODO_SUCCESS = "FETCH_TODO_SUCCESS";
export const FETCH_TODO_FAILURE = "FETCH_TODO_FAILURE";
export const DELETE_TODO_BEGIN = "DELETE_TODO_BEGIN";
export const DELETE_TODO_SUCCESS = "DELETE_TODO_SUCCESS";
export const DELETE_TODO_FAILURE = "DELETE_TODO_FAILURE";
export const CREATE_TODO_BEGIN = "CREATE_TODO_BEGIN";
export const CREATE_TODO_SUCCESS = "CREATE_TODO_SUCCESS";
export const CREATE_TODO_FAILURE = "CREATE_TODO_FAILURE";
export const EDIT_TODO_BEGIN = "EDIT_TODO_BEGIN";
export const EDIT_TODO_SUCCESS = "EDIT_TODO_SUCCESS";
export const EDIT_TODO_FAILURE = "EDIT_TODO_FAILURE";

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

export function createTodoBegin(item) {
  return { type: CREATE_TODO_BEGIN, item: item };
}

export function createTodoSuccess(item) {
  return { type: CREATE_TODO_SUCCESS, item: item };
}

export function createTodoFailure(error) {
  return { type: CREATE_TODO_FAILURE, error: error };
}

export function editTodoBegin(id, item) {
  return { type: EDIT_TODO_BEGIN, id: id, item: item };
}

export function editTodoSuccess(id, item) {
  return { type: EDIT_TODO_SUCCESS, id: id, item: item };
}

export function editTodoFailure(error) {
  return { type: EDIT_TODO_FAILURE, error: error };
}

export function setChangeItem(id, text) {
  return editTodoBegin(id, {text: text});
}


export function setItemComplete(id) {
  return editTodoBegin(id, {isCompleted: true});
}

export function toggleItemImportant(id, item) {
  return editTodoBegin(id, {isImportant: !item.isImportant});
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
