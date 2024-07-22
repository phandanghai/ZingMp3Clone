import { useState } from 'react';
import ConfirmPassword from '../../components/LoginRegister/ConfirmPassword/ConfirmPassword';
import Register from '../../components/LoginRegister/Register/Register';
import style from './RegisterPage.module.scss';
import clsx from 'clsx';
import InfoUser from '../../components/LoginRegister/InfoUser/InfoUser';
import RulesAndCondition from '../../components/LoginRegister/RulesAndCondition/RulesAndCondition';

function RegisterPage() {
    const [page, setPage] = useState(0);
    const [user, setUser] = useState({
        email: '',
        password: '',
        name: '',
        birthday: {
            date: '',
            month: '',
            year: '',
        },
        gender: '',
    });
    const HandleSetUser = (value) => {
        setUser({ ...user, ...value });
    };

    const HandleSetPages = (value) => {
        setPage(value);
    };

    return (
        <div className={style['RegisterPage']}>
            {page === 0 && <Register user={user} HandleSetUser={HandleSetUser} HandleSetPages={HandleSetPages} />}
            {page === 1 && (
                <ConfirmPassword user={user} HandleSetUser={HandleSetUser} HandleSetPages={HandleSetPages} />
            )}
            {page === 2 && <InfoUser user={user} HandleSetUser={HandleSetUser} HandleSetPages={HandleSetPages} />}
            {page === 3 && (
                <RulesAndCondition user={user} HandleSetUser={HandleSetUser} HandleSetPages={HandleSetPages} />
            )}
        </div>
    );
}

export default RegisterPage;
