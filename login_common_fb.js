document.addEventListener("DOMContentLoaded", function() {
    // <!-- FB SDK LOAD START -->
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '1827573131022583',
            cookie     : false,
            xfbml      : true,
            version    : 'v5.0'
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
        // <!-- FB SDK LOAD END -->
    });

// Facebook login with JavaScript SDK
function fbLogin() {
    console.log("Check LoginStatus");
    FB.getLoginStatus(function(response) {
        console.log(response);
        if (response.authResponse) {
            // Get and display the user profile data
            document.getElementById('authResponse').innerHTML = JSON.stringify(response.authResponse);
            getFbUserData();
        } else{
            FB.login(function (response) {
            // FB.getLoginStatus(function (response) {
                console.log(response);
                if (response.authResponse) {
                    // Get and display the user profile data
                    document.getElementById('authResponse').innerHTML = JSON.stringify(response.authResponse);
                    getFbUserData();
                } else {
                    document.getElementById('status').innerHTML = 'User cancelled login or did not fully authorize.';
                }
            }, {scope: 'email'});
        }
    });
}

// Fetch the user profile data from facebook
function getFbUserData(){
    FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture'},
    function (response) {
        document.getElementById('fbLink').setAttribute("onclick","fbLogout()");
        document.getElementById('fbLink').innerHTML = 'Logout from Facebook';
        document.getElementById('status').innerHTML = '<p>Thanks for logging in, ' + response.first_name + '!</p>';
        document.getElementById('userData').innerHTML = '<h3>Facebook Profile Details</h3><p><img src="'+response.picture.data.url+'"/></p><p><b>FB ID:</b> '+response.id+'</p><p><b>Name:</b> '+response.first_name+' '+response.last_name+'</p><p><b>Email:</b> '+response.email+'</p><p><b>Gender:</b> '+response.gender+'</p><p><b>FB Profile:</b> <a target="_blank" href="'+response.link+'">click to view profile</a></p>';
    });
}