import { Component, Prop, Emit, Watch } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { mixins } from 'vue-class-component';
import { HomeRules } from '@/components/signin/rules';
import Lang from '@/lang/lang';
import { IRowHeader, IStudentGrade } from '@/interfaces';

import './style.scss';
import { isInputMatchRules } from '@/utlis';
import { AxiosResponse } from 'axios';

@Component
export default class InfoDialog extends mixins(Lang) {

    @Prop()
    public dialogVisible!: boolean;

    /**
     * alterData: 管理员或教师在使用修改功能时使用这个数据
     */
    @Prop()
    public alterData!: { [key: string]: any };

    /**
     * 需要修改或添加的数据项的一个列表
     */
    // TODO 修改类型 any
    @Prop()
    public rowList!: Array<IRowHeader> | []

    @Prop()
    operateType!: 0 | 1; // 操作类型，0 为修改 1 为添加

    @Prop()
    public dialogTitle!: string;

    @Prop()
    public rowIndex!: number;

    @Emit('closeDialog')
    public closeDialog() {}

    @Emit('updateModuleData')
    public updateTableData(res: IStudentGrade, rowIndex: number) {}

    @Watch('alterData', { deep: true })
    onModelChange(newVal: any, oldVal: any){
        this.model = { ...newVal }
    }

    @Action('handleChangeInfo')
    handleChangeInfo!: (payload: { data: any, id: number }) => Promise<IStudentGrade>

    public $refs!: {
        dialogForm: Vue & {
            validate: (param: any) => void
        }
    }

    public get moduleId() {
        return Number(this.$route.query.module as string)
    }

    public model = {
        ...this.alterData
    }

    public addData = {
        ...this.alterData
    }

    public async confirmDialog() {
        if(isInputMatchRules(this.$refs, 'dialogForm')) {
            const res = await this.handleChangeInfo({ data: this.model, id: this.moduleId });
            console.log('alterRes: ', res);
            if(res) {
                this.updateTableData(res, this.rowIndex);
                this.closeDialog();
            } else {
                // TODO: 修改失败
                this.$message.error('修改数据失败');
            }
        }
    }

    /** 检查输入是否合规(与每次输入判断不同，该方法用在整体对输入的判断上)
     * 
     */
    isInputValid(): boolean {
        // TODO: 优化返回判断输入是否符合规则的逻辑
        let res = false;
        this.$refs.dialogForm.validate((valid: boolean) => {
            res = valid;
        });
        return res;
    }

    public renderFormItem() {
        return [...this.rowList].map((item: IRowHeader) => {
            const rowName = item.rowName + ': ';
            return (
                <el-form-item label={rowName} prop={item.key}>
                    {
                        this.operateType
                        ? this.renderFormAddItem(item, item.key)
                        : <el-input v-model={this.model[item.key]}></el-input>
                    }
                </el-form-item>
            )
        })
    }

    public renderFormAddItem(data: IRowHeader, key: string) {
        if(!data.isSelect) {
            // 不需要选择
            return <el-input v-model={this.addData[key]}></el-input>
        } else if(data.selectOptions) {
            return (
                <el-select v-model={this.addData[key]}>
                    {
                        data.selectOptions.map((option: string) => (
                            <el-option label={option} value={option}></el-option>
                        ))
                    }
                </el-select>
            )
        }
    }

    render() {
        return (
            <div class='info-dialog'>
                <el-dialog 
                    show-close={false}
                    visible={this.dialogVisible}
                    title={this.dialogTitle}
                >
                    <el-form
                        ref='dialogForm'
                        rules={HomeRules}
                        { ...{ props: { model: this.operateType ? this.addData : this.model } } }
                    >
                        {
                            this.renderFormItem
                        }
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button 
                            onclick={ this.closeDialog }
                        >取 消</el-button>
                        <el-button 
                            type="primary" 
                            onclick={  this.confirmDialog }
                        >确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        )
    }
}