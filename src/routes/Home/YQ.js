import React from 'react';
import { Icon, NavBar, Tabs, SegmentedControl} from 'antd-mobile';
import { process } from '../../services/api';
const tabs = [
  { title: '我的邀请' },
  { title: '奖励明细' },
];
const u = navigator.userAgent;
const app = navigator.appVersion;
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // g
const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
export default class YQ extends React.PureComponent {
  state = {
    index: 0,
    list1:[],
    list2:[],
    list3:[],
    list4:[],
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
      rows: 99,
      userType: 2,
    }).then(res => {
      this.setState({list2: res.rows})
    })
    process({
      bean: 'user',
      method: 'pageUser',
      invitorPhone: localStorage.phone,
      page: 1,
      rows: 99,
      invitorType: 2,
    }).then(res => {
      this.setState({list3: res.rows})
    })
    process({
      bean: 'bounty',
      method: 'pageBounty',
      invitorPhone: localStorage.phone,
      page: 1,
      rows: 99,
      userType: 2,
    }).then(res => {
      this.setState({list4: res.rows})
    })
  }
  Share = (type) => {
    const info = {
      title: '巴比跑腿',
      URL: `http://rider.shjcqg.com/getshare?phone=${localStorage.phone}&invitorType=2`,
      type,
      content: '巴比跑腿',
    };
    if (isAndroid) {
      window.android.WeChatShare(JSON.stringify(info))
    }
    if (isIOS) {
      Native.WeChatShare(info)
    }  
  }

  Share2 = (type) => {
    const info = {
      title: '巴比跑腿',
      URL: `http://rider.shjcqg.com/getshare?phone=${localStorage.phone}&type=2`,
      type,
      content: '巴比跑腿',
    };
    if (isAndroid) {
      window.android.WeChatShare(JSON.stringify(info))
    }
    if (isIOS) {
      Native.WeChatShare(info)
    }  
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
                <div style={{ display: 'flex', backgroundColor: '#FFF', margin: '20px', padding: '10px'}}>
                  <div style={{ flex: 1 }}>
                    <img src="/i1.png" style={{ width: '50px', height: '50px'}} alt="" onClick={() => this.Share(1)}/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <img src="/i2.jpg" style={{ width: '50px', height: '50px'}} alt="" onClick={() => this.Share(2)}/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <img src="/i3.png" style={{ width: '50px', height: '50px'}} alt="" onClick={() => this.Share(3)}/>
                  </div>
                </div>
              </div>  
              <Tabs tabs={tabs}>
                <div style={{ alignItems: 'center', justifyContent: 'center', height: '250px', overflow:'scroll', backgroundColor: '#fff' }}>
                  {
                    this.state.list3 ?
                    (
                      this.state.list3.map(item=> {
                        return (
                          <p style={{padding: '5px'}}>成功邀请：{item.phone}</p>
                        )
                      })
                    )
                    : '您还没有奖励'
                  }
                </div>
                <div style={{ alignItems: 'center', justifyContent: 'center', height: '250px', overflow:'scroll', backgroundColor: '#fff' }}>
                  {
                    this.state.list4 ?
                    (
                      this.state.list4.map(item=> {
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
                    <img src="/i1.png" style={{ width: '50px', height: '50px'}} alt="" onClick={() => this.Share2(1)}/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <img src="/i2.jpg" style={{ width: '50px', height: '50px'}} alt="" onClick={() => this.Share2(2)}/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <img src="/i3.png" style={{ width: '50px', height: '50px'}} alt="" onClick={() => this.Share2(3)}/>
                  </div>
                </div>
              </div>  
              <Tabs tabs={tabs}>
                <div style={{ alignItems: 'center', justifyContent: 'center', height: '250px', overflow:'scroll', backgroundColor: '#fff' }}>
                  {
                    this.state.list1 ?
                    (
                      this.state.list1.map(item=> {
                        return (
                          <p style={{padding: '5px'}}>成功邀请：{item.phone}</p>
                        )
                      })
                    )
                    : '您还没有奖励'
                  }
                </div>
                <div style={{ alignItems: 'center', justifyContent: 'center', height: '250px', overflow:'scroll', backgroundColor: '#fff' }}>
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
