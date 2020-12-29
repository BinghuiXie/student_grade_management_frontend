/**
 * 课程信息数据格式接口定义
 */

export interface ICourseInfo {
    id: number;
    courseCode: string;
    courseName: string;
    courseMaterial: string;
    examineType: 0 | 1;
    teacherIdList: Array<number>;
    courseCredit: string;
    collegeId: number;
 }

 export enum ExamineTypeMap {
     '考核',
     '考试'
 }