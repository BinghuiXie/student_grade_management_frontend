import { ISearchKeyInfo, ISearchResult } from '@/interfaces';
import { IIndexState } from './home.interface';
import { IRootState } from '../rootState.interface';
import { ActionTree } from 'vuex';
import AJAX from '@/utlis/ajax';

const $http = new AJAX();

export const actions: ActionTree<IIndexState, IRootState> = {
    /**
     * 获取查询结果 (学生成绩查询)
     * @param context 
     * @param payload 
     */
    async getSearchResult(context, payload: { searchInfo: ISearchKeyInfo }) {
        const { searchInfo } = payload;
        const res = await $http.post<ISearchResult>('', searchInfo);
        return res;
    },
    /**
     * 用于处理管理员和教师对信息的修改和添加
     * @param context 
     * @param payload data 为修改后或需要添加的新的数据
     */
    handleChangeInfo(context, payload: { data: any }) {
        const { data } = payload;
    }
}