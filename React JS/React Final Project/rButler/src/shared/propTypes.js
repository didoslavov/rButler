import PropTypes from 'prop-types';

export const AlertDialogPropTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
};

export const CreateListFormTypes = {
    householdId: PropTypes.string.isRequired,
    setIsCreateOpen: PropTypes.func.isRequired,
    setLists: PropTypes.func.isRequired,
    lists: PropTypes.array.isRequired,
};
