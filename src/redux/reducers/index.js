import { combineReducers } from 'redux'

function allShop(state=[],action){
  switch (action.type) {
    case 'ALLSHOP':
      return action.allshop
    default:
      return state
  }
}
function Cats(state=[],action){
  switch (action.type) {
    case 'GETCATS':
      return action.getCats
    case 'ADDCAT':
      return [...state,action.addCat]
    default:
      return state
  }
}
function navlist(state=[],action){
  switch (action.type) {
    case 'NAVLIST':
      return action.navlist
    default:
      return state
  }
}
const rootReducer = combineReducers({
  allShop,
  Cats,
  navlist
})
export default rootReducer
