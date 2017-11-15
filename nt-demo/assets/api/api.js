
var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : sParameterName[1];
      }
  }
}

function showLoadingToast(msg){
        var $loadingToast = $('.data_content');
        if ($loadingToast.css('display') != 'none') return;
        if(typeof msg == 'undefined'){
            msg = '加载中...';
        }
        $loadingToast.find('.weui-toast__content').html(msg);
        $loadingToast.fadeIn(100);
}
function hideLoadingToast(){
        var $loadingToast = $('.data_content');
        if ($loadingToast.css('display') == 'none') return;
        $loadingToast.fadeOut(100);
}
// 报错提示
function _error_handle(data){
    if(!!!data){
        return;
    }
    if(!!data.code){
        if((data.code+"").substring(0,1) == 1){
                storage.removeItem('NXPB_TOKEN');
                alert('长期未操作，登录已经超时，请重新登录');
                window.location.href = 'login.html';
        }
        switch(data.code){
            case 100002:
                storage.removeItem('NXPB_TOKEN');
                window.location.href = 'login.html';
            break;
        }
    }
}

var storage = window.localStorage;

var NtSF = angular.module('NtSF',[]);
NtSF.run(['$http', function($http) {
}]);
NtSF.controller('Login', ['$scope', '$http', function ($scope, $http) {
    //get user info
    $scope.data = {
        username:'',
        password:'',
        database: "peacebird",
        data:{

          }
    }
    $scope.login = function(){
        if(!!!$scope.data.username){
            $('input[name=username]').focus();
            return;
        }
        if(!!!$scope.data.password){
            $('input[name=password]').focus();
            return;
        }

        var url = API_URL_PREFIX + API_URL['LOGIN'];
        var config = {};
        // config.headers = {'Token' : TOKEN};
        $scope.loading = true;

        var data = $scope.data;

        $http.post(url,data,config).
        success(function(data) {
            if(data.code != 0){
                _error_handle(data);
                return;
            }
            if(!!!data.data.token){
                return _error_handle(data);
            }
            window.location.href = 'index.html';
        }).error(function(data,status,headers,config){
            _error_handle(data);
        }).finally(function(){
            $scope.loading = false;
        })

    }
}])
.controller('form', ['$scope', '$http', function ($scope, $http) {
    $scope.input = 'input';
    $scope.radio_list = [
        {id:1, name:'radio1'},
        {id:2, name:'radio2'}
    ];
    $scope.radio_input = $scope.radio_list[0].id;
    $scope.nowDate = new Date();
    
    $scope.checkbox_list = [
        {id:1, name:'checkbox1'},
        {id:2, name:'checkbox2'},
        {id:3, name:'checkbox3'},
    ];
    $scope.checkbox_input = $scope.checkbox_list[0].id;

    $scope.select_list = [
        {id:1, name:'select1'},
        {id:2, name:'select2'},
        {id:3, name:'select3'}
    ];
    $scope.select_input = $scope.select_list[0].id;

    $scope.click = function(){
        alert('1212345678');
    }
}])
.controller('table', ['$scope', '$http', function ($scope, $http) {

}])



