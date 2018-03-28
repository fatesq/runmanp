import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { TabBar, Drawer, List } from 'antd-mobile';
import { Route, Redirect, Switch, NavLink } from 'dva/router';
import { getRoutes } from '../utils/utils';
import GetOrder from '../routes/Home';
import Order from '../routes/Home/Order';
import styles from './MobileLayout.less';

@connect(({ global, login, loading }) => ({
  global,
  openid: login.openid,
  submitting: loading.effects['login/login'],
}))
class MobileLayout extends React.PureComponent {
  state = {
    open: false,
    selectedTab: '1',
  }

  componentWillMount() {
    if (!this.props.openid) {
      window.location.hash = '/user/login';
    }
  }
  onOpenChange = () => {
    this.setState({ open: !this.state.open });
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
    const sidebar = (
      <List>
        <List.Item
          thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
          multipleLine
        >15850777777
        </List.Item>
        <List.Item>
          <NavLink to="/coupon">优惠券与管理</NavLink>
        </List.Item>
        <List.Item>
          <NavLink to="/bills">发票与报销</NavLink>
        </List.Item>
        <List.Item>
          <NavLink to="/order">我的订单</NavLink>
        </List.Item>
        <List.Item>
          运费说明
        </List.Item>
        <List.Item>
          意见反馈
        </List.Item>
      </List>
    );
    return (
      <div>
        {
          // <NavBar
          //   mode="light"
          //   icon={<Icon type="user" />}
          //   onLeftClick={this.onOpenChange}
          //   rightContent={<Icon type="message" />}
          // >
          //   <SegmentedControl values={['帮我送', '帮我取', '帮我买', '帮办事']} style={{ width: '100%' }} />
          // </NavBar>
        }
        <Drawer
          className={styles.myDrawer}
          style={{ minHeight: document.documentElement.clientHeight }}
          enableDragHandle
          sidebar={sidebar}
          open={this.state.open}
          onOpenChange={this.onOpenChange}
        >
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
                selected={this.state.selectedTab === '1'}
                onPress={() => {
                  this.setState({
                    selectedTab: '1',
                  });
                }}
                data-seed="logId"
              >
                {<GetOrder />}
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
                selected={this.state.selectedTab === '2'}
                onPress={() => {
                  this.setState({
                    selectedTab: '2',
                  });
                }}
                data-seed="logId1"
              >
                {<Order />}
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
                selected={this.state.selectedTab === '3'}
                onPress={() => {
                  this.setState({
                    selectedTab: '3',
                  });
                }}
              >
                {this.renderContent('Friend')}
              </TabBar.Item>
            </TabBar>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default MobileLayout;
