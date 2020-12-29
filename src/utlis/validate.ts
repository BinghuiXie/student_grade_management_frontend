import { IRefFormat } from '@/interfaces';
import { IBindUserInfo } from '@/interfaces';
export const isValidate = (value: string, rules: RegExp) => {
    return rules.test(value);
}

/**
 * 判断用户身份 0 教师 1 学生 2 管理员
 * @param value 传入的用户信息 userInfo
 */
export const getIdentity = (value: IBindUserInfo) => {
    if('employeeId' in value) {
        return 0;
    }
    if('studentId' in value) {
        return 1;
    }
    return 2;
}

export const isInputMatchRules = (ref: IRefFormat, refName: string) => {
    let res;
    ref[refName].validate((valid: boolean) => {
        res = valid;
    });
    return res;
}