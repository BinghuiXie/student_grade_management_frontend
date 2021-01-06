import { COURSE_INFO_LIST } from './mutationType';
import { IIndexState } from './home.interface';
import { MutationTree } from 'vuex';

export const mutations: MutationTree<IIndexState> = {
    [COURSE_INFO_LIST](state, payload: { courseData: any }) {
        const { courseData } = payload;
        state.courseData = courseData;
    }
}