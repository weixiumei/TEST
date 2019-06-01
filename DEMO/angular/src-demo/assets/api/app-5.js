// var App = angular.module('App', ['ng-iscroll']);
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
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
        
        refresh();     // Remember to refresh when contents are loaded (ie: on ajax completion)
    }, 1000);   // <-- Simulate network congestion, remove setTimeout from production!
}
function refresh () {
    console.log('maxScrollY-4:'+this.maxScrollY);
    _maxScrollY = this.maxScrollY = this.maxScrollY+pullUpOffset;
    console.log('maxScrollY-5:'+this.maxScrollY);
    
    if (pullDownEl  && pullDownEl.className.match('loading')) {
       pullDownEl.className = '';
       pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh';
       this.scrollTo(0,this.options.startY,0);
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
                myScroll = new IScroll('#wrapper', {
                    snap: true,
                    click:true,
                    momentum: true,
                    hScrollbar: true});

                myScroll.on("scrollStart", function() {
                    if(this.y==this.startY){
                        isScrolling = true;
                    }
                    console.log('scrollStart->'+'start-y:'+this.y);
                });
                // myScroll.on('beforeScrollStart',function(e){e.stopPropagation()});
                //Event: scroll
                myScroll.on('scroll', function(){
                    console.log('scroll')
                    if (this.y >= 5 && pullDownEl && !pullDownEl.className.match('flip')) {
                        pullDownEl.className = 'flip';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh';
                        //this.minScrollY = 0;
                    } else if (this.y < 5  && pullDownEl && pullDownEl.className.match('flip')) {
                        pullDownEl.className = '';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh';
                    }
                });
                    
                //Event: scrollEnd
                myScroll.on("scrollEnd",function(){
                    console.log('scrollEnd -- directionY:'+this.directionY + '   y1:'+this.y + '   maxScrollY-3:'+this.maxScrollY);
                    if (pullDownEl && !pullDownEl.className.match('flip') && this.y > this.options.startY) {
                        console.log('resume'); 
                        this.scrollTo(0, this.options.startY,800);
                      }
                    else if (pullDownEl && pullDownEl.className.match('flip')){
                        pullDownEl.className = 'loading';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';                
                        // Execute custom function (ajax call?)
                        if (isScrolling) {
                            console.log('before pull down action:'+this.y); 
                            pullDownAction();
                            console.log('after pull down action:'+this.y); 
                        }
                    }
                    isScrolling = false;
                });

                //Event: refresh
                myScroll.on("refresh", function() {
                    console.log('maxScrollY-4:'+this.maxScrollY);
                    _maxScrollY = this.maxScrollY = this.maxScrollY+pullUpOffset;
                    console.log('maxScrollY-5:'+this.maxScrollY);
                    
                    if (pullDownEl  && pullDownEl.className.match('loading')) {
                       pullDownEl.className = '';
                       pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh';
                       this.scrollTo(0,this.options.startY,0);
                    }
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
