/**
 * 注册身份
 */

export interface IRegisterData<T> {
    employeeId: T;
    studentId: T;
    password: T;
    confirmPass: T;
    identity: number;
    phone: T;
}