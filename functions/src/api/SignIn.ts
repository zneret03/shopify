import { app, db  } from '../middleware/middleware'

//signIn endpoint
export const signIn = app.post('/api/signIn', async(request : any, response : any) => {
    return await db.collection('user').doc(request.body.id).create({
        id: request.body.id,
        email : request.body.email,
        firstname : request.body.firstname,
        lastname : request.body.lastname
    }).then(() => {
        return response.status(200).send('successfully save');
    })
    .catch((error : any) => {
      return response.status(500).send(error.message)
    });
});