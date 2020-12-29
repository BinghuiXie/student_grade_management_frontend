import { isArray } from './../../utlis/array';

export interface IUserItemData {
    [key: string]: any;
}

export type IUserTableData = Array<IUserItemData> 

export interface IRowData extends IUserItemData {
    key: string;
    rowName: string;
}

/**
 * RowHeader 规定了表头的项以及修改和添加的时候需要修改和添加的项目，每一个项目都包括这些属性
 * @param {string} key key用于和表格真实数据里面每一项的 key 值对应
 * @param {string} rowName 规定了表头的名字以及修改和添加项目的名字
 * @param {boolean} readonly 规定了表格数据是否可以修改
 * @param {boolean} addible 规定了表格数据是否需要添加（例如排名可以根据成绩计算出来就不需要添加）
 * @param {boolean} isSelect 表示是否需要渲染为下拉框的形式，比如说 性别 gender
 * @param {Array} selectOptions 如果需要下拉框，则下拉框的数据
 */
export interface IRowHeader {
    key: string;
    rowName: string;
    readonly: boolean;
    addible: boolean;
    isSelect: boolean;
    selectOptions?: Array<string>
}