export const menuItemStyles = {
    border: '1px solid var(--dark-blue)',
    backgroundColor: 'var(--light-grey)',
    color: 'var(--dark-blue)',
    '&:hover': { color: 'var(--light-grey)', backgroundColor: 'var(--dark-blue)' },
    '&.Mui-selected': {
        backgroundColor: 'var(--light-blue)',
        color: 'var(--light-grey)',
        '&:hover': { backgroundColor: 'var(--dark-blue)', color: 'var(--light-grey)' },
    },
    padding: '4px',
};

export const selectStyles = {
    color: 'var(--dark-blue)',
    bgcolor: 'var(--light-grey)',
    border: '1px solid var(--dark-blue)',
    borderRadius: '0',
    '& #role-select': {
        padding: '5px 25px',
        fontSize: '12px',
        marginRight: '10px',
        animationName: 'none',
    },
    '& .MuiOutlinedInput-notchedOutline': { border: '0' },
    '& .MuiMenu-list': { padding: '0' },
};

export const iconButtonStyles = {
    position: 'absolute',
    top: '2px',
    right: '0',
    '& .css-i4bv87-MuiSvgIcon-root': {
        fontSize: '1rem',
        color: 'var(--dark-blue)',
    },
};

export const paperStyles = {
    padding: '20px',
    border: '1px solid var(--dark-blue)',
    backgroundColor: 'var(--light-grey)',
    color: 'var(--dark-blue)',
    '& form': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
    },
    '& h4': {
        textAlign: 'center',
    },
    '& label': {
        marginTop: '5px',
        marginBottom: '5px',
    },
    '& .details-popup-input': {
        border: '1px solid var(--dark-blue)',
        padding: '5px',
        color: 'var(--dark-blue)',
        '&::placeholder': {
            textAlign: 'center',
        },
    },
    '& .add-button': {
        marginTop: '5px',
        fontSize: '12px',
        padding: '6px',
    },
};

export const speedDialActionStyles = {
    backgroundColor: 'var(--dark-blue)',
    color: 'var(--light-grey)',
    '&:hover': { backgroundColor: 'var(--light-grey)', color: 'var(--dark-blue)' },
};

export const speedDialStyles = {
    '& .MuiFab-primary': {
        backgroundColor: 'var(--light-grey)',
        color: 'var(--dark-blue)',
        border: '1px solid var(--dark-blue)',
        '&:hover': {
            backgroundColor: 'var(--dark-blue)',
            color: 'var(--light-grey)',
        },
    },
};
