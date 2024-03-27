import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm, message1, message2, message3 }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <p className='modal-text'>{message1}</p>
                <p className='modal-text'>{message2}</p>
                <p className='modal-text'>{message3}</p>
                <div className="modal-actions">
                    <button className='modal-button'
                        onClick={onConfirm}
                    >Agree & Proceed
                    </button>
                    <button className='modal-button'
                        onClick={onClose}
                    >Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
