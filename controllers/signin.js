const handleSignin = (req,res, db, bcrypt) => { //Alternative -- (db, bcrypt) =>(req,res) =>
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json('Unable to signin');
    }
    db.select('email', 'hash')
    .from('login')
    .where('email','=',email)
    .then(loginInfo => {
        const isValid = bcrypt.compareSync(password, loginInfo[0].hash);
        if (isValid) {
            db.select('*')
            .from('users')
            .where('email', '=', email)
            .then(user => res.json(user[0]))
            .catch(err => res.status(400).json('unable to get user'))
        } else {
            res.status(400).json('credentials not valid');
        }
    })
    .catch(err => res.status(400).json('credentials not valid'))
}

module.exports = {
    handleSignin: handleSignin
};