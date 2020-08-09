

export const totalAmount = (cartItems : any) => {
    return new Promise((resolve, reject)=>{
        if(cartItems){
           const total = cartItems.reduce((a : any, b : any) => a + b.Subtotal, 0);
           resolve(total);
        }else{  
            reject('No amount gettting');
        }
    })
}