<template>
  <div class="home">
    <!-- 创建的任务列表 -->
    
    <div class="weui-cells" v-show="isActive == 'now_task'">
      <div class="page__bd" :style="{maxHeight: maxheight + 'px','overflow':'scroll','background':'#fff'}">
        <div class="weui-tab">
          <!-- <div class="flex-start shop_name" @click="change_shop()">
            <div>
              <img src="static/img/change.png" alt="" style="margin-top: -2px;width: .4rem;">
            </div>
            <div style="color:#5CAC00;margin-left:10px;margin-right:20px;">切换</div>
            <div style="font-weight:500;">{{shop_name}}</div>
          </div> -->
          <div class="shop_name" v-on:click="edit_subject()">
            <img v-show="role == 'shopowner'" src="static/img/go.png" alt="" style="bottom: 10px;position: absolute;right: 10px;width: 12px;">
            <div><img style="width: 14px;" src="static/img/shop.png" alt=""> {{shop_name}}</div>
            <div style="font-weight:500;padding-left: 20px;">{{subject.task_type_name}}</div>
            <div style="padding-left: 20px;">{{subject.task_type_start_date}} 至 {{subject.task_type_end_date}}</div>
          </div>
          <div v-show="task_list_length!=0">
            <div class="weui-navbar" >
              <div v-for="state in state_list" :key="state.code" class="weui-navbar__item" :class="selected_state==state.code?'weui-bar__item_on':''" @click="change_state(state.code)">
                {{state.name}}
              </div>
            </div>
            <div class="weui-tab__panel member_list">
              <div v-for="task in task_list" :key="task.task_code" v-on:click="goTaskDetail(task)" style="border-bottom:1px solid #e5e5e5;">
                <div class="weui-cell weui-cell_access">
                  <div class="weui-cell__bd">
                    <p class="title_name"><img src="static/img/task.png" style="width: 12px;margin-right:5px;" alt="">{{task.task_name}}</p>
                  </div>
                  <!-- <div class="weui-cell__bd">
                    <p class="task_state_text">{{task.task_state_text}}</p>
                  </div> -->
                  <div class="weui-cell__ft">
                  </div>
                </div>
                <div class="weui-cell">
                  <div class="weui-cell__bd" style="width: 3rem;">
                    <p class="task_user">指派给 {{task.task_user_name}}</p>
                  </div>
                  <div v-show="task.task_state=='process'||task.task_state=='done'" style="width: 1.8rem;">
                    <p style="text-align: left;color: rgba(53,53,53,0.5);">完成 <span style="color:#ED9400;">{{task.market_percent}}%</span></p>
                  </div>
                  <div v-show="task.task_state=='process'||task.task_state=='done'" style="width: 1.8rem;">
                    <p style="text-align: left;color: rgba(53,53,53,0.5);">回流 <span style="color:#81B83B;">{{task.repurchase_rate}}%</span></p>
                  </div>
                </div>
              </div>
              <div class="nodata" v-if="task_list.length==0">暂无任务</div>
            </div>
          </div>
          <div v-show="task_list_length==0&&selected_state=='process'">
            <div class="no_member">
              <img src="static/img/guide_task.png" alt="">
            </div>
            <div style="background: #edf0f4;text-align: center;padding:15px;color: #a4adb7;">还没有给导购分配任务</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 筛选会员 -->
    <div v-show="isActive == 'create'" style="padding-bottom: 110px;">
      <div class="weui-cells weui-cells_form">
        <!-- 最近购物日期 -->
        <div class="weui-cell">
            <div class="weui-cell__hd"><label for="" class="weui-label">最近购物日期</label></div>
            <div class="weui-cell__bd">
              <label 
                class="label_style" 
                v-for="(last_shoping_date) in last_shoping_date_list" 
                :key="last_shoping_date.code" 
                :class="{selected: last_shoping_date.selected}"
                @click="item_click(last_shoping_date, 'last_shopping_date_param_list')"
                >
                {{last_shoping_date.name}}
              </label>
            </div>
        </div>
        <!-- 开卡日期 -->
        <div class="weui-cell">
            <div class="weui-cell__hd"><label for="" class="weui-label">开卡日期</label></div>
            <div class="weui-cell__bd">
                从 <input class="weui-input task_date" type="date" v-model="start_open_card_date"/>
                <br>
                至 <input class="weui-input task_date" type="date" v-model="end_open_card_date"/>
            </div>
        </div>
        <!-- 生日月 -->
        <div class="weui-cell">
            <div class="weui-cell__hd"><label for="" class="weui-label">生日月</label></div>
            <div class="weui-cell__bd">
                <label 
                  class="label_style" 
                  v-for="month in birthday_month_list" 
                  :key="month.code"
                  :class="{selected: month.selected}"
                  @click="item_click(month, 'birthday_month_param_list')"
                  >
                  {{month.name}}
                </label>
            </div>
        </div>
        <!-- 类型 -->
        <div class="weui-cell">
          <div class="weui-cell__hd"><label for="" class="weui-label">类型</label></div>
          <div class="weui-cell__bd">
            <label 
              class="label_style" 
              v-for="style in style_list" 
              :key="style.code"
              :class="{selected: style.selected}"
              @click="item_click(style, 'style_param_list')"
              >
              {{style.name}}
            </label>
          </div>
        </div>
        <!-- 性别 -->
        <div class="weui-cell">
          <div class="weui-cell__hd"><label for="" class="weui-label">性别</label></div>
          <div class="weui-cell__bd">
            <label 
              class="label_style" 
              v-for="sex in sex_list" 
              :key="sex.code"
              :class="{selected: sex.selected}"
              @click="item_click(sex, 'sex')"
              >
              {{sex.name}}
            </label>
          </div>
        </div>
        <!-- 卡类型 -->
        <div class="weui-cell">
          <div class="weui-cell__hd"><label for="" class="weui-label">卡类型</label></div>
          <div class="weui-cell__bd">
            <label 
              class="label_style" 
              v-for="card_style in card_style_list" 
              :key="card_style.level_id"
              :class="{selected: card_style.selected}"
              @click="item_click(card_style, 'card_styles_param_list')"
              >
              {{card_style.level_name}}
            </label>
          </div>
        </div>
        <!-- 积分 -->
        <div class="weui-cell">
          <div class="weui-cell__hd"><label for="" class="weui-label">积分</label></div>
          <div class="weui-cell__bd">
            <label 
              class="label_style" 
              v-for="point in points" 
              :key="point.code"
              :class="{selected: point.selected}"
              @click="item_click(point, 'point_param_list')"
            >
            {{point.name}}
            </label>
          </div>
        </div>
        <!-- 未消费季节 -->
        <div class="weui-cell">
          <div class="weui-cell__hd"><label for="" class="weui-label">未消费季节</label></div>
          <div class="weui-cell__bd">
            <label 
              class="label_style" 
              v-for="season in season_list" 
              :key="season.code"
              :class="{selected: season.selected}"
              @click="item_click(season, 'season_param_list')"
              >
              {{season.name}}
            </label>
          </div>
        </div>
      </div>
		  <!-- <div v-on:click="get_member_list()" class="weui-btn weui-btn_plain-primary weui-btn_loading" style="margin: 15px 55px 0 55px;">下一步</div> -->
    </div>
    <div v-show="isActive == 'create'" 
      style="width: 100%;
        position: fixed;
        background: #fff;
        bottom: 45px;
        z-index: 17;
        left: 0;
        right: 0;
        height: 60px;
        display: flex;
        justify-content: center;">
      <div v-on:click="get_member_list()" class="weui-btn weui-btn_plain-primary" style="position: fixed;bottom: 60px;z-index: 11;width: 60%;height: 34px;line-height: 34px;">下一步</div>
    </div>
    <!-- tab -->
    <!-- <div v-show="isActive == 'now_task'||isActive == 'create'" class="weui-tabbar">
      <div href="javascript:;" class="weui-tabbar__item" v-on:click="active('now_task')" v-bind:class="{ 'weui-bar__item_on': isActive == 'now_task' }">
        <p class="weui-tabbar__label" style="margin: 10px 0;font-size: 16px;">现有任务</p>
      </div>
      <div href="javascript:;" class="weui-tabbar__item" v-on:click="active('create')" v-bind:class="{ 'weui-bar__item_on': isActive == 'create' }">
        <p class="weui-tabbar__label" style="margin: 10px 0;font-size: 16px;">新建任务</p>
      </div>
    </div> -->
    <div class="btn_div">
      <div v-on:click="back()" class="weui-btn weui-btn_plain-primary">返回</div>
      <div v-show="task_list_length==0&&selected_state=='process'&&subject.task_type_state=='process'" v-on:click="add_task()" class="weui-btn weui-btn_plain-primary right_btn">分配导购</div>
    </div>
  </div>
