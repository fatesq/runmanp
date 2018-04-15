import React from 'react';
import { connect } from 'dva';
import { List, InputItem, Icon, NavBar, Button } from 'antd-mobile';
import { NavLink } from 'dva/router';


export default class Pay extends React.PureComponent {
    render() {
      return(
				<div>
					<NavBar
						mode="light"
						icon={<Icon type="left" />}
						onLeftClick={() => window.history.back()}
					>我的钱包
					</NavBar>
					<div style={{display: 'flex'}}>
						<NavLink to="/mx" style={{textAlign: 'center', flex: 1, borderRight: '1px solid #CCC', color: '#000', borderBottom: '1px solid #CCC', paddingBottom: '10px'}}>
							<div>
								<p style={{textAlign: 'left', padding: '5px 10px'}}>余额</p>
								<img src="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" width="30" />
								<div>￥ { localStorage.amount / 100 }</div>
								<div>提现</div>
							</div>
						</NavLink>
						<NavLink to="/yajin" style={{textAlign: 'center', flex: 1, color: '#000', borderBottom: '1px solid #CCC', paddingBottom: '10px'}}>
							<div>
								<p style={{textAlign: 'left', padding: '5px 10px'}}>押金</p>
								<img src="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" width="30" />
								<div>￥ { localStorage.deposit / 100 }</div>
								<div>查看</div>
							</div>
						</NavLink>
					</div>
					<NavLink to="/bind">
						<Button>绑定支付账号</Button>
					</NavLink>	
				</div>
			)
    }
}