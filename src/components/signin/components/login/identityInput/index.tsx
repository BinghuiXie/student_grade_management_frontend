import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import { 
    INPUT_PASSWPRD,
    REMEMBER_PASSWORD,
    MAX_PASSWORD_LENGTH,
    MIN_PASSWORD_LENGTH,
    ERROR_MESSAGE,
    SELECT_LOGIN_IDENTITY,
    IDENTITY,
    infoConstant
 } from '@/common/constants';
import { SigninRules } from '@/components/signin/rules';
import { 
    IStudentInfo, 
    ITeacherInfo,
    IBindUserInfo, 
    IAdminInfo,
    IUserInfo,
    ILoginResponseData
} from '@/interfaces';
import Storage from '@/utlis/localStorage';
import { isInputMatchRules } from '@/utlis';

const storage = new Storage();

const ComponentProp = Vue.extend({
    props: {
        isSelectProtocol: Boolean
    }
})

@Component
export default class IdentityInput extends mixins(Lang, ComponentProp) {

    @State(state => state.signin.studentInfo)
    studentInfo!: IStudentInfo;

    @State(state => state.signin.teacherInfo)
    teacherInfo!: ITeacherInfo;

    @State(state => state.signin.adminInfo)
    adminInfo!: IAdminInfo;

    @Action('autoFillUserInfo')
    private autoUpdateUserInfo!: (payload: { userInfo: IBindUserInfo }) => void

    @Action('handleUserLogin')
    private handleUserLogin!: (payload: { data: IBindUserInfo }) => Promise<ILoginResponseData>
    
    public $refs!: {
        loginForm: Vue & {
            validate: (param?: any) => any 
        };
    }

    @Prop()
    public isSelectProtocol: boolean = false;

    @Watch('identity')
    onIdentityChange() {
        if(storage.get(this.storageKey)) {
            this.autoFillUserInfo();
        } 
    }

    public identity: 0 | 1 | 2 = 1; // 0 => 教师; 1 => 学生  2 => 管理员

    public get identityConstant() {
        return infoConstant[this.identity];
    }

    public get userInfo(): IUserInfo {
        return {
            teacherInfo: this.teacherInfo,
            studentInfo: this.studentInfo,
            adminInfo: this.adminInfo
        }
    }

    /**
     * 获取当前 identity 对应的身份数据
     */
    public get model(): IBindUserInfo {
        const key = this.identityConstant['info'];
        return this.userInfo[key]
    }

    /**
     * 获取当前身份对应的存储在 localStorage 里面的 key 值
     */
    public get storageKey(): string {
        return this.identityConstant['storageKey'];
    }

    /**
     * 获取当前身份对应的用户名的长度
     */
    public get idLength(): number {
        return this.identityConstant['idLength'];
    }

    public get idPlaceholder(): string {
        return this.identityConstant['placeholder'];
    }

    public get idName(): string {
        return this.identityConstant['idName'];
    }

    public get pwdName(): string {
        return this.identityConstant['pwdName'];
    }

    public get idInput() {
        return this.model[this.idName];
    }

    public set idInput(value) {
        this.model[this.idName] = value;
    }

    public get userPwd(): string {
        return this.model[this.pwdName];
    }

    public set userPwd(value) {
        this.model[this.pwdName] = value;
    }

    public async clickLoginButton() {
        if(this.isSelectProtocol) {
            if(isInputMatchRules(this.$refs, 'loginForm')){
                const res = await this.handleUserLogin({ data: this.model });
                if(res && res.token) {
                    this.$router.push({
                        path: '/home',
                        query: {
                            id: this.identity.toString()
                        }
                    })
                } else {
                    this.$message.error(res.message);
                }
            }
        } else {
            this.$message.error(this.t(ERROR_MESSAGE.NOT_SELECT_USER_PROTOCOL));
        }
    }

    switchRememberPass(val: boolean) {
        if(val && isInputMatchRules(this.$refs, 'loginForm')) {
            // 将信息存入 localStorage
            storage.set(this.storageKey, this.model);
        }
    }

    /**
     *  自动填充用户名密码
     */
    autoFillUserInfo() {
        const data = storage.get(this.storageKey);
        this.autoUpdateUserInfo({ userInfo: data });
    }

    mounted() {
        if(storage.get(this.storageKey)) {
            this.autoFillUserInfo();
        }
    }

    render() {
        return (
            <el-form
                class='login-el-form'
                rules={SigninRules}
                ref='loginForm'
                {...{ props: { model: this.model } }}
            >
                <el-form-item class='login-el-form-item select-identity'>
                    <el-select
                        placeholder={ this.t(SELECT_LOGIN_IDENTITY) }
                        v-model={this.identity}
                    >
                        <el-option label='教师' value={IDENTITY.TEACHERID}></el-option>
                        <el-option label='学生' value={IDENTITY.STUDENTID}></el-option>
                        <el-option label='管理员' value={IDENTITY.ADMINID}></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    class='login-el-form-item'
                    prop={this.idName}
                >
                    <el-input
                        maxlength={ this.idLength }
                        show-word-limit
                        v-model={this.idInput}
                        placeholder={ this.t(this.idPlaceholder) }
                    ></el-input>
                </el-form-item>
                <el-form-item 
                    class='login-el-form-item password__content' 
                    prop={this.pwdName}
                >
                    <el-input
                        type='password'
                        maxlength={MAX_PASSWORD_LENGTH}
                        minlength={MIN_PASSWORD_LENGTH}
                        show-password
                        v-model={this.userPwd}
                        placeholder={ this.t(INPUT_PASSWPRD) }
                    ></el-input>
                </el-form-item>
                <el-form-item class='login-el-form-item remember-pwd'>
                    <el-checkbox
                        ref='checkbox'
                        onchange={this.switchRememberPass}
                    >{ this.t(REMEMBER_PASSWORD) }</el-checkbox>
                </el-form-item>
                <el-form-item class='login-el-form-item'>
                    <el-button type='primary' onclick={ this.clickLoginButton }>
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        )
    }
}