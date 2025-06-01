import React, { useState, useContext } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { registration, login } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

const Auth = observer(() => {
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === '/login';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const { user } = useContext(Context);

    const loginCheck = async () =>  {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(data);
            user.setIsAuth(true);
            navigate('/parking');
        } catch(e) {
            alert(e.response.data.message);
        }
        
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: 'calc(100vh - 100px)' }} >
            <Card className="p-4 justify-content-center" style={{ width: '800px'}}>
                <h2 className="text-center mb-4">{ isLogin ? 'Вход' : 'Регистрация'}</h2>
                <Form>
                    <Form.Group className="mb-4" controlId="email">
                        <Form.Label>Email адрес</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Введите email"
                            required
                            value={email}
                            onChange={ e => setEmail(e.target.value) }
                        />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="password">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Введите пароль"
                            required
                            value={password}
                            onChange={ e => setPassword(e.target.value) }
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                        <Button 
                            variant="primary" 
                            className="w-50 btn btn-primary btn-lg"
                            onClick={ loginCheck }>
                            { isLogin ? 'Войти' : 'Зарегистрироваться'}
                        </Button>
                    </div>
                </Form>
                <div className="mt-4 text-center">
                    { isLogin ? 
                        <p>
                            У вас нет аккаунта?{' '}
                            <Link to="/registration">Регистрация</Link>
                        </p>
                        :
                        <p>
                            У вас уже есть аккаунт?{' '}
                            <Link to="/login">Вход</Link>
                        </p>
                    }
                </div>
            </Card>
        </Container>
    );
});

export default Auth;
