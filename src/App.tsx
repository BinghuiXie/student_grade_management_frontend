import { Vue, Component } from 'vue-property-decorator'
import './reset.scss'
import './fonts/iconfont.css'

@Component
export default class App extends Vue {

    renderComponent() {
        return (
            <div id='app'>
                <router-view></router-view>
            </div>
        )
    }

    render() {
        return this.renderComponent();
    }
}