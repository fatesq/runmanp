import React from 'react';
import { Icon, NavBar, Tabs, SegmentedControl} from 'antd-mobile';
import { process } from '../../services/api';
const tabs = [
  { title: '我的邀请' },
  { title: '奖励明细' },
];
export default class YQ extends React.PureComponent {
  componentWillMount() {
    process({
      bean: 'rider',
      method: 'pageRider',
      invitorPhone: localStorage.phone,
      page: 1,
      rows: 99
    }).then(res => {
      this.setState({list1: res.rows})
    })
    process({
      bean: 'bounty',
      method: 'pageBounty',
      invitorPhone: localStorage.phone,
      page: 1,
      rows: 99
    }).then(res => {
      this.setState({list2: res.rows})
    })
    
  }
  render() {
    return (
      <div style={{ width: '100%', textAlign: 'center' }} >
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => { window.location.hash = '/'; }}
        >邀请好友
        </NavBar>
        <SegmentedControl values={['邀请用户', '邀请跑男']} />
        <img style={{ width: '100%', maxWidth: '750px', height: 'auto', margin: '0 auto' }} src="/one.jpg" alt="" />
        <Tabs tabs={tabs}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
            您还没有邀请
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
            您还没有奖励
          </div>
        </Tabs>
      </div>
    );
  }
}
