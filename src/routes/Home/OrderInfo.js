import React from 'react';
import { connect } from 'dva';
import { Icon, Form } from 'antd';
import { NavBar, Button, Switch, List, TextareaItem, Stepper, WhiteSpace, Radio, Flex, Modal, Tag, Checkbox, DatePicker } from 'antd-mobile';
import moment from 'moment';
import styles from './index.less';


const { Item } = List;
const { Brief } = Item;
@connect(({ home, login, loading }) => ({
  home,
  login,
  submitting: loading.effects['login/login'],
}))
@Form.create()
export default class Deliver extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }
  componentDidMount() {
    console.log(this.props.home.info)
  }
 

  sendOrder = (id) => {
    this.props.dispatch({
      type: 'home/receive',
      payload: {
        orderId: id,
        riderId: this.props.login.id,
      },
    });
    history.back();
  }
  cancelOrder = (orderId) => {
    this.props.dispatch({
      type: 'home/cancel',
      payload: {
        riderId: this.props.userId,
        orderId,
      },
    });
    history.back();
  }
  render() {
    const {info}= this.props.home;
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => { window.location.hash = '/'; }}
        >订单信息
        </NavBar>
        <List>
          <iframe
            id="test"
            src={`http://m.amap.com/navi/?start=${info.positionOriginating}&dest=${info.positionDestination}&key=608d75903d29ad471362f8c58c550daf`}
            width="100%"
            height="400"
            frameBorder="0"
          >
          </iframe>
          <Item arrow="horizontal">
           {info.sendStreet}
          </Item>
          <Item arrow="horizontal">
          {info.receiverStreet}
          </Item>
          <Item align="top" multipleLine>
              <div className={styles.center}><Icon type="clock-circle-o" /> {info.departureTime}</div>
          </Item>
        </List>
        <WhiteSpace size="xs" />
        <List>
          <Item>
            物品信息
            <Brief>
              <Flex style={{ textAlign: 'center' }}>
                <Flex.Item className={styles.column} ><Icon type="appstore" /><span>1</span></Flex.Item>
                <Flex.Item className={styles.column} ><Icon type="pay-circle" /><span>{info.goodsValue}</span></Flex.Item>
                <Flex.Item className={styles.column} ><Icon type="tag" /><span>{info.goodsWeight}公斤</span></Flex.Item>
              </Flex>
            </Brief>
          </Item>
          <Item
            extra={info.signFace == 1? "是":'否'}
          >
              当面签收
          </Item>
          <TextareaItem
            title="备注信息"
            value={info.tip}
            autoHeight
            disabled
          />
        </List>
        <WhiteSpace size="xs" />
        { info.orderStatus == 1?<Button  type="primary" onClick={()=>{this.sendOrder(info.orderId)}}>立刻接单</Button>: ''} 
        { info.orderStatus == 3?<Button  type="primary" onClick={()=>{this.cancelOrder(info.orderId)}}>取消订单</Button>: ''} 
        { info.orderStatus == 5?<Button>订单完成</Button>: ''} 
      </div>
    );
  }
}
