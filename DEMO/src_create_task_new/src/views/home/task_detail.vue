<template>
  <div>
    <!-- 任务详情 -->
    <div class="task_info" :style="{minHeight: minheight + 'px','overflow':'scroll','background':'#fff'}">
      <div v-show="!edit">
        <div style="display: flex;justify-content: space-between;padding:0 10px;">
          <div class="title_label">
            <img src="static/img/user.png" style="width:14px;margin-bottom: 3px;"> {{task_item.task_user_name}}
          </div>
          <div class="state" :class="task_item.task_state">{{task_state_text}}</div>
        </div>

        <div style="border: .5px solid #eff2f5;"></div>

        <div style="padding:0 10px;margin-top:-10px;">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <input class="weui-input title_label" type="text" v-model="task_item.task_name" placeholder="任务标题"/>
            </div>
          </div>
          <textarea class="weui-textarea disabled" style="padding-top: 5px;text-indent: 28px;" placeholder="任务描述" v-model="task_item.task_context" rows="3"></textarea>

          <div>
            <span>任务时间</span>
            <div style="text-indent: 28px;margin-top: 5px;color: #000;">{{task_item.start_date}} 至 {{task_item.end_date}}</div>
            <!-- <input class="weui-input" type="date" v-model="task_item.start_date" style="width:36%;padding: 15px 3px;text-align:center;"/>
            至 <input class="weui-input" type="date" v-model="task_item.end_date" style="width:36%;padding: 15px 3px;"/> -->
          </div>
        </div>

        <div class="jiange" v-show="!edit"></div>

        <div style="padding: 0 10px;" class="transformation_cycle">
          <div class="title">
            <div>相关会员</div>
            <div v-on:click="goMemberList()" style="color:#81B83B;">查看全部({{task_item.member_num}}) <img src="static/img/more.png" alt="" style="width: 6px;"></div>
          </div>

          <div>回流周期</div>
          <div class="condition_day">
            <div @click="click_day(day)" v-for="day in condition_days" :key="day.code" :class="day.code==selected?'selected':''" class="day">{{day.name}}</div>
          </div>
          <div style="display: flex;justify-content: space-around;">
            <div style="width:45%;text-align:center;">
              <div id="complete_rate"></div>
              <div>{{task_item.al_market_member_num}}人</div>
              <div>任务完成进度</div>
            </div>
            <div style="width:45%;text-align:center;">
              <div id="repurchase_rate"></div>
              <div>{{repurchase_member_num}}人</div>
              <div style="text-align:center;">客户回流率</div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="edit" style="padding: 10px;margin-top: 0;">
        <div class="flex-between" @click="guide_change()">
          <div class="title_label">
            <img src="static/img/user.png" style="width:14px;margin-bottom: 3px;"> {{task_item.task_user_name}}
          </div>
          <div class="state">></div>
        </div>
        <div class="flex-between">
          <div v-for="state in state_list" :key="state.code" @click="state_change(state)">
            <img src="static/img/radio-on.png" class="user_img" v-show="task_item.task_state==state.code" alt="">
            <img src="static/img/radio-off.png" class="user_img" v-show="task_item.task_state!=state.code"  alt="">
            {{state.name}}
          </div>
        </div>

        <div style="border: .5px solid #eff2f5;"></div>

        <div class="weui-cells__title">任务标题 <span class="lighter">（必填）</span></div>
        <div class="weui-cell border">
          <div class="weui-cell__bd" style="margin-top:0;">
            <input class="weui-input" type="text" v-model="task_item.task_name" placeholder="请输入任务标题"/>
          </div>
        </div>
        
        <div class="weui-cells__title">任务内容 <span class="lighter">（必填）</span></div>
        <textarea class="weui-textarea border" placeholder="请输入任务内容" v-model="task_item.task_context" rows="3"></textarea>
        
        <div class="weui-cells__title">任务时间</div>
        <div style="width:100%;">
          <input class="weui-input border" type="date" v-model="task_item.start_date" style="width:46%;padding: 15px 3px;text-align:center;"/>
          至 <input class="weui-input border" type="date" v-model="task_item.end_date" style="width:46%;padding: 15px 3px;text-align:center;"/>
        </div>
      </div>
      <div v-show="!guide_pop" class="btn_div">
        <div v-on:click="goBack()" class="weui-btn weui-btn_plain-primary">返回</div>
        <div v-on:click="edit_btn()" v-show="!edit&&task_item.task_state=='process'&&subject.task_type_state=='process'" class="weui-btn weui-btn_plain-primary right_btn">编辑</div>
        <div v-on:click="save_check()" v-show="edit" class="weui-btn weui-btn_plain-primary right_btn" style="padding: 0 12px;margin-right: 0;">保存</div>
        <div v-on:click="cancel_edit()" v-show="edit" class="weui-btn weui-btn_plain-primary" style="padding: 0 12px;margin-left: 8px;">取消</div>
      </div>
    </div>
    <div v-show="edit&&guide_pop" class="guide_list">
      <div class="lighter" style="padding:10px 10px 0 10px;">* 若有导购未显示请联系管理员</div>
      <!-- <searchBar placeholder="请输入" cancelText="取消" :value="search_guide_input"></searchBar> -->
      <div v-for="guide in shopping_guide" :key="guide.user_id" @click="select_guide(guide)" class="guide">{{guide.user_name}}</div>
      <div class="btn_div">
        <div class="weui-btn weui-btn_plain-primary" @click="select_cancel()">取消</div>
      </div>
    </div>
    <!-- dialog -->
    <dialog-custom v-show="confirm_dialog" type="confirm" title="提示" @dialog_cancel="close_dialog" @dialog_confirm="save">确认结束导购任务</dialog-custom>
  </div>
