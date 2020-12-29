export interface IBaseInfo {
    [key: string]: any;
}

export interface IStudentInfo extends IBaseInfo {
    studentId: string;
    sPassword: string;
}

export interface ITeacherInfo extends IBaseInfo {
    employeeId: string;
    tPassword: string;
}

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
    sessionId: string;
}

export type IBindUserInfo = ITeacherInfo | IStudentInfo | IAdminInfo;