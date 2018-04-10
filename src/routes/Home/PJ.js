import React from 'react';
import { Icon, NavBar, List } from 'antd-mobile';
import { Rate } from 'antd';
import { process } from '../../services/api';

const { Item } = List;
const Brief = Item.Brief;
export default class PJ extends React.PureComponent {
  state = {
    list: []
  }
  componentWillMount() {
    process({
      bean: 'order',
      method: 'pageOrder',
      riderId: localStorage.id,
      orderStatus:4,
      page: 1,
      rows: 99
    }).then(res => {
      this.setState({list: res.rows})
    })
  }
  render() {
    return (
      <div style={{ width: '100%', textAlign: 'center' }} >
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => { window.location.hash = '/'; }}
        >用户评价
        </NavBar>
        <List>
          { this.state.list ?
            this.state.list.map(item=> {
              return (
                <Item key={item.id} extra={<Rate disabled defaultValue={item.evaluate? Number(item.stars) : 5} />} align="top" multipleLine>
                  {item.sendPhone} <Brief>{item.evaluate}</Brief>
                </Item>
              )  
            })
            : <Item>暂时没有获得评价</Item>
          }
        </List>
      </div>
    );
  }
}
