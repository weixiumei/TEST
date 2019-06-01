<template>
  <div style="background:#fff;">
    <div v-show="from=='task_list'">
      <div class="weui-cells__title">请选择任务主题</div>
      <div class="weui-cell border">
        <div class="weui-cell__bd" style="margin-top:0;">
          <select name="select1" @change="subject_change()" v-model="task_type_id" class="state border">
            <option selected="" v-for="(value, key) in subject_list" :key="key" :value="value.task_type_id">{{value.task_type_name}}</option>
          </select>
          <!-- <input class="weui-input" type="text" v-model="task_name" placeholder="请输入任务标题"/> -->
        </div>
      </div>
    </div>
    <!-- <div v-show="view">
      <div class="weui-cells__title">请确认任务主题</div>
      <div class="weui-cell border">
        <div class="weui-cell__bd" style="margin-top:0;">
          <div><img src="static/img/title.png" alt="" style="width:24px;"> {{subject.task_type_name}}</div>
        </div>
      </div>
    </div> -->
    <div class="weui-cells__title">主题内容</div>
    <div class="weui-cell">{{subject.task_type_context}}</div>

    <div class="weui-cells__title">有效时间</div>
    <div class="weui-cell">{{subject.task_type_start_date}} 至 {{subject.task_type_end_date}}</div>
    <div class="btn_div">
      <div v-on:click="cancel()" class="weui-btn weui-btn_plain-primary">取消</div>
      <div v-on:click="next()" class="weui-btn weui-btn_plain-primary right_btn">下一步</div>
    </div>
  </div>
</template>
<script>
import { MARKETING_TASK_TYPE_LIST } from "@/api";

export default {
  data () {
    return {
      task_type_id:'',
      subject:'',
      // subject_list:[{task_type_id:1,task_type_name:'2345'}],
      subject_list:[],
      login_name: localStorage.getItem('login_name'),
      shop_id: localStorage.getItem('shop_id')*1,
      from:''
    }
  },
  methods: {
    cancel: function () {
      if(this.from=='task_list'){
        this.$router.push({
          name:'任务列表',
          params:{
            subject:this.subject,
          }
        })
      }else{
        this.$router.push({
          name:'主题列表',
          params:{
            subject:this.subject,
          }
        })
      }
      
    },
    subject_change: function () {
      for(var i=0;i<this.subject_list.length;i++){
        if(this.task_type_id == this.subject_list[i].task_type_id){
          this.subject = this.subject_list[i]
        }
      }
    },
    next: function () {
      this.$router.push({
        name:'创建任务',
        params:{
          subject:this.subject,
          from: this.from,
          task_type_id:this.task_type_id,
          task_type_member_selection: this.subject.task_type_member_selection
        }
      })
    }
  },
  created(){
    this.from = this.$route.params.from

    _paq.push(['setDocumentTitle', document.title]);
    var that = this
    var data = {
      // "login_name":this.login_name,
      "shop_id": localStorage.getItem('shop_id1')*1,
      "task_state":"process"
    }
    this.subject = JSON.parse(localStorage.getItem('subject'))
    if(this.from=='task_list'){
      MARKETING_TASK_TYPE_LIST(data).then(res => {
        that.subject_list = res.data.task_type_info_list;
        that.subject = this.subject
        that.task_type_id = that.subject.task_type_id
      })
    }
  }
}
</script>

<style scoped>
  .border{
    background: #fff !important;
    border-radius: 5px;
    font-family: PingFangSC-Regular;
    font-size: 15px;
    width: 100%;
  }
  .weui-cell:before{
    border-top: 0;
  }
</style>
