import { useForm } from 'react-hook-form';

const ResetPassword = () => {
    const { register, handleSubmit } = useForm();
    return (
        <div className="profile-container">
            <h2 className="profile-header">Reset Password</h2>
            <form className="form-household" onSubmit={handleSubmit()}>
                <label>
                    <span>Old Password</span>
                    <input type="password" className="input" {...register('oldPass')} />
                </label>
                <label>
                    <span>New Password</span>
                    <input type="password" className="input" {...register('newPass')} />
                </label>
                <label>
                    <span>Repeat Password</span>
                    <input type="password" {...register('rePass')} />
                </label>
                <input type="submit" className="submit button" value={'Edit'} />
            </form>
        </div>
    );
};

export default ResetPassword;
