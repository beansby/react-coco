import {configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage/session';
import {persistReducer} from 'redux-persist';

const persistConfig = {
    key : 'root',
    storage,
}

function AuthReducer(currentState, action){
    if(currentState === undefined){
        return({
            Authorization:'',
            MemberId:'',
            // MemberInfo:{}
        })
    }

    const newState = {...currentState};
    switch(action.type){
        case "TOKEN" : newState.Authorization = action.data;
        break;
        case "MEMBERID" : newState.MemberId = action.data;
        break;
        // case "MEMBERINFO" : newState.MemberInfo = action.data;
    }
    return newState;
}

const persistedReducer = persistReducer(persistConfig, AuthReducer);

const store = configureStore({
    reducer : persistedReducer,
})

export default store;