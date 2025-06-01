import { $authHost, $host } from "./index";
import { jwtDecode } from 'jwt-decode'; 

export const registration = async (email, password) => {
    const { data } = await $host.post('api/user/registration', {email, password, role: 'user'});
    sessionStorage.setItem('token', data.token);    
    return jwtDecode(data.token);
}

export const login = async (email, password) => {
    const { data } = await $host.post('api/user/login', { email, password});
    sessionStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}

export const check = async () => {
    const { data } = await $authHost.get('api/user/auth',);
    sessionStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}