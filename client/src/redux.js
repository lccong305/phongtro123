import rootReducer from "./store/reducers/rootReducer";
import { persistStore } from "redux-persist";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk"

const reduxStore = () => {
    const store = createStore(rootReducer,applyMiddleware(thunk)); // hom sau se them middleware o day 
    const persistor = persistStore(store);

    return {store, persistor}
}
export default reduxStore;