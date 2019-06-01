<template>
  <!-- 查看相关会员 -->
  <div>
    <div class="search flex-around">
      <div @click="search('promotion')">
        <img src="static/img/checkbox-on.png" v-show="promotion_chk" alt="">
        <img src="static/img/checkbox-off.png" v-show="!promotion_chk" alt="">
        未执行营销
      </div>
      <div @click="search('backflow')">
        <img src="static/img/checkbox-on.png" v-show="backflow_chk" alt="">
        <img src="static/img/checkbox-off.png" v-show="!backflow_chk" alt="">
        未回流
      </div>
    </div>
    <div class="members" :style="{maxHeight: maxheight + 'px','overflow':'scroll','background':'#fff'}">
      <div v-for="( member,index) in member_list" :key="member.code" style="border-bottom: 4px solid #EFEFF4;padding-bottom: 6px;">
        <div class="weui-cell">
          <a v-on:click="go_member_detail(member)" class="weui-cell__bd" :href="WX_URL_PREFIX+'/nt-html-pbmini/nt-member-phone/?token='+WPDF_TOKEN+'&member_code='+member.member_code+'&member_no='+member.member_code+'#/home'">
            <p class="title_name"> <img src="static/img/detail.png" style="width: .3rem;"> {{member.member_name}}</p>
          </a>
          <a class="weui-cell__ft" :class="member.mobile==''?'':'color'" :href="!!member.mobile?('tel:' + member.mobile):'#'" style="font-size: 16px;"> 
            <img v-show="!!member.mobile" src="static/img/phone.png" style="width: .3rem;"> 
            {{member.mobile==''?'暂无':member.mobile}}
          </a>
        </div>
        <div class="weui-cell">
          <div class="two-cell" :class="task_item.task_state!='process'?'disabled':''" @click="is_done(member)">
            <img v-show="member.task_member_state=='al_marketing'" src="static/img/done-on.png">
            <div v-show="member.task_member_state=='al_marketing'">已执行营销</div>
            <img v-show="member.task_member_state=='no_marketing'" src="static/img/done-off.png">
            <div v-show="member.task_member_state=='no_marketing'" style="opacity: 0.5">未执行营销</div>
            <img src="static/img/backflow-on.png" alt="" class="backflow_img" v-show="member.al_back">
            <img src="static/img/backflow-off.png" alt="" class="backflow_img" v-show="!member.al_back">
          </div>
          <!-- <div class="two-cell" @click="edit_describe(member, index)">
            <img src="static/img/edit.png" style="margin-left: 20px;">
            <div>备注描述</div>
          </div> -->
        </div>
        <div class="weui-cell" v-show="!!member.task_member_context&&!member.remark_show" style="border-top: 1px dashed #efeff4;">
          {{member.task_member_context}}
        </div>
        <!-- 描述输入 -->
        <div v-show="member.remark_show">
          <div class="weui-cell" style="background: #fff;border:1px solid #d5d5d5;z-index: 11;position: relative;">
            <div class="weui-cell__bd">
              <!-- @blur="save_remark(member, index)" -->
              <input class="weui-input" type="text" :ref="'input'+index" placeholder="请输入备注" v-model="member.task_member_context" @keyup.enter="save_remark(member, index)" />
            </div>
          </div>
          <div style="display:flex;align-items: baseline;">
            <div v-on:click="click_bg()" class="weui-btn weui-btn_plain-primary btn_cancel_ok" style="">取消</div>
            <div v-on:click="save_remark(member, index)" class="weui-btn weui-btn_plain-primary btn_cancel_ok" style="margin-top:0;">确认</div>
          </div>
        </div>
        <div class="bg" v-show="bg_show" @click="click_bg(member)">
        </div>
      </div>
    </div>
    <div class="btn_div">
      <div v-on:click="goBack()" v-show="btn_show" class="weui-btn weui-btn_plain-primary">返回</div>
    </div>
  </div>
