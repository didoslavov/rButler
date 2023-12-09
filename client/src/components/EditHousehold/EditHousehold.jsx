import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import AlertDialog from '../AlertDialog/AlertDialog.jsx';

import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { setNotification } from '../../redux/slices/notificationSlice.js';
import { setFormVisibility } from '../../redux/slices/formVisibilitySlice.js';

import { deleteHousehold, updateHousehold } from '../../services/householdsService.js';
import { EditHouseholdTypes } from '../../shared/propTypes.js';

const EditHousehold = ({ household, handleUpdateHousehold }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [openAlertModal, setOpenAlertModal] = useState(false);

    const handleAlertModal = () => {
        setOpenAlertModal(!openAlertModal);
    };

    const handleCloseEditForm = () => {
        dispatch(setFormVisibility({ formType: 'isEditOpen', value: false }));
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        await deleteHousehold(household._id);
        navigate('/households/' + household.master);
    };

    const handleUpdate = async ({ name, presentation }) => {
        try {
            if (!name.trim() || !presentation.trim()) {
                throw new Error('All fields are required!');
            }

            const res = await updateHousehold({ name, presentation }, household._id);

            if (res.error) {
                throw new Error(res.error);
            }

            dispatch(
                setNotification({
                    notification: [res.success],
                    severity: 'success',
                    open: true,
                })
            );

            handleCloseEditForm();
            handleUpdateHousehold();
        } catch (error) {
            dispatch(
                setNotification({
                    notification: [error.message],
                    severity: 'error',
                    open: true,
                })
            );
        }
    };

    return (
        <>
            {openAlertModal && (
                <AlertDialog
                    open={openAlertModal}
                    handleClose={handleAlertModal}
                    handleDelete={handleDelete}
                    message={'You are about to delete a household.'}
                />
            )}
            <div className="edit-household-container">
                <IconButton aria-label="close" onClick={handleCloseEditForm}>
                    <CloseIcon />
                </IconButton>
                <form className="edit-form" onSubmit={handleSubmit(handleUpdate)}>
                    <h5 className="edit-form-header border-bottom">Edit Household</h5>
                    <label className="edit-household-form-label" htmlFor="name">
                        <span>Household name</span>
                    </label>
                    <input type="text" className="edit-input" defaultValue={household.name} id="name" {...register('name')} />
                    <label className="edit-household-form-label" htmlFor="present">
                        <span>Presentation</span>
                    </label>
                    <input
                        type="text"
                        id="present"
                        className="edit-input"
                        defaultValue={household.presentation}
                        {...register('presentation')}
                    />
                    <div className="buttons-form">
                        <input type="submit" className="button-action edit-button" value={'Edit Household'} />
                        <button type="button" className="button-action delete-button" onClick={handleAlertModal}>
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

EditHousehold.propTypes = EditHouseholdTypes;

export default EditHousehold;
