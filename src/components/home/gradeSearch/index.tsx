import { Component, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { Action } from 'vuex-class';
import Lang from '@/lang/lang';
import Title from '../title';

import './style.scss';
import { CreateElement } from 'vue/types/umd';
import { ISearchKeyInfo, ISearchResult } from '@/interfaces';
import { courseInfo } from '@/common/mock';
import { HomeRules } from '@/components/signin/rules';
import { IAxiosResponse } from '@/utlis/ajax';
import { asideList } from '@/common/mock/asideList';

@Component({
    components: {
        Title
    }
})
export default class GradeSearch extends mixins(Lang) {

    @Action('getSearchResult')
    public getSearchResult!: (payload: { searchInfo: ISearchKeyInfo }) => Promise<IAxiosResponse<ISearchResult>>;

    public searchInfo: ISearchKeyInfo = {
        studentId: '',
        courseId: ''
    };

    public $refs!: {
        searchForm: Vue & {
            validate: (param?: any) => any 
        };
    }

    public renderTitle(h: CreateElement) {
        if(this.$route.query.module) {
            const key = decodeURIComponent(this.$route.query.module as string);
            const name = asideList.find(item => item.key === +key)?.name;
            return h(this.$options.components!['Title'], {
                props: {
                    title: name
                }
            })
        }
    }

    public isInputValid(): boolean {
        // TODO: 优化返回判断输入是否符合规则的逻辑
        let res = false;
        this.$refs.searchForm.validate((valid: boolean) => {
            res = valid;
        });
        return res;
    }

    public async clickSearchButton(searchInfo: ISearchKeyInfo) {
        if(this.isInputValid()) {
            const res = await this.getSearchResult({ searchInfo });
            const { data } = res.data;
            const h = this.$createElement;
            // 打开消息弹窗
            res.status === 200 && this.$msgbox({
                title: '查询结果',
                message: h('div', { class: 'message-box' }, 
                [
                    h('p', { class: 'message-content' }, [ h('span', { class: 'message-item__title' }, '学号：'), h('span', { class: 'message-item__content' }, this.searchInfo.studentId) ]),
                    h('p', { class: 'message-content' }, [ h('span', { class: 'message-item__title' }, `${data.courseName}成绩：`), h('span', { class: 'message-item__content' }, '60') ]),
                ]),
                confirmButtonText: '确定',
            }).then(action => {
                    this.$message({
                        type: 'info',
                        message: 'action: ' + action
                    });
                });
            }   
    }

    render(h: CreateElement) {
        return (
            <div class='grade-search'>
                { this.renderTitle(h) }
                <div class='grade-search__content'>
                    <div class='grade-search__content-box'>
                        <el-form 
                            {...{ props: { model: this.searchInfo } }}
                            rules={HomeRules}
                            ref='searchForm'
                        >
                            <el-form-item label='请输入学号' prop='studentId'>
                                <el-input
                                    v-model={this.searchInfo.studentId}
                                ></el-input>
                            </el-form-item>
                            <el-form-item label='请选择课程' prop='courseId'>
                                <el-select
                                    v-model={this.searchInfo.courseId}
                                >
                                    {
                                        courseInfo.map(courseItem => {
                                            return (
                                                <el-option
                                                    label={courseItem.courseName}
                                                    value={courseItem.id}
                                                    key={courseItem.id}
                                                ></el-option>
                                            )
                                        })
                                    }
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button
                                    type='primary'
                                    onclick={() => { this.clickSearchButton(this.searchInfo) }}
                                >查询</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        )
    }
}