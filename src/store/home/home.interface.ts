import { ISearchKeyInfo, ICourseDataItem } from '@/interfaces';

export interface IIndexState {
    searchInfo: ISearchKeyInfo,
    courseData: Array<ICourseDataItem>
}