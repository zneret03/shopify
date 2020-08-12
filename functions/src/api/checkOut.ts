import { app, db } from '../middleware/middleware'

// export const updateCartItems = functions.firestore.document('Cart/{cartId}').onCreate(async(snap : any, context : any)=> {
//     const newValues = snap.after.data();
//     const previousValues = snap.before.data();

//     let updatePromises : any = [];

//     if(newValues.status !== previousValues.status){
//         const snapshot = await db.collection('Transaction').where('status', '==', previousValues.status);

//         snapshot.forEach((doc : any) => {
//             updatePromises.push(db.collection('Transaction').doc(doc.id).update({status : '#33ff99'}));
//         });
//     }

//     await Promise.all(updatePromises);
// });

export const checkOut = app.post('/api/checkOut/items', async(request : any, response : any) =>  {
    return 
});