import React, {useState, useEffect} from 'react';
import Zoom from 'react-medium-image-zoom';
import {app} from '../../config/firebase';
import Description from './Description';
import Back from '../../utils/Back';

interface productInfoType {
    size : string,
    quantity : number,
    status : boolean
}

const productInfo : productInfoType = {
    size : '',
    quantity : 1,
    status : false
}

const Collection: React.SFC = (props : any) => {

    const [counter, setCounter] = useState({count : productInfo.quantity, status : productInfo.status});

    const params = new URLSearchParams(props.location.search);
    const id = params.get('id');
    const [item, setItem] = useState<object[]>([]);

    const [size, setSize] = useState(productInfo.size);

    const submitEvent = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log({size, counter});
    }

    useEffect(() => {
          if(id){
              const document = app.firestore().collection('product').doc(id);
              return document.onSnapshot((snapshot) => {
                  const items_array : object[] = []
                  if(snapshot){
                      items_array.push({...snapshot.data()});
                      setItem(items_array);
                  }
              });
          }
    }, [id])

    const counterHandle = (event : any) => {
        event.preventDefault();

        if(event.target.id === "increment"){
            setCounter({count : counter.count + 1, status : false});
        }

        if(event.target.id === "decrement"){
            if(counter.count < 1){
               setCounter({count : counter.count, status : true})
            }else{
                setCounter({count : counter.count - 1, status : false});
            }
        }
    }


    if(item.length <= 0){
        return <div className="h-screen w-screen flex justify-center items-center">Loading...</div>
    }

    return(
       <>
       <div className="container mx-auto px-20 py-10">
            <Back path="/shop"/>
           {item && item.map((product : any, index) => (
                    <div className="lg:flex" key={index}>
                       <div className="lg:w-1/2">
                           <div >
                           <Zoom>
                               <img className="sm:w-8/12 sm:h-8/12 object-contain mx-auto"
                               src={product.imageUrl}
                               alt=""/>
                           </Zoom>
                           </div>
                           </div>
                       <div className="lg:w-1/2 ml-5">
                       <form  onSubmit={(event) => submitEvent(event)}>
                           <span className="text-3xl font-bold">{product.product}</span>
                           <span className="text-xl font-bold block">₱{product.price.toLocaleString()}</span>
                           <div className="flex mt-5">
                             <div className="w-full">
                             <span>Size</span>
                             <select name="size" onChange={(event) => setSize(event.target.value)} 
                             className="border py-2 px-2 w-full bg-white">
                                   <option value=""></option>
                                   <option value="S">S</option>
                                   <option value="M">M</option>
                                   <option value="L">L</option>
                                   <option value="XL">XL</option>   
                                   <option value="2XL">2XL</option>
                                   <option value="3XL">3XL</option>
                                   <option value="4XL">4XL</option>
                               </select>
                             </div>
                             <div className="w-full pl-8">
                             <span>Quantity</span>
                              <div className="flex">
                              <button id="decrement" className="border py-2 px-4"  onClick={(event) => counterHandle(event)}>-</button>
                              <input type="text" value={counter.count} required className="border py-2 mx-auto text-center"/>
                              <button id="increment" className="border py-2 px-4" onClick={(event) => counterHandle(event)}>+</button>
                              </div>
                             </div>
                           </div>
                           {counter.status && (
                           <div className="text-center py-1 rounded bg-red-500 my-2">
                                   <span className="text-white text-sm">Quantity should'nt be negative</span>
                           </div>
                            )}
                           <div className="mt-5">
                               <button className="rounded-sm border border-black py-2 w-full uppercase tracking-wider font-bold hover:text-gray-600">Add Cart</button>
                           </div>
                           <div className="mt-3">
                               <button 
                               className="rounded-sm tracking-wider py-2 w-full uppercase tracking-wider font-bold bg-gray-900 text-white hover:bg-gray-700">
                                   Buy it now
                               </button>
                           </div>  
                           </form> 
                           <Description description={product.description} gender={product.gender} productName={product.product}/>
                       </div> 
                    </div>
           ))}
        </div>
       </>
    )
}

export default Collection;