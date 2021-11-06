# Product-API

https://productapi-deutschkihun.herokuapp.com/docs/

#### JsonWebToken 

   * Authentication: verifying who the user is for entry permission. ex) login vs logout
   * Authorization: determining what resources a user can access. ex) admin user vs normal user
   
   * The generateToken function contains a function called jwt.sign. The Sign function receives payload as a factor, 
   which means the transferred data. Basically, since payload is in the form of a string, it must be converted into a JSON form.
   
**Why token is needed? ?**

Why is Token necessary? The reason is because of the characteristics of http. Http is a connection-oriented protocol. Therefore, the connection is terminated when one request and response cycle are completed, so no matter how many requests the same client sends, all protocols are perceived as new. This is called state. 

If you want to keep it stateful, you will use cookies or sessions, which are server-based authentication functions. Since these technologies basically require storing data on the server, the server may be loaded. However, the token-based authentication system is stable. In other words, it does not maintain its state. This system no longer contains user authentication information in servers or sessions. Not only does the burden on the server decrease, but it also has high security, and can be applied to platforms and domains.

#### Swagger API 

   * Swagger API provide a api docs page with example. 


#### Heroku 

   * This application is deployed by heroku 
