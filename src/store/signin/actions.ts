import { INFINITY_TIME } from './../../common/constants/time';
import { JWT_KEY } from './../../common/constants/siginin';
import Storage from '@/utlis/localStorage';
import { ISigninState } from './signin.interface';
import { SUCCESS_CODE } from '@/common/constants/code';
import { IRootState } from './../rootState.interface';
import {
    IRegisterData,
    IBindUserInfo,
    ILoginResponseData
} from '@/interfaces';
import { ActionTree } from 'vuex';
import * as types from './mutationTypes';
import AJAX, { IAxiosResponse } from '@/utlis/ajax';

const $http = new AJAX();
const $storage = new Storage()

export const actions: ActionTree<ISigninState, IRootState> = {
    /** 针对记住密码以后自动填充用户名密码时更新 state 里面的数据
     * 
     */
    autoFillUserInfo(context, payload: { userInfo: IBindUserInfo }) {
        console.log(payload.userInfo);
        context.commit(types.AUTO_FILL_USERINFO, {
            userInfo: payload.userInfo
        })
    },
    /** 处理登录
     *  @param{Object} payload 参数
     *  @param{IBindUserInfo} data 登录信息(用户名密码)
     */
    async handleUserLogin(context, payload: { data: IBindUserInfo }): Promise<ILoginResponseData> {
        const { data } = payload;
        let res: IAxiosResponse<ILoginResponseData>;
        try {
            res = await $http.post('/user/login', {
                id: data.studentId || data.employeeId,
                password: data.sPassword || data.tPassword
            });
        } catch (error) {
            // TODO: 封装错误类
            throw Error(`request Error: ${error}`);
        }
        const token = res.data.token;
        console.log(token);
        if(token) {
            $storage.set(JWT_KEY, token, INFINITY_TIME)
        }
        return res.data;
    },

    /**
     * 处理用户注册
     * @param context 
     * @param payload 
     */
    async handleInfoSubmit(context, payload: { data: IRegisterData<string> }) {
        // TODO: deep clone 封装在一个 utli 里面
        const copy = JSON.parse(JSON.stringify(payload.data));
        Object.keys(copy).filter(key => {
            if(!copy[key]) {
                delete copy[key];
            }
        });
        let res;
        try {
            res = await $http.post('/user/register', {
                identityId: copy.employeeId || copy.studentId,
                password: copy.password,
                phoneNumber: copy.phone,
                roleId: copy.identity === 'teacher' ? 0 : 1,
            });
        } catch (error) {
            throw Error(`request Error: ${error}`);
        }
        if(res.status === SUCCESS_CODE) {
            // TODO: 注册成功跳转逻辑
        }
    },

    updateRegisterData(context, payload: { registerData: IRegisterData<string> }) {
        context.commit(types.UPDATE_REGISTER_DATA, {
            registerData: payload.registerData
        })
    },
}