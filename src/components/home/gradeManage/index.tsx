import { Component } from 'vue-property-decorator';
import { CreateElement } from 'vue';
import { State, Action } from 'vuex-class';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import Title from '../title';
import UserTable from '../userTable';
import InfoDialog from '@/components/common/dialog';

import './style.scss';
import { ISelectInfo } from '@/interfaces';
import { 
    studentGrade, 
    studentGradeRowList,
    courseInfo
} from '@/common/mock';
import { asideList } from '@/common/mock/asideList';

@Component({
    components: { 
        Title,
        UserTable,
        InfoDialog
    }
})
export default class GradeManage extends mixins(Lang) {

    public selectInfo: ISelectInfo = {
        courseId: ''
    }

    public dialogVisible: boolean = false;

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

    public closeDialog() {
        this.dialogVisible = false;
    }

    public renderUserTable(h: CreateElement) {
        return h(this.$options.components!['UserTable'], {
            props: {
                tableData: studentGrade,
                rowData: studentGradeRowList
            },
            on: {
                handleDeleteRow: this.handleDeleteRow
            }
        })
    }

    public get addData() {
        let data: { [key: string]: any } = {};
        [...studentGradeRowList].map(item => {
            data[item.key] = ''
        });
        return data;
    }

    public renderDialog(h: CreateElement) {
        return h(this.$options.components!['InfoDialog'], {
            props: {
                dialogVisible: this.dialogVisible,
                alterData: this.addData, // 添加操作 alterData 只需要和表头的 key 对应起来即可
                rowList: studentGradeRowList,
                dialogTitle: '添加学生成绩',
                operateType: 1
            },
            on: {
                closeDialog: this.closeDialog
            }
        })
    }

    public handleDeleteRow(param: { rowIndex: number }) {
        const { rowIndex } = param;
        // TODO: 数据改存放在 state 里面，删除 UI 和删除数据库里面的数据的逻辑合起来
        // 前端 UI 上删除
        studentGrade.splice(rowIndex, 1);
        // 删除数据库中的数据
    }

    public addStudentGrade() {
        this.dialogVisible = true;
    }

    public created() {

    }

    render(h: CreateElement) {
        return (
            <div class='grade-manage'>
                { this.renderTitle(h) }
                { this.renderDialog(h) }
                <div class='grade-manage__content'>
                    <el-container>
                        <el-header>
                            <div>
                                <el-input
                                    placeholder='请输入学号进行搜索'
                                />
                                <el-button type='primary'>搜索</el-button>
                            </div>
                        </el-header>
                        <el-main>
                            <div class='el-main__header'>
                                <el-form>
                                    <el-form-item label='请选择课程' class='el-main__header-select'>
                                        <el-select
                                            v-model={this.selectInfo.courseId}
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
                                            onclick={this.addStudentGrade}
                                        >添 加</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div class='el-main__content'>
                                { this.renderUserTable(h) }
                            </div>
                        </el-main>
                    </el-container>
                </div>
            </div>
        )
    }
}
