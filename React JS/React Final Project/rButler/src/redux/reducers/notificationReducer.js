const initialState = {
    notification: '',
    severity: '',
    open: false,
};

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return {
                ...state,
                notification: action.payload.notification,
                severity: action.payload.severity,
                open: action.payload.open,
            };
        case 'SET_NOTIFICATION_OPEN':
            return {
                ...state,
                open: action.payload,
            };
        default:
            return state;
    }
};

export default notificationReducer;
