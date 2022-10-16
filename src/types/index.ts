export interface IEvent {
  id?: string;
  title: string;
  start: string;
  end: string;
  url?: string;
  isPrivate: boolean;
  description: string;
  createdBy?: any;
  subtitle?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUser {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  bio?: string;
  token?: string;
  tokenExpiration?: number;
  username: string;
  password?: string;
  confirmPassword?: string;
  createdAt?: string;
  updatedAt?: string;
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
