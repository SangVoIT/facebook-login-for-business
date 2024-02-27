var accessToken = null; 
var businessId = null; 

window.fbAsyncInit = function() {
    FB.init({
      appId      : '733991208827885',
      cookie     : true,
      xfbml      : true,
      version    : 'v19.0'
    });
      
    FB.AppEvents.logPageView();   
      
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function checkLoginState() {
    FB.getLoginStatus(function(response) {
    if (response.authResponse) {
        console.log("getLoginStatus");
        console.log(response);
        accessToken = response.authResponse.accessToken;
        document.getElementById('authResponse').innerHTML = JSON.stringify(response.authResponse);
    }
    else {
        console.log("do nothing");
    }
    });
}



function getBusinessId() {
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: "https://graph.facebook.com/v17.0/me/accounts?fields=instagram_business_account&access_token="+accessToken,
        success: function(response){
            console.log(response);
            if (response.data.length < 1) return;

            
            response.data.forEach(item => {
                if (item &&  item.instagram_business_account) {
                    businessId = item.instagram_business_account.id;
                    document.getElementById('businessId').innerHTML = businessId;
                }
            });
            
        },
        error: function (error) {
            console.log('error');
            console.log(error);
        }
    });
}


function getListPostHaveBeenTagged() {
    const queryFields = 'caption,comments,comments_count,id,like_count,media_type,media_url,owner,timestamp,permalink,username';
    const requestUrl = 'https://graph.facebook.com/v16.0/'+businessId+'/tags?access_token='+ accessToken + '&fields=' + queryFields;
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: requestUrl,
        success: function(response){
            console.log(response);
            document.getElementById('listPost').innerHTML = JSON.stringify(response, null, 4)
        },
        error: function (error) {
            console.log('error');
            console.log(error);
        }
    });
}

