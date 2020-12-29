/**
 * 学院数据管理 接口定义
 */

 export interface ICollegeInfo {
     id: number;
     collegeName: string;
     majorIdList: Array<number>;
 }