import React, { Component } from 'react'

import { HashRouter as Router, Route, Switch ,Redirect} from 'react-router-dom'
 
import Admin from './admin'

import App from './App'

import NoMatch from './pages/noMatch'

import Login from './pages/login'

import Buttons from './pages/ui/Buttons.jsx'

import Modals from './pages/ui/Models'

import Loading from './pages/ui/Loading'

import Message from './pages/ui/Message'

import Tabs from './pages/ui/Tabs'

import Gallery from './pages/ui/Gallery'

import Carousel from './pages/ui/Carousel'

import ALogin from './pages/form/Login'

import Register from './pages/form/Register'

import BasicTable from './pages/table/BasicTable'

import HeightTable from './pages/table/HeightTable'

import City from './pages/city'

import Order from './pages/order'

import Notice from './pages/ui/Notice'

import Comment from './common'

import OrderDetail from './pages/order/detail'

import User from './pages/user'

import bikeMap from './pages/map/bikeMap'

import Bar from './pages/echarts/bar'

import Pie from './pages/echarts/pie'

import Line from './pages/echarts/line'

import Rich from './pages/rich'

import Permission from './pages/permission'

import Home from './pages/home'
export default class rootRouter extends Component {
    render() {
        return (
            <Router>
                <App>
                    <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/common' render={()=>{
                        return <Comment>
                            <Route path='/common/order/detail/:orderId' component={OrderDetail}  />
                        </Comment>
                    }}  />
                    <Route path='/' render={()=>
                    <Admin>
                        <Switch>
                        <Route path='/home' component={Home} />
                        <Route path='/ui/buttons' component={Buttons} />
                        <Route path='/ui/modals' component={Modals} />
                        <Route path='/ui/loadings' component={Loading} />
                        <Route path='/ui/notification' component={Notice} />
                        <Route path='/ui/messages' component={Message} />
                        <Route path='/ui/tabs' component={Tabs} />
                        <Route path='/ui/gallery' component={Gallery} />
                        <Route path='/ui/carousel' component={Carousel} />
                        <Route path='/form/login' component={ALogin} />
                        <Route path='/form/reg' component={Register} />
                        <Route path='/table/basic' component={BasicTable} />
                        <Route path='/table/high' component={HeightTable} />
                        <Route path='/city' component={City} />
                        <Route path='/order' component={Order} />
                        <Route path='/user' component={User} />
                        <Route path='/bikeMap' component={bikeMap} />
                        <Route path='/charts/Bar' component={Bar} />
                        <Route path='/charts/Pie' component={Pie} />
                        <Route path='/charts/line' component={Line} />
                        <Route path='/rich' component={Rich} />
                        <Route path='/permission'component={Permission} />
                        <Redirect to="/home"/>
                        <Route  component={NoMatch} />
                        </Switch>
                    </Admin>
                    } />
                    <Route path='/order/detail' component={Login} />
                    </Switch>
                </App>
            </Router>
        )
    }
}
