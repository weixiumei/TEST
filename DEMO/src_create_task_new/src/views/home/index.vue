<template>
  <div class="home">
    <!-- 创建的任务列表 -->
    <div class="weui-cells">
      <div class="page__bd" :style="{maxHeight: maxheight + 'px','overflow':'scroll','background':'#fff'}">
        <div class="weui-tab">
          <div class="weui-navbar">
            <div v-for="state in state_list" :key="state.code" class="weui-navbar__item" :class="selected_state==state.code?'weui-bar__item_on':''" @click="change_state(state.code)">
              {{state.name}}
            </div>
          </div>
          <div class="weui-tab__panel member_list">
            <div v-for="(task, index) in task_type_list" :key="index" style="border-bottom:1px solid #e5e5e5;" v-on:click="goShopTaskList(task)">
              <div v-if="role=='shopowner'" style="padding: 5px 10px;background: #F1F3F7;">{{shop_list[0].shop_name}} <img src="static/img/go.png" alt="" style="width: 8px;float: right;margin-top: 2px;"> </div>
              <div class="weui-cell">
                <div class="weui-cell__bd">
                  <p class="title_name">
                    <!-- <img src="static/img/title.png" style="width: 24px;margin-bottom: 4px;" alt="">  -->
                    {{task.task_type_name}}
                  </p>
                </div>
                <div style="position: absolute; left:10px; top: 0.63rem;"> 
                  <!-- <span v-show="task.task_num!=0 || task.task_type_state!='process'" style="width: 24px;display: inline-block;"> </span> -->
                  <span class="_color">{{task.task_type_start_date}} 至 {{task.task_type_end_date}}</span>
                  <img v-show="task.task_num==0 && task.task_type_state=='process'" src="static/img/new.png" alt="" style="width: 24px;margin-top: -2px;">
                </div>
                <!-- <div class="weui-cell__ft">
                </div> -->
              </div>
              <div class="weui-cell" style="align-items: center;">
                <div class="weui-cell__bd" style="width:3rem;">
                  <p class="task_left" v-show="role!='shopowner'"><span class="_color">门店 </span>{{task.related_shop_info_list.length}}</p>
                  <p class="task_left" v-show="role=='shopowner'"><span class="_color">任务 </span>{{task.task_num}}</p>
                  <p class="task_left"><span class="_color">会员 </span>{{task.member_num}}</p>
                </div>
                <div style="width:2.2rem;" v-show="task.task_type_state=='process'||task.task_type_state=='done'">
                  <div :id="'complete_rate'+index" style="height: 60px;"></div>
                  <div style="text-align: center;"><span class="_color">已执行</span> {{task.al_market_member_num}}</div>
                  <!-- <p style="text-align: left;color: rgba(53,53,53,0.5);">完成：<span style="color:#ED9400;">{{task.market_percent}}%</span></p> -->
                </div>
                <div style="width:2.2rem;" v-show="task.task_type_state=='process'||task.task_type_state=='done'">
                  <div :id="'repurchase_rate'+index" style="height: 60px;"></div>
                  <div style="text-align: center;"><span class="_color">已回流</span> {{task.repurchase_member_num}}</div>
                  <!-- <p style="text-align: left;color: rgba(53,53,53,0.5);">回流：<span style="color:#81B83B;">{{task.repurchase_rate}}%</span></p> -->
                </div>
              </div>
            </div>
            <div class="nodata" v-if="task_type_list.length==0">暂无任务</div>
          </div>
        </div>
      </div>
    </div>
    <!-- btn -->
    <div class="btn_div">
      <!-- <div v-on:click="add_task()" class="weui-btn weui-btn_plain-primary">添加任务</div> -->
      <div v-on:click="create_subject()" class="weui-btn weui-btn_plain-primary">新建任务</div>
    </div>
  </div>
</template>

