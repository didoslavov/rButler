import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EmailSharp, FacebookSharp, Telegram } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

import { FacebookShareButton, TelegramShareButton, EmailShareButton } from 'react-share';

import { setFormVisibility } from '../../redux/slices/formVisibilitySlice.js';

const ShareComponent = ({ url }) => {
    const dispatch = useDispatch();
    const { isShareOpen } = useSelector((state) => state.formVisibility);

    const handleShowShare = () => {
        dispatch(setFormVisibility({ formType: 'isShareOpen', value: !isShareOpen }));
        dispatch(setFormVisibility({ formType: 'isCreateOpen', value: false }));
        dispatch(setFormVisibility({ formType: 'isAddMemberOpen', value: false }));
        dispatch(setFormVisibility({ formType: 'isEditOpen', value: false }));
    };

    return (
        <>
            <h4 className="share-heading">Share this household with friends.</h4>
            <div className="share-household-container">
                <IconButton aria-label="close" onClick={handleShowShare}>
                    <CloseIcon />
                </IconButton>
                <div className="share-buttons">
                    <FacebookShareButton url={url} quote={'Wanna see my page?'}>
                        <FacebookSharp />
                        <p>Facebook</p>
                    </FacebookShareButton>
                    <TelegramShareButton url={url} title={'Wanna see my page?'}>
                        <Telegram />
                        <p>Telegram</p>
                    </TelegramShareButton>
                    <EmailShareButton url={url} subject={'Wanna see my page?'} body="Check out this link: ">
                        <EmailSharp />
                        <p>Email</p>
                    </EmailShareButton>
                </div>
            </div>
        </>
    );
};

export default ShareComponent;
