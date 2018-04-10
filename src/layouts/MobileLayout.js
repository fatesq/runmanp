import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { TabBar, Drawer, List } from 'antd-mobile';
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
  }

  componentWillMount() {
    this.setState({selectedTab: '1'})
    if (!this.props.openid) {
      window.location.hash = '/user/login';
    } 
    else if(localStorage.blackFlag != 4) {
      window.location.hash = '/Id'
    }
    else if(localStorage.depositStatus == 2) {
      window.location.hash = '/yajin'
    }
  }
  onOpenChange = (tab = 1) => {
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
              }}
            >
              {<Center />}
            </TabBar.Item>
          </TabBar>
        </div>
    );
  }
}

export default MobileLayout;
