import { COURSE_INFO_LIST } from './mutationType';
import { AxiosResponse } from 'axios';
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
    async handleChangeInfo(context, payload: { data: any, id: number }) {
        const { data: newInfo, id } = payload;
        const res = await $http.post('/module/alter', {
            module: id,
            newModuleData: newInfo
        });
        return new Promise((resolve, reject) => {
            if(res.status === 200) {
                resolve(res.data);
            } else {
                reject(false);
            }
        })
    },

    /**
     * 根据传入 id 返回数据 
     * @param context 
     * @param payload 
     */
    async getRealModuleData(context, payload: { id: number }) {
        const { id } = payload;
        return await $http.get<any>(`/module/list`, {
            module: id
        });
    },

    async getCourseList(context, payload: {}) {
        const res = await $http.get('/course/list');
        console.log(res);
        res.status === 200 && context.commit(COURSE_INFO_LIST, {
            courseData: res.data
        });
    }
}