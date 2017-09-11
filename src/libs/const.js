// let type=window.location.host.indexOf("www.52mlsz.com")>=0?0:1;

// const Config={
//     api:type!==0?'http://www.hcfdev.com/mlsztest/api/':'http://www.52mlsz.com/wx/api/',
//     appid:type!==0?'wxbdeb4ad23f222b7e':'wxab4752ad23e27146',
// 	domains:type!==0?'http://www.hcfdev.com/':'http://www.52mlsz.com/',
// 	jumpUrl:type!==0?'http://www.hcfdev.com/mlsztest/Wx/Jump':'http://www.52mlsz.com/weixin/home/jump'
// }

// export default Config;





let type=window.location.host.indexOf("www.52mlsz.com")>=0?0:1;

const config={
    api:'www.kurting.cn:8000',
    appid:'wx90814568da5f6843',
    login:'user/login'
}


const devConfig={
    api:'www.kurting.cn:8000',
    appid:'wxbdeb4ad23f222b7e',
    login:'user/testLogin'
}

const Config={

}
export default window.location.host.indexOf("djy.szcid.cn")>=0?config:devConfig;












