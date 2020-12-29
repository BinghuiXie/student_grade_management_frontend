import { Component, Prop } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';

import './style.scss';
import { SYSTEM_TITLE } from '@/common/constants';

@Component
export default class Title extends mixins(Lang) {

    @Prop()
    title!: string;

    render() {
        return (
            <div class='title'>
                <span class='system-name'>{this.t(SYSTEM_TITLE)}/</span>
                <span class='module-name'>{this.title}</span>
            </div>
        )
    }
}