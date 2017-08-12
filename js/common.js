var toast = Vue
        .component(
                "toast",
                {
                    template : '<div> \
<div class="weui-mask_transparent"></div> \
<div class="weui-toast">\
    <i class="weui-icon-success-no-circle weui-icon_toast"></i>\
    <p class="weui-toast__content">{{msg}}</p>\
</div>\
</div>',
                    props : [ 'msg' ]
                });

var ajaxLoader = Vue
        .component(
                "ajax-loader",
                {
                    template : '<div id="ajaxLoader"> \
<div class="weui-mask_transparent"></div> \
<div class="weui-toast">\
<i class="weui-loading weui-icon_toast"></i>\
<p class="weui-toast__content">数据加载中</p>\
</div>\
</div>'
                });

var tip = Vue
        .component(
                "tip",
                {
                    template : '<div v-show="tipShow"> \
<div class="weui-mask"></div>\
<div class="weui-dialog">\
<div class="weui-dialog__hd">\
<strong class="weui-dialog__title">{{msg.title}}</strong>\
</div>\
<div class="weui-dialog__bd">{{msg.content}}</div> \
<div class="weui-dialog__ft"> \
<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="hideTip">确定</a>\
</div>\
</div>\
</div>',
                    data : function()
                    {
                        return {
                            tipShow : true
                        }
                    },

                    props : [ "msg" ],
                    methods : {
                        hideTip : function()
                        {


                            this.$parent.$emit("hideTip");

                        }
                    },
                });
