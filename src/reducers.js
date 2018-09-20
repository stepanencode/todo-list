import constants from './actions'
import { combineReducers } from 'redux'


const initialState = {
  isFilterDueTomorrow: false,
  isFilterDueToday: false,
  isFilterImportant: false,
  isPlayRelaxAudio: false
}


const rootReducer = (state=initialState, action) => {
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
       default:
   return state
 }
}
// //
// const filterDueTodayReducer = (state=initialState, action) => {
//   switch (action.type) {
//      case constants.SET_FILTER_DUE_TODAY:
//        return Object.assign({}, state, {
//          isFilterDueToday: true
//        })
//      case constants.UNSET_FILTER_DUE_TODAY:
//        return Object.assign({}, state, {
//          isFilterDueToday: false
//        })
//        default:
//    return state
//  }
// }

// const rootReducer = combineReducers({
//   filterDueTomorrowReducer
//
// })




export default rootReducer
