export interface IEvent {
    id?: string;
    title: string;
    start: string;
    end: string;
    isPrivate: boolean;
    description: string;
    createdBy?: any;
}

export interface IUser {
    id?: string;
    token?: string;
    tokenExpiration?: number;
    username: string;
    password: string;
    confirmPassword: string;
}

export interface ILoginInput {
    username: string;
    password: string;
}

export interface ISignupInput {
    username: string;
    password: string;
    confirmPassword: string;
}

export interface IAuth {
    userId: string;
    username: string;
    token: string;
    tokenExpiration?: number;
}

export interface IModal {
    title: string;
    closeOnSubmit?: boolean;
    submitBtnName?: string;
    closeBtnName?: string;
    disableSubmitBtn: boolean;
    disableDeleteBtn?: boolean;
    displayDeleteBtn?: boolean;
    isSubmitLoading: boolean;
    isDeleteLoading?: boolean;
    onClose: () => void;
    onDelete?: () => void;
    onSubmit: () => void;
}