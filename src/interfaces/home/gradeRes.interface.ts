/**
 * 成绩管理页面返回类型
 */

import { AxiosResponse } from 'axios';

export interface IGradeInfoRes extends AxiosResponse {
    [ key: string ]: any;
}

// 学生成绩信息每一项的接口设计
export interface IGradeInfoResDataItem {
    courseName: string;
    makeupGrade: number;
    resetGrade: number;
    name: string;
    normalGrade: string;
    studentId: string;
}

// 学生成绩信息列表格式设计
export type IGradeInfoResDataList = Array<IGradeInfoResDataItem>

export enum rowTitle {
    studentId = '学号',
    name = '姓名',
    courseName = '课程名称',
    normalGrade = '平时成绩',
    makeupGrade = '补考成绩',
    resetGrade = '重修成绩'
}