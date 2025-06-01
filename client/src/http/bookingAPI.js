import { $authHost } from './index';

export const createBooking = async (booking) => {
    const { data } = await $authHost.post('api/booking', booking);
    return data;
};

export const fetchBookings = async () => {
    const { data } = await $authHost.get('api/booking');
    return data;
};

export const fetchActiveBookings = async (user_id) => {
    const { data } = await $authHost.get(`api/booking/active-bookings?user_id=${user_id}`);
    return data;
};
