import React from 'react';
import { connect } from 'dva';
import { List, InputItem, Icon, NavBar, Button } from 'antd-mobile';
import { NavLink } from 'dva/router';
import { bindWxAccount } from '../../services/api';


const u = navigator.userAgent;
const app = navigator.appVersion;
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // g
const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
export default class Pay extends React.PureComponent {
	componentDidMount () {
		window.IOSLOL = function(res){
			const info = {
				id:localStorage.id,
				openid:res
			}
			bindWxAccount(info),then(re=> {
				if(re.status == '00'){
					alert('绑定成功')
				}else{
					alert(res.msg)
				}
			})
		}
		window.android.WeChatLogin = function(res){
			const info = {
				id:localStorage.id,
				openid:res
			}
			bindWxAccount(info),then(re=> {
				if(re.status == '00'){
					alert('绑定成功')
				}else{
					alert(res.msg)
				}
			})
		}
	}
	bindWX=()=>{
		if (isAndroid) {
			window.android.WeChatLogin()
		}
		if (isIOS) {
			const res = Native.WeChatLogin()
		}
	}
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
					<Button>绑定支付宝</Button>
				</NavLink>
				<Button onClick={this.bindWX}>绑定微信</Button>
			</div>
		)
	}
}