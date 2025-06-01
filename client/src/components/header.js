import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoIcon } from '../assets/logo2.svg';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const Header = observer(() => {
    const { user } = useContext(Context);

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        sessionStorage.removeItem('token');
    }

    return (
        <header className="header">
            <Link to="/" className="header__logo-link">
                <LogoIcon className="header__logo-svg" />
            </Link>
            {user.isAuth ?
                <nav className="header__nav">
                    <ul className="header__list">
                        <li className="header__item">
                            <Link to="/my-bookings" className="header__link">Мои бронирования</Link>
                        </li>
                        <li className="header__item">
                            <Link to="/login" className="header__link" onClick={logOut}>Выйти</Link>
                        </li>
                    </ul>
                </nav>
                :
                <nav className="header__nav">
                    <Link to="/login" className="header__link">
                        Войти или Зарегистрироваться
                    </Link>
                </nav>
            }
        </header>
    )
});

export default Header