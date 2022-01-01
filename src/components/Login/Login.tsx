import { ChangeEvent } from "react";
import { ILogin } from "../../interfaces/types";

const Login: React.FC<ILogin> = ({ onChangePassword, onChangeUsername, onToggleLogin }) => {

    return <div className="row g-3">
        <div className="col-12">
            <label htmlFor="username" className="form-label">Username</label>
            <input
                id="username"
                type="text"
                name="username"
                className="form-control"
                placeholder="Username"
                maxLength={20}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeUsername(e.target.value.trim())} />
        </div>
        <div className="col-12">
            <label htmlFor="password" className="form-label">Password</label>
            <input
                id="password"
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                maxLength={20}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChangePassword(e.target.value.trim())} />
        </div>
        <div className="col-12">
            <p className="mb-0">Don't have an account yet? <a onClick={onToggleLogin} href="#">Signup</a></p>
        </div>
    </div>
};

export default Login;