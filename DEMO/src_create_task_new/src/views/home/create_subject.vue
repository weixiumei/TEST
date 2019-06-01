<template>
  <!-- 创建任务 -->
  <div class="task_info">
    <div v-show="!shop_pop">
      <div style="padding: 10px;margin-top: 0;">
        <div class="weui-cells__title">任务名称 <span class="require">（必填）</span></div>
        <div class="weui-cell border">
          <div class="weui-cell__bd" style="margin-top:0;">
            <input class="weui-input" type="text" v-model="subject_input.task_type_name" placeholder="请输入任务名称"/>
          </div>
        </div>
        
        <div class="weui-cells__title">任务内容 <span class="require">（必填）</span></div>
        <textarea class="weui-textarea border" placeholder="请输入任务内容" v-model="subject_input.task_type_context" rows="3"></textarea>

        <div class="weui-cells__title">时间范围</div>
        <div style="width:100%;">
          <input class="weui-input border" type="date" v-model="subject_input.task_type_start_date" style="width:46%;padding: 15px 3px;text-align:center;"/>
          至 <input class="weui-input border" type="date" v-model="subject_input.task_type_end_date" style="width:46%;padding: 15px 3px;text-align:center;"/>
        </div>
      </div>
      <div class="jiange"></div>
      <div class="weui-cell weui-cell_access" v-on:click="go_shop_list()">
        <div class="weui-cell__bd">
          <p class="title_name">选择门店</p>
        </div>
        <div class="weui-cell__ft">
          {{subject_input.related_shop_ids.length}}
        </div>
      </div>
      <div class="jiange"></div>
      <div class="weui-cell weui-cell_access" v-on:click="go_condition_filter()">
        <div class="weui-cell__bd">
          <p class="title_name">筛选会员</p>
        </div>
        <div class="weui-cell__ft">
        </div>
      </div>
      <div class="btn_div">
        <div v-on:click="cancel()" class="weui-btn weui-btn_plain-primary">取消</div>
        <div v-on:click="finish()" class="weui-btn weui-btn_plain-primary finish">完成</div>
      </div>
    </div>

    <!-- 选择门店 -->
    <div v-show="shop_pop" class="shop_list">
      <div v-for="shop in shop_list" :key="shop.shop_id" @click="select_shop(shop)" class="shop">
        <img v-show="shop.selected" src="static/img/checkbox-on.png" alt=""> 
        <img v-show="!shop.selected" src="static/img/checkbox-off.png" alt="">
        {{shop.shop_name}}
      </div>
    </div>

    <div v-show="shop_pop" class="btn_div" style="z-index: 12;">
      <div class="select_all" @click="select_all_click()">
        <img  v-show="select_all" src="static/img/checkbox-on.png" alt=""> 
        <img v-show="!select_all" src="static/img/checkbox-off.png" alt="">
        全选
      </div>
      <div class="weui-btn weui-btn_plain-primary" @click="select_cancel()">返回</div>
      <div class="weui-btn weui-btn_plain-primary right_btn" @click="select_ok()">确认</div>
    </div>
  </div>
