import React from 'react';
import { useForm } from 'react-hook-form';

const EditHousehold = ({ household }) => {
    const { register, handleSubmit } = useForm();
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
                        <button className="button-action delete-button">Delete</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditHousehold;
