import React from 'react';

const EditHousehold = ({ household }) => {
    return (
        <>
            <div className="edit-household-container">
                <form className="form-household">
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
