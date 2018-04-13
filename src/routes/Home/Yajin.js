import React from 'react';
import { connect } from 'dva';
import { List, InputItem, Picker, Button, NavBar, Icon, WingBlank, WhiteSpace } from 'antd-mobile';
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
  componentDidMount(){
    if (isAndroid) {
      // 这个是安卓操作系统
      const info = window.android.getUserInfo();
      getConfig({city: info.city || '南京'}).then(res =>{
        this.setState({deposit:res.obj.deposit})
      })
    }
    if (isIOS) {
      // 这个是ios操作系统
      // alert('ios')
      // window.onload=function(){ 
        console.log('useinfo')
        const info = window.Native.getUserInfo();
        console.log('info.city')
        getConfig({city: info.city || '南京'}).then(res =>{
          console.log(res.obj.deposit);
          this.setState({deposit:res.obj.deposit})
        })
      // } 
    } else {
      getConfig({city: '南京'}).then(res =>{
        console.log(res)
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
        if (isAndroid) {
          window.android.wxDep(res);
        }
        if (isIOS) {
          Native.wxDep(res)
        }  
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
        if (isAndroid) {
          window.android.aliDep(res)
        }
        if (isIOS) {
          Native.aliDep(res)
        }
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
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => { window.location.hash = '/'; }}
        >押金
        </NavBar>
        <p style={{fontSize: '16px', fontWeight: 600, textAlign: 'center', padding: '10px 10px'}}>{localStorage.depositStatus == 1 ? '已支付押金' : '充值金额'} </p>
        <p style={{fontSize: '16px', fontWeight: 600, textAlign: 'center', padding: '5px 10px'}}>￥ { deposit ? deposit / 100 : 0}</p>
        <p style={{fontSize: '16px', textAlign: 'center', padding: '5px 10px', paddingBottom: '20px', borderBottom: '1px solid #CCC'}}>接满500单, 可提取押金</p>
        <Picker data={this.state.data} value={this.state.pickerValue} onOk={v => this.setState({ pickerValue: v })} cols={1} >
          <List.Item arrow="horizontal" style={{marginBottom: '20px'}}>支付方式</List.Item>
        </Picker>
        <WingBlank>
        { localStorage.depositStatus == 2
          ?
          (<Button type="primary" onClick={this.state.pickerValue[0] == 1 ? this.alipay : this.wxpay}>
            { this.state.pickerValue[0] == 1 ? '支付宝支付' : '微信支付' }
          </Button>)
          :''
        }  
        { localStorage.depositStatus == 1
          ?
          (<Button type="ghost" onClick={this.state.pickerValue[0] == 1 ? this.reAlwxpiPay : this.reWxPay}>退还押金</Button>)
          :''
        }
        <WhiteSpace />
        { localStorage.depositStatus == 2
          ?
          (<Button onClick={()=> { window.location.hash ='/user/login'}}>返回登录</Button>)
          :''
        }
        </WingBlank>
      </div>
    )
  }
}