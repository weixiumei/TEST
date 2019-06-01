<template>
  <!-- 筛选出的会员list -->
  <div>
    <div v-if="member_list.length>0">
      <div class="title flex-between">
        <div @click="select_all_click">
          <img src="static/img/check-box-on.png" v-show="selected_all" style="width: 20px;margin: 0 10px;">
          <img src="static/img/check-box-off.png" v-show="!selected_all" style="width: 20px;margin: 0 10px;">
          全选(符合条件)
        </div>
        <div>&nbsp;&nbsp;&nbsp;共{{member_num}}个会员 已选{{select_count}}个会员 </div>
      </div>
      <div style="padding-top: .9rem;padding-bottom: 1.2rem;">
        <div id="members" class="weui-cells" v-for="member in member_list" :key="member.code" v-on:click="toggle_select_click(member)">
          <div class="weui-cell" :class="selected_all?'disabled':''">
            <img src="static/img/check-box-on.png" v-show="member.selected" style="width: 20px;margin: 0 10px;">
            <img src="static/img/check-box-off.png" v-show="!member.selected" style="width: 20px;margin: 0 10px;">
            <div class="weui-cell__bd">
                <p class="member_name">{{member.member_name}}</p>
            </div>
            <div class="weui-cell__ft">{{member.mobile==''?'暂无':member.mobile}}</div>
          </div>
        </div>
      </div>
      <div class="btn_div">
        <div v-on:click="pre_to_condition()" class="weui-btn weui-btn_plain-primary">上一步</div>
        <div v-on:click="next_to_edit_before()" class="weui-btn weui-btn_plain-primary right_btn">下一步</div>
      </div>
    </div>
    <div v-if="member_list.length==0">
      <div class="nodata">暂无会员</div>
      <div class="btn_div">
        <div v-on:click="pre_to_condition()" class="weui-btn weui-btn_plain-primary">上一步</div>
      </div>
    </div>
  </div>
</template>
<script>
  import { MEMBER_LIST } from "@/api";
export default {
  data () {
    return {
      search_condition:{
        offset_size:1
      },
      loading:false,
      member_list:[],
      member_num:0,
      select_count:0,
      selected_all:true,
      shop_id:localStorage.getItem('shop_id1')*1,
    }
  },
  methods: {
    select_all_click: function () {
      this.selected_all = !this.selected_all
      this.member_list.forEach(item => {
        item.selected = this.selected_all;
      })
      this.get_select_count(this.member_list);
    },
    // 会员select
    toggle_select_click: function (e) {
      if(this.selected_all){
        return;
      }
      e.selected = !e.selected;
      this.get_select_count(this.member_list)
      if(!e.selected){
        this.selected_all = false
      }else{
        if(this.select_all = member_num){
          this.selected_all = true
        }
      }
      this.$forceUpdate();
    },
    // 上一步到筛选
    pre_to_condition: function () {
      this.$router.push({
        name: '任务列表',
        params: {isActive: 'create'}
      })
    },
    next_to_edit_before: function () {
      let that = this
      if(this.selected_all){
        that.search_condition.limit_size = this.member_num;
        MEMBER_LIST(that.search_condition).then(res => {
          this.next_to_edit(res.data.member_list)
          this.get_select_count(this.member_list);
        })
      }else{
        this.next_to_edit();
      }
    },
    // 下一步到任务编辑创建
    next_to_edit: function (member_list) {
      
      if(!!member_list){
        this.$router.push({
          name: '创建任务',
          params: {
            member_list: member_list,
            member_selected_list: member_list
          }
        })
        return;
      }

      this.member_selected_list = [];
      for(var i=0;i<this.member_list.length;i++){
        if(this.member_list[i].selected){
          this.member_selected_list.push(this.member_list[i])
        }
      }
      if(this.member_selected_list.length==0){
        alert('请至少选择一个会员');
        return;
      }

      this.$router.push({
        name: '创建任务',
        params: {
          member_list: this.member_list,
          member_selected_list: this.member_selected_list
        }
      })
    },
    get_select_count: function(list){
      let count=0;
      for(let i=0;i<list.length;i++){
        if(list[i].selected){
          count++;
        }
      }
      if(this.selected_all){
        if(this.member_num>this.select_count){
          this.select_count=this.member_num
        }
      }else{
        this.select_count = count;
      }
    },
    get_member_list: function (data) {
      let that = this
      MEMBER_LIST(data).then(res => {
        // console.log(res.data.member_list)
        that.member_list = that.member_list.concat(res.data.member_list);
        that.member_num = res.data.member_num
        that.member_list.forEach(item => {
          item.selected = true;
        })

        // console.log(that.member_list)
        that.get_select_count(that.member_list);
        if(res.data.member_list<200){
          that.loading = true
        }else{
          that.loading = false
        }
      })
    }
  },
  mounted(){
    var that = this;
    window.addEventListener('scroll',function(){
      if(document.documentElement.scrollTop+window.innerHeight >= document.body.offsetHeight){
        console.log('loading', that.loading)
        if(that.loading){
          return;
        }
        that.loading = true
        that.search_condition.offset_size = that.search_condition.offset_size+1;
        that.get_member_list(that.search_condition);
      }
    })
  },
  created(){
    _paq.push(['setDocumentTitle', document.title])
    
    this.search_condition = JSON.parse(sessionStorage.getItem('search_condition_param'));
    this.get_member_list(this.search_condition);
  }
}
</script>

<style scoped>
.weui-btn + .weui-btn{
  margin: auto;
}
.title{
  position: fixed;
  top: 0;
  z-index: 11;
  background: #fff;
  padding: 15px;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
}
.weui-cells{
  margin-top: 0;
  font-size: 14px;
}
.member_name{
  width: 4rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 0;
}

</style>
