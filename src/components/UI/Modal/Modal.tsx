
import { useEffect, useRef, useState } from 'react';
import { Modal as ModalBootstrap } from 'bootstrap';
import ReactDOM from 'react-dom';

const portalElement: any = document.getElementById('modal-root');

type ModalType = {
    title: string;
    disableSaveBtn: boolean;
    displayDeleteBtn: boolean;
    onClose: () => void;
    onDelete: () => void;
    onSave: () => void;
};

const Modal: React.FC<ModalType> = (props) => {
    const modalRef = useRef<any>(null);
    const [modal, setModal] = useState<ModalBootstrap>();

    console.log('Modal running...')

    useEffect(() => {
        const modal = new ModalBootstrap(modalRef.current, { keyboard: false })
        setModal(modal);
        modal.show();

        const modalEl = modalRef.current;

        modalEl.addEventListener('hidden.bs.modal', () => props.onClose())

        return () => modalEl.removeEventListener('hidden.bs.modal', () => { });
    }, []);

    const handleSaveBtn = () => {
        modal?.hide();
        props.onSave();
    };

    const handleDeleteBtn = () => {
        modal?.hide();
        props.onDelete();
    };

    return ReactDOM.createPortal((
        <div className="modal fade" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        {props.children}
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        {props.displayDeleteBtn && <button type="button" className="btn btn-danger" onClick={handleDeleteBtn}>Remove</button>}
                        <button type="button" className="btn btn-primary" onClick={handleSaveBtn} disabled={props.disableSaveBtn}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    ), portalElement)

};

export default Modal;