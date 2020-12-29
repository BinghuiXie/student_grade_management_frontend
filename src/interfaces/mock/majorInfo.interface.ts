/**
 * 专业管理 数据格式 接口定义
 */

 /**
  * @param{number} id 序号
  * @param{string} majorName 专业名称
  * @param{number} collegeId 开设学院 id
  */
 export interface IMajorInfo {
     id: number;
     majorName: string;
     collegeId: number;
 }