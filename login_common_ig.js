// Access token is required to make any endpoint calls,
// http://instagram.com/developer/endpoints/
var accessToken = null;
var accessCode = null;
let InstagramClientID = '3587608461456904';
let InstagramClientSecret = 'fa6065a8d6983155ff385294404283b6';
let InstagramRedirectURI = 'https://61cb-219-75-141-244.ngrok-free.app/login_common.html';

var authenticateInstagram = function(instagramClientId, instagramRedirectUri, callback) {
    // Pop-up window size, change if you want
    var popupWidth = 700,
        popupHeight = 500,
        popupLeft = (window.screen.width - popupWidth) / 2,
        popupTop = (window.screen.height - popupHeight) / 2;
    // Url needs to point to instagram_auth.php
    var popup = window.open('instagram_auth.php', '', 'width='+popupWidth+',height='+popupHeight+',left='+popupLeft+',top='+popupTop+'');
    console.log('authenticateInstagram');
    popup.onload = function() {
        // Open authorize url in pop-up
        if(window.location.hash.length == 0) {
            popup.open('https://api.instagram.com/oauth/authorize?client_id='+ instagramClientId+ '&redirect_uri='+ instagramRedirectUri+ '&scope=user_profile&response_type=code', '_self');
            
        }
        // An interval runs to get the access token from the pop-up
        var interval = setInterval(function() {
            try {
                // Check if hash exists
                if(popup.location.hash.length) {
                    // Hash found, that includes the access token
                    clearInterval(interval);
                    // URL Sample: https://ac35-240b-250-a80-4d10-10d0-32f1-4fef-e1c1.ngrok-free.app/login_common.html?code=AQAkPxubOBhkO9NsHFytCKM2so39dULX1E7JcPS7W1igMWu1IXdnv9wnpRGexUB5qlDgETee0qo4s27eFAMcM3PbCbZOlFGM7xXn_5WdgYIS998cRoJbAXbBlwDPHwO3m5byhvryDryOffKy9GkeG_iggqJsaRQHcSQMF3bIZDbBNcatVYh2jInrv446BnJr-89o2A1Oph4y008avCwO1-ZO7InACzkvFQxADTU0gMctog#_
                    code = popup.location.search.slice(6); //slice #code=
                    console.log(code);
                    if (code) { accessCode = code }
                    popup.close();
                    if(callback != undefined && typeof callback == 'function'){
                        callback(code);
                    }
                }
            }
            catch(evt) {
                // Permission denied
                console.log("Permission denied");
                console.log(evt);
            }
        }, 2000);

        
    // // 一旦、1分で監視消すか
    // setTimeout(function () {
    //     clearInterval(interval);
    // }, 60000);
    };
};

function getAccessToken(igCode) {
    console.log("getAccessToken(igCode)");
    console.log(igCode);
    // setup code
    var postData = {
        client_id:InstagramClientID,
        client_secret:InstagramClientSecret,
        grant_type:'authorization_code',
        redirect_uri:InstagramRedirectURI,
        code:igCode
    };
    console.log(postData);

    // call ajax to get response
    $.ajax({
        url: 'https://api.instagram.com/oauth/access_token',
        method: 'POST', 
        crossDomain: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type':'application/json'
        },
        dataType: 'jsonp',
        // contentType: 'application/json',
        data: postData,
        success: function (response) {
            console.log(response);
            document.getElementById('userId').innerHTML = response.user_id;
            document.getElementById('short_token').innerHTML = response.access_token;
            accessToken = response.access_token;
        },
        error: function (error) {
            console.log(error);
        }}
    );
}

function login_callback(code){
    console.log('login_callback....');
    console.log(code);
    console.log(accessCode);
    getAccessToken(code);

    // console.log("You are successfully logged in! Access Token: "+accessToken);
    // $.ajax({
    //     type: "GET",
    //     dataType: "jsonp",
    //     url: "https://api.instagram.com/v1/users/self/?access_token="+accessToken,
    //     success: function(response){
    //         // Change button and show status
    //         $('.instagramLoginBtn').attr('onclick','instagramLogout()');
    //         $('.btn-text').text('Logout from Instagram');
    //         $('#status').text('Thanks for logging in, ' + response.data.username + '!');
            
    //         // Display user data
    //         displayUserProfileData(response.data);
            
    //         // Save user data
    //         saveUserData(response.data);
            
    //         // Store user data in sessionStorage
    //         sessionStorage.setItem("userLoggedIn", "1");
    //         sessionStorage.setItem("provider", "instagram");
    //         sessionStorage.setItem("userData", JSON.stringify(response.data));
    //     }
    //   });
}

// Authenticate instagram
function instagramLogin() {
    authenticateInstagram(
        InstagramClientID,    // InstagramClientID
        InstagramRedirectURI, // InstagramRedirectURI
        login_callback          //optional - a callback function
    );
    return false;
}

// Save user data to the database
function saveUserData(userData){
    $.post('userData.php', {oauth_provider:'instagram',userData: JSON.stringify(userData)}, function(data){ return true; });
}

// Display user profile details
function displayUserProfileData(userData){
    $('#userData').html('<p><b>Instagram ID:</b> '+userData.id+'</p><p><b>Name:</b> '+userData.full_name+'</p><p><b>Picture:</b> <img src="'+userData.profile_picture+'"/></p><p><b>Instagram Profile:</b> <a target="_blank" href="https://www.instagram.com/'+userData.username+'">click to view profile</a></p>');
}

// Get user data from session storage
$(document).ready(function(){
    if(typeof(Storage) !== "undefined"){
        var userLoggedIn = sessionStorage.getItem("userLoggedIn");
        if(userLoggedIn == '1'){
            // Get user data from session storage
            var provider = sessionStorage.getItem("provider");
            var userInfo = sessionStorage.getItem("userData");
            var userData = $.parseJSON(userInfo);
            
            // Change button and show status
            $('.instagramLoginBtn').attr('onclick','instagramLogout()');
            $('.btn-text').text('Logout from Instagram');
            $('#status').text('Thanks for logging in, ' + userData.username + '!');
            
            // Display user data
            displayUserProfileData(userData);
        }
    }else{
        console.log("Sorry, your browser does not support Web Storage...");
    }
});

// Logout from instagram
function instagramLogout() {
    // Remove user data from sessionStorage
    sessionStorage.removeItem("userLoggedIn");
    sessionStorage.removeItem("provider");
    sessionStorage.removeItem("userData");
    sessionStorage.clear();
    
    $('.instagramLoginBtn').attr('onclick','instagramLogin()');
    $('.btn-text').text('Login with Instagram');
    $('#status').text('You have successfully logout from Instagram.');
    $('#userData').html('');
}
