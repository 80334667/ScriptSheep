/*
1.1-1.31 云养牛，免费赢好礼

第一个账号助力作者 其他依次助力CK1
第一个CK失效会退出脚本


入口：[ 1.1-1.31 云养牛，免费赢好礼]

请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#1.1-1.31 云养牛，免费赢好礼
11 11 11 11 * jd_mnyyn.js, tag=1.1-1.31 云养牛，免费赢好礼, enabled=true

*/

const $ = new Env('1.1-1.31 云养牛，免费赢好礼')
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
const getToken=require('./function/krgetToken');
const getH5st=require('./function/krh5st');
$.shareUuid_auth=$.isNode() ? process.env['UUID'] ? process.env['UUID'] : '' : '';
let domains='https://lzdz1-isv.isvjcloud.com';
let lz_cookie={};
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0x143611=>{
		cookiesArr.push(jdCookieNode[_0x143611]);
	});
	if(process.env['JD_DEBUG']&&process.env['JD_DEBUG']==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]')['map'](_0x274a1e=>_0x274a1e.cookie)]['filter'](_0x3b664e=>!!_0x3b664e);
}
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}

	$.activityId='dz980fde043f6a29ebc909a8e15e9';
	$.shareUuid=$.shareUuid_auth;
	console.log('入口:\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/mengniumilk/grow/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid);
	for(let _0x5a3f6f=0;_0x5a3f6f<cookiesArr.length;_0x5a3f6f++){
		cookie=cookiesArr[_0x5a3f6f];
		originCookie=cookiesArr[_0x5a3f6f];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x5a3f6f+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			if(_0x5a3f6f==0&&!$.actorUuid)break;
			if($.outFlag||$.activityEnd)break;
		}
	}
	if($.outFlag){
		let _0x2a1482='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x2a1482);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x2a1482);
	}
	if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})()['catch'](_0x1fae1b=>$.logErr(_0x1fae1b))['finally'](()=>$.done());
