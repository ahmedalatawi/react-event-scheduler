export interface IEvent {
    id?: string;
    title: string;
    start: string;
    end: string;
    isPrivate: boolean;
    description: string;
    createdBy?: any;
}

export interface IEventBody {
    title: string;
    start: string;
    end: string;
    isPrivate: boolean;
    description: string;
    disableEdit: boolean;
    onTitle: (title: string) => void;
    onStart: (date: string) => void;
    onEnd: (date: string) => void;
    onIsPrivate: (isPrivate: boolean) => void;
    onDescription: (description: string) => void;
    onValidate: (valid: boolean) => void;
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

export interface IAuthContext {
    auth: IAuth | null;
    addAuth: (auth: IAuth) => void;
    getAuth: () => IAuth | null;
    removeAuth: () => void;
}

export interface IAlert {
    type: string;
    fillType: string;
    ariaLabel: string;
    msg: string
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

export interface ITimer {
    seconds: number;
    onTimeout: () => void;
}

export interface IUserIdleTimer {
    onLogout: () => void;
}

export interface ILogin {
    onChangePassword: (password: string) => void;
    onChangeUsername: (username: string) => void;
    onToggleLogin: () => void;
}

export interface ISignup {
    onChangeUsername: (username: string) => void;
    onChangePassword: (password: string) => void;
    onChangeConfirmPassword: (confirmPassword: string) => void;
    onToggleSignup: () => void;
}

export interface ILoginContainer {
    view: string;
    onClose: () => void;
    onSuccess: () => void;
}