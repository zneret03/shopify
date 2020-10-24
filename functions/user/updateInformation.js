const callback = require('../callback');
const {firebaseDb, firebaseAuth} = require('../firebaseAdmin');

const onChangeEmail = async(id, email) => {
    try {
        await firebaseAuth.updateUser(id, {
            email : email
        });
    } catch (error) {
        console.log(error.message);
        return callback(405, {});
    }
}

module.exports = async(event) => {
    try {
        const {id, firstname, lastname, email, city, state, zipcode} = JSON.parse(event.body);
        const document = firebaseDb.collection('user').doc(id);
        
        await document.update({
            firstname, 
            lastname,
            email,
            city,
            state,
            zipcode
        }).then(() => {
            onChangeEmail(id, email);
        });

        return callback(200, "Successfull");
    } catch (error) {
        console.log(error.message);
        return callback(405,{});
    }
}