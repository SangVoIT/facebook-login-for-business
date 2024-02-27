# Project Overview: google-app-script_crud

## I. Facebook Login vs Facebook Login for Business
### Facebook Login:
Facebook Login is a feature provided by the social media platform Facebook that allows users to access third-party applications and websites using their Facebook credentials. Instead of creating a new account for each service, users can choose to log in with their existing Facebook account, simplifying the sign-up process and providing a convenient and quick way to access various online platforms. By integrating Facebook Login, websites and apps can leverage the user's Facebook profile information (with their consent) to personalize the experience and enhance social interactions.

###Facebook Login for Business:
Facebook Login for Business is an extension of the standard Facebook Login feature, specifically designed to cater to the needs of businesses and developers creating applications for commercial purposes. It enables businesses to streamline user authentication and registration processes by allowing customers to log in with their Facebook credentials. This not only provides a seamless user experience but also offers businesses access to valuable user data and insights, with user consent. By implementing Facebook Login for Business, companies can enhance user engagement, improve customer retention, and gain a deeper understanding of their user base through the integration of social and profile information. This can be particularly useful in creating personalized marketing strategies and fostering a more connected and interactive user community.

## II. Project Setup Steps
1. Create a Meta Developer account.
2. Create an application for login settings, and configure app details such as the app domain, terms, privacy, and platform.
※For Facebook login, it is essential to create a consumer app; for Facebook login with business, a business app must be created.
3. Clone my source code, and in the 'login_common_fb.js' or 'login_business.js,' please update the appropriate App ID. Start the web server with Live Server in Visual Studio Code.
(If using Instagram login, set up IG Client ID and IG Client Secret.)
4. For Facebook login, use HTTPS for verification. Install ngrok to convert HTTP to HTTPS:
ngrok http 5500
You will receive the command line 
5. On the app console, in the basic tab, choose to set up Facebook login or Facebook login for business. Then, configure the ngrok domain for Valid OAuth redirect URIs.


## III. What We Have Learned in This Project
1. Understand the differences between Facebook Login and Facebook Login for Business.
2. Utilize JavaScript for configuring both Facebook Login and Facebook Login for Business.
3. Familiarize yourself with Meta for developers, business/consumer apps, and other aspects of app settings, permissions, etc.


## IV. Additional Resources
- [Facebook Login for Business](https://developers.facebook.com/docs/facebook-login/facebook-login-for-business/)

## V. Example:

Your can check app setting and result detail in FB_login_vs_FB_login_for_business.xlsx