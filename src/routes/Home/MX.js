import React from 'react';
import { connect } from 'dva';
import { List, InputItem, ImagePicker, Button, NavBar, Icon, Card} from 'antd-mobile';
import { NavLink } from 'dva/router';
import { getTodayData, process } from '../../services/api'; 
import styles from './index.less'

const { Item } = List;
const { Brief } = Item;
const status = [{ title: '全部' }, { title: '待接单' }, { title: '待取单' }, { title: '配送中' },
  { title: '已完成' }, { title: '已取消' }];

export default class MX extends React.PureComponent {
    state = {
        list: [],
        todayAmount: 0,
        todayOrderCount: 0,
    }
    componentDidMount(){
        getTodayData({riderId: localStorage.id}).then(res=>{
            this.setState({todayAmount: res.todayAmount, todayOrderCount: res.todayOrderCount})
        })
        process({
            riderId: localStorage.id,
            bean: 'order',
            method: 'pageOrder',
            page: 1,
            rows: 999,
            orderStatus: 4,
            today:true
        }).then(res=>{
            this.setState({list: res.rows})
        })
    }
    render(){
        return(
        <div> 
            <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => { window.location.hash = '/'; }}
            >明细
            </NavBar>
            <div className={styles['info-box']}>
                <div className={styles.box}>
                    <div><span>{ this.state.todayAmount / 100 }</span><span>收入(元)</span></div>
                    <div><span>{ this.state.todayOrderCount }</span><span>接单数(每日)</span></div>
                </div>
            </div>
            <div style={{ height: '100%', backgroundColor: '#fff' }}>
            { 
                this.state.list.map((item) => {
                    return (
                    <Card key={item.orderId}>
                        <Card.Body>
                        <Item extra={`合计￥${item.payPrice / 100}`} align="top" multipleLine>
                            单号：<span style={{ fontSize: '12px' }}>{item.orderId}</span>
                            <Brief>
                            <div>{item.sendAddress}</div>
                            <div>{item.receiverAddress}</div>
                            {/* <div>收件人：{item.receiverName}</div>
                            <div>电话：{item.receiverPhone}</div> */}
                            </Brief>
                        </Item>
                        </Card.Body>
                    </Card>
                    );
                })
            }
            <div style={{position: 'fixed', bottom: 0, width: '100%'}}>
                <NavLink to="/with">
                    <Button>提现</Button>
                </NavLink>    
            </div>
        </div>
        </div>    
        )
    }

}