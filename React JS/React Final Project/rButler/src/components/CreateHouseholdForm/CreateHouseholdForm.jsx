import React from 'react';

const CreateHouseholdForm = () => {
    return (
        <div className="household-container">
            <div className="create-household-container">
                <h2 className="welcome welcome-household">Welcome, esteemed guest, to the creation of your digital household.</h2>
                <form className="form-household">
                    <label>
                        <span>Household name</span>
                        <input type="text" className="input" name="name" />
                    </label>
                    <label>
                        <span>Presentation</span>
                        <input type="text" className="input" name="presentation" />
                    </label>
                    <input type="submit" className="submit button" value={'Create Household'} />
                </form>
            </div>
            <img src="/create-household.avif" alt="landing image" className="household-image" />
        </div>
    );
};

export default CreateHouseholdForm;
