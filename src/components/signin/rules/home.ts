import RegMap from '@/common/regexp';


/**
 * 学生成绩查询，对关键字 courseId 的验证(主要是不能为空)
 * @param rule 
 * @param value 
 * @param cb 
 */
export const checkSearchCourse = (rule: any, value: string | number, cb: any) => {
    if(value === '') {
        return cb(new Error('请选择课程'))
    } else {
        cb();
    }
}

export const checkAddName = (rule: any, value: string, cb: any) => {
    if(!value) {
        return cb(new Error('姓名不能为空'))
    }
    const reg = RegMap.name;
    if(!reg.test(value)) {
        return cb(new Error('姓名应由2 - 4个中文字符组成'))
    } else {
         cb();
    }
}

export const checkGender = (rule: any, value: string, cb: any) => {
    if(!value) {
        return cb(new Error('姓名不能为空!'))
    } else {
        cb()
    }
} 

export const checkGrade = (rule: any, value: string, cb: any) => {
    if(!value) {
        return cb(new Error('成绩不能为空!'))
    }
    if(Number(value) > 100 || Number(value) < 0) {
        return cb(new Error('成绩应在0-100之间'))
    } else {
        cb();
    }
}