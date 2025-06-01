import { $authHost, $host } from "./index";

export const createParking = async (parking) => {
    const { data } = await $authHost.post('api/parkinglot', parking);
    return data;
}

export const fetchParkings = async () => {
    const { data } = await $host.get('api/parkinglot');
    return data;
}

export const fetchOneParking = async (id) => {
    const { data } = await $host.get('api/parkinglot/' + id);
    return data;
};