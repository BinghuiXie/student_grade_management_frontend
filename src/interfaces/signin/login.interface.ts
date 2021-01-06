export enum LoginCode {
    LOGIN_SUCCESS = 10000,
    USER_NOT_EXIT = 10001,
    WRONG_PASSWORD = 10002,
    WRONG_USERNAME = 10003
}

export enum LoginMessage {
    '登录成功' = 10000,
    '用户不存在' = 10001,
    '密码错误' = 10002,
    '用户名错误' = 10003
}

export interface IBaseInfo {
    [key: string]: any;
}

// 学生信息登录接口
export interface IStudentInfo extends IBaseInfo {
    studentId: string;
    sPassword: string;
}

// 教师信息登录接口
export interface ITeacherInfo extends IBaseInfo {
    employeeId: string;
    tPassword: string;
}

// 管理员信息登录接口
export interface IAdminInfo extends IBaseInfo {
    username: string;
    password: string;
}

export interface IUserInfo extends IBaseInfo {
    teacherInfo: ITeacherInfo;
    studentInfo: IStudentInfo;
    adminInfo: IAdminInfo;
}

// login 返回的数据中 data 的格式
export interface ILoginResponseData {
    code: number;
    token?: string;
    message: string;
}

export type IBindUserInfo = ITeacherInfo | IStudentInfo | IAdminInfo;