<template>
  <div class="home">
    <!-- 会员筛选条件 -->
    <div style="padding-bottom: 60px;">
      <div class="weui-cells weui-cells_form" :class="!isEdit||!edit_role?'disabled':''">
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
              @click="item_click(sex, 'sex_param_list')"
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
    <div class="btn_div">
      <div v-on:click="cancel()" class="weui-btn weui-btn_plain-primary">返回</div>
      <div v-on:click="finish()" v-show="isEdit&&!!edit_role" class="weui-btn weui-btn_plain-primary right_btn">确认</div>
    </div>
  </div>
</template>

<script>
  // import navbar from "./../../../node_modules/vue-weui/components/tab/navbar"
  import { get_date_format, GetPreMonthDay } from '@/common/util/common'
  import { GET_SHOP_LIST, MARKETING_TASK_LIST, MEMBER_LEVEL_LIST, MEMBER_LIST, MARKETING_TASK_TYPE_UPDATE_INFO } from "@/api";
  export default {
    name: "home",
    data() {
      return {
        maxheight:'',
        login_name:localStorage.getItem('login_name'),
        // 筛选会员条件
        last_shopping_date_param_list:[],
        start_open_card_date:GetPreMonthDay(get_date_format(new Date()), 12),
        end_open_card_date:get_date_format(new Date()),
        birthday_month_param_list:[],
        style_param_list:[],
        sex_param_list:[],
        card_styles_param_list:[],
        point_param_list:[],
        season_param_list:[],

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
        subject:{},
        related_shop_info_list:[],
        // subject:''
        task_type_member_selection:{},
        isEdit:'',
        edit_role:'',
        from:''
      }
    },
    methods: {
      
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
          // } else if (param_list=='sex'){// 性别
          //   for(var i=0;i<this.sex_list.length;i++){
          //     if(this.sex_list[i].code==item_date.code){
          //       this.sex_param = item_date.code
          //       this.sex_list[i].selected = true;
          //     }else{
          //       this.sex_list[i].selected = false;
          //     }
          //   }
          // }
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
          } 
          // else if (param_list=='sex'){// 性别
          //   this.sex_param = '';
          // }
          else{
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
      
      dispatchEvent(event, message) {
        this.$dispatch(event, message)
        if (event === 'weui-action-click') {
          this.hideActionSheet()
        }
      },
      hideActionSheet() {
        this.show = false;
      },
      // 完成
      finish: function () {
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
        // 创建
        var filter_data = {
          "login_name": this.login_name,
          // "related_shop_id":this.shop_id,
          "tag_code_list":this.season_param_list.concat(this.style_param_list),
          // "limit_size":200,
          // "offset_size":1,
          "last_shoping_date_list":last_shopping_date_param_list,
          "start_open_card_date":this.start_open_card_date,
          "end_open_card_date":this.end_open_card_date,
          "birthday_month_list":this.birthday_month_param_list,
          "sex_list":this.sex_param_list,
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
        // 更新
        if(this.from == 'edit_subject'){
          // console.log(this.subject)
          // let data = {
          //   "task_type_code": this.subject.task_type_code,
          //   "task_type_name": this.subject.task_type_name,
          //   "task_type_context": this.subject.task_type_context,
          //   "task_type_start_date": this.subject.task_type_start_date,
          //   "task_type_end_date": this.subject.task_type_end_date,
          //   "task_type_state": this.subject.task_type_state
          // }
          this.$router.push({
            name: "编辑主题",
            params:{
              subject: this.subject,
              shop_list: this.shop_list,
              isEdit:this.isEdit,
              task_type_member_selection: JSON.stringify({"filter_data":filter_data,"search_condition":search_condition }),
              related_shop_info_list:this.related_shop_info_list
            }
          })
          // MARKETING_TASK_TYPE_UPDATE_INFO(data).then(res => {
            
          // })
          return
        }else{
          
          // var data = {
          //   "login_name": this.login_name,
          //   "related_shop_ids": this.subject_input.related_shop_ids,
          //   "task_type_name": this.subject_input.task_type_name,
          //   "task_type_context": this.subject_input.task_type_context,
          //   "task_type_start_date": this.g.task_type_start_date,
          //   "task_type_end_date": this.subject_input.task_type_end_date,
          //   "task_type_member_selection": JSON.stringify({"filter_data":filter_data,"search_condition":search_condition })
          // }

          // sessionStorage.setItem('search_condition', JSON.stringify(search_condition))
          // sessionStorage.setItem('search_condition_param', JSON.stringify(data))
          // JSON.parse(this.subject_input).task_type_member_selection = {"filter_data":filter_data,"search_condition":search_condition }
          that.$router.push({
            name: "新建主题",
            params:{
              subject: this.subject,
              shop_list: this.shop_list,
              task_type_member_selection: JSON.stringify({"filter_data":filter_data,"search_condition":search_condition })
            }
          })
        }
      },
      cancel: function () {
        if(this.from == 'edit_subject'){
          this.$router.push({
            name: "编辑主题",
            params: {
              subject: this.subject,
              shop_list: this.shop_list,
              isEdit:this.isEdit,
              edit_role: this.edit_role,
              task_type_member_selection: this.task_type_member_selection,
              related_shop_info_list:this.related_shop_info_list,
            }
          })
        }else{
          // var that = this;
          // this.member_list_loading = true;
          // // 最近购物日期
          // let last_shopping_date_param_list = [];
          // for(let i=0;i<this.last_shopping_date_param_list.length;i++){
          //   for(let j=0;j<this.last_shoping_date_list.length;j++){
          //     if(this.last_shopping_date_param_list[i]==this.last_shoping_date_list[j].code){
          //       let minMonth = this.last_shoping_date_list[j].minMonth;
          //       let maxMonth = this.last_shoping_date_list[j].maxMonth;
          //       if(!minMonth&&minMonth!=0){
          //         last_shopping_date_param_list.push(['none']);
          //       }else if(!maxMonth){
          //         last_shopping_date_param_list.push(this.transform_date([minMonth]));
          //       }else{
          //         last_shopping_date_param_list.push(this.transform_date([minMonth,maxMonth]));
          //       }
          //     }
          //   }
          // }
          // // 积分
          // let point_param_list = [];
          // for(let i=0;i<this.point_param_list.length;i++){
          //   for(let j=0;j<this.points.length;j++){
          //     if(this.point_param_list[i]==this.points[j].code){
          //       let min = this.points[j].min;
          //       let max = this.points[j].max;
          //       if(!max){
          //         point_param_list.push([min]);
          //       }else{
          //         point_param_list.push([min,max]);
          //       }
          //     }
          //   }
          // }
          // // 创建
          // var filter_data = {
          //   "login_name": this.login_name,
          //   // "related_shop_id":this.shop_id,
          //   "tag_code_list":this.season_param_list.concat(this.style_param_list),
          //   // "limit_size":200,
          //   // "offset_size":1,
          //   "last_shoping_date_list":last_shopping_date_param_list,
          //   "start_open_card_date":this.start_open_card_date,
          //   "end_open_card_date":this.end_open_card_date,
          //   "birthday_month_list":this.birthday_month_param_list,
          //   "sex":this.sex_param,
          //   "level_code_list":this.card_styles_param_list,
          //   "point_range_list":point_param_list
          // }
          // var search_condition = {
          //   last_shoping_date_list: this.last_shoping_date_list,
          //   start_open_card_date: this.start_open_card_date,
          //   end_open_card_date: this.end_open_card_date,
          //   birthday_month_list: this.birthday_month_list,
          //   style_list: this.style_list,
          //   sex_list: this.sex_list,
          //   card_style_list: this.card_style_list,
          //   points: this.points,
          //   season_list: this.season_list
          // }
          // var data = {
          //   "login_name": this.login_name,
          //   "related_shop_ids": this.subject_input.related_shop_ids,
          //   "task_type_name": this.subject_input.task_type_name,
          //   "task_type_context": this.subject_input.task_type_context,
          //   "task_type_start_date": this.subject_input.task_type_start_date,
          //   "task_type_end_date": this.subject_input.task_type_end_date,
          //   "task_type_member_selection": JSON.stringify({"filter_data":filter_data,"search_condition":search_condition })
          // }
          // this.subject_input.task_type_member_selection = JSON.stringify({"filter_data":filter_data,"search_condition":search_condition })
          this.$router.push({
            name: "新建主题",
            params: {
              subject: this.subject,
              shop_list: this.shop_list,
              task_type_member_selection: JSON.stringify(this.task_type_member_selection)
            }
          })
        }
      }
    },
    mounted: function() {
      var screabHeight = window.innerHeight
      this.maxheight = screabHeight - 52;
    },
    created(){

      _paq.push(['setDocumentTitle', document.title])
      this.shop_name = localStorage.getItem('shop_name')
      this.shop_list = this.$route.params.shop_list
      this.isEdit = this.$route.params.isEdit
      this.edit_role = this.$route.params.edit_role
      this.from = this.$route.params.from

      var search_condition
      if(this.from!='edit_subject'){
        this.subject = this.$route.params.subject
        search_condition = JSON.parse(this.subject).task_type_member_selection.search_condition
        this.task_type_member_selection = JSON.parse(this.subject).task_type_member_selection
      }else{
        this.subject = this.$route.params.subject
        if(this.subject.task_type_member_selection){
          this.task_type_member_selection = this.subject.task_type_member_selection
          search_condition = JSON.parse(this.task_type_member_selection).search_condition
        }
      }
      
      if(!!search_condition){
        // 最近购物日期
        if(!!search_condition.last_shoping_date_list&&search_condition.last_shoping_date_list.length>0){
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
          let default_nums = [];
          for(let i=0;i<this.sex_list.length;i++){
            if(this.sex_list[i].selected){
              default_nums.push(i)
              // this.sex_param_list = this.sex_list[i].code
            }
          }
          this.init_selected_to_false(this.sex_list, this.sex_param_list, default_nums, 'code')
        }
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

      var that = this;
      // 等级
      MEMBER_LEVEL_LIST({shop_id:this.shop_id}).then(res => {
        that.card_style_list = res.data.result;
        if(!!search_condition && !!search_condition.card_style_list){
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
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
  top: 1.1rem;
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
  padding-top: 2.1rem;
}
</style>
