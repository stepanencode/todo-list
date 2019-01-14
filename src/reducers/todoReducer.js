import constants from "../actions";
// import { combineReducers } from 'redux';
// import uuidv4 from "uuid";


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
  case constants.SET_FILTER_DUE_TOMORROW:
    return Object.assign({}, state, {
      isFilterDueTomorrow: true
    });
  case constants.UNSET_FILTER_DUE_TOMORROW:
    return Object.assign({}, state, {
      isFilterDueTomorrow: false
    });
  case constants.SET_FILTER_DUE_TODAY:
    return Object.assign({}, state, {
      isFilterDueToday: true
    });
  case constants.UNSET_FILTER_DUE_TODAY:
    return Object.assign({}, state, {
      isFilterDueToday: false
    });
  case constants.SET_FILTER_IMPORTANT:
    return Object.assign({}, state, {
      isFilterImportant: true
    });
  case constants.UNSET_FILTER_IMPORTANT:
    return Object.assign({}, state, {
      isFilterImportant: false
    });
  case constants.TOGGLE_RELAX_BUTTON:
    return Object.assign({}, state, {
      isPlayRelaxAudio: !state.isPlayRelaxAudio
    });
  case constants.LOGIN_FORM_FILLING_EMAIL:
    return Object.assign({}, state, {
      email: action.payload
    });
    case constants.LOGIN_FORM_FILLING_PASSWORD:
      return Object.assign({}, state, {
        password: action.payload
      });

  case constants.VISIBLE_WELLDONE_MESSAGE:
    return Object.assign({}, state, {
      isWelldoneMessageVisible: true
    });
  case constants.UNVISIBLE_WELLDONE_MESSAGE:
    return Object.assign({}, state, {
      isWelldoneMessageVisible: false
    });
  case constants.FILTER_COMPLETED_ALL:
    return Object.assign({}, state, {
      filterCompletedTerm: completedFilter.ALL
    });
  case constants.FILTER_COMPLETED_ACTIVE:
    return Object.assign({}, state, {
      filterCompletedTerm: completedFilter.ACTIVE
    });
  case constants.FILTER_COMPLETED_DONE:
    return Object.assign({}, state, {
      filterCompletedTerm: completedFilter.DONE
    });
  case constants.SET_TERM:
    return Object.assign({}, state, {
      term: action.term
    });
  case constants.ADD_TODO:
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
  case constants.DELETE_ITEM:
    return Object.assign({}, state, {
      items: [
        ...state.items.filter(item => item.uuid !== action.uuid)
      ]
    });
  case constants.TOGGLE_ITEM_IMPORTANT:
    return Object.assign({}, state, {
      items: state.items.map(item => {return (item.uuid === action.uuid) ? {...item, isImportant: !item.isImportant } : item; })
    });
  case constants.SET_ITEM_COMPLETE:
    return Object.assign({}, state, {
      items: state.items.map(item => {return (item.uuid === action.uuid) ? {...item, isCompleted: true } : item; })
    });
  case constants.CLEAR_COMPLETED_ITEMS:
    return Object.assign({}, state, {
      items : [
        ...state.items.filter(item => item.isCompleted === false)
      ]
    });
  case constants.SET_DUE_TODAY_ITEM:
    return Object.assign({}, state, {
      items: state.items.map(item => {return (item.uuid === action.uuid) ? {...item, isDueToday: true, isDueTomorrow: false } : item; })
    });
  case constants.SET_DUE_TOMORROW_ITEM:
    return Object.assign({}, state, {
      items: state.items.map(item => {return (item.uuid === action.uuid) ? {...item, isDueToday: false, isDueTomorrow: true } : item; })
    });
  case constants.UNSET_DUE_TODAY_ITEM:
    return Object.assign({}, state, {
      items: state.items.map(item => {return (item.uuid === action.uuid) ? {...item, isDueToday: false } : item; })
    });
  case constants.UNSET_DUE_TOMORROW_ITEM:
    return Object.assign({}, state, {
      items: state.items.map(item => {return (item.uuid === action.uuid) ? {...item, isDueTomorrow: false } : item; })
    });
  case constants.SET_CHANGE_ITEM:
    return Object.assign({}, state, {
      items: state.items.map(item => {return (item.uuid === action.uuid) ? {...item, text: action.text } : item; })
    });
  default:
    return state;
  }
};

export default todoReducer;