</template>

<script>
  // import navbar from "./../../../node_modules/vue-weui/components/tab/navbar"
  import { get_date_format, GetPreMonthDay } from '@/common/util/common'
  import { GET_SHOP_LIST, MARKETING_TASK_LIST, MEMBER_LEVEL_LIST, MEMBER_LIST } from "@/api";
  export default {
    name: "home",
    data() {
      return {
        maxheight:'',
        role:'',
        isActive:'now_task',
        login_name:localStorage.getItem('login_name'),
        // 筛选会员条件
        last_shopping_date_param_list:[],
        // start_open_card_date:'',
        // end_open_card_date:'',

        start_open_card_date:GetPreMonthDay(get_date_format(new Date()), 12),
        end_open_card_date:get_date_format(new Date()),
        birthday_month_param_list:[],
        style_param_list:[],
        sex_param:'',
        card_styles_param_list:[],
        point_param_list:[],
        season_param_list:[],

        // 任务的状态：’draft’代表”草稿”，’process’代表”进行中”, ‘done’代表’完成’,’invalid’代表’作废’
        state_list:[
          // {
          //   name:'未开始',
          //   code:'draft'
          // },
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
        // remarks:'',
        task_list:[],
        task_list_length:1,
        task_item:{},
        shop_list:[],
        shop_id:localStorage.getItem('shop_id')*1,
        shop_name:'',
        last_shoping_date_list:[
          {
            name:'1个月以内',
            code:'TAG18000000000000000001',
            minMonth:0,
            maxMonth:1,
            selected:false
          },
          {
            name:'1-3个月',
            code:'TAG18000000000000000002',
            minMonth:1,
            maxMonth:3,
            selected:false
          },
          {
            name:'3-6个月',
            code:'TAG18000000000000000003',
            minMonth:3,
            maxMonth:6,
            selected:false
          },
          {
            name:'6个月以内',
            code:'TAG18000000000000000004',
            minMonth:0,
            maxMonth:6,
            selected:false
          },
          {
            name:'6-9个月',
            code:'TAG18000000000000000005',
            minMonth:6,
            maxMonth:9,
            selected:false
          },
          {
            name:'1年以内',
            code:'TAG18000000000000000006',
            minMonth:0,
            maxMonth:12,
            selected:false
          },
          {
            name:'1年以上',
            code:'TAG18000000000000000007',
            minMonth:12,
            selected:false
          },
          {
            name:'无消费',
            code:'TAG18000000000000000008',
            selected:false
          }
        ],
        birthday_month_list:[
          {
            name:'1月',
            code:'01',
            selected:false
          },
          {
            name:'2月',
            code:'02',
            selected:false
          },
          {
            name:'3月',
            code:'03',
            selected:false
          },
          {
            name:'4月',
            code:'04',
            selected:false
          },
          {
            name:'5月',
            code:'05',
            selected:false
          },
          {
            name:'6月',
            code:'06',
            selected:false
          },
          {
            name:'7月',
            code:'07',
            selected:false
          },{
            name:'8月',
            code:'08',
            selected:false
          },
          {
            name:'9月',
            code:'09',
            selected:false
          },
          {
            name:'10月',
            code:'10',
            selected:false
          },
          {
            name:'11月',
            code:'11',
            selected:false
          },
          {
            name:'12月',
            code:'12',
            selected:false
          }
        ],
        style_list:[
          {
            name:'时尚新品型',
            code:'TAG180905112309082226',
            selected:false
          },
          {
            name:'折扣敏感型',
            code:'TAG180905113345558646',
            selected:false
          },
          {
            name:'无倾向型',
            code:'TAG180905113427261745',
            selected:false
          }
        ],
        sex_list:[
          {
            name:'男',
            code:'male',
            selected:false
          },
          {
            name:'女',
            code:'female',
            selected:false
          }
          // ,
          // {
          //   name:'其他',
          //   code:'other',
          //   selected:false
          // }
        ],
        card_style_list:[
        ],
        points:[
          {
            name:'0-1999',
            code:'TAG18000000000000000023',
            min:0,
            max:1999,
            selected:false
          },
          {
            name:'2000-5999',
            code:'TAG18000000000000000024',
            min:2000,
            max:5999,
            selected:false
          },
          {
            name:'6000-9999',
            code:'TAG18000000000000000025',
            min:6000,
            max:9999,
            selected:false
          },
          {
            name:'10000以上',
            code:'TAG18000000000000000026',
            min:10000,
            selected:false
          }
        ],
        season_list:[
          {
            name:'春',
            code:'TAG18000000000000000027',
            selected:false
          },
          {
            name:'夏',
            code:'TAG18000000000000000028',
            selected:false
          },
          {
            name:'秋',
            code:'TAG18000000000000000029',
            selected:false
          },
          {
            name:'冬',
            code:'TAG18000000000000000030',
            selected:false
          }
        ],
        member_list:[
        ],
        member_selected_list:[],
        shopping_guide:[
        ],
        subject:[]
      }
    },
    methods: {
      back: function (){
        if(this.role == 'shopowner'){
          this.$router.push({
            name: "主题列表"
          }) 
        }else{
          this.$router.push({
            name: "门店列表"
          }) 
        }
        
      },
      add_task: function () {
        this.$router.push({
          name:'创建任务',
          params: { 
            subject:this.subject
            // from: "task_list"
          }
        })
      },
      change_shop: function () {
        this.$router.push({
          name: "门店列表",
          params: { 
            subject:this.subject
            // member_list: that.member_list, 
            // member_num:res.data.member_num 
          }
        }) 
      },
      change_state: function (state_index) {
        this.selected_state = state_index;
        this.get_marketing_task_list();
        this.$forceUpdate();
      },
      edit_subject: function () {
        if(this.role!='shopowner'){
          return;
        }
        this.$router.push({
          name:'编辑主题',
          params:{
            subject:this.subject
          }
        })
      },
      // tab切换
      active: function (tab) {
        this.isActive = tab;
        if(this.isActive=='create'){
          // // init
          // this.last_shopping_date_param_list=[];
          // // this.start_open_card_date=GetPreMonthDay(get_date_format(new Date()), 12);
          // // this.end_open_card_date=get_date_format(new Date());
          // this.birthday_month_param_list=[];
          // this.style_param_list=[];
          // this.sex_param='';
          // this.card_styles_param_list=[];
          // this.point_param_list = [];
          // this.tag_code_list = [];
          // this.season_param_list = [];
          
          // this.start_date=this.get_date_format(new Date());
          // this.end_date=this.GetPreMonthDay(this.get_date_format(new Date()), -1);
          // this.task_name='';
          // this.task_context='';

          // this.init_selected_to_false(this.last_shoping_date_list, this.last_shopping_date_param_list);
          // this.init_selected_to_false(this.birthday_month_list);
          // this.init_selected_to_false(this.style_list);
          // this.init_selected_to_false(this.sex_list);

          // this.init_selected_to_false(this.card_style_list, this.card_styles_param_list);
          // this.init_selected_to_false(this.points, this.point_param_list);
          // this.init_selected_to_false(this.season_list);
          // this.init_selected_to_false(this.shopping_guide);
        }
      },
      init_selected_to_false: function (data_list, param_list, default_nums, code) {
        for(var i=0;i<data_list.length;i++){
          for(var j=0;j<default_nums.length;j++){
            if(i==default_nums[j]){
              data_list[i].selected = true;
              param_list.push(data_list[i][code]);
              break;
            }else if(!!data_list[i].selected){
              data_list[i].selected = false;
            }
          }
        }
      },
      // select label
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
      transform_date: function (month_string_arr) {
        let month_date_arr = [];
        let now_date = new Date();
        let year_month_day = now_date.getFullYear() + '-' + ((now_date.getMonth()+1)<10 ? ('0'+(now_date.getMonth()+1)):(now_date.getMonth()+1)) + '-' + (now_date.getDate()<10 ? ('0'+now_date.getDate()):now_date.getDate())

        if(month_string_arr.length==2){
          month_date_arr[0] = GetPreMonthDay(year_month_day,month_string_arr[1]);
          month_date_arr[1] = GetPreMonthDay(year_month_day,month_string_arr[0]);
        }else{
          month_date_arr[0] = GetPreMonthDay(year_month_day,month_string_arr[0]);
          if(!!month_string_arr[1]){
            month_date_arr[1] = GetPreMonthDay(year_month_day,month_string_arr[1]);
          }
        }
        return month_date_arr;
      },
      doHandleMonth: function(month){  
        var m = month;  
        if(month.toString().length == 1){  
          m = "0" + month;  
        }  
        return m;  
      },
      getDay: function (day) {
        var today = new Date();  
        var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;          
        today.setTime(targetday_milliseconds); //注意，这行是关键代码
        var tYear = today.getFullYear();  
        var tMonth = today.getMonth();  
        var tDate = today.getDate();  
        tMonth = this.doHandleMonth(tMonth + 1);  
        tDate = this.doHandleMonth(tDate);
        return tYear+"-"+tMonth+"-"+tDate;
      },
      // 下一步到会员list
      get_member_list: function () {
        var that = this;
        this.member_list_loading = true;
        // 最近购物日期
        let last_shopping_date_param_list = [];
        for(let i=0;i<this.last_shopping_date_param_list.length;i++){
          for(let j=0;j<this.last_shoping_date_list.length;j++){
            if(this.last_shopping_date_param_list[i]==this.last_shoping_date_list[j].code){
              let minMonth = this.last_shoping_date_list[j].minMonth;
              let maxMonth = this.last_shoping_date_list[j].maxMonth;
              if(!minMonth&&minMonth!=0){
                last_shopping_date_param_list.push(['none']);
              }else if(!maxMonth){
                last_shopping_date_param_list.push(this.transform_date([minMonth]));
              }else{
                last_shopping_date_param_list.push(this.transform_date([minMonth,maxMonth]));
              }
            }
          }
        }
        // 积分
        let point_param_list = [];
        for(let i=0;i<this.point_param_list.length;i++){
          for(let j=0;j<this.points.length;j++){
            if(this.point_param_list[i]==this.points[j].code){
              let min = this.points[j].min;
              let max = this.points[j].max;
              if(!max){
                point_param_list.push([min]);
              }else{
                point_param_list.push([min,max]);
              }
            }
          }
        }
        var data = {
          "login_name": this.login_name,
          "related_shop_id":this.shop_id,
          "tag_code_list":this.season_param_list.concat(this.style_param_list),
          "limit_size":200,
          "offset_size":1,
          "last_shopping_date_list":last_shopping_date_param_list,
          "start_open_card_date":this.start_open_card_date,
          "end_open_card_date":this.end_open_card_date,
          "birthday_month_list":this.birthday_month_param_list,
          "sex":this.sex_param,
          "level_code_list":this.card_styles_param_list,
          "point_range_list":point_param_list
        }
        var search_condition = {
          last_shoping_date_list: this.last_shoping_date_list,
          start_open_card_date: this.start_open_card_date,
          end_open_card_date: this.end_open_card_date,
          birthday_month_list: this.birthday_month_list,
          style_list: this.style_list,
          sex_list: this.sex_list,
          card_style_list: this.card_style_list,
          points: this.points,
          season_list: this.season_list
        }
        sessionStorage.setItem('search_condition', JSON.stringify(search_condition))
        sessionStorage.setItem('search_condition_param', JSON.stringify(data))
        that.$router.push({
          name: "会员列表",
          // params: { 
          //   member_list: that.member_list, 
          //   member_num:res.data.member_num 
          // }
        }) 
        // MEMBER_LIST(data).then(res => {
        //   that.member_list = res.data.member_list;
        //   that.member_list.forEach(item => {
        //     item.selected = true;
        //   })
        // })
      },
      // 进去任务详情
      goTaskDetail: function (e) {
        this.$router.push({
          name:'任务详情',
          params:{task_item:e}
        })
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
      get_marketing_task_list: function () {
        var that = this;
        // 任务列表
        var data = {
          // "login_name":this.login_name,
          "shop_id_list":[localStorage.getItem('shop_id')*1],
          "task_state":this.selected_state,
          "task_type_id":this.subject.task_type_id
        }
        MARKETING_TASK_LIST(data).then(res => {
          this.task_list = res.data.task_info_list;
          for(let i=0;i<this.task_list.length;i++){
            // 任务的状态：’draft’代表”草稿”，’process’代表”进行中”, ‘done’代表’完成’,’invalid’代表’作废’
            switch(this.task_list[i].task_state){
              case 'draft':
                this.task_list[i].task_state_text = '未开始';
                break;
              case 'process':
                this.task_list[i].task_state_text = '进行中';
                break;
              case 'done':
                this.task_list[i].task_state_text = '完成';
                break;
              case 'invalid':
                this.task_list[i].task_state_text = '作废';
                break;
            }
          }
          // 按start_date，end_date排序
          var sorted = this.task_list.sort(function(a, b) {
              const first = Date.parse(a.start_date) - Date.parse(b.start_date);
              if (first !== 0) {
                return first;
              }
              return Date.parse(a.end_date) - Date.parse(b.end_date);
          });
          this.task_list = sorted;
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
      }
    },
    mounted: function() {
      var screabHeight = window.innerHeight
      this.maxheight = screabHeight - 52;
    },
    created(){
      _paq.push(['setDocumentTitle', document.title])
      this.subject = JSON.parse(localStorage.getItem('subject'));
      
      console.log(this.subject)
      this.role = localStorage.getItem('role');
      this.shop_name = localStorage.getItem('shop_name')
      let search_condition = JSON.parse(sessionStorage.getItem('search_condition'));
      if(!!search_condition){
        // 最近购物日期
        if(!!search_condition.last_shoping_date_list){
          this.last_shoping_date_list = search_condition.last_shoping_date_list
          let default_nums = [];
          for(let i=0;i<this.last_shoping_date_list.length;i++){
            if(this.last_shoping_date_list[i].selected){
              default_nums.push(i);
            }
          }
          this.init_selected_to_false(this.last_shoping_date_list, this.last_shopping_date_param_list, default_nums, 'code')
        }
        // 开卡日期
        if(!!search_condition.start_open_card_date){
          this.start_open_card_date = search_condition.start_open_card_date
        }
        if(!!search_condition.end_open_card_date){
          this.end_open_card_date = search_condition.end_open_card_date
        }
        // 生日月
        if(!!search_condition.birthday_month_list){
          this.birthday_month_list = search_condition.birthday_month_list
          let default_nums = [];
          for(let i=0;i<this.birthday_month_list.length;i++){
            if(this.birthday_month_list[i].selected){
              default_nums.push(i);
            }
          }
          this.init_selected_to_false(this.birthday_month_list, this.birthday_month_param_list, default_nums, 'code')
        }
        // 类型
        if(!!search_condition.style_list){
          this.style_list = search_condition.style_list
          let default_nums = [];
          for(let i=0;i<this.style_list.length;i++){
            if(this.style_list[i].selected){
              default_nums.push(i);
            }
          }
          this.init_selected_to_false(this.style_list, this.style_param_list, default_nums, 'code')
        }
        // 性别
        if(!!search_condition.sex_list){
          this.sex_list = search_condition.sex_list
          // var default_nums = [];
          for(let i=0;i<this.sex_list.length;i++){
            if(this.sex_list[i].selected){
              this.sex_param = this.sex_list[i].code
            }
          }
          // this.init_selected_to_false(this.sex_list, this.sex_param, default_nums, 'code')
        }
        // 卡类型
        // if(!!search_condition.card_style_list){
        //   this.card_style_list = search_condition.card_style_list
        //   let default_nums = [];
        //   for(let i=0;i<this.card_style_list.length;i++){
        //     if(this.card_style_list[i].selected){
        //       default_nums.push(i);
        //     }
        //   }
        //   this.init_selected_to_false(this.card_style_list, this.card_styles_param_list, default_nums, 'level_code')
        // }
        // 积分
        if(!!search_condition.points){
          this.points = search_condition.points
          let default_nums = [];
          for(let i=0;i<this.points.length;i++){
            if(this.points[i].selected){
              default_nums.push(i);
            }
          }
          this.init_selected_to_false(this.points, this.point_param_list, default_nums, 'code')
        }
        // 季节
        if(!!search_condition.season_list){
          this.season_list = search_condition.season_list
          let default_nums = [];
          for(let i=0;i<this.season_list.length;i++){
            if(this.season_list[i].selected){
              default_nums.push(i);
            }
          }
          this.init_selected_to_false(this.season_list, this.season_param_list, default_nums, 'code')
        }
      }
      // 会员列表返回
      if(!!this.$route.params.isActive){
        this.isActive = this.$route.params.isActive
      }

      var that = this;
      // 任务列表
      var data = {
        "shop_id_list":[localStorage.getItem('shop_id')*1],
        "task_type_id":this.subject.task_type_id
      }
      MARKETING_TASK_LIST(data).then(res => {
        that.task_list_length = res.data.task_info_list.length;
        that.subject.task_num = this.task_list_length
      })
      // 任务列表
      this.get_marketing_task_list();

      // // 门店shop_list
      // GET_SHOP_LIST({"login_name":this.login_name}).then(res => {
      //   console.log(res)
      //   this.shop_list = res.data.shop_info_list;
      //   this.shop_id = this.shop_list[0].shop_id
      // })
      // 等级
      MEMBER_LEVEL_LIST({shop_id:this.shop_id}).then(res => {
        that.card_style_list = res.data.result;
        if(!!search_condition && !!search_condition.card_style_list){
          // this.card_style_list = search_condition.card_style_list
          var default_nums = [];
          for(let i=0;i<search_condition.card_style_list.length;i++){
            if(search_condition.card_style_list[i].selected){
              default_nums.push(i);
            }
          }
          this.init_selected_to_false(that.card_style_list, that.card_styles_param_list, default_nums, 'level_code')
        }else{
          that.card_style_list.forEach(item => {
            item.selected = false;
          })
        }

      })


      this.$forceUpdate();
    },
    components: {
      // navbar
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shop_name{
  padding: 6px 14px;
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
  top: 1.7rem;
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
.task_date{
  width: 54%;
  text-align: center;
  border: 1px solid #e4e5e5;
  padding: 2px 5px;
  margin: 5px 8px;
  border-radius: 5px;
}
.weui-navbar + .weui-tab__panel{
  padding-top: 2.7rem;
}
.no_member{
  background: #edf0f4;
  display: flex;
  justify-content: center;
  padding-top: 5rem;
}
.no_member img{
  width: 2rem;
  height: 2rem;
}
</style>