</template>
<script>
import dialogCustom from "@/components/dialog"
import searchBar from "@/components/searchBar"
import { UPDATE_TASK_INFO, MEMBER_REPO_INFOR,GET_MARKETING_TASK_INFO, GET_SEARCH_RELATED_USERS } from "@/api"
import { get_date_format, GetPreMonthDay } from '@/common/util/common'
export default {
  data(){
    return{
      minheight:0,
      confirm_dialog:false,
      login_name: localStorage.getItem('login_name'),
      shop_id: localStorage.getItem('shop_id1')*1,
      subject:'',
      condition_days:[
        {
          code:1,
          name:'7天',
          num:7
        },{
          code:2,
          name:'14天',
          num:14
        },{
          code:3,
          name:'30天',
          num:30
        },{
          code:4,
          name:'60天',
          num:60
        },{
          code:5,
          name:'90天',
          num:90
        }
      ],
      selected:3,
      task_item:{},
      task_state_text:'',
      repurchase_member_num:0,
      edit:'',
      guide_pop:false,
      search_guide_input:'',
      shopping_guide:[],
      task_item_copy:{},
      state_list:[
          // {
          //   name:'未开始',
          //   code:'draft',
          //   selected:false
          // },
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
        color1:'#ED9400',
        color2:'#81B83B'
    }
  },
  methods:{
    close_dialog:function(){
      this.confirm_dialog = false;
    },
    select_cancel: function(){
      this.guide_pop = !this.guide_pop
    },
    select_guide: function (guide) {
      this.guide_pop = !this.guide_pop
      this.task_item.task_user_name = guide.user_name
      this.task_item.task_user_code = guide.user_code
      console.log(guide)
    },
    guide_change: function () {
      this.guide_pop = !this.guide_pop;
      let data = {
        "login_name": this.login_name, 
        "related_shop_id":this.shop_id
      }
      // 导购列表
      this.get_search_related_users(data);
    },
    state_change: function (state) {
      this.task_item.task_state = state.code
    },
    click_day: function (day) {
      let start_date = new Date(this.task_item.start_date);
      let end_date = start_date.setDate(start_date.getDate()+day.num)
      
      let that = this
      this.selected = day.code;
      let data = {
        "task_code":this.task_item.task_code,
        "order_start_day": this.task_item.start_date,
        "order_end_day": get_date_format(new Date(end_date))
      }
      MEMBER_REPO_INFOR(data).then(res => {
        console.log(res.data, this.task_item);
        this.repurchase_member_num = res.data.repurchase_member_num;
        this.setEcharts(res.data);
      })
    },
    setEcharts: function (data) {
      let myChart1 = this.$echarts.init(document.getElementById('complete_rate'))
      this.echart1 = myChart1
      // 基于准备好的dom，初始化echarts实例
      // 绘制图表
      let placeHolderStyle = {
        normal: {
          color: '#E7EAED', // 未完成的圆环的颜色
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        },
        emphasis: {
          color: 'rgba(44,59,70,1)' // 未完成的圆环的颜色
        }
      };
      let dataStyle = {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          shadowColor: 'rgba(40, 40, 40, 0.5)',
        }
      };
      var option1 = {
        tooltip: {
          show: false,
        },
        toolbox: {
          show: false,
        },
        backgroundColor: '#fff',
        series: [{
          name: this.task_item.market_percent+'%',
          type: 'pie',
          clockWise: false,
          radius: [35, 40],
          itemStyle: dataStyle,
          hoverAnimation: false,
          center: ['50%', '50%'],
          data: [{
            value: 100-this.task_item.market_percent,
            name: 'invisible',
            itemStyle: placeHolderStyle,
          },{
            value: this.task_item.market_percent,
            label: {
              normal: {
                formatter: '{a}',
                position: 'center',
                show: true,
                textStyle: {
                  fontSize: '16',
                  fontWeight: 'normal',
                  color: this.color1
                }
              }
            },
            itemStyle: {
              normal: {
                color: this.color1,
                shadowColor: this.color1,
                shadowBlur: 10,
                barBorderRadius: 7,
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: this.color1},
                    {offset: 1, color: this.color1}
                  ]
                )
              }
            }
          }]
        }]
      }
      
      myChart1.setOption(option1)

      let myChart2 = this.$echarts.init(document.getElementById('repurchase_rate'))
      this.echart2 = myChart2
      // 基于准备好的dom，初始化echarts实例
      // 绘制图表
      var option2 = {
        tooltip: {
          show: false,
        },
        toolbox: {
          show: false,
        },
        backgroundColor: '#fff',
        series: [{
          name: data.repurchase_rate+'%',
          type: 'pie',
          clockWise: false,
          radius: [35, 40],
          itemStyle: dataStyle,
          hoverAnimation: false,
          center: ['50%', '50%'],
          data: [{
            value: 100-data.repurchase_rate,
            name: 'invisible',
            itemStyle: placeHolderStyle,
          }, {
            value: data.repurchase_rate,
            label: {
              normal: {
                formatter: '{a}',
                position: 'center',
                show: true,
                textStyle: {
                  fontSize: '16',
                  fontWeight: 'normal',
                  color: this.color2
                }
              }
            },
            itemStyle: {
              normal: {
                color: this.color2,
                shadowColor: this.color2,
                shadowBlur: 10,
                barBorderRadius: 7,
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: this.color2},
                    {offset: 1, color: this.color2}
                  ]
                )
              }
            }
          }]
        }]
      }
      myChart2.setOption(option2)
      // 自适应浏览器大小
      // window.onresize = myChart.resize
    },
    goMemberList: function () {
      localStorage.setItem('task_item', JSON.stringify(this.task_item))
      this.$router.push({
        name:'相关会员列表',
        params:{
          task_item:this.task_item
        }
      })
    },
    edit_btn: function () {
      this.edit = true;
    },
    cancel_edit: function () {
      this.edit = false;
      this.task_item = JSON.parse(JSON.stringify(this.task_item_copy))
      this.$forceUpdate();
    },
    save_check: function(){

      if(!this.task_item.task_name){
        alert('请输入任务标题');
        return;
      }
      if(!this.task_item.task_context){
        alert('请输入任务描述');
        return;
      }
      if(!this.task_item.start_date || !this.task_item.end_date){
        alert('请输入任务时间');
        return;
      }
      if(new Date(this.task_item.start_date)>new Date(this.task_item.end_date)){
        alert('结束时间不能小于开始时间');
        return;
      }
      if(this.task_item.task_state=='done'||this.task_item.task_state=='invalid'){
        this.confirm_dialog = true;
      }else{
        this.save();
        this.confirm_dialog = false;
      }
    },
    // 更新任务
    save: function () {
      let data = {
        "task_code": this.task_item.task_code,
        "task_name": this.task_item.task_name,
        "task_context": this.task_item.task_context,
        "task_state": this.task_item.task_state,
        "start_date": this.task_item.start_date,
        "end_date": this.task_item.end_date,
        "res_code": this.task_item.task_user_code
      };
      
      UPDATE_TASK_INFO(data).then(res => {
        this.edit = false;
        this.confirm_dialog = false;
        this.switch_state();
      })
    },
    goBack: function(){
      this.$router.push({
        name:'任务列表'
      })
    },
    switch_state: function() {
      switch(this.task_item.task_state){
        // case 'draft':
        //   this.task_state_text = '未开始';
        //   break;
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
    get_item_info: function () {
      var that = this;
      GET_MARKETING_TASK_INFO({'task_code': that.task_item.task_code}).then(res => {
        that.task_item = res.data.task_info
        that.task_item_copy =  JSON.parse(JSON.stringify(res.data.task_info))
        that.click_day(that.condition_days[2]);
        this.switch_state();
      })
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
  created(){
    _paq.push(['setDocumentTitle', document.title])

    var screabHeight = window.innerHeight
    this.minheight = screabHeight

    let that = this
    this.task_item = this.$route.params.task_item
    if(!this.task_item){
      this.task_item = JSON.parse(localStorage.getItem('task_item'))
    }
    
    this.subject = JSON.parse(localStorage.getItem('subject'));
    
    setTimeout(function(){
      // that.click_day(that.condition_days[2]);
    },10)
    this.get_item_info();
    
  },
  components: {
    searchBar,
    dialogCustom
  }
}
</script>

<style scoped>
  /* .weui-cell{
    padding: 0px;
  } */
  .task_info {
    padding-bottom: 0.3rem;
    /* min-height: 667px; */
    background: #fff;
    overflow: scroll;
    margin-bottom: 1rem;
  }
  .task_info div{
    margin-top: 10px;
  }
  .task_info textarea{
    /* padding: 10px; */
    
    background: #fff;
  }
  .border{
    border: 1px solid #e4e5e5;
    /* background: #fbfcfe!important; */
  }
  .state{
    background: #fff;
    border-radius: 1px;
    float: right;
    /* padding: 0 12px; */
  }
  .title_label{
    font-weight: 500;
    font-size: 16px;
  }
  /* 转化周期 */
  .transformation_cycle .title{
    display: flex;
    justify-content: space-between;
  }
  .condition_day{
    margin-top: 0!important;
    display: flex;
    justify-content: space-between;
  }
  .condition_day .day{
    border: 1px solid #8A929A;
    color: #8A929A;
    border-radius: 12px;
    padding: 0px 11px;
  }
  .condition_day .selected{
    border: 1px solid #81B83B;
    color: #81B83B;
  }
  #complete_rate, #repurchase_rate{
    width: 100%;
    height: 100px;
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

  .guide_list{
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
  .guide{
    padding: 10px;
    border-bottom: .5px solid #E0E4E8;
    margin: 3px;
  }
  .lighter{
    /* color: red; */
    font-family: 'PingFang SC', 'Microsoft YaHei';
    font-weight: lighter!important;
  }
</style>
