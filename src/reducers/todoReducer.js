import {
  FETCH_TODO_SUCCESS,
  SET_FILTER_DUE_TOMORROW,
  UNSET_FILTER_DUE_TOMORROW,
  SET_FILTER_DUE_TODAY,
  UNSET_FILTER_DUE_TODAY,
  SET_FILTER_IMPORTANT,
  UNSET_FILTER_IMPORTANT,
  TOGGLE_RELAX_BUTTON,
  LOGIN_FORM_FILLING_EMAIL,
  LOGIN_FORM_FILLING_PASSWORD,
  VISIBLE_WELLDONE_MESSAGE,
  UNVISIBLE_WELLDONE_MESSAGE,
  FILTER_COMPLETED_ALL,
  FILTER_COMPLETED_ACTIVE,
  FILTER_COMPLETED_DONE,
  SET_TERM,
  ADD_TODO,
  DELETE_ITEM,
  TOGGLE_ITEM_IMPORTANT,
  SET_ITEM_COMPLETE,
  CLEAR_COMPLETED_ITEMS,
  SET_DUE_TODAY_ITEM,
  SET_DUE_TOMORROW_ITEM,
  UNSET_DUE_TODAY_ITEM,
  UNSET_DUE_TOMORROW_ITEM,
  SET_CHANGE_ITEM
} from "../actions/todo";

export const completedFilter = {
  ALL: "ALL",
  ACTIVE: "ACTIVE",
  DONE: "DONE"
};


const initialState = {
  isFilterDueTomorrow: false,
  isFilterDueToday: false,
  isFilterImportant: false,
  isPlayRelaxAudio: false,
  isWelldoneMessageVisible: false,
  filterCompletedTerm: completedFilter.ALL,
  term: "",
  items: [],
  // email: "ddd@uuu.ppp",
  // password: "kkkkkk",
  // emailSignUp: "ddd@uuu.pp",
  // passwordSignUp: "wwwwwwww",
  // userNameSignUp : "Joe"
};


export const todoReducer = (state=initialState, action) => {
  switch (action.type) {
  case FETCH_TODO_SUCCESS:
    return Object.assign({}, state, {
      items: action.message
    });
  case SET_FILTER_DUE_TOMORROW:
    return Object.assign({}, state, {
      isFilterDueTomorrow: true
    });
  case UNSET_FILTER_DUE_TOMORROW:
    return Object.assign({}, state, {
      isFilterDueTomorrow: false
    });
  case SET_FILTER_DUE_TODAY:
    return Object.assign({}, state, {
      isFilterDueToday: true
    });
  case UNSET_FILTER_DUE_TODAY:
    return Object.assign({}, state, {
      isFilterDueToday: false
    });
  case SET_FILTER_IMPORTANT:
    return Object.assign({}, state, {
      isFilterImportant: true
    });
  case UNSET_FILTER_IMPORTANT:
    return Object.assign({}, state, {
      isFilterImportant: false
    });
  case TOGGLE_RELAX_BUTTON:
    return Object.assign({}, state, {
      isPlayRelaxAudio: !state.isPlayRelaxAudio
    });
  case LOGIN_FORM_FILLING_EMAIL:
    return Object.assign({}, state, {
      email: action.payload
    });
    case LOGIN_FORM_FILLING_PASSWORD:
      return Object.assign({}, state, {
        password: action.payload
      });

  case VISIBLE_WELLDONE_MESSAGE:
    return Object.assign({}, state, {
      isWelldoneMessageVisible: true
    });
  case UNVISIBLE_WELLDONE_MESSAGE:
    return Object.assign({}, state, {
      isWelldoneMessageVisible: false
    });
  case FILTER_COMPLETED_ALL:
    return Object.assign({}, state, {
      filterCompletedTerm: completedFilter.ALL
    });
  case FILTER_COMPLETED_ACTIVE:
    return Object.assign({}, state, {
      filterCompletedTerm: completedFilter.ACTIVE
    });
  case FILTER_COMPLETED_DONE:
    return Object.assign({}, state, {
      filterCompletedTerm: completedFilter.DONE
    });
  case SET_TERM:
    return Object.assign({}, state, {
      term: action.term
    });
  case ADD_TODO:
    return Object.assign({}, state, {
      items: [
        ...state.items,
        {
          text: action.text,
          isCompleted: action.isCompleted,
          isImportant: action.isImportant,
          uuid: action.uuid,
          isDueToday: action.isDueToday,
          isDueTomorrow: action.isDueTomorrow
        }
      ]
    });
  case DELETE_ITEM:
    return Object.assign({}, state, {
      items: [
        ...state.items.filter(item => item.uuid !== action.uuid)
      ]
    });
  case TOGGLE_ITEM_IMPORTANT:
    return Object.assign({}, state, {
      items: state.items.map(item => {return (item.uuid === action.uuid) ? {...item, isImportant: !item.isImportant } : item; })
    });
  case SET_ITEM_COMPLETE:
    return Object.assign({}, state, {
      items: state.items.map(item => {return (item.uuid === action.uuid) ? {...item, isCompleted: true } : item; })
    });
  case CLEAR_COMPLETED_ITEMS:
    return Object.assign({}, state, {
      items : [
        ...state.items.filter(item => item.isCompleted === false)
      ]
    });
  case SET_DUE_TODAY_ITEM:
    return Object.assign({}, state, {
      items: state.items.map(item => {return (item.uuid === action.uuid) ? {...item, isDueToday: true, isDueTomorrow: false } : item; })
    });
  case SET_DUE_TOMORROW_ITEM:
    return Object.assign({}, state, {
      items: state.items.map(item => {return (item.uuid === action.uuid) ? {...item, isDueToday: false, isDueTomorrow: true } : item; })
    });
  case UNSET_DUE_TODAY_ITEM:
    return Object.assign({}, state, {
      items: state.items.map(item => {return (item.uuid === action.uuid) ? {...item, isDueToday: false } : item; })
    });
  case UNSET_DUE_TOMORROW_ITEM:
    return Object.assign({}, state, {
      items: state.items.map(item => {return (item.uuid === action.uuid) ? {...item, isDueTomorrow: false } : item; })
    });
  case SET_CHANGE_ITEM:
    return Object.assign({}, state, {
      items: state.items.map(item => {return (item.uuid === action.uuid) ? {...item, text: action.text } : item; })
    });
  default:
    return state;
  }
};

export default todoReducer;
