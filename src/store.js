import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"
import rootReducers from "./reducers/index"
import thunk from "redux-thunk"
const middleware = [thunk]
const store = createStore(rootReducers, composeWithDevTools())
export default store