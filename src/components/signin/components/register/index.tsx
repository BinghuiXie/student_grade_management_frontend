import { Component, Emit, Prop } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { State, Action } from 'vuex-class';
import {
    SELECT_REGISTER_IDENTITY,
    INPUT_EMPLOYEE_ID,
    INPUT_PASSWPRD,
    CONFIRM_PASSWORD,
    INPUT_PHONE_NUMER,
    REGISTER_NOW,
    INPUT_STUDENT_ID,
    BACK_TO_LOGIN,
    MAX_EMPLOYEE_ID_LENGTH,
    MAX_PASSWORD_LENGTH,
    MIN_PASSWORD_LENGTH,
    MAX_STUDENT_ID_LENGTH,
    IDENTITY,
} from '@/common/constants';
import {
    IRegisterData
} from '@/interfaces';
import Lang from '@/lang/lang';

import './style.scss';
import { SigninRules } from '../../rules';

@Component
export default class RegisterWrapper extends mixins(Lang) {

    @State(state => state.signin.registerData)
    registerData!: IRegisterData<string>;

    public get model(): IRegisterData<string> {
        return {...this.registerData}
    }

    public get userId() {
        return this.model.identity === IDENTITY.STUDENTID ? this.model.studentId : this.model.employeeId;
    }

    public set userId(newValue) {
        if(this.model.identity === IDENTITY.STUDENTID) {
            this.model.studentId = newValue;
        } else {
            this.model.employeeId = newValue;
        }
    }

    public $refs!: {
        registerForm: Vue & { 
            validate: (param?: any) => boolean 
        }
    }

    @Emit('backToLogin')
    public backToLogin() {}

    @Action('handleInfoSubmit')
    handleInfoSubmit(payload: { data: IRegisterData<string>}) {
    }

    @Action('updateRegisterData')
    public updateRegisterData(payload: { registerData: IRegisterData<string> }) {}

    handleInput() {
        this.updateRegisterData({ registerData: this.model });
    }

    handleRegister() {
        this.$refs.registerForm.validate((valid: boolean) => {
            if(valid) {
                this.handleInfoSubmit({ data: this.model});
            } else {
                return false;
            }
        })
    }

    render() {

        return (
            <div class='register-wrapper'>
                <el-form 
                    {...{ props: { model: this.model } }}
                    rules={SigninRules}
                    ref='registerForm'
                >
                    <el-form-item>
                        <el-select
                            class='register__select-identity'
                            placeholder={ this.t(SELECT_REGISTER_IDENTITY) }
                            v-model={this.model.identity}
                            onChange={this.handleInput}
                        >
                            <el-option label='教师' value={IDENTITY.TEACHERID}></el-option>
                            <el-option label='学生' value={IDENTITY.STUDENTID}></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop={ this.model.identity === IDENTITY.STUDENTID ? 'studentId': 'employeeId' }>
                        <el-input
                            maxlength={ this.model.identity === IDENTITY.STUDENTID ? MAX_STUDENT_ID_LENGTH : MAX_EMPLOYEE_ID_LENGTH}
                            show-word-limit
                            v-model={this.userId}
                            onInput={this.handleInput}
                            placeholder={ 
                                this.model.identity === IDENTITY.STUDENTID
                                ? this.t( INPUT_STUDENT_ID )
                                : this.t( INPUT_EMPLOYEE_ID ) 
                            }
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop='password'>
                        <el-input 
                            maxlength={MAX_PASSWORD_LENGTH}
                            minlength={MIN_PASSWORD_LENGTH}
                            show-password
                            onInput={this.handleInput}
                            v-model={this.model.password}
                            placeholder={ this.t( INPUT_PASSWPRD ) }
                            type='password'
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop='confirmPass'>
                        <el-input
                            maxlength={MAX_PASSWORD_LENGTH}
                            minlength={MIN_PASSWORD_LENGTH}
                            onInput={this.handleInput}
                            v-model={this.model.confirmPass}
                            show-password
                            type='password'
                            placeholder={ this.t( CONFIRM_PASSWORD ) }
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop='phone'>
                        <el-input
                            onInput={this.handleInput}
                            v-model={this.model.phone}
                            placeholder={ this.t( INPUT_PHONE_NUMER ) }
                        ></el-input>
                    </el-form-item>
                    <el-form-item class='el-form-item__button'>
                        <el-button 
                            type='primary'
                            onclick={ () => { this.handleRegister() }}
                        >{ this.t( REGISTER_NOW ) }</el-button>
                    </el-form-item>
                    <div class='back-login' onclick={ this.backToLogin }>
                        <i class='iconfont icon-fenxiang'></i>
                        <span class='back-login__content'>{ this.t(BACK_TO_LOGIN) }</span>
                    </div>
                </el-form>
            </div>
        )
    }
}