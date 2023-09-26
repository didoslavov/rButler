import React from 'react';
import { createHousehold } from '../../services/householdsService.js';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const CreateHouseholdForm = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');
    const master = JSON.parse(localStorage.getItem('userInfo')).id;

    const onCreateHousehold = async ({ name, presentation }) => {
        try {
            if (!name || !presentation) {
                throw new Error('All fields are required!');
            }

            await createHousehold({ name, presentation, token, master });

            navigate('/profile/' + master);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="household-container">
            <div className="create-household-container">
                <h2 className="welcome welcome-household">Welcome, esteemed guest, to the creation of your digital household.</h2>
                <form className="form-household" onSubmit={handleSubmit(onCreateHousehold)}>
                    <label>
                        <span>Household name</span>
                        <input type="text" className="input" {...register('name')} />
                    </label>
                    <label>
                        <span>Presentation</span>
                        <input type="text" className="input" {...register('presentation')} />
                    </label>
                    <input type="submit" className="submit button" value={'Create Household'} />
                </form>
            </div>
            <img src="/create-household.jpg" alt="landing image" className="household-image" />
        </div>
    );
};

export default CreateHouseholdForm;
