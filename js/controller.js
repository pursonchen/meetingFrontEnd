const equipOptions = ['音响', '投影', '旧视频会议系统', '新视频会议系统'];
const baseUrl = "http://10.117.0.7:8080/tp5/public";
var canBesubmit = false;
var vm = new Vue({
	el : '#app',
	data : {
		loading:true,
		addloading:false,
    applyBtn:true,
		activeIndex: '1',
        items:[],
		pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        user:'游客',
        todaydate: new Date(),
        dialogFormVisible: false,
        detailFormVisible: false,
        equips:equipOptions,
        eventform: {
          title: '',
          sdate: '',
          edate: '',
          mtroom: '',
          department:'个险销售部',
          handler: '',
          desc: '',
          equipment: ['音响','投影'],
          opinionOfHead: '同意',
          opinionOfDirector:'同意',
          class:'地市',
          uid:0,
          attendance:'',
          
        },
        rowfordetail:{
          title: '',
          sdate: '',
          edate: '',
          mtroom: '',
          department:'个险销售部',
          handler: '',
          desc: '',
          equipment: ['音响','投影'],
          opinionOfHead: '同意',
          opinionOfDirector:'同意',
          class:'地市',
          uid:0,
          attendance:'',
    },
        rules:{
        	title: [
            { required: true, message: '请输入会议名称', trigger: 'blur' },
            { min: 5, message: '长度应大于 5 个字符', trigger: 'blur' },
            // {pattern: /^[\u4E00-\u9FA5]+$/, message: '会议名称只能为中文'}
          ],
          	sdate: [
            { validator: validateSdate, required: true, trigger: 'change' }
          ],
            edate: [
            { validator: validateEdate, required: true, trigger: 'change' }
          ],
          	mtroom: [
            { required: true, message: '请选择会议室', trigger: 'change' }
          ],
            desc: [
            { required: true, message: '请填写会议详情', trigger: 'blur' },
            { min: 10, message: '长度应大于 10 个字符', trigger: 'blur' }      
          ],

        },
        mtOptions: [{
          value: '三楼',
          label: '三楼'
        }, {
          value: '四楼',
          label: '四楼'
        }],
        clsOptions: [{
          value: '地市',
          label: '地市'
        }, {
          value: '省公司',
          label: '省公司'
        }, {
          value: '总部',
          label: '总部'
        }],
        dpOptions: [{
          value: '人力资源部',
          label: '人力资源部'
        }, {
          value: '个险销售部',
          label: '个险销售部'
        }, {
          value: '团险销售部',
          label: '团险销售部'
        }, {
          value: '银行保险部',
          label: '银行保险部'
        }, {
          value: '综合管理部',
          label: '综合管理部'
        }, {
          value: '监察审计部',
          label: '监察审计部'
        }, {
          value: '财务会计部',
          label: '财务会计部'
        }, {
          value: '客户服务中心',
          label: '客户服务中心'
        }, {
          value: '教育培训部',
          label: '教育培训部'
        }, {
          value: '健康保险部',
          label: '健康保险部'
        }],
        formLabelWidth: '120px',

        
      
	},
	created:function(){

			this.loading = true;
      var han = /^[\u4e00-\u9fa5]+$/;
      var thisURL = document.URL;  
      if(thisURL.indexOf("?") !== -1)
      {
      var passUsername = thisURL.split('?')[1] !== '' ? thisURL.split('?')[1].split("=")[1] : null;
      passUsername = decodeURI(passUsername);
      if(passUsername){
        if(han.test(passUsername))
        {
          this.user = passUsername;
          this.applyBtn=false;
          // this.requestUid(passUsername); 
        }
        else{
          // console.log(passUsername);
          this.requestCnname(passUsername);
           this.applyBtn=false;
        }
      }
      }
			var url = baseUrl+"/getTodayEvents/"+this.todaydate.Format("yyyy-MM-dd")
			this.$http.get(url).then(function(response) {

				
				var data = response.data;

				// console.log('ajax->'+data);
				this.items = data;
				this.loading = false;
				this.$message({
                              message: '获取数据成功！',
                              type: 'success'
                            });

			}, function(response) {
				this.loading=false;
				this.$message.error('获取数据失败！');
				return;
			});
	},
	methods : {
	  handleSelect(key, keyPath) {
      console.log(key, keyPath);
      switch(key)
            {
            case '2-1':
            {
              console.log('2-1');
              break;
            }
            case '2-2':
            {
              console.log('2-2');
              this.user = "游客";
              this.delCookies();
              break;
            }
            default:
              break;
            }
      },
      delCookies: function(){
        var url = baseUrl+"/delCookies";
        this.$http.get(url).then(function(response)  {
      
           this.$message({
                              message: '注销成功！',
                              type: 'success'
                            });
        setTimeout(function () {
          window.location.href='login.html';
               }, 2000);
      }, function(response) {
          this.$message.error('获取数据失败！');
      });
      },
      applyForm: function(){
      	this.dialogFormVisible = true;
      },
      addItem: function(formName){
   
   this.$refs[formName].validate(function (valid) {
      
      if (valid) {
          canBesubmit = true;
          
        } else {
          
          canBesubmit = false;
          
             }
        });
      // console.log('1111'+canBesubmit);
      
      if(canBesubmit){
        this.addloading = true;
      	this.eventform.handler = this.user;
  
          
        var url = baseUrl+"/addEvent";
        
       this.requestUid(this.user); 
        
      	var url = baseUrl+"/addEvent";
			this.$http.post(url,this.eventform,{emulateJSON: true}).then(function(response) {
      
				var data = response.body;
    //     console.log('add'+data);
				// console.log('add'+data.id);
				this.addloading = false;
        if(data == 1){
				this.$message({
                              message: '申请成功！',
                              type: 'success'
                            });
				this.dialogFormVisible = false;
				this.reloadAjax();}
        else 
          this.$message.error('会议室被预定！');
			}, function(response) {
				this.addloading=false;
				this.$message.error('申请失败，请联系系统管理员！');
				return;
			});}
      else {
        this.$message.error('请检查表格要求！');
      }
      },
      reloadAjax: function(){
      	this.loading = true;
			var url = baseUrl+"/getTodayEvents/"+this.todaydate.Format("yyyy-MM-dd")
			this.$http.get(url).then(function(response) {

				
				var data = response.data;

				// console.log('ajax->'+data);
				this.items = data;
				this.loading = false;
				this.$message({
                              message: '获取数据成功！',
                              type: 'success'
                            });

			}, function(response) {
				this.loading=false;
				this.$message.error('获取数据失败！');
				return;
			});
      },
      //  formatter(row, column) {
      //   return row.address;
      // },
      filterTag(value, row) {
        return row.mtroom === value;
      },
      log(value){
      	console.log(value);
      },
      setStartDate(val) {
            // console.log(val);
            this.eventform.sdate=val;
        },
  	  setEndDate(val) {
            this.eventform.edate=val;
        },
      requestCnname(username){

      var han = /^[\u4e00-\u9fa5]+$/;
      var url = baseUrl+"/usn2cnn/"+username;
      this.$http.get(url).then(function(response)  {
        // console.log(response.data);
      if(han.test(response.data))
      {
        this.user = response.data;
        // console.log('requestCnname'+this.user);
      }
      else{
        this.user = '游客';
        this.applyBtn=true;
      }
      
        
      }, function(response) {
        return;
      });
      },
      requestUid(username){
      var url = baseUrl+"/getUserID/"+username;
      this.$http.get(url).then(function(response)  {
      
      console.log(response.data);
      if(parseInt(response.data) !== 0)
         this.eventform.uid = parseInt(response.data);
      else{
        this.$message.error('请注销重新登录！');
        return;
        }
      }, function(response) {
        return;
      });
      },

      over:function(){
          if(this.user === '游客')
         this.$notify({
          title: '请登录',
          message: '申请会议室请先登录！',
          type: 'warning',
          duration: 1000
        });

      },

      showDetail: function(index, row){
         // console.log(index, row);
         this.detailFormVisible = true;
         this.rowfordetail = row;

      }

	},
    
	filters: {
        getYearmd: function(value) {
            return value.Format("yyyy-MM-dd");
        },
        getYearmdhms: function(value) {
            return value.Format("yyyy-MM-dd hh:mm:ss");
        },
        getYearmdhm: function(value) {
            return value.Format("yyyy-MM-dd hh:mm");
        }

    },

    // watch:{
    // 	'eventform.sdate':'log',
    // 	'eventform.edate':'log'
    // }

});
