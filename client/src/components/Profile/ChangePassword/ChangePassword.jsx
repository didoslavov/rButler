import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../../../redux/slices/notificationSlice.js';
import { useLoading } from '../../../hooks/useLoading.js';
import { resetPassword } from '../../../services/userService.js';
import { setUser } from '../../../redux/slices/userSlice.js';
import { useNavigate } from 'react-router-dom';
import Notification from '../../Notification/Notification.jsx';

const ChangePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, handleLoading] = useLoading(false);
    const { notification, open, severity } = useSelector((state) => state.notification);
    const { user } = useSelector((state) => state.user);
    const { register, handleSubmit } = useForm();

    const onResetPassword = async ({ oldPass, newPass, rePass }) => {
        try {
            await handleLoading(async () => {
                if (!oldPass.trim() || !newPass.trim() || !rePass.trim()) {
                    throw new Error('All fields are required!');
                }

                if (newPass.trim() !== rePass.trim()) {
                    throw new Error("Passwords don't match!");
                }

                const res = await resetPassword({ oldPass, newPass }, user.id);

                if (res.errors) {
                    throw new Error(res.errors);
                }

                dispatch(setUser(res.userData));

                dispatch(
                    setNotification({
                        notification: [res.success],
                        severity: 'success',
                        open: true,
                    })
                );
                navigate('/profile/edit');
            });
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
        <div className="reset-password-profile-container">
            <h2 className="profile-header">Change Password</h2>
            <form className="form-household profile-form" onSubmit={handleSubmit(onResetPassword)}>
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
                    <input type="password" className="input" {...register('rePass')} />
                </label>
                <input disabled={isLoading} type="submit" className="submit button" value={'Edit'} role="button" />
            </form>

            {notification && <Notification open={open} message={notification} severity={severity} />}
        </div>
    );
};

export default ChangePassword;
