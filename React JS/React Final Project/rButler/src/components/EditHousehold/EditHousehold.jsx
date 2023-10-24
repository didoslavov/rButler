import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { deleteHousehold, updateHousehold } from '../../services/householdsService.js';
import { useNavigate } from 'react-router-dom';
import AlertDialog from '../ConfirmModal/AlertDialog.jsx';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../../redux/slices/notificationSlice.js';
import { setFormVisibility } from '../../redux/slices/formVisibilitySlice.js';

const EditHousehold = ({ household, handleUpdateHousehold }) => {
    const dispatch = useDispatch();
    const { isEditOpen } = useSelector((state) => state.formVisibility);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [openAlertModal, setOpenAlertModal] = useState(false);

    const handleClickDelete = () => {
        setOpenAlertModal(true);
    };

    const handleClose = () => {
        setOpenAlertModal(false);
    };

    const handleShowEditForm = () => {
        dispatch(setFormVisibility({ formType: 'isEditOpen', value: !isEditOpen }));
        dispatch(setFormVisibility({ formType: 'isCreateOpen', value: false }));
        dispatch(setFormVisibility({ formType: 'isAddMemberOpen', value: false }));
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        await deleteHousehold(household._id);
        navigate('/households/' + household.master);
    };

    const handleUpdate = async ({ name, presentation }) => {
        try {
            if (!name || !presentation) {
                throw ['All fields are required!'];
            }

            const res = await updateHousehold({ name, presentation }, household._id);

            if (res.error) {
                throw [res.error];
            }

            dispatch(
                setNotification({
                    notification: [res.success],
                    severity: 'success',
                    open: true,
                })
            );

            handleShowEditForm();
            handleUpdateHousehold();
        } catch (error) {
            dispatch(
                setNotification({
                    notification: error,
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
                    handleClose={handleClose}
                    handleDelete={handleDelete}
                    message={'You are about to delete a household.'}
                />
            )}
            <div className="edit-household-container">
                <IconButton aria-label="close" onClick={handleShowEditForm}>
                    <CloseIcon />
                </IconButton>
                <form className="form-household edit-form" onSubmit={handleSubmit(handleUpdate)}>
                    <h5 className="edit-form-header border-bottom">Edit Household</h5>
                    <label className="edit-household-form-label">
                        <span>Household name</span>
                    </label>
                    <input type="text" className="edit-input" defaultValue={household.name} {...register('name')} />
                    <label className="edit-household-form-label">
                        <span>Presentation</span>
                    </label>
                    <input
                        type="text"
                        className="edit-input"
                        defaultValue={household.presentation}
                        {...register('presentation')}
                    />
                    <div className="buttons-form">
                        <input type="submit" className="button-action edit-button" value={'Edit Household'} />
                        <button type="button" className="button-action delete-button" onClick={handleClickDelete}>
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditHousehold;
