import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { TabBar, Drawer, List, Modal } from 'antd-mobile';
import { Route, Redirect, Switch, NavLink } from 'dva/router';
import { getRoutes } from '../utils/utils';
import GetOrder from '../routes/Home';
import Order from '../routes/Home/Order';
import Center from '../routes/Home/center';
import styles from './MobileLayout.less';

@connect(({ global, login, loading }) => ({
  global,
  openid: login.id,
  submitting: loading.effects['login/login'],
}))
class MobileLayout extends React.PureComponent {
  state = {
    open: false,
    selectedTab: '1',
    show: false,
  }

  componentWillMount() {
    this.setState({selectedTab: localStorage.selectedTab})
    if (!this.props.openid) {
      window.location.hash = '/user/login';
    } 
    else if(localStorage.blackFlag != 4) {
      window.location.hash = '/Id'
    }
    if(localStorage.depositStatus == 2 && localStorage.selectedTab == 1) {
      this.setState({show: true})
      return;
    }
  }
  onOpenChange = (tab = 3) => {
    this.setState({selectedTab: tab});
  }

  renderContent = (pageText) => {
    const { routerData, match } = this.props;
    // return (
    //   <Switch>
    //     {getRoutes(match.path, routerData).map(item =>
    //       (
    //         <Route
    //           key={item.key}
    //           path={item.path}
    //           component={item.component}
    //           exact={item.exact}
    //         />
    //       )
    //     )}
    //     <Redirect exact from="/" to="/deliver" />
    //   </Switch>
    // );
  }

  render() {
    console.log(this.state.selectedTab)
    return (
        <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            hidden={this.state.hidden}
          >
            <TabBar.Item
              title="接单"
              key="get"
              icon={<Icon type="rocket" style={{ fontSize: 21 }} />}
              selectedIcon={<Icon type="rocket" style={{ fontSize: 21, color: '#108ee9' }} />}
              selected={this.state.selectedTab == '1'}
              onPress={() => {
                this.setState({
                  selectedTab: '1',
                });
                localStorage.selectedTab = 1
                if(localStorage.depositStatus == 2) {
                  this.setState({show: true})
                  return;
                }
               
              }}
              data-seed="logId"
            >
              {this.state.selectedTab == 1 ? <GetOrder restart={this.onOpenChange}/> : ''}
            </TabBar.Item>
            <TabBar.Item
              title="已接"
              key="post"
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
                />
              }
              selected={this.state.selectedTab == '2'}
              onPress={() => {
                this.setState({
                  selectedTab: '2',
                });
                localStorage.selectedTab = 2
              }}
              data-seed="logId1"
            >
              {this.state.selectedTab == 2 ? <Order restart={this.onOpenChange} /> : ''}
            </TabBar.Item>
            <TabBar.Item
              title="我的"
              key="center"
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
                />
              }
              selected={this.state.selectedTab == '3'}
              onPress={() => {
                this.setState({
                  selectedTab: '3',
                });
                localStorage.selectedTab = 3
              }}
            >
              {<Center />}
            </TabBar.Item>
          </TabBar>
          <Modal
            visible={this.state.show}
            transparent
            maskClosable={false}
            title={<p>需要缴纳<span style={{color:"#108ee9"}}>300元</span>押金方可抢单</p>}
            footer={[{ text: '立即缴纳', onPress: () => { window.location.hash = '/yajin'; localStorage.selectedTab = 3; } }]}
          >
            累计接单满500单可随时申请提取现金
          </Modal>
        </div>
    );
  }
}

export default MobileLayout;
