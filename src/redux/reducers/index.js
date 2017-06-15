import { combineReducers } from 'redux'

function allShop(state=[],action){
  switch (action.type) {
    case 'ALLSHOP':
      return action.allshop
    default:
      return state
  }
}

const rootReducer = combineReducers({
  allShop
})
export default rootReducer
