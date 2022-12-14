
// 로그인 전
const AuthInitialState = {
    token: null
}

// 로그인 : setToken 호출
export const setToken = (token) => ({
    type: "SET_TOKEN",
    token
})

export const AuthReducer = (state = AuthInitialState, action) => {
    switch (action.type) {
        case "SET_TOKEN" :
            return {
                ...state,
                token: action.token
            }
        default:
            return state;
    }
}