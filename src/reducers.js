import constants from './actions'
import { combineReducers } from 'redux'
import uuidv4 from "uuid";


export const completedFilter = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  DONE: 'DONE'
}


const initialState = {
  isFilterDueTomorrow: false,
  isFilterDueToday: false,
  isFilterImportant: false,
  isPlayRelaxAudio: false,
  isWelldoneMessageVisible: false,
  filterCompletedTerm: completedFilter.ALL,
  term: '',
  items: [],

}


export const rootReducer = (state=initialState, action) => {
   switch (action.type) {
      case constants.SET_FILTER_DUE_TOMORROW:
        return Object.assign({}, state, {
          isFilterDueTomorrow: true
        })
      case constants.UNSET_FILTER_DUE_TOMORROW:
        return Object.assign({}, state, {
          isFilterDueTomorrow: false
        })
      case constants.SET_FILTER_DUE_TODAY:
        return Object.assign({}, state, {
          isFilterDueToday: true
        })
      case constants.UNSET_FILTER_DUE_TODAY:
       return Object.assign({}, state, {
         isFilterDueToday: false
       })
      case constants.SET_FILTER_IMPORTANT:
        return Object.assign({}, state, {
          isFilterImportant: true
        })
      case constants.UNSET_FILTER_IMPORTANT:
        return Object.assign({}, state, {
          isFilterImportant: false
        })
      case constants.TOGGLE_RELAX_BUTTON:
        return Object.assign({}, state, {
          isPlayRelaxAudio: !state.isPlayRelaxAudio
        })
      case constants.VISIBLE_WELLDONE_MESSAGE:
        return Object.assign({}, state, {
          isWelldoneMessageVisible: true
        })
      case constants.UNVISIBLE_WELLDONE_MESSAGE:
        return Object.assign({}, state, {
          isWelldoneMessageVisible: false
        })
      case constants.FILTER_COMPLETED_ALL:
        return Object.assign({}, state, {
          filterCompletedTerm: completedFilter.ALL
        })
      case constants.FILTER_COMPLETED_ACTIVE:
        return Object.assign({}, state, {
          filterCompletedTerm: completedFilter.ACTIVE
        })
      case constants.FILTER_COMPLETED_DONE:
        return Object.assign({}, state, {
          filterCompletedTerm: completedFilter.DONE
        })
      case constants.SET_TERM:
        return Object.assign({}, state, {
          term: action.term
        })
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
        })
        case constants.DELETE_ITEM:
          return Object.assign({}, state, {
          items: [
            ...state.items.filter(item => item.uuid !== action.uuid)
          ]
        })
        // case constants.SET_ITEM_IMPORTANT:
        // return Object.assign({}, state, {
        //   items: [
        //     ...state.items.filter(item => (item.uuid === action.uuid) ? (item.isImportant = !item.isImportant) : {})
        //   ]
        // })
        // case constants.SET_ITEM_IMPORTANT:
        // return Object.assign({}, state, {
        //   items: [
        //     ...state.items.map(item =>{for (item of state.items){ (item.uuid === action.uuid) ?  { ...state.items, isImportant: action.isImportant} : item}})
        //   ]
        // })
        // case constants.SET_ITEM_IMPORTANT:
        // let items = state.items.slice();
        //   for (let item of items) {
        //     if (item.uuid === action.uuid) {
        //       item.isImportant = !item.isImportant;
        //     }
        //   }
        // return Object.assign({}, state, {
        //   items: items
        // })
        case constants.TOGGLE_ITEM_IMPORTANT:
        return Object.assign({}, state, {
          items: state.items.map(item => {return (item.uuid === action.uuid) ? {...item, isImportant: !item.isImportant } : item })
        })

        // case constants.SET_ITEM_COMPLETE:
        //  let items = state.items.slice();
        //   for (let item of items) {
        //     if (item.uuid === action.uuid) {
        //       item.isCompleted = true;
        //     }
        //   }
        //   return Object.assign({}, state, {
        //     items: items,
        //      // isWelldoneMessageVisible: this.isWellDone()
        //   })

          case constants.SET_ITEM_COMPLETE:
          return Object.assign({}, state, {
            items: state.items.map(item => {return (item.uuid === action.uuid) ? {...item, isCompleted: true } : item }) //isWellDone добавить
          })

          case constants.CLEAR_COMPLETED_ITEMS:
          return Object.assign({}, state, {
            items : [
               ...state.items.filter(item => item.isCompleted === false)
            ]
          })

          // case constants.SET_DUE_TODAY_ITEM:
          //   let items = state.items.slice();
          //   for (let item of items) {
          //     if (item.uuid === action.uuid) {
          //       item.isDueToday = true;
          //       item.isDueTomorrow = false;
          //     }
          //   }
          //   return Object.assign({}, state, {
          //     items: items
          //   })

            case constants.SET_DUE_TODAY_ITEM:
            return Object.assign({}, state, {
              items: state.items.map(item => {return (item.uuid === action.uuid) ? {...item, isDueToday: true, isDueTomorrow: false } : item })
            })

            case constants.SET_DUE_TOMORROW_ITEM:
            return Object.assign({}, state, {
              items: state.items.map(item => {return (item.uuid === action.uuid) ? {...item, isDueToday: false, isDueTomorrow: true } : item })
            })

            case constants.UNSET_DUE_TODAY_ITEM:
            return Object.assign({}, state, {
              items: state.items.map(item => {return (item.uuid === action.uuid) ? {...item, isDueToday: false } : item })
            })
            case constants.UNSET_DUE_TOMORROW_ITEM:
            return Object.assign({}, state, {
              items: state.items.map(item => {return (item.uuid === action.uuid) ? {...item, isDueTomorrow: false } : item })
            })



       default:
   return state
 }
}




// this.setState((prevState) => {
//   let items = prevState["items"].slice();
//   for (let item of items) {
//     if (item.uuid === uuid) {
//       item.isImportant = !item.isImportant;
//     }
//   }
//   return {items: items};
// });