async function run(){
	try{
		$.hasEnd=true;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x1ebe0e=false;
		$.Token=await getToken(cookie,domains);
		if($.Token==''){
			console.log('获取[token]失败！');
			return;
		}
		await getCk();
		if(activityCookie==''){
			console.log('获取cookie失败');
			return;
		}
		if($.activityEnd===true){
			console.log('活动结束');
			return;
		}
		if($.outFlag){
			console.log('此ip已被限制，请过10分钟后再执行脚本\n');
			return;
		}
		await takePostRequest('getSimpleActInfoVo');
		await takePostRequest('getMyPing');
		if(!$.Pin){
			console.log('获取[Pin]失败！');
			return;
		}
		await takePostRequest('accessLogWithAD');
		await takePostRequest('getUserInfo');
		await takePostRequest('activityContent');
		if($.hotFlag)return;
		if(!$.actorUuid){
			console.log('获取不到[actorUuid]退出执行，请重新执行');
			return;
		}
		if($.hasEnd===true||Date.now()>$.endTime){
			$.activityEnd=true;
			console.log('活动结束');
			return;
		}
		await $.wait(1000);
		await takePostRequest('drawContent');
		console.log('开始填写名称......');
		await takePostRequest('名称');
		await $.wait(parseInt(Math.random()*2000+3000,10));
		console.log('开始做日常任务......');
		await takePostRequest('每日签到');
		await $.wait(parseInt(Math.random()*2000+3000,10));
		await takePostRequest('关注店铺');
		await $.wait(parseInt(Math.random()*2000+3000,10));
		console.log('开始做浏览好物,每日三次......');
		await takePostRequest('浏览好物1');
		await $.wait(parseInt(Math.random()*2000+3000,10));
		await takePostRequest('浏览好物2');
		await $.wait(parseInt(Math.random()*2000+3000,10));
		await takePostRequest('浏览好物3');
		await $.wait(parseInt(Math.random()*2000+3000,10));
		await takePostRequest('加购');
		await $.wait(parseInt(Math.random()*2000+3000,10));
		console.log('日常任务全部完成,开始收取额外奖励......');
		await takePostRequest('getTaskDetail');
		if($.taskTimes>=3){
			console.log('开始收取额外奖励......');
			await takePostRequest('额外奖励1');
			await $.wait(parseInt(Math.random()*2000+2000,10));
		}
		if($.taskTimes>=5){
			console.log('开始收取额外奖励......');
			await takePostRequest('额外奖励2');
			await $.wait(parseInt(Math.random()*2000+2000,10));
		}
		if($.taskTimes>=10){
			console.log('开始收取额外奖励......');
			await takePostRequest('额外奖励3');
			await $.wait(parseInt(Math.random()*2000+2000,10));
		}
		let _0x58264f=parseInt(60-$.loadMinute);
		console.log('当前收草剩余时间:'+_0x58264f+' 分钟');
		if($.loadMinute>=60){
			console.log('开始收草......');
			await takePostRequest('收草');
			await $.wait(parseInt(Math.random()*2000+2000,10));
		}
		await takePostRequest('activityContent');
		await $.wait(parseInt(Math.random()*1000+1000,10));
		console.log('查询当前汇总......');
		console.log('\n小牛名称：'+$.cowName+' \n抽奖大转盘：'+$.canDrawTimes+' 次\n饲料：'+$.score+' \n等级：'+$.cowLevel+'\n已喂养：'+$.feedTimes+' 次\n');
		if($.score>=10*$.cowLevel){
			console.log('开始喂养......');
			let _0xb4e0d7=parseInt(10*$.cowLevel);
			console.log('当前等级喂养饲料需:'+_0xb4e0d7);
			let _0x4aa440=parseInt($.score/_0xb4e0d7);
			console.log('当前可喂养次数为:'+_0x4aa440);
			for(m=1;_0x4aa440--;m++){
				console.log('第'+m+'次喂养');
				await takePostRequest('喂养');
				if($.runFalag==false)break;
				if(Number(_0x4aa440)<=0)break;
				if(m>=5){
					console.log('喂养太多次，多余的次数请再执行脚本');
					break;
				}
				await $.wait(parseInt(Math.random()*2000+2000,10));
			}
		}
		await takePostRequest('activityContent');
		await $.wait(parseInt(Math.random()*1000+1000,10));
		if($.canDrawTimes>=1){
			console.log('开始大转盘抽奖......');
			let _0x19fc63=parseInt($.canDrawTimes/1);
			console.log('当前可抽奖次数为:'+_0x19fc63);
			for(m=1;_0x19fc63--;m++){
				console.log('第'+m+'次抽奖');
				await takePostRequest('抽奖');
				if($.runFalag==false)break;
				if(Number(_0x19fc63)<=0)break;
				if(m>=5){
					console.log('抽奖太多次，多余的次数请再执行脚本');
					break;
				}
				await $.wait(parseInt(Math.random()*2000+2000,10));
			}
		}
		await $.wait(parseInt(Math.random()*1000+2000,10));
		await takePostRequest('getDrawRecordHasCoupon');
		if($.outFlag){
			console.log('此ip已被限制，请过10分钟后再执行脚本\n');
			return;
		}
		console.log('当前助力:'+$.shareUuid);
		if($.index==1){
			$.shareUuid=$.actorUuid;
			console.log('后面的号都会助力:'+$.shareUuid);
		}
		await $.wait(parseInt(Math.random()*1000+5000,10));
		if($.index%3==0)console.log('休息一下，别被黑ip了\n可持续发展');
		if($.index%3==0)await $.wait(parseInt(Math.random()*5000+30000,10));
	}catch(_0x53d074){
		console.log(_0x53d074);
	}
}
async function takePostRequest(_0x19837b){
	if($.outFlag)return;
	let _0x5a7aad='https://lzdz1-isv.isvjcloud.com';
	let _0x1cc91c='';
	let _0x54ac7d='POST';
	let _0x4faa39='';
	switch(_0x19837b){
		case 'isvObfuscator':
			url='https://api.m.jd.com/client.action?functionId=isvObfuscator';
			_0x1cc91c='body=%7B%22url%22%3A%22https%3A//lzdz1-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=ab640b5dc76b89426f72115f5b2e06e934a5fbe9&client=apple&clientVersion=10.1.4&st=1650250640876&sv=102&sign=7ea66dcb2969eff53c43b5b8a4937dbe';
			break;
		case 'getSimpleActInfoVo':
			url=_0x5a7aad+'/dz/common/getSimpleActInfoVo';
			_0x1cc91c='activityId='+$.activityId;
			break;
		case 'getMyPing':
			url=_0x5a7aad+'/customer/getMyPing';
			_0x1cc91c='userId='+($.shopId||$.venderId||'')+'&token='+$.Token+'&fromType=APP';
			break;
		case 'accessLogWithAD':
			url=_0x5a7aad+'/common/accessLogWithAD';
			let _0x40ac78=_0x5a7aad+'/dingzhi/mengniumilk/grow/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
			_0x1cc91c='venderId='+($.shopId||$.venderId||'')+'&code=99&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0x40ac78)+'&subType=app&adSource=';
			break;
		case 'getUserInfo':
			url=_0x5a7aad+'/wxActionCommon/getUserInfo';
			_0x1cc91c='pin='+encodeURIComponent($.Pin);
			break;
		case 'activityContent':
			url=_0x5a7aad+'/dingzhi/mengniumilk/grow/activityContent';
			_0x1cc91c='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&pinImg='+encodeURIComponent($.attrTouXiang)+'&nick='+encodeURIComponent($.nickname)+'&cjyxPin=&cjhyPin=&shareUuid='+$.shareUuid;
			break;
		case'drawContent':
			url=_0x5a7aad+'/dingzhi/taskact/common/drawContent';
			_0x1cc91c='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'getRankList':
			url=_0x5a7aad+'/dingzhi/taskact/common/getRankList';
			_0x1cc91c='activityId='+$.activityId+'&actorUuid='+$.actorUuid;
			break;
		case 'checkOpenCard':
			url=_0x5a7aad+'/dingzhi/mengniumilk/grow/initOpenCard';
			_0x1cc91c='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&shareUuid='+$.shareUuid;
			break;
		case 'info':
			url=_0x5a7aad+'/dingzhi/mengniumilk/grow/task/opencard/info';
			_0x1cc91c='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid;
			break;
		case 'startDraw':
			url=_0x5a7aad+'/dingzhi/mengniumilk/grow/saveTask';
			_0x1cc91c='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&drawType=1';
			break;
		case'关注店铺':
			url=_0x5a7aad+'/dingzhi/mengniumilk/grow/saveTask';
			_0x1cc91c='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=1&taskValue=1000014803';
			break;
		case '浏览好物1':
			url=_0x5a7aad+'/dingzhi/mengniumilk/grow/saveTask';
			_0x1cc91c='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=5&taskValue=100008226516';
			break;
		case '每日签到':
			url=_0x5a7aad+'/dingzhi/mengniumilk/grow/saveTask';
			_0x1cc91c='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=0&taskValue=1000014803';
			break;
		case '浏览好物2':
			url=_0x5a7aad+'/dingzhi/mengniumilk/grow/saveTask';
			_0x1cc91c='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=5&taskValue=100003661795';
			break;
		case '浏览好物3':
			url=_0x5a7aad+'/dingzhi/mengniumilk/grow/saveTask';
			_0x1cc91c='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=5&taskValue=100004891782';
			break;
		case'加购':
			url=_0x5a7aad+'/dingzhi/mengniumilk/grow/saveTask';
			_0x1cc91c='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=21&taskValue=2693720';
			break;
		case '额外奖励1':
			url=_0x5a7aad+'/dingzhi/mengniumilk/grow/saveExtraTask';
			_0x1cc91c='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&index=1';
			break;
		case '额外奖励2':
			url=_0x5a7aad+'/dingzhi/mengniumilk/grow/saveExtraTask';
			_0x1cc91c='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&index=2';
			break;
		case '额外奖励3':
			url=_0x5a7aad+'/dingzhi/mengniumilk/grow/saveExtraTask';
			_0x1cc91c='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&index=3';
			break;
		case'喂养':
			url=_0x5a7aad+'/dingzhi/mengniumilk/grow/feedCow';
			_0x1cc91c='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		case'名称':
			let _0x412984=['赵','钱','蒋','张','金','章','葛','昌','鲍','苏','许','范','尤','水','白','蔺','叶','桂','甘','青','藏','川','宁','琼'];
			$.char0=_0x412984[random(0,_0x412984.length)];
			let _0xf714ff=['日天','下地','上天','MM','GG','明星','善扣','中华','淡尘','星河','夕阳','心动','野女','烈酒','失去','清酒','萝莉','默','卡','星光','配角','川','宁','琼'];
			$.char1=_0xf714ff[random(0,_0xf714ff.length)];
			$.char2=''+$.char0+$.char1;
			url=_0x5a7aad+'/dingzhi/mengniumilk/grow/saveCow';
			_0x1cc91c='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&cowNick='+encodeURIComponent($.char2);
			break;
		case'收草':
			url=_0x5a7aad+'/dingzhi/mengniumilk/grow/saveForage';
			_0x1cc91c='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'getTaskDetail':
			url=_0x5a7aad+'/dingzhi/mengniumilk/grow/getTaskDetail';
			_0x1cc91c='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'sign':
		case 'addCart':
		case 'browseGoods':
			url=_0x5a7aad+'/dingzhi/opencard/'+_0x19837b;
			_0x1cc91c='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			if(_0x19837b=='browseGoods')_0x1cc91c+='&value='+$.visitSkuValue;
			break;
		case'邀请':
		case'助力':
			if(_0x19837b=='助力'){
				url=_0x5a7aad+'/dingzhi/mengniumilk/grow/assist';
			}else{
				url=_0x5a7aad+'/dingzhi/mengniumilk/grow/assist/status';
			}
			_0x1cc91c='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&shareUuid='+$.shareUuid;
			break;
		case 'viewVideo':
		case 'visitSku':
		case 'toShop':
		case 'addSku':
			url=_0x5a7aad+'/dingzhi/opencard/'+_0x19837b;
			let _0x5484d6='';
			let _0x15f264='';
			if(_0x19837b=='viewVideo'){
				_0x5484d6=31;
				_0x15f264=31;
			}else if(_0x19837b=='visitSku'){
				_0x5484d6=5;
				_0x15f264=$.visitSkuValue||5;
			}else if(_0x19837b=='toShop'){
				_0x5484d6=14;
				_0x15f264=$.toShopValue||14;
			}else if(_0x19837b=='addSku'){
				_0x5484d6=2;
				_0x15f264=$.addSkuValue||2;
			}
			_0x1cc91c='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&taskType='+_0x5484d6+'&taskValue='+_0x15f264;
			break;
		case'getDrawRecordHasCoupon':
			url=_0x5a7aad+'/dingzhi/taskact/common/getDrawRecordHasCoupon';
			_0x1cc91c='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid;
			break;
		case 'getShareRecord':
			url=_0x5a7aad+'/dingzhi/mengniumilk/grow/help/list';
			_0x1cc91c='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case'抽奖':
			url=_0x5a7aad+'/dingzhi/mengniumilk/grow/start';
			_0x1cc91c='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		default:
			console.log('错误'+_0x19837b);
	}
	let _0x477169=getPostRequest(url,_0x1cc91c,_0x54ac7d);
	return new Promise(async _0x4f0cb2=>{
		$.post(_0x477169,(_0x465aa5,_0x1f06ab,_0x32149d)=>{
			try{
				setActivityCookie(_0x1f06ab);
				if(_0x465aa5){
					if(_0x1f06ab&&typeof _0x1f06ab.statusCode!='undefined'){
						if(_0x1f06ab.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x465aa5,_0x465aa5));
					console.log(_0x19837b+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x19837b,_0x32149d);
				}
			}catch(_0x36aae0){
				console.log(_0x36aae0,_0x1f06ab);
			}finally{
				_0x4f0cb2();
			}
		});
	});
}
async function dealReturn(_0x1a6705,_0x27ad8f){
	let _0x16faeb='';
	try{
		if(_0x1a6705!='accessLogWithAD'||_0x1a6705!='drawContent'){
			if(_0x27ad8f){
				_0x16faeb=JSON.parse(_0x27ad8f);
			}
		}
	}catch(_0x55f95c){
		console.log(_0x1a6705+' 执行任务异常');
		console.log(_0x27ad8f);
		$.runFalag=false;
	}
	try{
		switch(_0x1a6705){
			case'isvObfuscator':
				if(typeof _0x16faeb=='object'){
					if(_0x16faeb.errcode==0){
						if(typeof _0x16faeb.token!='undefined')$.Token=_0x16faeb.token;
					}else if(_0x16faeb.message){
						console.log('isvObfuscator '+(_0x16faeb.message||''));
					}else{
						console.log(_0x27ad8f);
					}
				}else{
					console.log(_0x27ad8f);
				}
				break;
			case 'getSimpleActInfoVo':
				if(typeof _0x16faeb=='object'){
					if(_0x16faeb.result&&_0x16faeb.result===true){
						if(typeof _0x16faeb.data['shopId']!='undefined')$.shopId=_0x16faeb.data['shopId'];
						if(typeof _0x16faeb.data['venderId']!='undefined')$.venderId=_0x16faeb.data['venderId'];
					}else if(_0x16faeb.errorMessage){
						console.log(_0x1a6705+' '+(_0x16faeb.errorMessage||''));
					}else{
						console.log(_0x1a6705+' '+_0x27ad8f);
					}
				}else{
					console.log(_0x1a6705+' '+_0x27ad8f);
				}
				break;
			case 'getMyPing':
				if(typeof _0x16faeb=='object'){
					if(_0x16faeb.result&&_0x16faeb.result===true){
						if(_0x16faeb.data&&typeof _0x16faeb.data['secretPin']!='undefined')$.Pin=_0x16faeb.data['secretPin'];
						if(_0x16faeb.data&&typeof _0x16faeb.data['nickname']!='undefined')$.nickname=_0x16faeb.data['nickname'];
					}else if(_0x16faeb.errorMessage){
						console.log(_0x1a6705+' '+(_0x16faeb.errorMessage||''));
					}else{
						console.log(_0x1a6705+' '+_0x27ad8f);
					}
				}else{
					console.log(_0x1a6705+' '+_0x27ad8f);
				}
				break;
			case 'getUserInfo':
				if(typeof _0x16faeb=='object'){
					if(_0x16faeb.result&&_0x16faeb.result===true){
						if(_0x16faeb.data&&typeof _0x16faeb.data['yunMidImageUrl']!='undefined')$.attrTouXiang=_0x16faeb.data['yunMidImageUrl']||'https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png';
					}else if(_0x16faeb.errorMessage){
						console.log(_0x1a6705+' '+(_0x16faeb.errorMessage||''));
					}else{
						console.log(_0x1a6705+' '+_0x27ad8f);
					}
				}else{
					console.log(_0x1a6705+' '+_0x27ad8f);
				}
				break;
			case 'activityContent':
				if(typeof _0x16faeb=='object'){
					if(_0x16faeb.result&&_0x16faeb.result===true){
						$.endTime=_0x16faeb.data['endTime']||_0x16faeb.data['activityVo']&&_0x16faeb.data['activityVo']['endTime']||_0x16faeb.data['activity']['endTime']||0;
						$.hasEnd=_0x16faeb.data['isEnd']||false;
						$.score=_0x16faeb.data['score']||0;
						$.cowLevel=_0x16faeb.data['cowLevel']||0;
						$.shareSocre=_0x16faeb.data['shareSocre']||0;
						$.loadMinute=_0x16faeb.data['loadMinute'];
						$.signLevel=_0x16faeb.data['signLevel']||0;
						$.actorUuid=_0x16faeb.data['actorUuid']||'';
						$.assistCount=_0x16faeb.data['assistCount']||0;
						$.assistStatus=_0x16faeb.data['assistStatus']||0;
						$.canDrawTimes=_0x16faeb.data['canDrawTimes']||0;
						$.cowName=_0x16faeb.data['cowName']||'';
						$.remainderTimes=_0x16faeb.data['remainderTimes']||0;
						$.feedTimes=_0x16faeb.data['feedTimes']||0;
					}else if(_0x16faeb.errorMessage){
						console.log(_0x1a6705+' '+(_0x16faeb.errorMessage||''));
					}else{
						console.log(_0x1a6705+' '+_0x27ad8f);
					}
				}else{
					console.log(_0x1a6705+' '+_0x27ad8f);
				}
				break;
			case 'getTaskDetail':
				if(typeof _0x16faeb=='object'){
					if(_0x16faeb.result&&_0x16faeb.result===true){
						$.taskTimes=_0x16faeb.data['dayTask']['taskTimes'];
					}else if(_0x16faeb.errorMessage){
						console.log(_0x1a6705+' '+(_0x16faeb.errorMessage||''));
					}else{
						console.log(_0x1a6705+' '+_0x27ad8f);
					}
				}else{
					console.log(_0x1a6705+' '+_0x27ad8f);
				}
				break;
			case'info':
				if(typeof _0x16faeb=='object'){
					if(_0x16faeb.result&&_0x16faeb.result===true){
						$.addCart=_0x16faeb.data['addCart']||false;
					}else if(_0x16faeb.errorMessage){
						console.log(_0x1a6705+' '+(_0x16faeb.errorMessage||''));
					}else{
						console.log(_0x1a6705+' '+_0x27ad8f);
					}
				}else{
					console.log(_0x1a6705+' '+_0x27ad8f);
				}
				break;
			case'关注店铺':
			case '浏览好物1':
			case '每日签到':
			case '浏览好物2':
			case '浏览好物3':
			case'加购':
				if(typeof _0x16faeb=='object'){
					if(_0x16faeb.result&&_0x16faeb.result===true){
						console.log('任务完成，获得饲料：'+_0x16faeb.data['score']);
					}else if(_0x16faeb.errorMessage){
						console.log(_0x1a6705+' '+(_0x16faeb.errorMessage||''));
					}else{
						console.log(_0x1a6705+' '+_0x27ad8f);
					}
				}else{
					console.log(_0x1a6705+' '+_0x27ad8f);
				}
				break;
			case '额外奖励1':
			case '额外奖励2':
			case'额外奖励3':
				if(typeof _0x16faeb=='object'){
					if(_0x16faeb.result&&_0x16faeb.result===true){
						console.log('任务完成，获得饲料：'+_0x16faeb.data['addScore']);
					}else if(_0x16faeb.errorMessage){
						console.log(_0x1a6705+' '+(_0x16faeb.errorMessage||''));
					}else{
						console.log(_0x1a6705+' '+_0x27ad8f);
					}
				}else{
					console.log(_0x1a6705+' '+_0x27ad8f);
				}
				break;
			case'喂养':
				if(typeof _0x16faeb=='object'){
					if(_0x16faeb.result&&_0x16faeb.result===true){
						console.log('衰仔，执行成功，喂养次数：'+_0x16faeb.data['feedTimes']);
					}else if(_0x16faeb.errorMessage){
						console.log(_0x1a6705+' '+(_0x16faeb.errorMessage||''));
					}else{
						console.log(_0x1a6705+' '+_0x27ad8f);
					}
				}else{
					console.log(_0x1a6705+' '+_0x27ad8f);
				}
				break;
			case'名称':
				if(typeof _0x16faeb=='object'){
					if(_0x16faeb.result&&_0x16faeb.result===true){
						console.log('衰仔，成功取名：'+_0x16faeb.data['cowNick']+'  (*￣︶￣)');
					}else if(_0x16faeb.errorMessage){
						console.log(_0x1a6705+' '+(_0x16faeb.errorMessage||''));
					}else{
						console.log(_0x1a6705+' '+_0x27ad8f);
					}
				}else{
					console.log(_0x1a6705+' '+_0x27ad8f);
				}
				break;
			case'收草':
			case '卖豆乳':
			case '卖燕麦牛奶':
			case '卖豆乳':
				if(typeof _0x16faeb=='object'){
					if(_0x16faeb.result&&_0x16faeb.result===true){
						console.log('衰仔，执行成功，剩余饲料：'+_0x16faeb.data['addScore']);
					}else if(_0x16faeb.errorMessage){
						console.log(_0x1a6705+' '+(_0x16faeb.errorMessage||''));
					}else{
						console.log(_0x1a6705+' '+_0x27ad8f);
					}
				}else{
					console.log(_0x1a6705+' '+_0x27ad8f);
				}
				break;
			case 'checkOpenCard':
				if(typeof _0x16faeb=='object'){
					if(_0x16faeb.result&&_0x16faeb.result===true){
						let _0x1534d8=_0x16faeb.data['openInfo']||[];
						$.openList=[..._0x1534d8];
						$.allOpenCard=_0x16faeb.data['allOpenCard']||_0x16faeb.data['isOpenCardStatus']||false;
						if(_0x16faeb.data['beans']||_0x16faeb.data['addBeanNum'])console.log('开卡获得:'+(_0x16faeb.data['beans']||_0x16faeb.data['addBeanNum'])+'豆');
					}else if(_0x16faeb.errorMessage){
						console.log(_0x1a6705+' '+(_0x16faeb.errorMessage||''));
					}else{
						console.log(_0x1a6705+' '+_0x27ad8f);
					}
				}else{
					console.log(_0x1a6705+' '+_0x27ad8f);
				}
				break;
			case 'startDraw':
			case 'followShop':
			case 'viewVideo':
			case'visitSku':
			case'toShop':
			case 'addSku':
			case 'sign':
			case 'addCart':
			case 'browseGoods':
			case'抽奖':
				if(typeof _0x16faeb=='object'){
					if(_0x16faeb.result&&_0x16faeb.result===true){
						if(typeof _0x16faeb.data=='object'){
							let _0x35414a='';
							let _0x25edcd='抽奖';
							if(_0x16faeb.data['addBeanNum']){
								_0x35414a=_0x16faeb.data['addBeanNum']+'京豆';
							}
							if(_0x16faeb.data['addPoint']){
								_0x35414a+=' '+_0x16faeb.data['addPoint']+'游戏机会';
							}
							if(_0x1a6705=='followShop'){
								_0x25edcd='关注';
								if(_0x16faeb.data['beanNumMember']&&_0x16faeb.data['assistSendStatus']){
									_0x35414a+=' 额外获得:'+_0x16faeb.data['beanNumMember']+'京豆';
								}
							}else if(_0x1a6705=='addSku'||_0x1a6705=='addCart'){
								_0x25edcd='加购';
							}else if(_0x1a6705=='viewVideo'){
								_0x25edcd='热门文章';
							}else if(_0x1a6705=='toShop'){
								_0x25edcd='浏览店铺';
							}else if(_0x1a6705=='visitSku'||_0x1a6705=='browseGoods'){
								_0x25edcd='浏览商品';
							}else if(_0x1a6705=='sign'){
								_0x25edcd='签到';
							}else{
								let _0x43d71c=typeof _0x16faeb.data['drawOk']==='object'&&_0x16faeb.data['drawOk']||_0x16faeb.data;
								_0x35414a=_0x43d71c.drawOk==true&&_0x43d71c.name||'';
							}
							if(_0x25edcd=='抽奖'&&_0x35414a&&_0x35414a.indexOf('京豆')==-1){
								if($.isNode())await notify.sendNotify(''+$.name,'【京东账号'+$.index+'】'+($.nickName||$.UserName)+'\n'+_0x25edcd+'成功,获得 '+_0x35414a+'\n');
							}
							if(!_0x35414a){
								_0x35414a='空气💨';
							}
							console.log(_0x25edcd+'获得:'+(_0x35414a||_0x27ad8f));
						}else{
							console.log(_0x1a6705+' '+_0x27ad8f);
						}
					}else if(_0x16faeb.errorMessage){
						$.runFalag=false;
						console.log(_0x1a6705+' '+(_0x16faeb.errorMessage||''));
					}else{
						console.log(_0x1a6705+' '+_0x27ad8f);
					}
				}else{
					console.log(_0x1a6705+' '+_0x27ad8f);
				}
				break;
			case 'getDrawRecordHasCoupon':
				if(typeof _0x16faeb=='object'){
					if(_0x16faeb.result&&_0x16faeb.result===true){
						console.log('我的奖品：');
						let _0x2b7dbb=0;
						let _0x151394=0;
						let _0x4e079c=0;
						for(let _0x3d676b in _0x16faeb.data){
							let _0x18e485=_0x16faeb.data[_0x3d676b];
							if(_0x18e485.infoName==''&&_0x18e485.sendStatus==0){
								_0x2b7dbb++;
								_0x151394=_0x18e485.infoName['replace']('','');
								_0x4e079c=_0x4e079c<_0x18e485.createTime?_0x18e485.createTime:_0x4e079c;
							}else{
								console.log(''+(_0x18e485.infoType!=10&&_0x18e485.value&&_0x18e485.value+':'||'')+_0x18e485.infoName);
							}
						}
						if(_0x4e079c>0)console.log('最新邀请奖励时间:'+$.time('yyyy-MM-dd HH:mm:ss',_0x4e079c));
						if(_0x2b7dbb>0)console.log('邀请好友('+_0x2b7dbb+'):'+(_0x2b7dbb*parseInt(_0x151394,10)||30)+'京豆');
					}else if(_0x16faeb.errorMessage){
						console.log(_0x1a6705+' '+(_0x16faeb.errorMessage||''));
					}else{
						console.log(_0x1a6705+' '+_0x27ad8f);
					}
				}else{
					console.log(_0x1a6705+' '+_0x27ad8f);
				}
				break;
			case 'getShareRecord':
				if(typeof _0x16faeb=='object'){
					if(_0x16faeb.result&&_0x16faeb.result===true&&_0x16faeb.data){
						$.ShareCount=_0x16faeb.data['shareList']['length'];
						$.log('=========== 你邀请了:'+$.ShareCount+'个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n');
					}else if(_0x16faeb.errorMessage){
						console.log(_0x1a6705+' '+(_0x16faeb.errorMessage||''));
					}else{
						console.log(_0x1a6705+' '+_0x27ad8f);
					}
				}else{
					console.log(_0x1a6705+' '+_0x27ad8f);
				}
				break;
			case'邀请':
			case'助力':
				if(typeof _0x16faeb=='object'){
					if(_0x16faeb.data['status']==200){
						if(_0x1a6705=='助力'){
							console.log('助力成功');
						}else{
							$.yaoqing=true;
						}
					}else if(_0x16faeb.data['status']==105){
						console.log('已经助力过');
					}else if(_0x16faeb.data['status']==104){
						console.log('已经助力其他人');
					}else if(_0x16faeb.data['status']==101){}else{
						console.log(_0x27ad8f);
					}
				}else{
					console.log(_0x1a6705+' '+_0x27ad8f);
				}
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(_0x1a6705+'-> '+_0x27ad8f);
		}
		if(typeof _0x16faeb=='object'){
			if(_0x16faeb.errorMessage){
				if(_0x16faeb.errorMessage['indexOf']('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x2fc81d){
		console.log(_0x2fc81d);
	}
}
function getPostRequest(_0x2a41f4,_0x1b9cb2,_0x58e082='POST'){
	let _0x369baa={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x2a41f4.indexOf('https://lzdz1-isv.isvjcloud.com')>-1){
		_0x369baa.Referer='https://lzdz1-isv.isvjcloud.com/dingzhi/mengniumilk/grow/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
		_0x369baa.Cookie=''+(lz_jdpin_token_cookie&&lz_jdpin_token_cookie||'')+($.Pin&&'AUTH_C_USER='+$.Pin+';'||'')+activityCookie;
	}
	return{'url':_0x2a41f4,'method':_0x58e082,'headers':_0x369baa,'body':_0x1b9cb2,'timeout':30000};
}
function getCk(){
	return new Promise(_0x40488c=>{
		let _0x1f81b5={'url':'https://lzdz1-isv.isvjcloud.com/dingzhi/mengniumilk/grow/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid,'followRedirect':false,'headers':{'User-Agent':$.UA},'timeout':30000};
		$.get(_0x1f81b5,async(_0xd5bffb,_0x63dec2,_0x4bfc9e)=>{
			try{
				if(_0xd5bffb){
					if(_0x63dec2&&typeof _0x63dec2.statusCode!='undefined'){
						if(_0x63dec2.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0xd5bffb));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x2c1682=_0x4bfc9e.match(/(活动已经结束)/)&&_0x4bfc9e.match(/(活动已经结束)/)[1]||'';
					if(_0x2c1682){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x63dec2);
				}
			}catch(_0x410347){
				$.logErr(_0x410347,_0x63dec2);
			}finally{
				_0x40488c();
			}
		});
	});
}
function setActivityCookie(_0x350896){
	if(_0x350896){
		if(_0x350896.headers['set-cookie']){
			cookie=originCookie+';';
			for(let _0x36d2d9 of _0x350896.headers['set-cookie']){
				lz_cookie[_0x36d2d9.split(';')[0]['substr'](0,_0x36d2d9.split(';')[0]['indexOf']('='))]=_0x36d2d9.split(';')[0]['substr'](_0x36d2d9.split(';')[0]['indexOf']('=')+1);
			}
			for(const _0x2d9fb6 of Object.keys(lz_cookie)){
				cookie+=_0x2d9fb6+'='+lz_cookie[_0x2d9fb6]+';';
			}
			activityCookie=cookie;
		}
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x55885a){
	_0x55885a=_0x55885a||32;
	let _0x4f0f6b='abcdef0123456789',_0x518cc7=_0x4f0f6b.length,_0x25e380='';
	for(i=0;i<_0x55885a;i++)_0x25e380+=_0x4f0f6b.charAt(Math.floor(Math.random()*_0x518cc7));
	return _0x25e380;
}
function jsonParse(_0x41fde9){
	if(typeof _0x41fde9=='string'){
		try{
			return JSON.parse(_0x41fde9);
		}catch(_0xf02b7c){
			console.log(_0xf02b7c);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
}
async function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async _0x232b45=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x322ab9='';
		if($.shopactivityId)_0x322ab9=',"activityId":'+$.shopactivityId;
		const _0x221983='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x322ab9+',"channel":406}';
		const _0x26ca48={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x221983)};
		const _0x46806e=await getH5st('8adfb',_0x26ca48);
		const _0x4bb4a5={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x221983+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x46806e),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x4bb4a5,async(_0x2b69c5,_0x29dcec,_0x1b46d8)=>{
			try{
				_0x1b46d8=_0x1b46d8&&_0x1b46d8.match(/jsonp_.*?\((.*?)\);/)&&_0x1b46d8.match(/jsonp_.*?\((.*?)\);/)[1]||_0x1b46d8;
				let _0x5d628c=$.toObj(_0x1b46d8,_0x1b46d8);
				if(_0x5d628c&&typeof _0x5d628c=='object'){
					if(_0x5d628c&&_0x5d628c.success===true){
						console.log(' >> '+_0x5d628c.message);
						$.errorJoinShop=_0x5d628c.message;
						if(_0x5d628c.result&&_0x5d628c.result['giftInfo']){
							for(let _0x186647 of _0x5d628c.result['giftInfo']['giftList']){
								console.log(' >> 入会获得：'+_0x186647.discountString+_0x186647.prizeName+_0x186647.secondLineDesc);
							}
						}
					}else if(_0x5d628c&&typeof _0x5d628c=='object'&&_0x5d628c.message){
						$.errorJoinShop=_0x5d628c.message;
						console.log(''+(_0x5d628c.message||''));
					}else{
						console.log(_0x1b46d8);
					}
				}else{
					console.log(_0x1b46d8);
				}
			}catch(_0x28cbd1){
				$.logErr(_0x28cbd1,_0x29dcec);
			}finally{
				_0x232b45();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x2246d8=>{
		const _0x8edacc='{"venderId":"'+$.joinVenderId+'","channel":406,"payUpShop":true}';
		const _0x390a92={'appid':'jd_shop_member','functionId':'bindWithVender','clientVersion':'9.2.0','client':'H5','body':JSON.parse(_0x8edacc)};
		const _0x860ba5=await getH5st('8adfb',_0x390a92);
		const _0x22979b={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x8edacc+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+encodeURIComponent(_0x860ba5),'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x22979b,async(_0x56ef2b,_0x46bbe9,_0x297637)=>{
			try{
				_0x297637=_0x297637&&_0x297637.match(/jsonp_.*?\((.*?)\);/)&&_0x297637.match(/jsonp_.*?\((.*?)\);/)[1]||_0x297637;
				let _0x451dcd=$.toObj(_0x297637,_0x297637);
				if(_0x451dcd&&typeof _0x451dcd=='object'){
					if(_0x451dcd&&_0x451dcd.success==true){
						console.log('去加入：'+(_0x451dcd.result['shopMemberCardInfo']['venderCardName']||'')+' ('+$.joinVenderId+')');
						$.shopactivityId=_0x451dcd.result['interestsRuleList']&&_0x451dcd.result['interestsRuleList'][0]&&_0x451dcd.result['interestsRuleList'][0]['interestsInfo']&&_0x451dcd.result['interestsRuleList'][0]['interestsInfo']['activityId']||'';
					}
				}else{
					console.log(_0x297637);
				}
			}catch(_0x715119){
				$.logErr(_0x715119,_0x46bbe9);
			}finally{
				_0x2246d8();
			}
		});
	});
}
function getAuthorCodeList(_0x568490){
	return new Promise(_0x3bc096=>{
		const _0x4eae50={'url':_0x568490+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		$.get(_0x4eae50,async(_0x44ed36,_0x12b376,_0x2010aa)=>{
			try{
				if(_0x44ed36){
					$.getAuthorCodeListerr=false;
				}else{
					if(_0x2010aa)_0x2010aa=JSON.parse(_0x2010aa);
					$.getAuthorCodeListerr=true;
				}
			}catch(_0x30a300){
				$.logErr(_0x30a300,_0x12b376);
				_0x2010aa=null;
			}finally{
				_0x3bc096(_0x2010aa);
			}
		});
	});
}
function random(_0x54e5b2,_0xcf9a6d){
	return Math.floor(Math.random()*(_0xcf9a6d-_0x54e5b2))+_0x54e5b2;
}
function jsonParse(_0x4708a9){
	if(typeof _0x4708a9=='string'){
		try{
			return JSON.parse(_0x4708a9);
		}catch(_0x4c214f){
			console.log(_0x4c214f);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

