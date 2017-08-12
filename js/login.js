const baseUrl = "http://10.117.0.7:8080/tp5/public";
var vm = new Vue({
	el : '#login',
	data : {
		loginform:{
			username:'',
			password:''
		},
		loginLoading:false,
	},
	methods:{
		onSubmit(){
			var usn = this.loginform.username;
			this.loginLoading = true;		
			var url = baseUrl+"/Login";
			this.$http.post(url,this.loginform,{emulateJSON: true}).then(function(response) {

				var res = response.body;
				console.log(res);
				this.loginLoading = false;

			if(res === 1){
				this.$message({
                              message: '登录成功！',
                              type: 'success'
                            });
				this.dialogFormVisible = false;
	setTimeout(function () {
          window.location.href='calendar.html?'+'username='+usn;
               }, 2000);
				
			}else{
				this.$message.error('用户名或密码错误！');
				return;
			}
			}, function(response) {
				this.addloading=false;
				this.$message.error('服务器错误，请联系管理员！');
				return;
			});
		},


	},


});