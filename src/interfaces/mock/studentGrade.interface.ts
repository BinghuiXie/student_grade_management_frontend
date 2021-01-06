/**
 * 学生成绩管理 接口定义
 */

/**
 * @param{string} studentId 学号
 * @param{string} name 姓名
 * @param{number} normalGrade 平时成绩
 * @param{number} makeipGrade 补考成绩
 * @param{number} resetGrade 重修成绩
 * @param{number} courseId 成绩对应课程id
 */
export interface IStudentGrade {
    studentId: string;
    name: string;
    normalGrade: number;
    makeupGrade: number;
    resetGrade: number;
    courseName: string;
}