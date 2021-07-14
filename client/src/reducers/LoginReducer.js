const LoginReducer = (init = {
    username: null,
    token: null,
    email: null,
    data: {},
}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...init,
                username: action.payload.username,
                email: action.payload.email,
                token: action.payload.token,
            }
        case 'LOGOUT':
            return {
                ...init,
                token: null
            }
        default: return init
    }
}
export default LoginReducer;