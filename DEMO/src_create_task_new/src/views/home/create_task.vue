<template>
  <!-- 创建任务 -->
  <div class="task_info">
    <div style="padding: 10px;margin-top: 0;">
      <div class="weui-cells__title">任务标题 <span class="lighter">（必填）</span></div>
      <!-- <div class="weui-cell border"> -->
      <div style="text-indent: 28px;">
        <div class="weui-cell__bd" style="margin-top:0;">
          <!-- <input class="weui-input font-weight-500" type="text" v-model="task_name" placeholder="请输入任务标题"/> -->
          <div>{{task_name}}</div>
        </div>
      </div>
      
      <div class="weui-cells__title">任务内容 <span class="lighter">（必填）</span></div>
      <!-- <textarea class="weui-textarea border" placeholder="请输入任务内容" v-model="task_context" rows="3"></textarea> -->
      <div style="text-indent: 28px;">{{task_context}}</div>
      
      <div class="weui-cells__title">任务时间</div>
      <div style="width:100%;">
        <div style="text-indent: 28px;margin-top: 5px;color: #000;">{{start_date}} 至 {{end_date}}</div>
        <!-- <input class="weui-input border" type="date" v-model="start_date" style="width:46%;padding: 15px 3px;text-align:center;"/>
        至 <input class="weui-input border" type="date" v-model="end_date" style="width:46%;padding: 15px 3px;text-align:center;"/> -->
      </div>
    </div>
    <div class="jiange"></div>
    <div>
      <div class="weui-cells__title">分配给以下导购<span class="lighter">（若有导购未显示请联系管理员）</span></div>
      <div style="color: #FF0008;background: rgb(255,0,8,0.2);font-size: 13px;padding: 3px 10px;margin: 7px 0;">每个任务仅可执行 1次 批量分配。若要修改导购，可在任务详情内替换其他人员。</div>
      <label 
        class="label_style" 
        v-for="guide in shopping_guide" 
        :key="guide.code" 
        :class="{selected: guide.selected}"
        @click="item_click(guide, 'guide_param_list')"
        >
        {{guide.user_name}}
      </label>
    </div>
    <div class="btn_div">
      <div v-on:click="cancel()" class="weui-btn weui-btn_plain-primary">返回</div>
      <div v-on:click="finish()" class="weui-btn weui-btn_plain-primary right_btn">完成</div>
    </div>
    <!-- dialog -->
    <dialog-custom v-show="confirm_dialog" type="alert" title="分配失败" confirmButton="知道了" @dialog_confirm="close_dialog">当前任务下暂无符合条件的会员</dialog-custom>
  </div>
