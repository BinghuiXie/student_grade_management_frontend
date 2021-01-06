export const IDENTITY = {
    TEACHERID: 0,
    STUDENTID: 1,
    ADMINID: 2
}
// 放在 localStorage 里面时候用的 key
export const STORAGE_KEY: { [key: string]: string } = {
    teacher: 'teacherInfo',
    student: 'studentInfo',
    admin: 'adminInfo'
}
export const MAX_EMPLOYEE_ID_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 20;
export const MIN_PASSWORD_LENGTH = 8;
export const MAX_STUDENT_ID_LENGTH = 9;
export const STUDENT_ID = 'studentId';
export const TEACHER_ID = 'employeeId';
export const STUDENT_PASSWORD = 'sPassword';
export const TEACHER_PASSWORD = 'tPassword';
export const JWT_KEY = 'token';

export const infoConstant = {
    0: {
        name: 'teacher',
        info: 'teacherInfo',
        identity: 0,
        storageKey: 'teacherInfo',
        idName: 'employeeId',
        idLength: 8,
        pwdLength: 20,
        pwdName: 'tPassword',
        placeholder: 'input_employee_id'
    },
    1: {
        name: 'student',
        info: 'studentInfo',
        identity: 1,
        storageKey: 'studentInfo',
        idName: 'studentId',
        idLength: 9,
        pwdLength: 20,
        pwdName: 'sPassword',
        placeholder: 'input_student_id'
    },
    2: {
        name: 'admin',
        info: 'adminInfo',
        identity: 2,
        storageKey: 'adminInfo',
        idName: 'username',
        idLength: 5,
        pwdLength: 20,
        pwdName: 'password', 
        placeholder: 'input_username'      
    }
}
