const regexpRules = {
    employeeId: /^[0-9]{8}$/,
    studentId: /^[A-Z][0-9]{8}$/,
    password: /^[0-9]+[A-z]{1,}[a-z]+/,
    phone: /^1[3-9]\d{9}$/,
    username: /^[a-z]{5}/,
    name: /^[\u4E00-\u9FA5]{2,4}$/, // 姓名
}

export default regexpRules;