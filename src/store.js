import { applyMiddleware, compose, createStore } from "redux"
import reducers from "./store/reducers"
import thunk from "redux-thunk"

let composeEnhancers = ""

if (typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
} else {
  composeEnhancers = compose
}

const enhancer = composeEnhancers(applyMiddleware(thunk))

const store = createStore(reducers, enhancer)

export default store
