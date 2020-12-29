/**
 * 搜索需要信息格式
 * @param{string} studentId 学号
 * @param{string} course 课程对应的id
 */
export interface ISearchKeyInfo {
    studentId: string;
    courseId: number | string;
}

/**
 * 学生成绩查询返回结果数据格式
 */
export interface ISearchResult {
    code: number;
    message: string;
    data: ISearchResultData
}

/**
 * 搜索结果里面 data 的格式
 */
export interface ISearchResultData {
    studentId: string;
    courseName: string;
    grade: number;
}