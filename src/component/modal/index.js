import React from "react";
import {createPortal} from "react-dom";
import classNames from "classnames";

import Button from "../button";

import "./style.less";
import useKeyboardEvent from "../../hooks/keyboard";

const control = (text, onClick) => ({onClick, text});

const Modal = ({title, children, className, ...rest}) => {
    const needHead = () => title;
    const modalClassNames = classNames(className, "ui__modal");
    return createPortal(
        <div className="ui__modal__background">
            <div className={modalClassNames} {...rest}>
                {needHead() && <ModalHead title={title}/>}
                {children}
            </div>
        </div>,
        document.body
    );
};

const ConfirmModal = ({
      confirmText,
      declineText,
      messageText,
      onConfirm = () => {},
      onDecline = () => {},
      ...rest
}) => (
    <KeyboardClosable onEnter={onConfirm} onEscape={onDecline}>
        <Modal className="ui__modal--confirm" {...rest}>
            <ModalContent>
                <p>{messageText}</p>
            </ModalContent>
            <ModalControls
                controls={[
                    control(declineText, onDecline),
                    control(confirmText, onConfirm)
                ]}
            />
        </Modal>
    </KeyboardClosable>
);

const InfoModal = ({
   messageText,
   closeText,
   onClose = () => {},
   className,
   ...rest
}) => (
    <KeyboardClosable onEscape={onClose} onEnter={onClose}>
        <Modal className="ui__modal--info" {...rest}>
            <ModalContent>
                <p>{messageText}</p>
            </ModalContent>
            <ModalControls controls={[control(closeText, onClose)]}/>
        </Modal>
    </KeyboardClosable>
);

const KeyboardClosable = ({
  children,
  onEscape = () => {},
  onEnter = () => {}
}) => {
    useKeyboardEvent("Escape", onEscape);
    useKeyboardEvent("Enter", onEnter);
    return children;
};

const ModalContent = ({children, ...props}) => (
    <div className="ui__modal__content" {...props}>
        {children}
    </div>
);

const ModalHead = ({title, ...props}) => (
    <header className="ui__modal__header" {...props}>
        {title && <h2 className="ui__modal__title">{title}</h2>}
    </header>
);

const ModalControls = ({controls = [], ...props}) => (
    <div className="ui__modal__controls" {...props}>
        {controls.map((ctrl, index) => (
            <Button key={index} {...ctrl} />
        ))}
    </div>
);

export {Modal, InfoModal, ConfirmModal};
