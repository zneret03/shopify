import { app, db } from '../middleware/middleware'

//add Product
export const addProduct = app.post('/api/createProduct', async(request : any, response : any) => {
    try{
            const price : number = Number(request.body.price);
            const quantity : number = Number(request.body.quantity);
            const firestoreDb = db.collection('product').doc();

            return firestoreDb.set({
                uid: request.body.uid,
                fileName : request.body.fileName,
                product : request.body.product,
                title : request.body.title,
                purpose : request.body.purpose,
                price : price,
                quantity : quantity,
                imageUrl : request.body.imageUrl,
                date_created : request.body.date,
                gender : request.body.gender,
                description : request.body.description,
                size : request.body.size
            }).then(() => {
                return response.status(200).send('successfully inserted');
            }).catch((error : any) => {
                return response.status(500).send(error.message);
            });

    }catch(error){
        return response.status(500).send(error.message);
    }

});

//update products 
export const updateProduct = app.put('/api/update/:item_id', async(request : any, response : any) => {
    try{
        const price : number = Number(request.body.price);
        const quantity : number = Number(request.body.quantity);
        
        const document = db.collection('product').doc(request.params.item_id);

        await document.update({
            product : request.body.product,
            title : request.body.title,
            purpose : request.body.purpose,
            price : price,
            quantity : quantity,
            gender : request.body.gender,
            description : request.body.description
        });

        return response.status(200).send();
    }
    catch(error){
        return response.status(500).send(error.message);
    }
});

//get all products
export const getProduct = app.get('/api/getProduct', async(request : any, response : any) => {
    const document = db.collection('product');
    const result : object[] = [];

    const data = await document.get();

    data.docs.map((items : any) => {
        const item = {
            id: items.id,
            product : items.data().product,
            title : items.data().title,
            purpose : items.data().purpose,
            price : items.data().price,
            quantity : items.data().quantity,
            imageUrl : items.data().imageUrl,
        }

        result.push(item);
    });
    return response.status(200).send(result);
});

// delete Products
export const deleteProducts = app.delete('/api/deleteProduct/:item_id', async(request : any, response : any) => {
    try{
        if(request.params.item_id){
            const document = db.collection('product').doc(request.params.item_id);
            await document.delete();
            return response.status(200).send();
        }
    }catch(error){
        return response.status(500).send(error.message);
    }
})