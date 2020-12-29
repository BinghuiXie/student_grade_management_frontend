export interface IResponseFormat<T> {
    code: string;
    message: string;
    data: T;
}