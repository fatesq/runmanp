import React from 'react';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { List, Picker, InputItem, Button, NavBar, Icon } from 'antd-mobile';
import { alipayWithdraw, wxpayWithdraw } from '../../services/api';
@connect(({ login }) => ({
  userId: login.id,
}))
@createForm()
export default class Withdraw extends React.PureComponent {
  state={
    pickerValue: [1],
    data: [{value: 1, label: '支付宝', children: []}, {value: 2, label: '微信', children: []}],
  }
  onOk = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        const info = {
          "riderId": this.props.userId,
          "withdrawAmount": this.props.form.getFieldsValue().account * 100,
          "withdrawChannel": this.state.pickerValue[0]        
        }
        if(this.state.pickerValue[0] == 1){
          alipayWithdraw(info).then(res => {
            if(res.status == '00'){
              alert('提现成功')
              window.history.back();
            }else{
              alert(res.msg)
            }
          })
        }else{
          wxpayWithdraw(info).then(res => {
            if(res.status == '00'){
              alert('提现成功')
              window.history.back();
            }else{
              alert(res.msg)
            }
          })
        }
      } else {
        alert('填写错误');
      }
    });
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => { window.location.hash = '/'; }}
        >余额提现
        </NavBar>
        <List>
          <InputItem
            {...getFieldProps('account', {
              // initialValue: 'little ant',
              rules: [
                { required: true, message: '请输入金额' },
              ],
            })}
            clear
            error={!!getFieldError('account')}
            onErrorClick={() => {
              alert(getFieldError('account').join('、'));
            }}
            placeholder="请输入金额"
          >提现金额
          </InputItem>
          <Picker data={this.state.data} value={this.state.pickerValue} onOk={v => this.setState({ pickerValue: v })} cols={1} >
            <List.Item arrow="horizontal">支付方式</List.Item>
          </Picker>
          <Button onClick={this.onOk}>确认提现</Button>
        </List>  
      </div>  
    )
  }

}