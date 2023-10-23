const storedUser = localStorage.getItem('userData');
const initialState = {
    user: storedUser ? JSON.parse(storedUser) : null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            localStorage.setItem('userData', JSON.stringify(action.payload));
            return {
                ...state,
                user: action.payload,
            };
        case 'LOGOUT_USER':
            localStorage.removeItem('userData');
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};

export default userReducer;
