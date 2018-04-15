import React from 'react';
import { Icon, NavBar, List, Button, InputItem } from 'antd-mobile';
import { Rate } from 'antd';
import { createForm } from 'rc-form';
import { modifyRider } from '../../services/api';

const { Item } = List;
const Brief = Item.Brief;
@createForm()
export default class HB extends React.PureComponent {
  state = {
    list: [],
    realName: localStorage.realName || '',
    alipayAccount: localStorage.alipayAccount || '',    
  }
  submit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        const info = this.props.form.getFieldsValue();
        info.id = localStorage.id
        modifyRider(info).then(res=> {
          if(res.status == '00'){
            localStorage.alipayAccount = this.props.form.getFieldsValue().alipayAccount
            localStorage.realName = this.props.form.getFieldsValue().realName
            alert('绑定成功');
            window.location.hash = '/Pay'
          }else{
              alert(res.msg)
          }
        })
      } else {
        alert('填写错误');
      }
    });
    
  }
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div style={{ width: '100%', textAlign: 'center' }} >
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => { window.location.hash = '/'; }}
        >绑定账号
        </NavBar>
        <List>
          <InputItem
            {...getFieldProps('alipayAccount')}
            placeholder="请输入支付宝账号"
            clear
            defaultValue={this.state.alipayAccount}
            moneyKeyboardAlign="left"
          >支付宝账号</InputItem>
          <InputItem
            {...getFieldProps('realName')}
            placeholder="请输入真实姓名"
            clear
            defaultValue={this.state.realName}
            moneyKeyboardAlign="left"
          >姓名</InputItem>
          <Button onClick={this.submit}>绑定</Button>
        </List>
      </div>
    );
  }
}
