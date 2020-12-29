/**
 * 学生信息管理 接口定义
 */

export interface IStudentInfoList {
    id: number;
    studentId: string;
    password: string;
    name: string;
    gender: number;
    nation: string;
    collegeId: number;
    majorId: number;
    year: number;
    class: string;
}