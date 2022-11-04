# irvtech
1)Signup:
---------
Register user with email and password fields.

2)Login:
--------
 Sign user with email and password fields, It will return jwt token.

 3)Create user profile:
 --------------------
 fisrt_name
 last_name
 image(not completed)

 4)Get list of users:
 ------------------
 It will return all created profiles.

 5)Update user by using user_id:
 ------------------------------
 if user not authenticated will throw error. please authenticate before update user.
 Implemented middle ware for authentication.(auth.js)

running application:
-------------------
npm start
