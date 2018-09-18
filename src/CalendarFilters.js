// import { connect } from 'react-redux'
// import { setCalendarFilter } from './actions'
//
//
//
// const getCalendarTodos = (items, filter) => {
//   switch (filter) {
//     case 'NOT_FILTER_DUE_TODAY':
//       return items.filter((item) => item.isDueToday === false && item.isDueTomorrow === false)
//     case 'FILTER_DUE_TODAY':
//       return items.filter((item) => item.isDueToday === true && item.isDueTomorrow === false)
//     case 'SHOW_ACTIVE':
//       return items.filter((item) => item.isDueTomorrow === true && item.isDueToday === false)
//   }
// }
//
// const mapStateToProps = (state) => {
//   return {
//     items: getCalendarTodos(state.items, state.calendarFilters)
//   }
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     onTodoClick: (filter) => {
//       dispatch(setCalendarFilter(filter))
//     }
//   }
// }
//
// const CalendarFilters = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )()
//
// export default CalendarFilters
