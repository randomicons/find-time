//@flow
import {applyMiddleware, createStore} from "redux"
import rootReducer from "../reducers"
import {logger} from "../middleware"
import thunk from "redux-thunk"

// const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || compose
const store = createStore(rootReducer,
  applyMiddleware(logger, thunk))
export default store