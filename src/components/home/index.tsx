import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import { asideList } from '@/common/mock/asideList';

import './style.scss';

@Component
export default class Home extends mixins(Lang) {

    public identity: 0 | 1 | 2 = 1; // 0 教师 1 学生 2 管理员

    switchTab(key: number) {
        const path = '/home/' + asideList[key].route;
        this.$router.push({
            path,
            query: {
                module: encodeURIComponent(asideList[key].key) 
            }
        }).catch(() => {})
    }

    mounted() {
        const { query } = this.$route;
        if('id' in query) {
            this.identity = Number(query.id) as 0 | 1 | 2;
        }
    }

    render() {
        return (
            <div class='home-container'>
                <el-container>
                    <el-header>
                        <div class='el-header__left'>成绩管理系统</div>
                        <div class='el-header__right'></div>
                    </el-header>
                    <el-container>
                        <el-aside width="200px">
                            {
                                asideList.map(asideItem => {
                                    if(asideItem.identity === this.identity) {
                                        return (
                                            <div class='el-aside__item'
                                                onclick={ () => { this.switchTab(asideItem.key) }}
                                            >{asideItem.name}</div>
                                        )
                                    }
                                })
                            }
                        </el-aside>
                        <el-main>
                            <router-view></router-view>
                        </el-main>
                    </el-container>
                </el-container>
            </div>
        )
    }
}