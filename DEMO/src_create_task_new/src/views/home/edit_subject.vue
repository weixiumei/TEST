<template>
  <div>
    <!-- 编辑任务明细 -->
    <div v-show="edit&&!shop_pop" class="task_info">
      <div class="flex-between" style="padding: 0 28px;">
        <div v-for="state in state_list" :key="state.code" @click="state_change(state)">
          <img src="static/img/radio-on.png" class="user_img" v-show="subject.task_type_state==state.code" alt="">
          <img src="static/img/radio-off.png" class="user_img" v-show="subject.task_type_state!=state.code"  alt="">
          {{state.name}}
        </div>
      </div>

      <div class="jiange"></div>

      <div style="padding:10px;">
        <div class="weui-cells__title">任务名称 <span class="require">（必填）</span></div>
        <div class="weui-cell border">
          <div class="weui-cell__bd" style="margin-top:0;">
            <input class="weui-input" type="text" v-model="subject.task_type_name" placeholder="请输入任务名称"/>
          </div>
        </div>
        
        <div class="weui-cells__title">任务内容 <span class="require">（必填）</span></div>
        <textarea class="weui-textarea border" placeholder="请输入任务内容" v-model="subject.task_type_context" rows="3"></textarea>
        
        <div class="weui-cells__title">日期范围</div>
        <div style="width:100%;">
          <input class="weui-input border" type="date" v-model="subject.task_type_start_date" style="width:46%;padding: 15px 3px;text-align:center;"/>
          至 <input class="weui-input border" type="date" v-model="subject.task_type_end_date" style="width:46%;padding: 15px 3px;text-align:center;"/>
        </div>
      </div>

      <div class="jiange"></div>

      <div class="weui-cell weui-cell_access" v-on:click="go_shop_list()" style="margin-top: 0;padding: 0 10px;">
        <div class="weui-cell__bd">
          <p class="title_name">参与门店</p>
        </div>
        <div class="weui-cell__ft">
          {{subject.related_shop_ids.length}}
        </div>
      </div>

      <div class="jiange"></div>

      <div class="weui-cell weui-cell_access" v-on:click="go_condition_filter()" style="margin-top: 0;padding: 0 10px;">
        <div class="weui-cell__bd">
          <p class="title_name">参与会员筛选</p>
        </div>
        <div class="weui-cell__ft">
        </div>
      </div>
    </div>
    
    <!-- 查看任务明细 -->
    <div v-show="!edit&&!shop_pop" class="task_info">
      <div class="task_type_tit">
        <div class="title_label" style="font-weight: 500;">
          <img src="static/img/task.png" style="width:14px;margin-bottom: 3px;"> {{subject.task_type_name}}
        </div>
        <div class="state" :class="subject.task_type_state">{{task_state_text}}</div>
      </div>

      <div class="jiange"></div>

      <div class="task_type_content">
        <div class="weui-cell" style="padding:0;">
          <div class="weui-cell__bd">
            任务内容
          </div>
        </div>
        <textarea class="weui-textarea disabled" style="padding-top: 5px;text-indent: 28px;padding:0;" placeholder="任务内容" v-model="subject.task_type_context" rows="3"></textarea>

        <div>
          <span>日期范围</span>
          <div style="text-indent: 28px;margin-top: 5px;color: #000;">{{subject.task_type_start_date}} 至 {{subject.task_type_start_date}}</div>
        </div>
      </div>

      <div class="jiange"></div>
      <div class="weui-cell weui-cell_access" style="margin-top: 0;padding: 0 15px;" v-on:click="go_shop_list()">
        <div class="weui-cell__bd">
          <p class="title_name">参与门店</p>
        </div>
        <div class="weui-cell__ft">
          {{subject.related_shop_ids.length}}
        </div>
      </div>
      <div class="jiange"></div>
      <div class="weui-cell weui-cell_access" style="margin-top: 0;padding: 0 15px;" v-on:click="go_condition_filter()">
        <div class="weui-cell__bd">
          <p class="title_name">参与会员筛选</p>
        </div>
        <div class="weui-cell__ft">
        </div>
      </div>
    </div>

    <!-- 选择门店 -->
    <div v-show="shop_pop">
      <div class="shop_list" v-show="!!shop_list">
        <div v-for="shop in shop_list" :key="shop.related_shop_id" @click="select_shop(shop)" class="shop">
          <img v-show="shop.selected&&edit" src="static/img/checkbox-on.png" alt=""> 
          <img v-show="!shop.selected&&edit" src="static/img/checkbox-off.png" alt="">
          {{edit?shop.shop_name:shop.related_shop_name}}
        </div>
      </div>

      <div class="btn_div">
        <div v-show="edit" class="select_all" @click="select_all_click()">
          <img  v-show="select_all" src="static/img/checkbox-on.png" alt=""> 
          <img v-show="!select_all" src="static/img/checkbox-off.png" alt="">
          全选
        </div>
        <div class="weui-btn weui-btn_plain-primary" @click="select_shop_cancel()">返回</div>
        <div v-show="edit" class="weui-btn weui-btn_plain-primary right_btn" @click="select_shop_ok()">确认</div>
      </div>
    </div>

    <!-- btn -->
    <!-- v-show="!edit&&subject.task_num==0&&subject.task_type_user_login==login_name&&subject.task_type_state=='process'" -->
    <div class="btn_div" v-show="!shop_pop">
      <div v-on:click="cancel()" class="weui-btn weui-btn_plain-primary">返回</div>
      <div v-on:click="_edit()" v-show="!edit&&subject.task_type_state=='process'&&subject.task_type_user_login==login_name&&subject.task_num==0" class="weui-btn weui-btn_plain-primary right_btn">编辑明细</div>
      <div v-on:click="save_check()" v-show="edit" class="weui-btn weui-btn_plain-primary right_btn" style="padding: 0 12px;margin-right: 0;">保存</div>
      <div v-on:click="_edit_cancel()" v-show="edit" class="weui-btn weui-btn_plain-primary" style="padding: 0 12px;margin-left: 8px;">取消</div>
    </div>

    <!-- dialog -->
    <dialog-custom v-show="confirm_dialog" type="confirm" title="提示" @dialog_cancel="close_dialog" @dialog_confirm="save">确认结束该任务与相关导购任务</dialog-custom>
    
  </div>
