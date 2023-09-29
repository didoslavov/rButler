import React from 'react';
import { useForm } from 'react-hook-form';
import { deleteHousehold } from '../../services/householdsService.js';
import { useNavigate } from 'react-router-dom';

const EditHousehold = ({ household, token }) => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const handleDelete = async (e) => {
        e.preventDefault();
        const confirm = window.confirm('Are you sure ?');

        if (!confirm) {
            return;
        }
        await deleteHousehold(household._id, token);
        navigate('/profile/' + household.master);
    };

    return (
        <>
            <div className="edit-household-container">
                <form className="form-household edit-form">
                    <h5 className="edit-form-header border-bottom">Edit Household</h5>
                    <label>
                        <span>Household name</span>
                    </label>
                    <input type="text" className="input" defaultValue={household.name} />
                    <label>
                        <span>Presentation</span>
                    </label>
                    <input type="text" className="input" defaultValue={household.presentation} />
                    <div className="buttons-form">
                        <input type="submit" className="button-action edit-button" value={'Edit Household'} />
                        <button className="button-action delete-button" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditHousehold;
