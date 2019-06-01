/* eslint-disable */
var _paq = _paq || [];
var UserId = localStorage.getItem('login_name');
// console.log(UserId, sessionStorage.getItem('user_id'))
if (!!UserId) {
  _paq.push(['setUserId', UserId]);
}
_paq.push(['enableLinkTracking', true]);
(function() {
  try {
    var site_id = siteId;
    // 如果site_id是false,则不发送Piwik数据
    if(site_id == '' || site_id == false){
        return
    }
    var u = "//a.nexttao.com/";
    // 当url为空不发送
    if(u == "" || u == "false" || u == false){
        return
    }
    _paq.push(['setTrackerUrl', u + 'piwik.php']);
    _paq.push(['setSiteId', site_id]);
    _paq.push(['setDocumentTitle', document.title]);
    _paq.push(['setCustomVariable', "1", "Platform", Platform]);
    _paq.push(['setCustomVariable', "2", "TenantId", TenantID]);
    _paq.push(['setCustomVariable', "3", "TenantName", TenantName]);
    _paq.push(['setCustomVariable', "4", "ShopName", ShopName]);
    _paq.push(['setCustomVariable', "5", "AppVersion", Appversion]);
    _paq.push(['trackPageView']);
    var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async = true; g.defer = true; g.src = u + 'piwik.js'; s.parentNode.insertBefore(g,s);
  }catch (e){
    console.log(e);
  }
})();