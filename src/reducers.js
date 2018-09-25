import constants from './actions'
import { combineReducers } from 'redux'


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
       default:
   return state
 }
}
