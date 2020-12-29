import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';

import './style.scss';
import { SYSTEM_TITLE, SYSTEM_INTRO } from '@/common/constants';

@Component
export default class Main extends mixins(Lang) {

    enterSystem() {
        this.$router.push('/portal');
    }

    render() {
        return (
            <div class='main-container'>
                <div class='main-container__left-bg'></div>
                <div class='main-container__right-bg'></div>
                <div class='main-container__content'>
                    <div class='main-container__inner-circle'>
                        <div class='logo'>
                        <i class='iconfont icon-icon_xinyong_xianxing_jijin-'></i>
                        </div>
                    </div>
                    <div class='main-container__info'>
                        <div class='title'>{ this.t(SYSTEM_TITLE) }</div>
                        <div class='description'>
                            { this.t(SYSTEM_INTRO) }
                        </div>
                        <div class='button'>
                            <el-button 
                                type='primary'
                                onclick={this.enterSystem}
                            >立即使用</el-button>
                            <el-button type='primary'>关于我们</el-button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}