</template>
<script>
import dialogCustom from "@/components/dialog"
import { GET_SHOP_LIST,MARKETING_TASK_TYPE_UPDATE_INFO } from "@/api"
import { get_date_format, GetPreMonthDay } from '@/common/util/common'
export default {
  data(){
    return{
      login_name: localStorage.getItem('login_name'),
      edit:false,
      confirm_dialog:false,
      shop_pop:false,
      select_all:false,
      edit_role:false,
      role:'',
      state_list:[
        {
          name:'进行中',
          code:'process',
          selected:false
        },
        {
          name:'完成',
          code:'done',
          selected:false
        },
        {
          name:'作废',
          code:'invalid',
          selected:false
        }
      ],
      subject:{}
    }
  },
  methods:{
    close_dialog: function () {
      this.confirm_dialog = false;
    },
    save_check: function () {
      let that = this
      if(!this.subject.task_type_name){
        alert('请输入任务名称');
        return;
      }
      if(!this.subject.task_type_context){
        alert('请输入任务内容');
        return;
      }
      if(!this.subject.task_type_start_date||!this.subject.task_type_end_date){
        alert('请输入时间范围');
        return;
      }
      if(new Date(this.subject.task_type_start_date)>new Date(this.subject.task_type_end_date)){
        alert('结束时间不能小于开始时间');
        return;
      }
      if(this.subject.related_shop_ids.length==0){
        alert('请选择门店');
        return;
      }
      if(this.subject.task_type_state=='done'||this.subject.task_type_state=='invalid'){
        this.confirm_dialog = true;
      }else{
        this.save();
        this.confirm_dialog = false;
      }
    },
    save: function () {
      // if(new Date(this.subject.task_type_start_date) - new Date(get_date_format(new Date()))<0){
      //   alert('日期范围不可为之前日期')
      // }
      // this.subject.task_type_member_selection = JSON.stringify(this.subject.task_type_member_selection)
      MARKETING_TASK_TYPE_UPDATE_INFO(this.subject).then(res => {
        this.edit = false
        window.document.title = '任务明细';
        this.confirm_dialog = false;
        localStorage.setItem('subject', JSON.stringify(this.subject))
        this.switch_state();
        // this.$router.push({
        //   name:'门店列表',
        //   params:{
        //     task_type_code: this.subject.task_type_code
        //   }
        // })
      })
    },
    _edit_cancel: function () {
      window.document.title = '任务明细';
      this.edit = false
    },
    _edit: function () {
      window.document.title = '编辑明细';
      this.edit = true
      var that = this
      // 门店shop_list
      GET_SHOP_LIST({"login_name":this.login_name}).then(res => {
        that.shop_list = res.data.shop_info_list;
        if(that.subject.related_shop_ids.length==that.shop_list.length){
          this.select_all = true
        }else{
          this.select_all = false
        }
        that.shop_list.forEach(item => {
          if(!!that.subject.related_shop_ids&&that.subject.related_shop_ids.length>0){
            for(var i=0;i<that.subject.related_shop_ids.length;i++){
              if(that.subject.related_shop_ids[i]==item.shop_id){
                item.selected = true
                break
              }else{
                item.selected = false
              }
            }
          }else{
            item.selected = false;
          }
        })
      })
    },
    cancel: function () {
      if(this.role == 'shopowner'){
        this.$router.push({
          name:'任务列表',
          params:{
            subject:this.subject
          }
        })
      }else{
        this.$router.push({
          name:'门店列表',
          params:{
            subject:this.subject
          }
        })
      }
    },
    go_shop_list: function () {
      this.shop_pop = true;
    },
    select_shop: function (shop) {
      if(!this.edit){
        return;
      }else{
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
      }
    },
    select_shop_cancel: function () {
      this.shop_pop = false;
    },
    select_shop_ok: function () {
      this.subject.related_shop_ids = []
      this.shop_list.forEach(item => {
        if(item.selected){
          this.subject.related_shop_ids.push(item.shop_id)
        }
      })
      this.shop_pop = false
    },
    select_cancel: function () {
      this.shop_pop = false
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
    go_condition_filter: function () {
      // <!-- v-show="!edit&&subject.task_num==0&&subject.task_type_user_login==login_name&&subject.task_type_state=='process'" -->
      if(this.subject.task_num!=0 || this.subject.task_type_user_login!=this.login_name || this.subject.task_type_state!='process'){
        this.edit_role = false
      }else{
        this.edit_role = true
      }
      this.$router.push({
        name: "筛选会员条件",
        params:{
          subject: this.subject,
          shop_list: this.shop_list,
          isEdit: this.edit,
          // isEdit=true但已有任务或创建人和当前人不同
          edit_role: this.edit_role,
          from: 'edit_subject'
        }
      })
    },
    // next: function () {
    //   // sessionStorage.setItem('search_condition', JSON.stringify(search_condition))
    //   this.$router.push({
    //     name:'筛选会员条件',
    //     params:{
    //       subject:this.subject,
    //       related_shop_info_list:this.related_shop_info_list,
    //       isEdit:true
    //     }
    //   })
    // },
    state_change: function (state) {
      this.subject.task_type_state = state.code
    },
    switch_state: function() {
      switch(this.subject.task_type_state){
        case 'process':
          this.task_state_text = '进行中';
          break;
        case 'done':
          this.task_state_text = '完成';
          break;
        case 'invalid':
          this.task_state_text = '作废';
          break;
      }
      this.$forceUpdate();
    },
  },
  created(){
    window.document.title = '任务明细';
    this.subject = this.$route.params.subject
    this.edit = this.$route.params.isEdit
    this.subject.related_shop_ids = []
    for(var i=0;i<this.subject.related_shop_info_list.length;i++){
      this.subject.related_shop_ids.push(this.subject.related_shop_info_list[i].related_shop_id)
    }
    this.role = localStorage.getItem('role')
    console.log(this.subject)
    if(!this.edit){
      this.shop_list = this.subject.related_shop_info_list
    }else{
      this._edit();
    }
    
    this.switch_state();
    if(this.edit){
      this.subject.task_type_member_selection = this.$route.params.task_type_member_selection
    }
    
  },
  components:{
    dialogCustom
  }
}
</script>

<style scoped>
  .task_type_tit{
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
  .task_type_content{
    padding: 0 10px;
  }
  .weui-cell:before{
    border-top: 0;
  }
 .task_info {
    padding-bottom: 0.3rem;
    /* min-height: 667px; */
    background: #fff;
    overflow: scroll;
    margin-bottom: 1rem;
    /* padding: 10px; */
  }
  .task_info div{
    margin-top: 10px;
  }
  .task_info textarea{
    /* padding: 10px; */
    
    background: #fff;
  }
    input,textarea{
    color: #000;
  }
  .task_info textarea{
    padding: 10px;
  }
  .user_img{
    width:14px;
    margin-bottom: 2px;
    margin-right:4px;
  }
    .draft{
    color: #89C0FF;
  }
  .process{
    color: #F5A623;
  }
  .done{
    color: #81B83B;
  }
  .invalid{
    color: #A4ADB7;
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
