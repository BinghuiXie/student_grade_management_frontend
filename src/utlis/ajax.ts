import axios from 'axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

const baseURL = 'http://192.168.43.225:8080';

export type IAxiosResponse<T> = Pick<AxiosResponse<T>, 'data' | 'status' | 'statusText'>

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