import { app, db } from '../middleware/middleware'

export const checkOut = app.post('/api/checkOut/items', async(request : any, response : any) =>  {
    try {
        const subTotal = Number(request.body.subTotal);
        const document = db.collection('customerInformation');
        
        const itemsIdArray : any[] = [];
        const date = new Date();
        const time = `${date.getHours()}:${date.getMinutes}:${date.getMilliseconds}`
        const today = `${date.getMonth()} ${date.getDay()} ${date.getFullYear()}`

        const timeDate = `${today}, ${time}`;

        request.body.pending.map((item : any)=>{
            itemsIdArray.push(item.id);
        });

        return document.add({      
            firstName : request.body.firstName,
            lastName : request.body.lastName,
            email : request.body.email,
            address : request.body.address,
            subTotal : subTotal,
            region : request.body.activeRegion,
            province : request.body.province,
            zipcode : request.body.zipcode,
            items : itemsIdArray,
            date_created : timeDate
        }).then(() => {
            return response.status(200).send('Thank you for shopping :)'); 
        }).catch((error : any) => {
            return response.status(500).send(error.message);
        });
       
    } catch (error) {
        return response.status(500).send(error.message);
    }
});
