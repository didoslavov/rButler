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

export const EditHouseholdTypes = {
    household: PropTypes.object.isRequired,
    handleUpdateHousehold: PropTypes.func.isRequired,
};

export const HouseholdUserFormTypes = {
    setHousehold: PropTypes.func.isRequired,
    householdId: PropTypes.string.isRequired,
    users: PropTypes.array.isRequired,
    setUsers: PropTypes.func.isRequired,
};
