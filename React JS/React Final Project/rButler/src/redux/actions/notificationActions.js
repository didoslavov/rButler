export const setNotification = (notification) => {
    return {
        type: 'SET_NOTIFICATION',
        payload: notification,
    };
};

export const setNotificationOpen = (isOpen) => {
    return {
        type: 'SET_NOTIFICATION_OPEN',
        payload: isOpen,
    };
};
