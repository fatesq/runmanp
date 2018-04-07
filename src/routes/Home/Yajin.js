import React from 'react';
import { connect } from 'dva';
import { List, InputItem, Picker, Button } from 'antd-mobile';
import { getConfig, alipayDeposit, wxpayDeposit, alipayRefundDeposit, wxpayRefundDeposit} from '../../services/api'; 

const u = navigator.userAgent;
const app = navigator.appVersion;
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // g
const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
export default class Yajin extends React.PureComponent {
  state = {
    deposit: 0,
    pickerValue: [1],
    data: [{value: 1, label: '支付宝', children: []}, {value: 2, label: '微信', children: []}],
  }
  componentWillMount(){
    if (isAndroid) {
      // 这个是安卓操作系统
    }
    if (isIOS && window.iOSNative) {
      // 这个是ios操作系统
      const info = iOSNative.getUserInfo();
      getConfig({city: info.city || 'nanjing'}).then(res =>{
        this.setState({deposit:res.obj.deposit})
      })
    } else {
      getConfig({city: '南京'}).then(res =>{
        this.setState({deposit:res.obj.deposit})
      })
    }
  }

  wxpay = () => {
    const info ={
      riderId: localStorage.id,
      depositAmount: this.state.deposit
    }
    wxpayDeposit(info).then(res=>{
      if(res.status == '00'){
        Native.wxDep()
      }else{
        alert(res.msg)
      }
    })
  }
  alipay = () => {
    const info ={
      riderId: localStorage.id,
      depositAmount: this.state.deposit
    }
    alipayDeposit(info).then(res=>{
      if(res.status == '00'){
        Native.aliDep()
      }else{
        alert(res.msg)
      }
    })
  }
  reAlwxpiPay = () => {
    alipayRefundDeposit({riderId: localStorage.id}).then(res=>{
      if(res.status == '00'){
        alert('成功转入支付宝')
        window.location.hash = '/'
      }else{
        alert(res.msg)
      }
    })
  }
  reWxPay = () => {
    wxpayRefundDeposit({riderId: localStorage.id}).then(res=>{
      if(res.status == '00'){
        alert('成功转入微信')        
        window.location.hash = '/'
      }else{
        alert(res.msg)
      }
    })
  }
  render(){
    const {deposit} = this.state
    return(
      <div>
        <p style={{fontSize: '16px', fontWeight: 600, textAlign: 'center', padding: '10px 10px'}}>当前押金</p>
        <p style={{fontSize: '16px', fontWeight: 600, textAlign: 'center', padding: '5px 10px'}}>￥ { deposit ? deposit : 0}</p>
        <Picker data={this.state.data} value={this.state.pickerValue} onOk={v => this.setState({ pickerValue: v })} cols={1} >
          <List.Item arrow="horizontal">支付方式</List.Item>
        </Picker>
        <Button onClick={this.state.pickerValue[0] == 1 ? this.alipay : this.wxpay}>
          { this.state.pickerValue[0] == 1 ? '支付宝' : '微信' }
        </Button>
        <Button onClick={this.state.pickerValue[0] == 1 ? this.reAlwxpiPay : this.reWxPay}>退还押金</Button>
      </div>
    )
  }
}