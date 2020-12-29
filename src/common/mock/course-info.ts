import { ICourseInfo } from '@/interfaces';

export const courseInfo: Array<ICourseInfo> = [
    {
        id: 0,
        courseCode: 'B0301152S',
        courseName: '计算机通信与网络',
        courseMaterial: '《计算机通信与网络》',
        examineType: 1,
        teacherIdList: [0, 1, 2],
        courseCredit: '3.5',
        collegeId: 0
    },
    {
        id: 1,
        courseCode: 'B0200013S',
        courseName: '通信原理',
        courseMaterial: '《通信原理 精编本》',
        examineType: 1,
        teacherIdList: [3, 4, 5],
        courseCredit: '3.0',
        collegeId: 1
    },
    {
        id: 2,
        courseCode: 'B0301141S',
        courseName: '编译原理',
        courseMaterial: '《编译原理A》',
        examineType: 1,
        teacherIdList: [6, 7, 8],
        courseCredit: '3.0',
        collegeId: 0
    },
    {
        id: 3,
        courseCode: 'B0100012C',
        courseName: '现代管理科学基础',
        courseMaterial: '',
        examineType: 1,
        teacherIdList: [9],
        courseCredit: '2.0',
        collegeId: 2
    },
]