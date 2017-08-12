Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}  

var validateSdate = function validateSdate(rule, value, callback) {
  var today = new Date();
  if (!value) {
    return callback(new Error('请选择开始日期'));
  } else {
    if (value < today.Format("yyyy-MM-dd")) {
      callback(new Error('不能选择过去的时间'));
    }
    callback();
  }
};

var validateEdate = function validateEdate(rule, value, callback) {
  if (!value) {
    callback(new Error('请输入结束时间'));
  } else if (value < vm.eventform.sdate) {
    callback(new Error('不能少于开始日期!'));
  } else {
    callback();
  }
};