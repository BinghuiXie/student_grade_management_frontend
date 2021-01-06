import { JWT_KEY } from './../common/constants/siginin';
import axios from 'axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import Storage from './localStorage';

const baseURL = 'http://127.0.0.1:3000';
const $storage = new Storage();

export type IAxiosResponse<T> = Pick<AxiosResponse<T>, 'data' | 'status' | 'statusText'>

axios.interceptors.request.use(
    config => {
        const token = $storage.get(JWT_KEY);
        if(token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    error => {
        // TODO: 错误处理
    }
)

export default class AJAX {

    public async get<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<IAxiosResponse<T>> {
        const mergedConfig = { ...config, params: data};
        return await axios.get<T>( baseURL + url, mergedConfig);
    }

    public async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<IAxiosResponse<T>> {
        const mergedConfig = { ...config, params: data};
        return await axios.post<T>( baseURL + url, data, mergedConfig);
    }
}