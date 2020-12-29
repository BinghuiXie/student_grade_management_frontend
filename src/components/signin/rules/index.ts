import { 
    checkSearchCourse,
    checkAddName,
    checkGender,
    checkGrade
} from './home';
import { 
    checkEmployeeId,
    checkPassword,
    checkConfirmPassword,
    checkPhoneNumber,
    checkStudentId,
    checkAdminUsername
 } from './signin';

const SigninRules: any = {
    employeeId: [
        { validator: checkEmployeeId, trigger: 'change' }
    ],
    studentId: [
        { validator: checkStudentId, trigger: 'change' }
    ],
    /** 管理员登录用户名 */
    username: [
        { validator: checkAdminUsername, trigger: 'change' }
    ],
    // 教师登录密码
    tPassword: [
        { validator: checkPassword, trigger: 'change' }
    ],
    // 学生登录密码
    sPassword: [
        { validator: checkPassword, trigger: 'change' }
    ],
    // 注册密码
    password: [
        { validator: checkPassword, trigger: 'change' }
    ],
    confirmPass: [
        { validator: checkConfirmPassword, trigger: 'change' }
    ],
    phone: [
        { validator: checkPhoneNumber , trigger: 'change' }
    ]
}

const HomeRules: any = {
    // 查询成绩关键字 => 课程
    courseId: [
        { validator: checkSearchCourse, trigger: 'change' }
    ],
    // 查询课程关键字 => 学号
    studentId: [
        { validator: checkStudentId, trigger: 'change' }
    ],
    // 查询姓名
    name: [
        { validator: checkAddName, trigger: 'change' }
    ],
    gender: [
        { validator: checkGender, trigger: 'change' }
    ],
    grade: [
        { validator: checkGrade, trigger: 'change' }
    ]
}

export {
    SigninRules,
    HomeRules
};