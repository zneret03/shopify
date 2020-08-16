import { app, db, functions } from '../middleware/middleware'

export const updateCartItems = functions.firestore.document('transaction/{transactionId}').onCreate(async(snap : any, context : any)=> {
    const Data = snap.data();

    // await Data.itemsCheckout.foreEach((item : any) => {
    //     if(item.status === "#ff4444"){
    //         db.collection('Cart').doc(item.id).update({
    //             status : '#00C851'
    //         });
    //     }
    // })

    await db.collection('hi').doc().set({
        status : Data.firstName
    });
});

export const checkOut = app.post('/api/checkOut/items', async(request : any, response : any) =>  {
    try {
        const subTotal = Number(request.body.subTotal);
        const document = db.collection('transaction').doc();
        // request.body.pending.map((item : any) => {
        //     db.collection('Cart').doc(item.id).update({
        //         status : '#00C851'
        //     }).then(() => {
        //         return response.status(200).send('Thank you for shopping');
        //     }).catch((err : any) => {
        //         return response.status(500).send(err.message);
        //     });; 
        // })
        
            return document.set({           
                firstName : request.body.firstName,
                lastName : request.body.lastName,
                email : request.body.email,
                address : request.body.address,
                subTotal : subTotal,
                region : request.body.activeRegion,
                province : request.body.province,
                zipcode : request.body.zipcode,
                itemsCheckout : request.body.pending
            }).then(() => {
                return response.status(200).send('Thank you for shopping :)');
            }).catch((error : any) => {
                return response.status(500).send(error.message);
            });
       
    } catch (error) {
        return response.status(500).send(error.message);
    }
});