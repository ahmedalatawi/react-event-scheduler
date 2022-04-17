
import { FC, useEffect, useRef, useState } from 'react';
import { Modal as ModalBootstrap } from 'bootstrap';
import ReactDOM from 'react-dom';

import './Modal.css';

const portalElement: any = document.getElementById('modal-root');

type ModalProps = {
    title: string;
    closeOnSubmit?: boolean;
    submitBtnName?: string;
    closeBtnName?: string;
    disableSubmitBtn: boolean;
    disableDeleteBtn?: boolean;
    displayDeleteBtn?: boolean;
    hideSubmitBtn?: boolean;
    isSubmitLoading: boolean;
    isDeleteLoading?: boolean;
    onClose: () => void;
    onDelete?: () => void;
    onSubmit: () => void;
}

const Modal: FC<ModalProps> = (props) => {
    const modalRef = useRef<any>(null);
    const [modal, setModal] = useState<ModalBootstrap>();

    const {
        title,
        closeOnSubmit,
        submitBtnName,
        closeBtnName,
        isSubmitLoading,
        isDeleteLoading,
        children,
        displayDeleteBtn,
        disableDeleteBtn,
        disableSubmitBtn,
        hideSubmitBtn,
        onSubmit,
        onDelete,
        onClose
    } = props;

    console.log('Modal...')

    useEffect(() => {
        const modal = new ModalBootstrap(modalRef.current, { keyboard: false })
        setModal(modal);
        modal.show();

        const modalEl = modalRef.current;

        modalEl.addEventListener('hidden.bs.modal', () => onClose())

        return () => modalEl.removeEventListener('hidden.bs.modal', () => { });
    },
        //eslint-disable-next-line 
        []);

    useEffect(() => {
        (!isSubmitLoading && closeOnSubmit) && modal?.hide();

    }, [isSubmitLoading, closeOnSubmit, modal]);

    useEffect(() => {
        !isDeleteLoading && modal?.hide();

    }, [isDeleteLoading, modal]);

    return ReactDOM.createPortal((
        <div className="modal fade" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        {children}
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"> {closeBtnName || 'Cancel'}</button>
                        {displayDeleteBtn && <button type="button" className="btn btn-danger" disabled={disableDeleteBtn} onClick={onDelete}>
                            {isDeleteLoading && <div className="spinner-border spinner-border-sm" role="status"></div>} Remove
                        </button>}
                        {!hideSubmitBtn && <button type="button" className="btn btn-primary" onClick={onSubmit} disabled={disableSubmitBtn}>
                            {isSubmitLoading && <div className="spinner-border spinner-border-sm" role="status"></div>} {submitBtnName || 'Save'}
                        </button>}
                    </div>
                </div>
            </div>
        </div>
    ), portalElement)

};

export default Modal;