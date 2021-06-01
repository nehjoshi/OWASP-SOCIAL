const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const exists = req.body.data.token;
    if (!exists) return res.send({message: "sign in"});

        try {
            const isCorrect = await jwt.verify(exists, process.env.SECRET_KEY);

            next();
        }catch(e){
            console.log('error' + e);
            return res.json(e);
        }

}