</template>
<script>
import { GET_MARKETING_TASK_INFO, UPDATE_MEMBER_INFO, UPDATE_TASK_INFO } from "@/api"
export default {
  data(){
    return{
      WX_URL_PREFIX:WX_URL_PREFIX,
      WPDF_TOKEN:localStorage.getItem('WPDF_TOKEN'),
      login_name:localStorage.getItem('login_name'), 
      maxheight:0,
      member_list:[],
      member_list_all:[],
      task_item:{},
      bg_show: false,
      member:{},
      click_type:'',
      btn_show:true,
      promotion_chk:false,
      backflow_chk:false
    }
  },
  // directives: {
  //   focus: {
  //     inserted: function (el, {value}) {
  //       // console.log(el,{value})
  //       if (value) {
  //         el.focus();
  //       }
  //     }
  //   }
  // },
  methods: {
    search: function (type) {
      let member_list1 = [], member_list2 = []
      // al_marketing/no_marketing
      if(type == 'promotion'){
        this.promotion_chk = !this.promotion_chk
      } else if(type == 'backflow') {
        // al_back
        this.backflow_chk = !this.backflow_chk
      }
      
      if(this.promotion_chk){
        if(this.backflow_chk){
          for(let i=0;i<this.member_list_all.length;i++){
            if(this.member_list_all[i].task_member_state == 'no_marketing'){
              member_list1.push(this.member_list_all[i])
            }
          }
          for(let i=0;i<member_list1.length;i++){
            if(!member_list1[i].al_back){
              member_list2.push(member_list1[i])
            }
          }
        }else{
          for(let i=0;i<this.member_list_all.length;i++){
            if(this.member_list_all[i].task_member_state == 'no_marketing'){
              member_list2.push(this.member_list_all[i])
            }
          }
        }
      }else{
        if(this.backflow_chk){
          for(let i=0;i<this.member_list_all.length;i++){
            if(!this.member_list_all[i].al_back){
              member_list2.push(this.member_list_all[i]);
            }
          }
        }else{
          member_list2 = this.member_list_all
        }
      }
      
      this.member_list = member_list2
      // console.log(this.member_list);
    },
    click_bg: function () {
      // alert('bg')
      this.btn_show = true
      this.bg_show = false
      this.member.task_member_context = this.remarks
      this.member.remark_show = false;
      // this.save_remark(this.member)
      this.$forceUpdate();
    },
    go_member_detail: function (member) {
      sessionStorage.setItem('task_item',  JSON.stringify(this.task_item));
    },
    // 已执行促销
    is_done:function (member) {
      if(member.task_member_state=='no_marketing'){
        member.task_member_state='al_marketing'
      }else{
        member.task_member_state='no_marketing'
      }
      let data = {
        "task_code": this.task_item.task_code,
        "member_code": member.member_code,
        "task_member_state": member.task_member_state,
        "login_name": this.login_name, 
        // "task_context": "测试更改"
      }
      this.update_member_info(data);
      
      var al_marketing_count = 0, no_marketing_count = 0;
      for(var i=0;i<this.member_list_all.length;i++){
        if(this.member_list_all[i].task_member_state=='no_marketing'){
          no_marketing_count++;
        }else{
          al_marketing_count++;
        }
      }
      if(al_marketing_count==this.member_list_all.length){
        let data = {
          "task_code": this.task_item.task_code,
          "task_state": 'done'
        }
        this.update_task_info(data)
      }else if(no_marketing_count==1){
        let data = {
          "task_code": this.task_item.task_code,
          "task_state": 'process'
        }
        this.update_task_info(data)
      }
    },
    edit_describe: function (member, index) {
      this.btn_show = false
      this.remarks = member.task_member_context
      for (var i=0;i<this.member_list.length;i++) {
        if(this.member_list[i].member_code!=member.member_code){
          this.member_list[i].remark_show = false;
        }
      }
      for (var i=0;i<this.member_list_all.length;i++) {
        if(this.member_list_all[i].member_code!=member.member_code){
          this.member_list_all[i].remark_show = false;
        }
      }
      member.remark_show = !member.remark_show;
      if(member.remark_show){
        this.bg_show = true
      }
      setTimeout(()=>{
        // document.getElementById('input'+index).focus();
        var str = 'input'+index
        this.$refs[str][0].focus()
      },100);
      this.member = member
      this.$forceUpdate();
    },
    save_remark: function (member, index) {
      // alert('save')
      this.btn_show = true
      this.bg_show = false;
      let data = {
        "task_code": this.task_item.task_code,
        "member_code": member.member_code,
        // "task_member_state": member.task_member_state,
        "login_name": this.login_name, 
        "task_member_context": member.task_member_context
      }
      this.update_member_info(data);
      member.remark_show = false;
      setTimeout(()=>{
        // document.getElementById('input'+index).focus();
        var str = 'input'+index
        if(!!this.$refs&&!!this.$refs[str]){
          this.$refs[str][0].blur()
        }
      },100);
      this.$forceUpdate();
    },
    goBack: function () {
      this.$router.push({
        name:'任务详情',
        params:{
          task_item:this.task_item
        }
      })
    },
    get_member_list: function () {
      var that = this;
      GET_MARKETING_TASK_INFO({'task_code': that.task_item.task_code}).then(res => {
        that.member_list = res.data.task_info.member_list;
        that.member_list.forEach(item => {
          item.remark_show = false;
        })

        // 为筛选备份
        that.member_list_all = res.data.task_info.member_list;
        that.member_list_all.forEach(item => {
          item.remark_show = false;
        })
      })
    },
    update_member_info: function (data) {
      var that = this;
      UPDATE_MEMBER_INFO(data).then(res => {
      })
    },
    update_task_info: function (data) {
      var that = this;
      UPDATE_TASK_INFO(data).then(res => {
      })
    }
  },
  mounted: function () {
    
  },
  created: function () {
    _paq.push(['setDocumentTitle', document.title])
    
    // var winHeight = window.innerHeight;  //获取当前页面高度
    // window.onresize = function () {
    //     var thisHeight = window.innerHeight;
    //     if ( winHeight - thisHeight > 140 ) {
    //         //键盘弹出
    //         alert('1')
    //     } else {
    //         //键盘收起
    //         alert('2')
    //     }
    // }
    var screabHeight = window.innerHeight
    this.maxheight = screabHeight - 90

    if(!!sessionStorage.getItem('task_item')){
      this.task_item = JSON.parse(sessionStorage.getItem('task_item'));
    }else{
      this.task_item = this.$route.params.task_item
    }
    console.log(this.task_item)
    if(!!this.task_item&&!!this.task_item.task_code){
      sessionStorage.setItem('task_item', '');
      this.get_member_list();
    }
  }
}
</script>

<style scoped>
  .search{
    padding: 10px 0;
  }
  .search img{
    width: 14px;
  }
  .weui-cell:before{
    border-top: 0;
  }
  .two-cell{
    display:flex;align-items: center;
    font-size: 14px;
  }
  .two-cell img{
    width: .3rem;height:.3rem;margin-right: 10px;
  }
  .two-cell div{
    color:#222;;
  }

  .title_name{
    color:#353535;
    font-weight: 500;
    font-size: 16px;
    width: 4.4rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 0;
  }
  .bg{
    /* background:rgb(53,53,53,0.05); */
    background: rgba(239,239,244,0.05);
    opacity: 0.3;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
  }
  .btn_cancel_ok{
    z-index: 11;width: 50%;
    font-size: 14px;
    padding: 4px 0;
  }
  .btn_cancel_ok:after, .weui-btn.btn_cancel_ok{
    border-radius: 0px;
    border-top: 0;
  }
  .backflow_img{
    width: 1rem!important;
    height: .75rem!important;
    position: absolute;
    right: .4rem;
  }
  .color{
    color: #09BB07;
  }
</style>