</template>
<script>
import dialogCustom from "@/components/dialog"
import { GET_SEARCH_RELATED_USERS, MARKETING_TASK_EDIT_INFO, MEMBER_LIST } from "@/api"
import { get_date_format, GetPreMonthDay } from '@/common/util/common'
export default {
  data () {
    return {
      login_name: localStorage.getItem('login_name'),
      shop_id: localStorage.getItem('shop_id')*1,
      confirm_dialog:false,
      task_name: '',
      task_context: '',
      start_date: '',
      end_date: '',
      guide_param_list:[],
      shopping_guide: [],
      member_list:[],
      member_selected_list:[],
      task_type_id:''
    }
  },
  methods:{
    // 返回
    cancel: function () {
      var that = this
      this.$router.push({
        name: "任务列表"
      }) 

      // this.$router.push({
      //   name: "选择主题",
      //   params:{
      //     from:this.from,
      //     subject:this.subject
      //   }
      // }) 
      // this.$router.push({
      //   name: "会员列表",
      //   params: { member_list: that.member_list }
      // }) 
    },
    close_dialog: function () {
      this.$router.push({
        name:'任务列表'
      })
      this.confirm_dialog = false;
    },
    // 完成
    finish: function () {
      if(this.member_selected_list.length==0){
        this.confirm_dialog = true;
        return;
      }
      let that = this
      if(!this.task_name){
        alert('请输入任务标题');
        return;
      }
      if(!this.task_context){
        alert('请输入任务描述');
        return;
      }
      if(!this.start_date||!this.end_date){
        alert('请输入任务时间');
        return;
      }
      if(new Date(this.start_date)>new Date(this.end_date)){
        alert('结束时间不能小于开始时间');
        return;
      }
      if(this.guide_param_list.length==0){
        alert('请输入需分配的导购');
        return;
      }
      // 筛选出的会员为0时
      var data={
        "login_name": this.login_name,
        // "related_shop_id":this.shop_id,
        "res_code_list": this.guide_param_list,
        "start_date": this.start_date,
        "end_date": this.end_date,
        "task_context": this.task_context,
        "task_name": this.task_name,
        "member_info_list": this.member_selected_list,
        "task_type_id": this.subject.task_type_id
      }
      
      MARKETING_TASK_EDIT_INFO(data).then(res => {
        // this.get_marketing_task_list();
        that.$router.push({
          name:'任务列表'
        })
      })
      
    },
    item_click: function (item_date, type) {
      item_date.selected = !item_date.selected;
      // this.$set(item_date, 'selected', !item_date.selected);
      this.set_param(item_date, type);
      this.$forceUpdate();
    },
    set_param: function (item_date, param_list) {
      if(item_date.selected){
        // 卡类型字段为level_code
        if(param_list=='card_styles_param_list'){
          this[param_list].push(item_date.level_code);
        } else if(param_list=='guide_param_list'){
          this[param_list].push(item_date.user_code);
        } else if (param_list=='sex'){// 性别
          for(var i=0;i<this.sex_list.length;i++){
            if(this.sex_list[i].code==item_date.code){
              this.sex_param = item_date.code
              this.sex_list[i].selected = true;
            }else{
              this.sex_list[i].selected = false;
            }
          }
        }else{
          this[param_list].push(item_date.code);
        }
      }else{
        if(param_list=='card_styles_param_list'){
          for(var i=this[param_list].length-1;i>=0;i--){
            if(this[param_list][i]==item_date.level_code){
              this[param_list].splice(i,1);
            }
          }
        }else if(param_list=='guide_param_list'){
          for(var i=this[param_list].length-1;i>=0;i--){
            if(this[param_list][i]==item_date.user_code){
              this[param_list].splice(i,1);
            }
          }
        } else if (param_list=='sex'){// 性别
          this.sex_param = '';
        }else{
          for(var i=this[param_list].length-1;i>=0;i--){
            if(this[param_list][i]==item_date.code){
              this[param_list].splice(i,1);
            }
          }
        }
      }
    },
    // 导购列表
    get_search_related_users: function (data) {
      var that = this;
      GET_SEARCH_RELATED_USERS(data).then(res => {
        var shopping_guide = [];
        res.data.user_info_list.forEach(item => {
          item.selected = false;
          if(!!item.user_qy_userid){
            shopping_guide.push(item)
          }
        })
        that.shopping_guide = shopping_guide;
      })
    }
  },
  created () {
    _paq.push(['setDocumentTitle', document.title])

    this.from = this.$route.params.from
    // this.member_list = this.$route.params.member_list
    // this.member_selected_list = this.$route.params.member_selected_list
    this.subject = this.$route.params.subject

    // 任务标题，内容默认为主题标题内容
    this.task_name = this.subject.task_type_name
    this.task_context = this.subject.task_type_context
    console.log(this.subject)
    // this.search_condition = JSON.parse(this.$route.params.task_type_member_selection).search_condition
    // this.filter_data = JSON.parse(this.$route.params.task_type_member_selection).filter_data
    this.filter_data = JSON.parse(this.subject.task_type_member_selection).filter_data;
    if(!this.filter_data){
      this.filter_data = JSON.parse(JSON.parse(this.subject.task_type_member_selection)).filter_data;
    }
    if(this.from=="task_list"){
      this.filter_data.related_shop_id = localStorage.getItem('shop_id1')*1
      this.filter_data.task_type_id = this.subject.task_type_id
    }else{
      this.filter_data.related_shop_id = localStorage.getItem('shop_id')*1
      this.filter_data.task_type_id = this.subject.task_type_id
    }
    // this.filter_data.related_shop_id = this.shop_id
    this.task_type_id = this.subject.task_type_id
    var that = this
    MEMBER_LIST(that.filter_data).then(res => {
      that.member_selected_list = res.data.member_list
    })
    
    this.start_date=get_date_format(new Date());
    this.end_date=GetPreMonthDay(get_date_format(new Date()), -1);
    
    if(this.from=='task_list'){
      let data = {
        "login_name": this.login_name, 
        "related_shop_id":localStorage.getItem('shop_id1')*1
      }
      // 导购列表
      this.get_search_related_users(data);
    }else{
      let data = {
        "login_name": this.login_name, 
        "related_shop_id":localStorage.getItem('shop_id')*1
      }
      // 导购列表
      this.get_search_related_users(data);
    }
    
  },
  components:{
    dialogCustom
  }
}
</script>

<style scoped>
  .task_info {
    padding-bottom: 1.6rem;
    /* min-height: 667px; */
    background: #fff;
  }
  .task_info textarea{
    padding: 10px;
    background: #fff;
  }
  .border{
    background: #EEF0F3!important;
    border-radius: 5px;
    font-family: PingFangSC-Regular;
    font-size: 15px;
  }
  input,textarea{
    color: #000;
  }
  .finish{
    background: #81B83B;
    color: #fff;
  }
  .lighter{
    /* color: red; */
    font-family: 'PingFang SC', 'Microsoft YaHei';
    font-weight: lighter!important;
  }
</style>
