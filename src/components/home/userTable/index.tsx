import { Component, Prop, Emit } from 'vue-property-decorator';
import { CreateElement } from 'vue';
import { State, Action } from 'vuex-class';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import InfoDialog from '@/components/common/dialog';
import { IUserItemData, IUserTableData, IRowData } from '@/interfaces';

import './style.scss';
import { ALTER } from '@/common/constants';
import { getMockData } from '@/utlis/mock';
import { courseInfo } from '@/common/mock';

@Component({
    components: {
        InfoDialog
    }
})
export default class UserTable extends mixins(Lang) {

    @Prop()
    tableData!: IUserTableData;

    @Prop()
    rowData!: IRowData;

    @Emit('handleDeleteRow')
    handleDeleteRow(payload: { rowIndex: number }) {
        
    }

    public showDialog: boolean = false;

    public alterData!: { [key: string]: any };

    public get dataKeys() {
        return Object.keys(this.tableData[0]);
    }

    public isDataValid() {
        if(this.tableData === undefined || !Object.keys(this.tableData)) {
            console.log('table data invalid: ', this.tableData);
            return false;
        }
        console.log('table data valid: ', this.tableData);
        return true;
    }

    // 监听 行点击
    public listenRowClick(row: any, column: any, e: any) {
        const option = e.target.innerText === ALTER;
        if(option) {
            // 修改
            this.showDialog = true;
            this.alterData = row;
        } else {
            // 删除
            this.handleDeleteRow({ rowIndex: row.rowIndex });
        }
    }

    public closeDialog() {
        this.showDialog = false;
    }

    public renderDialog(h: CreateElement) {
        return h(this.$options.components!['InfoDialog'], {
            props: {
                dialogVisible: this.showDialog,
                alterData: this.alterData,
                rowList: this.rowData,
                dialogTitle: '修改学生成绩',
                operateType: 0
            },
            on: {
                closeDialog: this.closeDialog
            }
        })
    }

    public tableRowClassName(param: any) {
        const { row, rowIndex } = param;
        row.rowIndex = rowIndex;
    }

    render(h: CreateElement) {
        getMockData('', 0);
        return (
            <div class='user-item-container'>
                { this.renderDialog(h) }
                <el-table
                    stripe
                    data={this.tableData}
                    height="450"
                    onrow-click={this.listenRowClick}
                    row-class-name={this.tableRowClassName}
                >
                    {
                        this.isDataValid && this.rowData.map((data: IUserItemData, index: number) => {
                            return (
                                <el-table-column
                                    prop={this.dataKeys[index]}
                                    label={this.rowData[index].rowName}
                                />
                            )
                        })
                    }
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="150"
                    >
                        <el-button 
                            size='mini' 
                            type='primary'
                        >修改</el-button>
                        <el-button 
                            size='mini' 
                            type='danger'
                        >删除</el-button>
                    </el-table-column>
                </el-table>
            </div>
        )
    }
}