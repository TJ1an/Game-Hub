const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    const foundUser = await User.findOne({username: user}).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        //Object.values(foundUser.roles): This line uses Object.values() to extract the values of the roles property of foundUser and stores them in an array named roles.
        const roles = Object.values(foundUser.roles);
        // create JWTs
        const accessToken = jwt.sign(
            { 
                "UserInfo" : {
                "username": foundUser.username,
                "roles" : roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
       foundUser.refreshToken = refreshToken;
       const result = await foundUser.save();
       console.log(result);

        //remove secure: true if testing refresh endpoint. otherwise wont work
        res.cookie('jwt', refreshToken, {httpOnly: false, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000, secure: false});
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };