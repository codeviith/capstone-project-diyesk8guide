import React, { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, onConfirm, message1, message2, message3 }) => {
    const onlyActionRefButton = useRef(null);

    useEffect(() => {
        if (isOpen) {  // code to focus on the first actionable button when the modal is active
            onlyActionRefButton.current.focus();
            document.body.style.overflow = 'hidden';  // code to disable scrolling when modal is active
        } else {
            document.body.style.overflow = '';  // code to re-enable scrolling when modal is inactive
        }

        return () => {
            document.body.style.overflow = '';  // code to cleanup and re-enable scrolling when modal is inactive or unmounts
        };
    }, [isOpen]); // here, the dependency array includes isOpen so as to trigger the effect on isOpen change

    if (!isOpen) return null;


    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <p className='modal-text'>{message1}</p>
                <p className='modal-text'>{message2}</p>
                <p className='modal-text'>{message3}</p>
                <div className="modal-actions">
                    {/* This is where useRef is applied to the "Agree & Proceed" button */}
                    <button className='modal-button-agree'
                        ref={onlyActionRefButton}
                        onClick={onConfirm}
                    >Agree & Proceed
                    </button>
                    <button className='modal-button-cancel'
                        onClick={onClose}
                    >Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
