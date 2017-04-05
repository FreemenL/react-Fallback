import Reflux from 'reflux';
import actions from './actions';
import Mixins from 'libs/CommonStore';

export default Reflux.createStore({
	mixins:[Mixins],
	listenables:[actions],
	onGetData(params){
		var data={
			lake:{
				name:'仙湖植物园',
				status:'晴',
				Temperature:'18-20',
				currentTem:18
			},
			SZ:{
				name:'深圳湾公园',
				status:'多云',
				Temperature:'18-21',
				currentTem:19
			},
			lotus:{
				name:'莲花山公园',
				status:'小雨',
				Temperature:'18-22',
				currentTem:20
			},
			penholder:{
				name:'笔架山公园',
				status:'暴雨',
				Temperature:'18-23',
				currentTem:21
			},
			East:{
				name:'东湖公园',
				status:'大雨',
				Temperature:'18-24',
				currentTem:22
			}
		}
		var Data = {
			title:data[params].name,
			status:data[params].status,
			Temperature:data[params].Temperature,
			currentTem:data[params].currentTem,
			tab:[{
					id:1,
					name:'出行指数'
				},{
					id:2,
					name:'气象微数据'
				}
			]
		}
		this.trigger('msg',Data)
	},
	onTransfor(){
		var List = [
			{
				id:1,
				type:'walking_item',
				item:[
					{
						index:5,
						data:'旅游指数',
						imgUrl:'./images/tree.png'
					},{
						index:4,
						data:'舒适度指数',
						imgUrl:'./images/comfort.png'
					},{
						index:3,
						data:'穿衣指数',
						imgUrl:'./images/clothes.png'
					},{
						index:2,
						data:'晨练指数',
						imgUrl:'./images/exercise.png'
					}
				]
			},{
				id:2,
				type:'weather_item',
				item:[
					{
						data:'小雨转大雨',
						title:'',
						imgUrl:'./images/ic_park_rainstorm.png'
					},{
						data:'20℃',
						title:'温度',
						imgUrl:'./images/ic_park_temperature.png'
					},{
						data:'2级',
						title:'紫外线',
						imgUrl:'./images/ic_park_UV.png'
					},{
						data:'强',
						title:'光照',
						imgUrl:'./images/ic_park_Illumination.png'
					},{
						data:'1m/s',
						title:'风速',
						imgUrl:'./images/ic_park_windspeed.png'
					},{
						data:'40%-60%',
						title:'湿度',
						imgUrl:'./images/ic_park_humidity.png'
					},{
						data:'100dB',
						title:'负离子',
						imgUrl:'./images/ic_park_anion.png'
					},{
						data:'100dB',
						title:'噪音',
						imgUrl:'./images/ic_park_noise.png'
					}
				]
			}
		];
		this.trigger('List',List);
	}
})