</template>
<script>
import { MARKETING_TASK_EDIT_INFO, GET_SHOP_LIST, CREATE_TASK_TYPE } from "@/api"
import { get_date_format, GetPreMonthDay } from '@/common/util/common'
export default {
  data () {
    return {
      subject_input:{
        "login_name": localStorage.getItem('login_name'),
        "related_shop_ids":[],
        "task_type_name": '',
        "task_type_context": '',
        "task_type_start_date": '',
        "task_type_end_date": '',
        "task_type_member_selection": {}
      },
      login_name: localStorage.getItem('login_name'),
      shop_list: [],
      select_shop_count:0,
      member_list:[],
      member_selected_list:[],
      shop_pop:false,
      select_all:false,
      search_condition:[]
    }
  },
  mounted() {
    let that = this;
    // 添加返回事件监听
    window.addEventListener("popstate", function(e) {
      that.shop_pop = false;
    }, false);
  },
  watch: {
    shop_pop: function(newVal, oldVal) {
      if (newVal === true) {
        this.pushHistory();
      }
    }
  },
  methods:{
    pushHistory() { // 修改history
      var state = {
        title: "新建任务",
        url: "/create_subject" 
        // 这个url可以随便填，只是为了不让浏览器显示的url地址发生变化，对页面其实无影响
      };
      window.history.pushState(state, state.title, state.url);
    },
    shop_pop_close() { // 点击弹出来的蒙板
      this.shop_pop = false;
      this.$router.back(); // 将添加记录从history中移除
    },
    // 返回
    cancel: function () {
      var that = this
      this.$router.push({
        name: "主题列表"
      }) 
    },
    // 完成
    finish: function () {
      let that = this
      if(!this.subject_input.task_type_name){
        alert('请输入任务名称');
        return;
      }
      if(!this.subject_input.task_type_context){
        alert('请输入任务内容');
        return;
      }
      if(!this.subject_input.task_type_start_date||!this.subject_input.task_type_end_date){
        alert('请输入时间范围');
        return;
      }
      if(new Date(this.subject_input.task_type_start_date)>new Date(this.subject_input.task_type_end_date)){
        alert('结束时间不能小于开始时间');
        return;
      }
      if(this.subject_input.related_shop_ids.length==0){
        alert('请选择门店');
        return;
      }
      var filter_data = this.subject_input.task_type_member_selection.filter_data;
      if(!filter_data.birthday_month_list){
        alert('请选择会员条件');
        return;
      }
      if( filter_data.start_open_card_date == GetPreMonthDay(get_date_format(new Date()), 12)&&
          filter_data.end_open_card_date == get_date_format(new Date())&&
          !!filter_data.birthday_month_list&&filter_data.birthday_month_list.length==0&&
          !!filter_data.last_shoping_date_list&&filter_data.last_shoping_date_list.length==0&&
          !!filter_data.level_code_list&&filter_data.level_code_list.length==0&&
          !!filter_data.sex_list&&filter_data.sex_list.length==0&&
          !!filter_data.tag_code_list&&filter_data.tag_code_list.length==0){
        alert('请选择会员条件');
        return;
      }
      this.subject_input.task_type_member_selection = JSON.stringify(this.subject_input.task_type_member_selection)
      CREATE_TASK_TYPE(this.subject_input).then(res => {
        this.$router.push({
          name: "主题列表"
        })
      })
    },
    go_condition_filter: function () {
      this.$router.push({
        name: "筛选会员条件",
        params:{
          subject: JSON.stringify(this.subject_input),
          shop_list: this.shop_list,
          isEdit: true,
          edit_role: true,
        }
      })
    },
    go_shop_list: function () {
      this.shop_pop = true
    },
    select_shop: function (shop) {
      shop.selected = !shop.selected;
      this.select_shop_count = 0
      this.shop_list.forEach(item => {
        if(item.selected){
          this.select_shop_count++
        }
      })
      if(this.select_shop_count==this.shop_list.length){
        this.select_all = true
      }else{
        this.select_all = false
      }
      this.$forceUpdate();
    },
    select_all_click: function () {
      this.select_all = !this.select_all
      if(this.select_all){
        this.shop_list.forEach(item => {
          item.selected = true;
        })
      }else{
        this.shop_list.forEach(item => {
          item.selected = false;
        })
      }
      this.$forceUpdate();
    },
    select_ok: function () {
      this.subject_input.related_shop_ids = []

      this.shop_list.forEach(item => {
        if(item.selected){
          this.subject_input.related_shop_ids.push(item.shop_id)
        }
      })
      this.shop_pop_close()
      this.shop_pop = false
    },
    select_cancel: function () {
      this.shop_pop_close()
      this.shop_pop = false
    }
  },
  created () {
    _paq.push(['setDocumentTitle', document.title])
    var subject_input = this.$route.params.subject
    this.search_condition = this.$route.params.search_condition
    if(!!subject_input){
      this.subject_input = JSON.parse(subject_input)
      this.subject_input.task_type_member_selection = JSON.parse(this.$route.params.task_type_member_selection)
    }else{
      this.subject_input.task_type_start_date=get_date_format(new Date());
      this.subject_input.task_type_end_date=GetPreMonthDay(get_date_format(new Date()), -1);
      this.subject_input.task_type_member_selection = {"filter_data":{}, "search_condition":{} }
    }
    let that = this;
    // 门店shop_list
    GET_SHOP_LIST({"login_name":this.login_name}).then(res => {
      that.shop_list = res.data.shop_info_list;
      if(that.subject_input.related_shop_ids.length==that.shop_list.length){
        this.select_all = true
      }else{
        this.select_all = false
      }
      that.shop_list.forEach(item => {
        if(!!that.subject_input.related_shop_ids&&that.subject_input.related_shop_ids.length>0){
          for(var i=0;i<that.subject_input.related_shop_ids.length;i++){
            if(that.subject_input.related_shop_ids[i]==item.shop_id){
              item.selected = true
              break
            }else{
              item.selected = false
            }
          }
        }else{
          if(that.subject_input.related_shop_ids.length==0&&that.shop_list.length==1){
            item.selected = true;
            that.select_all = true;
            that.subject_input.related_shop_ids = [item.shop_id];
          }else{
            item.selected = false;
          }
        }
      })
    })
  }
}
</script>

<style scoped>
  .task_info {
    /* padding-bottom: 1.6rem; */
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
  .shop_list{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    /* height: 100%; */
    height: 91%;
    overflow: auto;
    background: #fff;
    z-index: 11;
  }
  .shop{
    padding: 10px;
    border-bottom: .5px solid #E0E4E8;
    margin: 3px;
  }
  .shop img, .btn_div img{
    width: 14px;
  }
  .select_all{
    padding: 0;border: 0;color: #34495E;
    margin-left:10px;
  }
</style>
