/**
 * 教师信息管理 接口定义
 */

 export interface ITeacherInfoList {
     id: number;
     employeeId: string;
     password: string;
     name: string;
     gender: number;
     mail: string;
     phone: string;
     courseId: number;
     politicalAffiliation: string;
 }