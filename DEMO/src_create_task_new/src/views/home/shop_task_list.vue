<template>
  <div>
    <!-- <Search-bar></Search-bar> -->
    <!-- <SearchBar placeholder="请输入" cancelText="取消" :value="search_guide_input"></SearchBar> -->

    <!-- :style="{maxHeight: maxheight + 'px','overflow':'scroll','background':'#fff'}" -->
    <!-- <div class="flex-start subject_tit">
      <div>
        <img src="static/img/title.png" alt="" style="margin: 0 5px;margin-top: -2px;width: 24px;">
      </div>
      <div style="font-weight:500;"> {{subject.task_type_name}}</div>
    </div> -->
    <!-- 主题 -->
    <div style="border-bottom:1px solid #e5e5e5;background: #fff;margin-bottom: 10px;" v-on:click="edit_subject()">
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p class="title_name">
            <!-- <img src="static/img/title.png" style="width: 24px;margin-bottom: 4px;" alt="">  -->
            {{subject.task_type_name}}
          </p>
        </div>
        <div style="position: absolute;top: .63rem;"> 
          <!-- <span v-show="subject.task_num!=0 || subject.task_type_state!='process'" style="width: 24px;display: inline-block;"> </span> -->
          <span class="_color">{{subject.task_type_start_date}} 至 {{subject.task_type_end_date}}</span>
          <img v-show="subject.task_num==0 && subject.task_type_state=='process'" src="static/img/new.png" alt="" style="width: 24px;margin-top: -2px;">
        </div>
        <div class="weui-cell__ft" :class="subject.task_type_state">{{task_state_text}}</div>
      </div>
      <div class="weui-cell" style="margin-top: 15px;border-top: 1px solid #81B83B;background: #F9FFF2;">
        <div class="weui-cell__bd" style="width:3rem;">
          <p class="task_left" v-if="!!subject.related_shop_info_list&&role!='shopowner'"><span class="_color">门店 </span>{{subject.related_shop_info_list.length}}</p>
          <p class="task_left" v-show="role=='shopowner'"><span class="_color">任务 </span>{{subject.task_num}}</p>
          <p class="task_left"><span class="_color">会员 </span>{{subject.member_num}}</p>
        </div>
        <div style="width:2.2rem;" v-show="subject.task_type_state=='process'||subject.task_type_state=='done'">
          <div id="complete_rate" style="height: 60px;"></div>
          <div style="text-align: center;"><span class="_color">已执行</span> {{subject.al_market_member_num}}</div>
        </div>
        <div style="width:2.2rem;" v-show="subject.task_type_state=='process'||subject.task_type_state=='done'">
          <div id="repurchase_rate" style="height: 60px;"></div>
          <div style="text-align: center;"><span class="_color">已回流</span> {{subject.repurchase_member_num}}</div>
        </div>
      </div>
    </div>
    <!-- 门店任务列表 -->
    <div class="page__bd" style="background:#fff;">
      <div v-for="task in shop_info_list" :key="task.task_code" v-on:click="goTaskList(task)" style="border-bottom:1px solid #e5e5e5;">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__bd">
            <p class="title_name"><img src="static/img/shop.png" style="width: 13px;" alt=""> {{task.shop_name}}</p>
          </div>
          <div class="weui-cell__ft">
          </div>
        </div>
        <div class="weui-cell" style="padding: 4px 15px;">
          <div class="weui-cell__bd" style="width: 3rem;">
            <p class="task_user">任务 {{task.task_count}}</p>
          </div>
          <div style="width: 2.2rem;">
            <p style="text-align: left;color: rgba(53,53,53,0.5);"><span class="_label">会员 </span><span style="color:#ED9400;">{{task.member_num}}</span></p>
          </div>
          <div style="width: 2.2rem;">
            <p style="text-align: left;color: rgba(53,53,53,0.5);"><span class="_label">回流 </span><span style="color:#81B83B;">{{task.repurchase_member_num}}</span></p>
          </div>
        </div>
        <div class="weui-cell" style="padding: 4px 15px;">
          <div class="weui-cell__bd" style="width: 3rem;">
            <!-- <p class="task_user">任务 {{task.task_count}}</p> -->
          </div>
          <div style="width: 2.2rem;">
            <p style="text-align: left;color: rgba(53,53,53,0.5);"><span class="_label">执行率 </span><span style="color:#ED9400;">{{task.market_percent}}%</span></p>
          </div>
          <div style="width: 2.2rem;">
            <p style="text-align: left;color: rgba(53,53,53,0.5);"><span class="_label">回流率 </span><span style="color:#81B83B;">{{task.repurchase_rate}}%</span></p>
          </div>
        </div>
      </div>
      <div class="nodata" v-if="shop_info_list.length==0">暂无任务</div>
    </div>
    <!-- btn -->
    <div class="btn_div">
      <div v-on:click="back()" class="weui-btn weui-btn_plain-primary">返回</div>
      <!-- <div v-on:click="edit_subject()" class="weui-btn weui-btn_plain-primary right_btn">任务明细</div> -->
    </div>
  </div>
</template>
<script>

