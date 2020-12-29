import { CreateElement } from 'vue';
import { Component, Emit } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import IdentityInput from './identityInput';
import Lang from '@/lang/lang';
import {
    FORGOT_PASSWORD,
    REGISTER_COUNT
 } from '@/common/constants';

import './style.scss';

@Component({
    components: {
        IdentityInput
    }
})
export default class LoginWrapper extends mixins(Lang) {

    public isSelectProtocol: boolean = false;

    @Emit('handleRegister')
    public handleRegister() {}

    handleSelectProtocol(value: boolean) {
        this.isSelectProtocol = value;
    }

    renderIdentityComponent(h: CreateElement) {
        return h(this.$options.components!['IdentityInput'], {
            props: {
                isSelectProtocol: this.isSelectProtocol
            }
        })
    }

    render(h: CreateElement) {
        return (
            <div class='login-wrapper'>
                { this.renderIdentityComponent(h) }
                <div class='login__bottom-info'>
                    <div class='register-forget'>
                        <span onclick={ this.handleRegister }>{ this.t( REGISTER_COUNT ) }</span>
                        <span>{ this.t( FORGOT_PASSWORD ) }</span>
                    </div>
                    <div class='login__bottom-line'/>
                    <div class='disclaimer-text'>
                        <el-checkbox onchange={this.handleSelectProtocol}>
                            已阅读并同意<a href="">《用户隐私协议》</a>
                        </el-checkbox>
                    </div>
                </div>
            </div>
        )
    }
}