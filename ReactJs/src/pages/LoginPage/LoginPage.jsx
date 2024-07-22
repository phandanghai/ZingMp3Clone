import Login from '../../components/LoginRegister/Login/Login';
import style from './LoginPage.module.scss';
import clsx from 'clsx';

function LoginPage() {
    return (
        <div className={style['LoginPage']}>
            <Login />
        </div>
    );
}

export default LoginPage;
