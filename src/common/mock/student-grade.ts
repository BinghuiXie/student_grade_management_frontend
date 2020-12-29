import { IRowHeader, IStudentGrade } from '@/interfaces';

export const studentGrade: Array<IStudentGrade> = [
    {
        studentId: 'B17040231',
        name: '李四',
        normalGrade: 60,
        makeupGrade: 0,
        resetGrade: 0,
        courseId: 0
    },
    {
        studentId: 'B17040231',
        name: '李四',
        normalGrade: 60,
        makeupGrade: 0,
        resetGrade: 0,
        courseId: 1
    },
    {
        studentId: 'B17040231',
        name: '李四',
        normalGrade: 60,
        makeupGrade: 0,
        resetGrade: 0,
        courseId: 2
    },
    {
        studentId: 'B17040231',
        name: '张三',
        normalGrade: 60,
        makeupGrade: 0,
        resetGrade: 0,
        courseId: 0
    },
    {
        studentId: 'B17040231',
        name: '张三',
        normalGrade: 60,
        makeupGrade: 0,
        resetGrade: 0,
        courseId: 1
    },
    {
        studentId: 'B17040231',
        name: '张三',
        normalGrade: 60,
        makeupGrade: 0,
        resetGrade: 0,
        courseId: 2
    },
    {
        studentId: 'B17040231',
        name: '唐三',
        normalGrade: 60,
        makeupGrade: 0,
        resetGrade: 0,
        courseId: 0
    },
    {
        studentId: 'B17040231',
        name: '唐三',
        normalGrade: 60,
        makeupGrade: 0,
        resetGrade: 0,
        courseId: 1
    },
    {
        studentId: 'B17040231',
        name: '唐三',
        normalGrade: 60,
        makeupGrade: 0,
        resetGrade: 0,
        courseId: 2
    },
    {
        studentId: 'B17040231',
        name: '小舞',
        normalGrade: 60,
        makeupGrade: 0,
        resetGrade: 0,
        courseId: 0
    },
    {
        studentId: 'B17040231',
        name: '小舞',
        normalGrade: 60,
        makeupGrade: 0,
        resetGrade: 0,
        courseId: 1
    },
    {
        studentId: 'B17040231',
        name: '小舞',
        normalGrade: 60,
        makeupGrade: 0,
        resetGrade: 0,
        courseId: 2
    },
    {
        studentId: 'B17040231',
        name: '戴沐白',
        normalGrade: 60,
        makeupGrade: 0,
        resetGrade: 0,
        courseId: 0
    },
    {
        studentId: 'B17040231',
        name: '戴沐白',
        normalGrade: 60,
        makeupGrade: 0,
        resetGrade: 0,
        courseId: 1
    },
    {
        studentId: 'B17040231',
        name: '戴沐白',
        normalGrade: 60,
        makeupGrade: 0,
        resetGrade: 0,
        courseId: 2
    },
]

export const studentGradeRowList: Array<IRowHeader> = [
    {
        key: 'studentId',
        rowName: '学号',
        readonly: true,
        addible: true, // 是否需要添加，不需要添加的项目不需要渲染
        isSelect: false
    }, 
    {
        key: 'name',
        rowName: '姓名',
        readonly: true,
        addible: true,
        isSelect: false
    }, 
    {
        key: 'normalGrade',
        rowName: '平时成绩',
        readonly: true,
        addible: true,
        isSelect: true,
        selectOptions: ['男', '女']
    }, 
    {
        key: 'makeupGrade', 
        rowName: '补考成绩',
        readonly: false,
        addible: true,
        isSelect: false
    },
    {
        key: 'resetGrade',
        rowName: '重修成绩',
        readonly: true,
        addible: false, // 例如名次是根据成绩计算的，不需要添加
        isSelect: false
    },
    {
        key: 'courseId',
        rowName: '课程名称',
        readonly: true,
        addible: false, 
        isSelect: false
    }
];