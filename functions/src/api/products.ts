import { app, db  } from '../middleware/middleware'

interface ProductTypes {
    request : any,
    response : any,
    price : number,
    quantity : number
}

//add Product function
const addProductData = async(config : ProductTypes) => {

    const {request, response, price, quantity} = config;

    return await db.collection('product').doc().create({
        uid: request.body.uid,
        product : request.body.product,
        title : request.body.title,
        purpose : request.body.purpose,
        price : price,
        quantity : quantity,
        imageUrl : request.body.imageUrl,
        date_created : request.body.date,
        gender : request.body.gender
    }).then(() => {
        return response.status(200).send('successfully inserted');
     }).catch((error : any) => {
        return response.status(500).send(error.message);
    });

}

//add Product
export const addProduct = app.post('/api/productSave', async(request : any, response : any) => {
    try{
        const price : number = Number(request.body.price);
        const quantity : number = Number(request.body.quantity);

        const document = db.collection('product');
        return await document.get()
        .then((docSnapshot : any) => {
            if(docSnapshot){
                //map through data and check if the data is already existed
                docSnapshot.forEach((data : any) => {
                    if(data.data().product === request.body.product){
                        return response.send({status : true, message: 'Invalid Item'});
                    }else{
                        const config: ProductTypes = {request, response, price, quantity};
                        addProductData(config).then(()=>{
                            return response.send('Nice');
                        }).catch((error) => {
                            return response.send(error.message);
                        });
                    }

                });
            } 
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
            gender : request.body.gender
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