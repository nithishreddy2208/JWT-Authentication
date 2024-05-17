const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
/*run this in postmon application
/login- this api is for creating fake user
/profile- this is for verifying the token using the middleware function verifytoken
in postmon while running /login we will get a token which is used for verification
while running /profile - we should go to headers there give key as authorization and 
value as bearer and the token provided in last post.
this token will be accessed by the array made using split method in verifytoken method...
*/
app.post("/login", (req, res) => {
    const user = {
        uname: "abc123",
        pass: "def123"
    }
    jwt.sign({ user }, "-----"/*----- this is secret key*/, (err, token) => {
        res.status(200).json({ token });
    })
})


function verifyToken(req, res, next) {
    token = req.headers.authorization.split(' ')[1];
    req.token = token;
    next();
}
app.post("/profile", verifyToken, (req, res) => {
    jwt.verify(req.token, "-----", (err, token) => {
        if (!err) {
            res.status(200).json({ Message: "Login Successful" })
        }
        else {
            res.status(300).send("Token mismatch")
        }
    })
})
app.listen(2000, () => console.log("server started"))