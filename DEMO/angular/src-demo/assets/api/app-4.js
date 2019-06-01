// var App = angular.module('App', ['ng-iscroll']);
var App = angular.module('App', ['ng-scroller']);

var myScroll,
    pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset,
    generatedCount = 0;
function pullDownAction () {
    setTimeout(function () {    // <-- Simulate network congestion, remove setTimeout from production!
        var el, li, i;
        el = document.getElementById('thelist');

        for (i=0; i<3; i++) {
            li = document.createElement('li');
            li.innerText = 'Generated row ' + (++generatedCount);
            el.insertBefore(li, el.childNodes[0]);
        }
        
        myScroll.refresh();     // Remember to refresh when contents are loaded (ie: on ajax completion)
    }, 1000);   // <-- Simulate network congestion, remove setTimeout from production!
}
function refresh () {
    if (pullDownEl.className.match('loading')) {
        pullDownEl.className = '';
        pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
    } 
}
angular.module('ng-scroller', []).directive('ngScroll', function() {
    
    return {
        replace: false,
        restrict: 'A',
        link: function(scope, element, attr){
            pullDownEl = document.getElementById('pullDown');
            pullDownOffset = pullDownEl.offsetHeight;
            scope.$watch(attr.ngScroll, function(value){
                // pullDownEl = document.getElementById('pullDown');
                // pullDownOffset = pullDownEl.offsetHeight;
                myScroll = new iScroll(document.querySelector('#wrapper'), {
                  snap: true,
                  momentum: true,
                  hScrollbar: true,
                  onRefresh: function () {
                    console.log("onRefresh");
                    refresh();
                    $('#pullDown .pullDownIcon').hide();
                  },
                  onScrollMove: function () {
                    $('#pullDown .pullDownIcon').hide();
                    console.log("onScrollMove");
                    if (this.y > 5 && !pullDownEl.className.match('flip')) {
                        pullDownEl.className = 'flip';
                        // pullUpEl.className = '';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
                        this.minScrollY = 0;
                    } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                        pullDownEl.className = '';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
                        this.minScrollY = -pullDownOffset;
                    } 
                  },
                  onScrollEnd: function ($location) {
                    console.log("onScrollEnd");
                    if (pullDownEl.className.match('flip')) {
                        pullDownEl.className = 'loading';
                        $('#pullDown .pullDownIcon').show();
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';                
                        pullDownAction();   // Execute custom function (ajax call?)
                    } 
                    //x=$location.path();
                    // x=$location.path();
                    // console.log("path is "+x);
                  },
            });
        }); 
       }
    };
});

App.controller('Controller', function($scope){
    
    // $scope.$parent.myScrollOptions = {
    //     snap: false,
    //     onScrollEnd: function ()
    //     {
    //         console.log('onScrollEnd');
    //         // alert('finshed scrolling');
    //     }
    // };

    // // expose refreshiScroll() function for ng-onclick or other meth
    // $scope.refreshiScroll = function ()
    // {
    //     $scope.$parent.myScroll['wrapper'].refresh();
    // };

});


// App.controller('Controller', function ($scope)
// {
//     // Defines additional options such as onScrollEnd and other runtime settings
//     // exposed by iScroll can be defined per id attribute
//     $scope.$parent.myScrollOptions = {
//         snap: false,
//         onScrollEnd: function ()
//         {
//             console.log('onScrollEnd');
//             // alert('finshed scrolling');
//         }
//     };

//     // expose refreshiScroll() function for ng-onclick or other meth
//     $scope.refreshiScroll = function ()
//     {
//         $scope.$parent.myScroll['wrapper'].refresh();
//     };


// });
