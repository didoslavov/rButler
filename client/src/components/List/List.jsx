import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import AlertDialog from '../AlertDialog/AlertDialog.jsx';
import Notification from '../Notification/Notification.jsx';

import { addListItem, getListById, removeList, removeListItem } from '../../services/listsService.js';
import { setNotification } from '../../redux/slices/notificationSlice.js';
import ShoppingList from '../ShoppingList/ShoppingList.jsx';
import TodoList from '../TodoList/TodoList.jsx';
import { ListTypes } from '../../shared/propTypes.js';

const List = ({ type }) => {
    const { listId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();
    const { notification, severity, open } = useSelector((state) => state.notification);

    const [openAlertModal, setOpenAlertModal] = useState(false);
    const [items, setItems] = useState([]);

    const handleAlertModal = () => {
        setOpenAlertModal(!openAlertModal);
    };

    const onAddItem = async ({ text, qty }) => {
        try {
            if (!text || (!qty && type === 'shopping')) {
                throw new Error('All fields are required!');
            }

            if (!text && type === 'todo') {
                throw new Error('All fields are required!');
            }

            const list = await addListItem(listId, { text, qty });

            if (list.errors) {
                throw new Error(list.errors);
            }

            reset();
            setItems(list.items);
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

    const handleCheckItem = async (itemId) => {
        const list = await removeListItem(itemId, listId);

        setItems(list.items);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleDeleteList = async () => {
        await removeList(listId);
        handleGoBack();
    };

    useEffect(() => {
        getListById(listId).then((list) => setItems(list.items));
    }, [listId]);

    return (
        <>
            {openAlertModal && (
                <AlertDialog
                    handleClose={handleAlertModal}
                    handleDelete={handleDeleteList}
                    open={openAlertModal}
                    message={'You are about to delete the list.'}
                />
            )}
            {type === 'shopping' ? (
                <ShoppingList
                    handleSubmit={handleSubmit}
                    onAddItem={onAddItem}
                    register={register}
                    items={items}
                    handleGoBack={handleGoBack}
                    handleClickDelete={handleAlertModal}
                    handleCheckItem={handleCheckItem}
                />
            ) : type === 'todo' ? (
                <TodoList
                    handleSubmit={handleSubmit}
                    onAddItem={onAddItem}
                    register={register}
                    items={items}
                    handleGoBack={handleGoBack}
                    handleClickDelete={handleAlertModal}
                    handleCheckItem={handleCheckItem}
                />
            ) : null}
            {notification && <Notification open={open} message={notification} severity={severity} />}
        </>
    );
};

List.propTypes = ListTypes;

export default List;
