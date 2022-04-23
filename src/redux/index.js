import { combineReducers } from 'redux';

import userReducer from "./reducers/user.reducer";
import authReducers from "./reducers/auth.reducer";

const reducers = {
    userReducer,
    authReducers
};

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {
    if (action.type === 'DELETE_ACCOUNT' || action.type === 'USER_LOGOUT') {
        state = undefined;
    }
    return appReducer(state, action);
}

export default rootReducer;
