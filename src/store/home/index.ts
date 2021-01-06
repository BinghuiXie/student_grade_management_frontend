import { actions } from './actions';
import { mutations } from './mutations';
import { IIndexState } from './home.interface';

const state: IIndexState = {
  searchInfo: {
      studentId: '',
      courseId: ''
  },
  courseData: []
}

export default {
  state,
  actions,
  mutations
}