import axios from 'axios';
let base = 'http://49.4.8.123:8083';
let base1 ='http://10.200.9.28:8083';
let base2 = 'http://10.200.9.18:8083';

//图片地址
export const imgpath = 'http://49.4.8.123:8083';
//用户模块

//获取用户列表
export const getUserList = params => { return axios.get(`${base}/search/listUsers`, { params: params }); }; 
//用户查询
export const SearchUserList = params => { return axios.get(`${base}/search/queryUsers`, { params: params }); }; 
//用户详情
export const getUserDetail = params => { return axios.get(`${base}/user/userDetail`, { params: params }); }; 

//用户信息的修改
export const UpdateUserInfo = params => { return axios.post(`${base}/user/adminUpdateUserInfo`, params).then(res => res.data); };

//如果是禁用就删除用户的云桌面
export const deleteDesktopByUser = params => { return axios.delete(`${base}/user/deleteDesktopByUser`,{ params: params }); }; 

//订单模块-------------------------------------------------
//获取订单列表
export const getOrderList = params => { return axios.get(`${base}/search/listSubs`, { params: params }); }; 

//订单查询
export const SearchOrderList = params => { return axios.get(`${base}/search/querySubs`, { params: params }); }; 

//订单操作
export const OrderDetail = params => { return axios.get(`${base}/subscription/subInfo`, { params: params }); }; 

//订单详情操作
export const OrderDetailDo = params => { return axios.get(`${base}/subsdetails/getDesktop`, { params: params }); }; 

//获取订单
export const OrderDetailDos = params => { return axios.get(`${base}/subscription/subDetailInfo`, { params: params }); }; 

//关机开机
export const operateDesktop = params => { return axios.post(`${base}/desktop/operateDesktop`, params).then(res => res.data); };

//后台管理员修改用户订单信息

export const updateSubDetailInfo = params => { return axios.post(`${base}/subscription/updateSubDetailInfo`, params).then(res => res.data); };
// 公司模块----------------------------

//编辑公司

export const getCompanyInfo = params => { return axios.get(`${base}/company/companyInfo`, { params: params }); }; 

//获取公司Logo
export const getviewLogo = params => { return axios.get(`${base}/company/viewLogo`, { params: params }); }; 

//上传信息
export const saveCompanyInfo = params => { return axios.post(`${base}/company/save`, params).then(res => res.data); };

//获取md5
export const getMD5 = params => { return axios.post(`${base}/company/getMD5 `, params).then(res => res.data); };

//根据md5获取上传的进度
export const getProcess = params => { return axios.get(`${base}/company/process`, { params: params }); }; 

// 获取公司的列表
export const getCompanyList = params => { return axios.get(`${base}/search/list/company`, { params: params }); }; 

export const searchCompany = params => { return axios.get(`${base}/search/query/company`, { params: params }); }; 

//策略模块------------------------------------------------------

//查询特定桌面的策略
export const getStrategyByDesktopId = params => { return axios.post(`${base}/strategy/getStrategyByDesktopId `, params).then(res => res.data); };

//修改USB
export const updateUsbStrategy = params => { return axios.post(`${base}/strategy/updateUsbStrategy `, params).then(res => res.data); };

//打印机
export const updatePrinterStrategy = params => { return axios.post(`${base}/strategy/updatePrinterStrategy `, params).then(res => res.data); };

//文件传输
export const updateFileStrategy = params => { return axios.post(`${base}/strategy/updateFileStrategy `, params).then(res => res.data); };

//剪切板授权
export const updateClipboardStrategy = params => { return axios.post(`${base}/strategy/updateClipboardStrategy `, params).then(res => res.data); };

// 计算机列表渲染
export const getComputerList = params => { return axios.get(`${base}/search/queryComputers`, { params: params }); }; 