<script>
  import dialogCustom from "@/components/dialog"
  // import navbar from "./../../../node_modules/vue-weui/components/tab/navbar"
  import { get_date_format, GetPreMonthDay } from '@/common/util/common'
  import { MARKETING_TASK_TYPE_LIST, GET_SHOP_LIST } from "@/api";
  export default {
    name: "home",
    data() {
      return {
        maxheight:'',
        login_name:localStorage.getItem('login_name'),
        shop_id:localStorage.getItem('shop_id')*1,
        // 任务的状态：’process’代表”进行中”, ‘done’代表’完成’,’invalid’代表’作废’
        state_list:[
          {
            name:'进行中',
            code:'process'
          },
          {
            name:'完成',
            code:'done'
          },
          {
            name:'作废',
            code:'invalid'
          }
        ],
        selected_state:'process',
        task_type_list:[],
        task_type_item:{},
        shop_list:[],
        role:'',
        shop_name:'',
        color1:'#ED9400',
        color2:'#81B83B'
      }
    },
    methods: {
      dialog_cancel: function () {
        console.log(1)
      },
      dialog_confirm: function () {
        console.log(2)
      },
      change_state: function (state_index) {
        this.selected_state = state_index;
        this.get_marketing_task_type_list();
      },
      // 进去任务详情
      goTaskDetail: function (e) {
        this.$router.push({
          name:'任务详情',
          params:{task_type_item:e}
        })
      },
      // add_task: function () {
      //   this.$router.push({
      //     name:'选择主题'
      //   })
      // },
      create_subject: function () {
        this.$router.push({
          name:'新建主题'
        })
      },
      // 主题列表-->门店列表
      goShopTaskList: function(subject){
        localStorage.setItem('subject', JSON.stringify(subject));
        if(this.role == 'shopowner'){
          this.$router.push({
            name: "任务列表"
          }) 
        }else{
          this.$router.push({
            name: "门店列表"
          }) 
        }
      },
      removeItem: function(src, cb) {
        var counter = src.length - 1;
        while (true) {
          var result = cb(src[counter]);
          if (result) {
            src.splice(counter, 1);
            counter = src.length - 1;
          } else {
            counter--;
          }
          if (counter < 0) {
            break;
          }
        }
      },
      get_marketing_task_type_list: function () {
        var that = this;
        // 任务列表
        if(this.role=='shopowner'){
          var data = {
            "shop_id":this.shop_id,
            "task_state":this.selected_state
          }
        }else{
          var data = {
            "login_name":this.login_name,
            "task_state":this.selected_state
          }
        }
        
        MARKETING_TASK_TYPE_LIST(data).then(res => {
          this.task_type_list = res.data.task_type_info_list;
          for(let i=0;i<this.task_type_list.length;i++){
            // 任务的状态：’process’代表”进行中”, ‘done’代表’完成’,’invalid’代表’作废’
            switch(this.task_type_list[i].task_state){
              case 'process':
                this.task_type_list[i].task_state_text = '进行中';
                break;
              case 'done':
                this.task_type_list[i].task_state_text = '完成';
                break;
              case 'invalid':
                this.task_type_list[i].task_state_text = '作废';
                break;
            }
          }

          var newArr = [],oldArr = [];
          for (var i=0;i<this.task_type_list.length;i++){
            if(this.task_type_list[i].task_num==0 && this.task_type_list[i].task_type_state=='process'){
              newArr.push(this.task_type_list[i]);
            }else{
              oldArr.push(this.task_type_list[i]);
            }
          }
          
          // 按start_date，end_date排序
          var new_sorted = newArr.sort(function(a, b) {
              const first = Date.parse(a.task_type_start_date) - Date.parse(b.task_type_start_date);
              if (first !== 0) {
                return first;
              }
              return Date.parse(a.task_type_end_date) - Date.parse(b.task_type_end_date);
          });
          var old_sorted = oldArr.sort(function(a, b) {
              const first = Date.parse(a.task_type_start_date) - Date.parse(b.task_type_start_date);
              if (first !== 0) {
                return first;
              }
              return Date.parse(a.task_type_end_date) - Date.parse(b.task_type_end_date);
          });
          this.task_type_list = new_sorted.concat(old_sorted);
          this.$nextTick(()=>{
            for(var i=0;i<this.task_type_list.length;i++){
              this.setEcharts(this.task_type_list[i], i)
            }
          })
        })
      },
      dispatchEvent(event, message) {
        this.$dispatch(event, message)
        if (event === 'weui-action-click') {
          this.hideActionSheet()
        }
      },
      hideActionSheet() {
        this.show = false;
      },
      setEcharts: function (data, index) {
        let myChart1 = this.$echarts.init(document.getElementById('complete_rate'+index))
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
                    color: (data.task_num!=0)?this.color1:'#CACFD5'
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

        let myChart2 = this.$echarts.init(document.getElementById('repurchase_rate'+index))
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
                    color: (data.task_num!=0)?this.color2:'#CACFD5'
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
    mounted: function() {
      var screabHeight = window.innerHeight
      this.maxheight = screabHeight - 52;
      var that = this;
      // 根据任务查出门店
      GET_SHOP_LIST({"login_name":that.login_name}).then(res => {
        that.shop_list = res.data.shop_info_list;
        if(that.shop_list.length == 1){
          localStorage.setItem('role', 'shopowner');
          localStorage.setItem('shop_id1', that.shop_list[0].shop_id)
          localStorage.setItem('shop_name', that.shop_list[0].shop_name)
        }else{
          localStorage.setItem('role', 'manager');
        }
        that.role = localStorage.getItem('role');
        // 任务列表
        this.get_marketing_task_type_list();
        console.log(this.role)
      })
      
    },
    created(){

      var script = document.createElement('script')
      script.src = 'projectPiwik.js'
      script.type = 'text/javascript'
      document.body.appendChild(script)
      _paq.push(['setDocumentTitle', document.title])

      // this.shop_name = localStorage.getItem('shop_name')
      // let search_condition = JSON.parse(sessionStorage.getItem('search_condition'));
      
      // this.$forceUpdate();
    },
    components: {
      // navbar
      dialogCustom
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shop_name{
  padding: 14px;
  font-size: 16px;
  position: fixed;
  background: #fff;
  width: 100%;
  top: 0;
  z-index: 11;
  border-bottom: 6px solid #EFEFF4;
}
.weui-cell {
  padding: 10px;
}
.weui-tabbar:before{
  border-top: 0;
}
.weui-cells{
  margin-top: 0;
  font-size: 14px;
}
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{
  color: #81B83B;
}
.weui-navbar__item.weui-bar__item_on{
  border-bottom: 3px solid #81B83B;
  background-color: #fbfbfb;
  color: #81B83B;
}
.weui-navbar__item:after{
  border: 0;
}
.weui-tabbar{
  position: fixed;
  background: #fff;
}
.weui-btn{
  font-size: 16px;
}

.task_state_text{
  text-align: right;
}
.weui-navbar{
  position: fixed;
  /* top: 1.1rem; */
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
.members .weui-cell:before{
  border-top: 0;
}
.member_list .weui-cell:before{
  border-top: 0;
}
.task_user{
  /* width: 4.6rem; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.task_left{
  padding-top: 2px;
}
.task_date{
  width: 54%;
  text-align: center;
  border: 1px solid #e4e5e5;
  padding: 2px 5px;
  margin: 5px 8px;
  border-radius: 5px;
}
.weui-navbar + .weui-tab__panel{
  /* padding-top: 2.1rem; */
}
._color{
  color: #888888;
  /* font-size: 14px; */
}
</style>
