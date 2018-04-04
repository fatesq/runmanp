import React from 'react';
import { connect } from 'dva';
import { List, InputItem, ImagePicker, Button } from 'antd-mobile';
import { modifyRider } from '../../services/api'; 


export default class Id extends React.PureComponent {
    render(){
      return(
        <div>
          <p style={{fontSize: '16px', fontWeight: 600, textAlign: 'center', padding: '10px 10px'}}>当前押金</p>
          <p style={{fontSize: '16px', fontWeight: 600, textAlign: 'center', padding: '5px 10px'}}>￥ 0</p>
          <Button>缴纳押金</Button>
          <Button>退还押金</Button>
        </div>
      )
    }
}