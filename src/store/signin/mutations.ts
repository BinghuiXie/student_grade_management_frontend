import { infoConstant } from '@/common/constants/siginin';
import { getIdentity } from '@/utlis/validate';
import { ISigninState } from './signin.interface';
import {
    IRegisterData,
    IBindUserInfo
} from '@/interfaces';
import { MutationTree } from 'vuex';
import * as types from './mutationTypes';

export const mutations: MutationTree<ISigninState> = {
    [types.AUTO_FILL_USERINFO](state, payload: { userInfo: IBindUserInfo }) {
        const { userInfo } = payload;
        const identity = getIdentity(userInfo);
        state[infoConstant[identity]['info']] = userInfo;
    },
    [types.UPDATE_REGISTER_DATA](state, payload: { registerData: IRegisterData<string> }) {
        state.registerData = payload.registerData;
    }
}