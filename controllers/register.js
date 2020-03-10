const handleRegister = (req, res, db, bcrypt) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json('Unable to register');
    }
    const hash = bcrypt.hashSync(password, 10);
    db.transaction(trx => {
            trx
            .insert({
                hash: hash,
                email: email
            })
            // .transacting(trx)
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .insert({
                        name: name,
                        email: loginEmail[0],
                        joined: new Date()
                    }, '*')
                    // .transacting(trx)
                    .then(user => res.json(user[0]))
            })
            .then(trx.commit)
            .catch(trx.rollback);
    })
    .catch(err => {
        // res.status(400).json(err);//Client e bu bilgileri vermek sakıncalı
        res.status(400).json('Unable to register')
    })
}

module.exports = {
    handleRegister: handleRegister
};