import React from 'react';
import { connect } from 'dva';
import { Icon, Form } from 'antd';
import { NavBar, Button, Switch, List, TextareaItem, Stepper, WhiteSpace, Radio, Flex, Modal, Tag, Checkbox, DatePicker } from 'antd-mobile';
import moment from 'moment';
import { SMS, signOrder } from '../../services/api';
import styles from './index.less';
const GOODS = ['文件', '鲜花', '蛋糕', '水果生鲜', '食品饮料', '其他'];
const GOODS2 = ['其他', '医院排队', '小时工', '万能排队', '照看宠物', '餐厅占座', '购物', '公务'];
const u = navigator.userAgent;
const app = navigator.appVersion;
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // g
const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
const { Item } = List;
const { Brief } = Item;
const prompt = Modal.prompt;
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

  overOrder = (orderId) => {
    SMS({orderId:orderId}).then(res => {
       if(res.status == '00'){
          prompt(
            '完成订单',
            '请输入来自客户的验证码',
            [
              { text: '取消' },
              { text: '确定', onPress: value => this.postSMS(orderId,value) },
            ], 
            'default',
            ''
          )
       }else{
          alert(res.msg);
       }
    })
  }

  postSMS = (id,code) => {
    signOrder({orderId:id,checkCode:code}).then(res=>{
      if(res.status == '00') {
        prompt().close()
        window.history.back();
      }else{
        alert(res.msg)
      }
    })
  }

  Call = (phone) =>{
    if (isAndroid) {
      window.android.callNum(phone.trim())
    }
    if (isIOS) {
      Native.callNum(phone.trim())
    }  
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
          <Item arrow="horizontal" onClick={()=>this.Call(info.sendPhone)}>
            发货联系:{info.sendPhone}
          </Item>
          <Item wrap={true}>
           {info.sendAddress + info.sendStreet}
          </Item>
          <Item arrow="horizontal" onClick={()=>this.Call(info.receiverPhone)}>
            收货联系:{info.receiverPhone}
          </Item>
          <Item wrap={true}>
            {info.receiverAddress + info.receiverStreet}
          </Item>
          <Item align="top" multipleLine>
              <div className={styles.center}><Icon type="clock-circle-o" /> {info.departureTime}</div>
          </Item>
        </List>
        <WhiteSpace size="xs" />
        <List>
          <Item wrap={true}>
            物品类型：{info.orderType ==4 ? GOODS2[info.goodsType] : GOODS[info.goodsType]}
          </Item>
          <Item wrap={true}>
            物品价值：{info.goodsValue}
          </Item>
          <Item wrap={true}>
            物品重量：{info.goodsWeight} kg
          </Item>
          {
            /** <Item>
              物品信息
              <Brief>
                <Flex style={{ textAlign: 'center' }}>
                  <Flex.Item className={styles.column} ><Icon type="appstore" /><span>{info.orderType ==4 ? GOODS2[info.goodsType] : GOODS[info.goodsType]}</span></Flex.Item>
                  <Flex.Item className={styles.column} ><Icon type="pay-circle" /><span>{info.goodsValue}</span></Flex.Item>
                  <Flex.Item className={styles.column} ><Icon type="tag" /><span>{info.goodsWeight}公斤</span></Flex.Item>
                </Flex>
              </Brief>
            </Item> **/
          }
          <Item wrap={true}>
            支付方式：{info.payType == 1 ? '微信支付' : '支付宝支付'}
          </Item>
          <Item>
              当面签收：{info.signFace == 1? "是":'否'}
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
        { info.orderStatus == 3
          ? 
          <div style={{ display: 'flex'}}>
            <div style={{ flex: 1}}>
              <Button type="warning" onClick={()=>{this.cancelOrder(info.orderId)}}>取消订单</Button>
            </div>
            <div style={{ flex: 1}}>
              <Button type="primary" onClick={()=>{this.overOrder(info.orderId)}}>完成订单</Button>
            </div>
          </div>:''
        } 
      </div>
    );
  }
}
