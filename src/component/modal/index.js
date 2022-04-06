import React from 'react';
import classNames from "classnames";

import Button from '../button';
import Label from '../text/label';

const Modal = ({shown, title, children, className, ...rest}) => {
    const modalClassNames = classNames(className, 'ui__modal');
    const backgroundClassNames = classNames(
        'ui__modal-background',
        {'ui__modal-background--shown': shown}
    );
    return (
        <div className={backgroundClassNames}>
            <div className={modalClassNames}
                 {...rest}>
                <header className='ui__modal-header'>
                    {title && <Label>{title}</Label>}
                </header>
                <div className='ui__modal-content'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export const ConfirmModal = ({confirmText, declineText, messageText, onConfirm, onDecline, ...rest}) => (
    <Modal className='ui__modal--confirm'
           {...rest}>
        <div className='ui__modal-line'>
            <p>{messageText}</p>
        </div>
        <div className='ui__modal-line'>
            <Button onClick={onConfirm}>{confirmText}</Button>
            <Button type='error'
                    onClick={onDecline}>
                {declineText}
            </Button>
        </div>
    </Modal>
);

export const InfoModal = ({messageText, closeText, className, onClose, type = 'info', ...rest}) => (
    <Modal className={className('ui__modal--info', `ui__modal--info--${type}`)}
           {...rest}>
        <div className='ui__modal-line'>
            <p>{messageText}</p>
        </div>
        <div className='ui__modal-line'>
            <Button onClick={onClose}
                    type={type}>
                {closeText}
            </Button>
        </div>
    </Modal>
);

export default Modal;