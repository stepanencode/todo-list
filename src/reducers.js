import constants from './actions'

const initialState = {
  isFilterDueTomorrow: false
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
       default:
   return state
 }
}

export default rootReducer
