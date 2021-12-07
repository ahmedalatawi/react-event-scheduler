import { ChangeEvent } from "react";

export interface IEvent {
    id?: string;
    title: string;
    start: string;
    end: string;
    description: string;
}

export interface IEventBody {
    title: string;
    start: string;
    end: string;
    description: string;
    onTitle: (title: string) => void;
    onStart: (date: string) => void;
    onEnd: (date: string) => void;
    onDescription: (description: string) => void;
    onValidate: (valid: boolean) => void;
}

export interface IAlert {
    type: string;
    fillType: string;
    ariaLabel: string;
    msg: string
}

export interface IModal {
    title: string;
    disableSaveBtn: boolean;
    disableDeleteBtn: boolean;
    displayDeleteBtn: boolean;
    isSaveLoading: boolean;
    isDeleteLoading: boolean;
    onClose: () => void;
    onDelete: () => void;
    onSave: () => void;
}