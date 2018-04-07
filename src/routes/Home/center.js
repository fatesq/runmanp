import React from 'react';
import { connect } from 'dva';
import { Switch, Card, List, Button, WhiteSpace } from 'antd-mobile';
import { NavLink } from 'dva/router';
import styles from './index.less'

export default class Center extends React.PureComponent {
		state={
			checked: true,
		}
	 	handleSignFace = (e) => {
			this.setState({checked: e})
		}
    render() {
        return(
					<div>
						<div className={styles['info-box']}>
							<img className={styles.avatar} src="https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=64582aa9770e0cf3b4fa46a96b2f997a/d058ccbf6c81800aedd20eb5b43533fa828b4752.jpg" />
							<div className={styles.name}>{localStorage.phone}</div>
							<div className={styles.box}>
								<div><span>{ localStorage.amount / 100 }</span><span>余额(元)</span></div>
								<div><span>{ localStorage.orderCount }</span><span>接单(单)</span></div>
							</div>
						</div>
						<List>
							<List.Item extra={
								<Switch
									checked={this.state.checked}
									onClick={this.handleSignFace}
								/>
							}>
								接单状态
							</List.Item>
						</List>
						<WhiteSpace />
						<List>
							<NavLink to="/Pay">
								<List.Item arrow="horizontal">
								我的钱包 
								</List.Item>
							</NavLink>
							<List.Item arrow="horizontal">
								评价记录
							</List.Item>
						</List>
						<WhiteSpace />
						<List>
							<List.Item extra="邀请跑男或者新用户" arrow="horizontal">
								邀请好友
							</List.Item>
							<List.Item arrow="horizontal">
								跑客学院
							</List.Item>
						</List> 
					</div>          
        );
    }
}