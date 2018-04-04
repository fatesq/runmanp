import React from 'react';
import { connect } from 'dva';
import { List, InputItem, ImagePicker, Button } from 'antd-mobile';
import { modifyRider } from '../../services/api'; 

const OSS = window.OSS;
//OSS上传配置
const appServer = 'http://rider.shjcqg.com:8085/';
const bucket = 'babishangmen';
const region = 'oss-cn-hangzhou';

const urllib = OSS.urllib;
const Buffer = OSS.Buffer;
const Wrapper = OSS.Wrapper;
const STS = OSS.STS;

const info = {};
function applyTokenDo(func) {
	return OSS.urllib.request(appServer, {
			method: 'GET',
	}).then(function (result) {
			var creds = JSON.parse(result.data);
			var client = new OSS.Wrapper({
					region: "oss-cn-hangzhou",
					accessKeyId:   creds.AccessKeyId,
					accessKeySecret: creds.AccessKeySecret,
					stsToken: creds.SecurityToken,
					bucket: bucket,
			});
			return func(client);
	});
};

@connect(({ global, login }) => ({
  global,
  id: login.id,
}))
export default class Id extends React.PureComponent {
	state = {
		files: [],
		files2: [],
		realName: null,
  }
  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
		});
		if(files.length > 0){
			const file = files[0]
			const prop = this.props
			function uploadFile(client) {
				if(file.file.name.split('.')[1]!='jpg'&&file.file.name.split('.')[1]!='jpeg'&&file.file.name.split('.')[1]!='png'&&file.file.name.split('.')[1]!='gif'){
					alert('只允许上传格式为jpeg、jpg、png、gif格式的图片');
					return false;
				}
				return client.multipartUpload("/runningman/idcard/"+prop.id+"/"+file.file.name+"",file.file)
					.then(res =>{
						if(res.res.status === 200){
							info.positive = res.res.requestUrls[0].split('?')[0]
						}else{
							file.onError()
						}
					});
			};
			applyTokenDo(uploadFile)
		}
	}
	onChange2 = (files2, type, index) => {
    console.log(files2, type, index);
    this.setState({
      files2,
		});
		
		if(files2.length > 0){
			const file = files2[0]
			const prop = this.props
			function uploadFile2(client) {
				if(file.file.name.split('.')[1]!='jpg'&&file.file.name.split('.')[1]!='jpeg'&&file.file.name.split('.')[1]!='png'&&file.file.name.split('.')[1]!='gif'){
					alert('只允许上传格式为jpeg、jpg、png、gif格式的图片');
					return false;
				}
				return client.multipartUpload("/runningman/idcard/"+prop.id+"/"+file.file.name+"",file.file)
					.then(res =>{
						if(res.res.status === 200){
							info.opposite = res.res.requestUrls[0].split('?')[0]
						}else{
							file.onError()
						}
					});
			};
			applyTokenDo(uploadFile2)
		}
	}
	submit = () => {
		if(this.state.files.length < 1|| this.state.files2.length < 1  ){
			alert('请上传照片')
			return;
		}
		if(!this.state.realName || this.state.realName == ''){
			alert('请填写真实姓名')
			return;
		}
		info.realName = this.state.realName
		
		modifyRider(info).then(res=>{
			if(res.status == '00') {
				window.location.hash = '/yajin'
			}else{
				alert(res.msg)
			}
		})
	}
	render() {
		const { files, files2 } = this.state;
		return(
			<List>
				<InputItem
					placeholder="填写您的真实姓名"
					clear
					moneyKeyboardAlign="left"
					onChange={val=> this.setState({realName: val})}
				>姓名</InputItem>
				<List.Item>提供身份证头像面</List.Item>
				<div style={{ textAlign: 'center'}}>
					<ImagePicker
						files={files}
						onChange={this.onChange}
						onImageClick={(index, fs) => console.log(index, fs)}
						selectable={files.length < 3}
						multiple={this.state.multiple}
					/>
				</div>
				<List.Item>提供手持身份证头像面合照</List.Item>
				<ImagePicker
          files={files2}
          onChange={this.onChange2}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files2.length < 3}
          multiple={this.state.multiple}
        />
				<Button onClick={this.submit}>提交认证</Button>
			</List>	
		);
	}
}