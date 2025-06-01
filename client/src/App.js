import Header from './components/header';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/app-router';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from './index';
import { check } from './http/userAPI';
import { Spinner } from 'react-bootstrap';
import { fetchParkings } from './http/parkingAPI';

const App = observer(() => {
    const { user } = useContext(Context);
    const { parking } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchParkings().then(data => parking.setParkingLots(data));
    }, []);

    useEffect( () => {
        check().then(data => {
            user.setUser(data);
            user.setIsAuth(true);
        })
        .catch(e => {
            user.setIsAuth(false);
        })
        .finally(() => setLoading(false));
    }, [user.isAuth]);

    if (loading) {
        return <Spinner animation="grow" />;
    }

    return (
        <BrowserRouter>
            <Header/>

            <AppRouter />
        </BrowserRouter>
    );
});

export default App;