// import searchBar from "@/components/searchBar"
// import { SearchBar } from 'vue-weui'
import { GET_SHOP_LIST, MARKETING_TASK_LIST, MARKETING_TASK_TYPE_GET  } from "@/api"
export default {
  data(){
    return {
      search_guide_input:'',
      login_name: localStorage.getItem('login_name'),
      shop_info_list:[
      ],
      shop_info:{},
      subject:{},
      task_state_text:"",
      task_type_code:'',
      role:'',
      color1:'#ED9400',
      color2:'#81B83B'
    }
  },
  methods:{
    back: function () {
      this.$router.push({
        name:'主题列表'
      })
    },
    edit_subject: function () {
      this.$router.push({
        name:'编辑主题',
        params:{
          subject:this.subject
        }
      })
    },
    goTaskList: function (task) {
      localStorage.setItem('shop_id1', task.shop_id)
      localStorage.setItem('shop_name', task.shop_name)
      this.$router.push({
        name:'任务列表',
        params:{
          subject:this.subject
        }
      })
    },
    marketing_task_list: function (shop_list) {
      let that = this
      MARKETING_TASK_LIST({shop_id_list: [shop_list.related_shop_id*1], task_type_id: this.subject.task_type_id}).then(res => {
        var market_percent = 0, repurchase_rate = 0, member_num = 0,repurchase_member_num=0;
        that.shop_info = {}
        for(var j=0;j<res.data.task_info_list.length;j++){
          // 完成率
          market_percent = market_percent + res.data.task_info_list[j].market_percent
          // 回流率
          repurchase_rate = repurchase_rate + res.data.task_info_list[j].repurchase_rate
          // 会员数
          member_num = member_num + res.data.task_info_list[j].member_num
          // 回流
          repurchase_member_num = repurchase_member_num + res.data.task_info_list[j].repurchase_member_num
        }
        // 任务数
        that.shop_info.task_count = res.data.task_info_list.length;
        // 会员数
        that.shop_info.member_num = member_num;
        // 回流数
        that.shop_info.repurchase_member_num = repurchase_member_num;
        
        // 完成率
        if(res.data.task_info_list.length==0){
          that.shop_info.market_percent = 0;
        }else{
          that.shop_info.market_percent = Math.round(market_percent/res.data.task_info_list.length)
        }
        // 回流率
        if(res.data.task_info_list.length==0){
          that.shop_info.repurchase_rate = 0;
        }else{
          that.shop_info.repurchase_rate = Math.round(repurchase_rate/res.data.task_info_list.length)
        }
        
        that.shop_info.shop_id = shop_list.related_shop_id;
        that.shop_info.shop_name = shop_list.related_shop_name;
        that.shop_info_list.push(that.shop_info)
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
        backgroundColor: '#F9FFF2',
        series: [{
          name: data.market_percent+'%',
          type: 'pie',
          clockWise: false,
          radius: [20, 24],
          itemStyle: dataStyle,
          hoverAnimation: false,
          center: ['50%', '50%'],
          data: [{
            value: 100-data.market_percent,
            name: 'invisible',
            itemStyle: placeHolderStyle,
          },{
            value: data.market_percent,
            label: {
              normal: {
                formatter: '{a}',
                position: 'center',
                show: true,
                textStyle: {
                  fontSize: '11',
                  fontWeight: 'normal',
                  color: (data.task_num==0 && data.task_type_state=='process')?'#CACFD5':this.color1
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
        backgroundColor: '#F9FFF2',
        series: [{
          name: data.repurchase_rate+'%',
          type: 'pie',
          clockWise: false,
          radius: [20, 24],
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
                  fontSize: '11',
                  fontWeight: 'normal',
                  color: (data.task_num==0 && data.task_type_state=='process')?'#CACFD5':this.color2
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
  },
  created(){
    _paq.push(['setDocumentTitle', document.title])

    this.role = localStorage.getItem('role')
    let that = this;
    if(!!this.$route.params.task_type_code){
      this.task_type_code = this.$route.params.task_type_code
    }else{
      this.task_type_code = JSON.parse(localStorage.getItem('subject')).task_type_code
    }
    MARKETING_TASK_TYPE_GET({"task_type_code":this.task_type_code}).then(res => {
      that.subject = res.data.task_type_info
      switch(that.subject.task_type_state){
        case 'process':
          that.task_state_text = '进行中';
          break;
        case 'done':
          that.task_state_text = '完成';
          break;
        case 'invalid':
          that.task_state_text = '作废';
          break;
      }
      that.shop_list = that.subject.related_shop_info_list;
      for(var i=0;i<that.shop_list.length;i++){
        that.shop_info_list = [], that.shop_info={};
        that.marketing_task_list(that.shop_list[i])
      }
      that.$nextTick(()=>{
        that.setEcharts(that.subject)
      })
    })
    // this.subject = JSON.parse(localStorage.getItem('subject'))
    
    // 根据任务查出门店
    // GET_SHOP_LIST({"login_name":that.login_name}).then(res => {
    //   that.shop_list = res.data.shop_info_list;
    //   for(var i=0;i<that.shop_list.length;i++){
    //     that.shop_info_list = [], that.shop_info={};
    //     this.marketing_task_list(that.shop_list[i])
    //   }
    // })
  },
  components:{
    // SearchBar
  }
}
</script>

<style scoped>
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
.subject_tit{
  background: #fff;
  padding: 15px;
  margin-bottom: 8px;
}
.task_user{
  /* width: 4.6rem; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
._label{
  width: 1rem;
  display: inline-block;
}
.weui-cell:before{
  border-top:0;
}
</style>
