import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/'

import { Tool } from '../utils/tool'

console.log(Tool)


export default function setApp(state = 0, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1
    case DECREMENT_COUNTER:
      return state - 1
    default:
      return state
  }
}
