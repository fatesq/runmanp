import React from 'react';
import { Icon, NavBar, Tabs, SegmentedControl} from 'antd-mobile';
import { process } from '../../services/api';
const tabs = [
  { title: '我的邀请' },
  { title: '奖励明细' },
];
export default class YQ extends React.PureComponent {
  state = {
    index: 0,
    list1:[],
    list2:[],
  }
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
        <SegmentedControl values={['邀请用户', '邀请跑男']} onChange={(e)=> {this.setState({index: e.nativeEvent.selectedSegmentIndex})}}/>
        { 
          this.state.index == 0 ? 
          (
            <div>
              <div style={{ backgroundColor: '#FFF', paddingBottom: '20px' }}>
                <img style={{ width: '100%', maxWidth: '750px', height: 'auto', margin: '0 auto' }} src="/one.jpg" alt="" />
                <div style={{display: 'flex', backgroundColor: '#FFF', margin: '20px', padding: '10px'}}>
                  <div style={{ flex: 1 }}>
                    <img src="/i1.png" style={{ width: '50px', height: '50px'}} alt="" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <img src="/i2.jpg" style={{ width: '50px', height: '50px'}} alt="" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <img src="/i3.png" style={{ width: '50px', height: '50px'}} alt="" />
                  </div>
                </div>
              </div>  
              <Tabs tabs={tabs}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                  {
                    this.state.list1 ?
                    (
                      this.state.list1.map(item=> {
                        return (
                          <p style={{padding: '5px'}}>{item.bountyDesc}</p>
                        )
                      })
                    )
                    : '您还没有奖励'
                  }
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                  {
                    this.state.list2 ?
                    (
                      this.state.list2.map(item=> {
                        return (
                          <p style={{padding: '5px'}}>{item.bountyDesc}</p>
                        )
                      })
                    )
                    : '您还没有奖励'
                  }
                </div>
              </Tabs>
            </div>
          )
          :
          (
            <div>
              <div style={{ backgroundColor: '#F5A101', paddingBottom: '20px' }}>
                <img style={{ width: '100%', maxWidth: '750px', height: 'auto', margin: '0 auto' }} src="/two.jpg" alt="" />
                <div style={{display: 'flex', backgroundColor: '#FFF', margin: '20px', padding: '10px', border: '2px solid #6d3a0f'}}>
                  <div style={{ flex: 1 }}>
                    <img src="/i1.png" style={{ width: '50px', height: '50px'}} alt="" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <img src="/i2.jpg" style={{ width: '50px', height: '50px'}} alt="" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <img src="/i3.png" style={{ width: '50px', height: '50px'}} alt="" />
                  </div>
                </div>
              </div>  
              <Tabs tabs={tabs}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                  {
                    this.state.list1 ?
                    (
                      this.state.list1.map(item=> {
                        return (
                          <p style={{padding: '5px'}}>{item.bountyDesc}</p>
                        )
                      })
                    )
                    : '您还没有奖励'
                  }
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                  {
                    this.state.list2 ?
                    (
                      this.state.list2.map(item=> {
                        return (
                          <p style={{padding: '5px'}}>{item.bountyDesc}</p>
                        )
                      })
                    )
                    : '您还没有奖励'
                  }
                </div>
              </Tabs>
            </div>
          )
        }
      </div>
    );
  }
}
