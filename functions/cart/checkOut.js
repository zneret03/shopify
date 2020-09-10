const callback = require('../callback');
const { firebaseDb } = require('../firebaseAdmin');

const onUpdateStatus = async(config) => {
    try {
        const {firstName, lastName, email, itemsIdArray } = config;

        await itemsIdArray.map((item) => {
            firebaseDb.collection('transaction').doc(item).update({
                status : {color : '#00C851', itemStatus : 'paid'},
                customerInformation : { 
                    customerName : `${firstName} ${lastName}`,
                    customerEmail : email
                }
            });
        })
    } catch (error) {
        console.log(error.message);
        return callback(405, {});
    }
}

module.exports = async(event) => {
    try {
        const {
            firstName, 
            lastName, 
            email, 
            address, 
            subTotal, 
            activeRegion, 
            province, 
            zipcode, 
            pending} = JSON.parse(event.body);
            const total = Number(subTotal);

            const itemsIdArray = [];

            //*Date 
            const date = new Date();
            //const time = `${date.getHours()}:${date.getMinutes}:${date.getMilliseconds}`
            const today = `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`

            pending.map((item) => {
                itemsIdArray.push(item.id);
            })
            
            const document = firebaseDb.collection('customerInformation').doc();

            await document.set({
                firstName : firstName,
                lastName : lastName,
                email : email,
                address : address,
                subTotal : total,
                region : activeRegion,
                province : province,
                zipcode : zipcode,
                items : itemsIdArray,
                date_created : today
            }).then(async() => {
                const config = {firstName, lastName, email, itemsIdArray}
               await onUpdateStatus(config);
            });

            return callback(200, "Syccessfull")
    } catch (error) {
        console.log(error.message);
        return callback(405, {});
    }
}