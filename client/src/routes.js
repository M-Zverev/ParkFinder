import Auth from './pages/auth';
import Home from './pages/home';
import Parking from './pages/parking';
import ParkingDetails from './pages/parking-details';
import MyBookings from './pages/my-bookings';

export const authRoutes = [
    {
        path: '/parking_details/:id',
        Component: ParkingDetails
    },
    {
        path: '/my-bookings',
        Component: MyBookings
    },
]

export const publicRoutes = [
    {
        path: '/',
        Component: Home
    },
    {
        path: '/login',
        Component: Auth
    },
    {
        path: '/registration',
        Component: Auth
    },
    {
        path: '/parking',
        Component: Parking
    }
]