import React from 'react';
import { Icon, NavBar, List, Button, InputItem } from 'antd-mobile';
import { Rate } from 'antd';
import { createForm } from 'rc-form';
import { addCooperation } from '../../services/api';

const { Item } = List;
const Brief = Item.Brief;
@createForm()
export default class HB extends React.PureComponent {
  state = {
    list: []
  }
  submit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        addCooperation(this.props.form.getFieldsValue()).then(res=> {
          window.location.hash = '/'
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
        >合作伙伴
        </NavBar>
        <List>
          <InputItem
            {...getFieldProps('phone')}
            type='phone'
            placeholder="请输入联系电话"
            clear
            moneyKeyboardAlign="left"
          >联系电话</InputItem>
          <InputItem
            {...getFieldProps('city')}
            placeholder="请输入意向城市"
            clear
            moneyKeyboardAlign="left"
          >意向城市</InputItem>
          <InputItem
            {...getFieldProps('name')}
            placeholder="请输入姓名"
            clear
            moneyKeyboardAlign="left"
          >姓名</InputItem>
          <InputItem
            {...getFieldProps('amount')}
            placeholder="请输入意向投资金额"
            clear
            moneyKeyboardAlign="left"
          >投资金额</InputItem>
          <Button onClick={this.submit}>提交</Button>
        </List>
      </div>
    );
  }
}
