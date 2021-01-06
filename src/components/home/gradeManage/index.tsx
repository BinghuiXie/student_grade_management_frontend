import { Component, Watch } from 'vue-property-decorator';
import { CreateElement } from 'vue';
import { State, Action } from 'vuex-class';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import Title from '../title';
import UserTable from '../userTable';
import InfoDialog from '@/components/common/dialog';

import './style.scss';
import { ISelectInfo, ICourseDataItem, IStudentGrade } from '@/interfaces';
import { 
    studentGrade, 
    studentGradeRowList
} from '@/common/mock';
import { asideList } from '@/common/mock/asideList';
import { rowTitleMapList } from '@/common/constants';

@Component({
    components: { 
        Title,
        UserTable,
        InfoDialog
    }
})
export default class GradeManage extends mixins(Lang) {

    @Action('getRealModuleData')
    public getRealData!: ( payload: { id: number } ) => Promise<any>

    @Action('getCourseList')
    public getCourseList!: () => void

    @State(state => state.home.courseData)
    courseInfo!: Array<ICourseDataItem>;

    @Watch('$route')
    routeChange(to: any, from: any) {
        this.getData();
    }

    public get courseList() {
        if(this.courseInfo) {
            return this.courseInfo
        }
        return [];
    }

    public selectInfo: ISelectInfo = {
        courseId: ''
    }

    public dialogVisible: boolean = false;

    public tableData: any[] = [];

    public rowTitleList: any[] = [];

    public tableFilterData: any[] | string = '';

    public get moduleId() {
        return Number(this.$route.query.module as string)
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

    public closeDialog() {
        this.dialogVisible = false;
    }

    public updateAlterData(newData: IStudentGrade, rowIndex: number) {
        console.log('newData: ', newData)
        this.tableData.splice(rowIndex, 1, newData);
    }

    public renderUserTable(h: CreateElement) {
        return h(this.$options.components!['UserTable'], {
            props: {
                tableData: this.tableFilterData || this.tableData,
                rowData: this.rowTitleList
            },
            on: {
                handleDeleteRow: this.handleDeleteRow,
                updateAlterData: this.updateAlterData
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

    public handleSelectChange(value: any) {
        this.tableFilterData = this.tableData.filter(rowData => rowData.courseName === value)
    }

    public addStudentGrade() {
        this.dialogVisible = true;
    }

    public async getData() {
        const res = await this.getRealData({ id: this.moduleId });
        this.tableData = res.data;
        const moduleRowObj = rowTitleMapList.find(item => item.module === this.moduleId);
        if(moduleRowObj) {
            this.rowTitleList = moduleRowObj.titleList;
        }
    }

    public async created() {
        /* 获取真实数据 */
        if(this.courseList.length === 0) {
            await this.getCourseList();
        }
        this.getData();
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
                                    {
                                        this.moduleId === 0 ?
                                        <el-form-item label='请选择课程' class='el-main__header-select'>
                                            <el-select
                                                onchange={this.handleSelectChange}
                                                v-model={this.selectInfo.courseId}
                                            >
                                                {
                                                    this.courseList.map((courseItem: ICourseDataItem) => {
                                                        return (
                                                            <el-option
                                                                label={courseItem.courseName}
                                                                value={courseItem.courseName}
                                                                key={courseItem.courseCode}
                                                            ></el-option>
                                                        )
                                                    })
                                                }
                                            </el-select>
                                        </el-form-item>
                                        : null
                                    }
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
