import React, { useState, useEffect } from "react";
import Zoom from "react-medium-image-zoom";
import { app } from "../config/firebase";
import Description from "../components/public/Description";
import Back from "../utils/Back";
import axios from "axios";
import { withRouter } from "react-router-dom";

interface productInfoType {
  size: string;
  quantity: number;
}

const productInfo: productInfoType = {
  size: "",
  quantity: 1,
};

const Collection: React.FC = (props: any) => {
  const [counter, setCounter] = useState({ count: productInfo.quantity });

  const params = new URLSearchParams(props.location.search);
  const id = params.get("id");
  const [item, setItem] = useState<object[]>([]);

  const [size, setSize] = useState(productInfo.size);

  const [message, setMessage] = useState({
    status: false,
    message: "",
    loading: false,
  });

  const loadSpinner = () => {
    setMessage({ status: false, message: "", loading: true });
  };

  //*Adding to cart and direct Buy
  const onSubmitEvent = (event: any, quantity: number) => {
    event.preventDefault();

    loadSpinner();

    if (quantity > counter.count) {
      item.map(async (item: any) => {
        const subTotal = item.price * counter.count;
        const statusColor = "#ff4444";

        //*event check for addToCart or buyItNow
        const addToCart = event.target.id === "AddToCart";
        const buyItNow = event.target.id === "buyItNow";

        const config: any = {
          uid: item.uid,
          productId: item.id,
          size: size,
          category: item.category,
          imageUrl: item.imageUrl,
          purpose: item.purpose,
          productName: item.product,
          Subtotal: subTotal,
          Totalquantity: counter.count,
          gender: item.gender,
          status: statusColor,
        };

        return onHttpsRequestPost(config)
          .then(() => {
            if (addToCart) {
              setMessage({
                status: true,
                message: "Successfully add to cart",
                loading: false,
              });
              setTimeout(() => {
                setMessage({ status: false, message: "", loading: false });
              }, 4000);
            }

            if (buyItNow) {
              props.history.push("/cart/checkOut");
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      });
    } else {
      setMessage({
        status: false,
        message: "unable to proceed im sorry :(",
        loading: false,
      });
    }
  };

  const onHttpsRequestPost = async (config: any) => {
    const {
      uid,
      productId,
      size,
      category,
      imageUrl,
      purpose,
      productName,
      Subtotal,
      Totalquantity,
      gender,
      status,
    } = config;

    const vat = 0.12;

    await axios({
      method: "POST",
      url: "/api/index?name=addCart",
      headers: { "Access-Control-Allow-Origin": "*" },
      data: {
        uid,
        productId,
        size,
        category,
        imageUrl,
        purpose,
        productName,
        Subtotal,
        vat,
        Totalquantity,
        gender,
        status,
      },
    });
  };

  useEffect(() => {
    if (id) {
      const document = app.firestore().collection("product").doc(id);
      return document.onSnapshot((snapshot) => {
        const items_array: object[] = [];
        if (snapshot) {
          items_array.push({ ...snapshot.data(), id: snapshot.id });
          setItem(items_array);
        }
      });
    }
  }, [id]);

  const counterHandle = (event: any) => {
    event.preventDefault();

    if (event.target.id === "increment") {
      setCounter({ count: counter.count + 1 });
      setMessage({ status: false, message: "", loading: false });
    }

    if (event.target.id === "decrement") {
      if (counter.count < 1) {
        setCounter({ count: counter.count });
      } else {
        setCounter({ count: counter.count - 1 });
        setMessage({
          status: true,
          message: "Quantity should'nt be negative",
          loading: false,
        });
      }
    }
  };

  const centerElement = "h-screen w-screen flex justify-center items-center";

  if (item.length <= 0) {
    return <div className={centerElement}>Loading...</div>;
  }

  if (message.loading) {
    return <div className={centerElement}>Loading...</div>;
  }

  return (
    <>
      <div className="container mx-auto lg:px-20 px-5 py-10">
        <Back path="/shop" />
        {item &&
          item.map((product: any, index: number) => (
            <div className="lg:flex" key={index}>
              <div className="lg:w-1/2">
                <div>
                  <Zoom>
                    <img
                      className="sm:w-8/12 sm:h-8/12 object-contain mx-auto"
                      src={product.imageUrl}
                      alt=""
                    />
                  </Zoom>
                </div>
              </div>
              <div className="lg:w-1/2 ml-5">
                <form>
                  <span className="text-3xl font-bold">{product.product}</span>
                  <span className="text-xl font-bold block">
                    ₱{product.price && product.price.toLocaleString()}
                  </span>
                  <div className="md:flex mt-5">
                    <div className="w-full">
                      <span>Size</span>
                      <select
                        name="size"
                        value={size}
                        onChange={(event) => setSize(event.target.value)}
                        className="border py-2 px-2 w-full bg-white"
                      >
                        <option value=""></option>
                        {product.size &&
                          product.size.map((size: any) => (
                            <>
                              <option value={size}>{size}</option>
                            </>
                          ))}
                      </select>
                    </div>
                    <div className="w-full md:pl-8">
                      <span>Quantity</span>
                      <div className="flex">
                        <button
                          id="decrement"
                          className="border md:py-2 px-4 px-2"
                          onClick={(event) => counterHandle(event)}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={counter.count}
                          readOnly
                          required
                          className="border py-2 w-full mx-auto text-center"
                        />
                        <button
                          id="increment"
                          className="border md:py-2 px-4 px-2"
                          onClick={(event) => counterHandle(event)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${
                      message.status ? "bg-green-500" : "bg-red-500"
                    } text-center py-1 rounded bg-red-500 my-2`}
                  >
                    <span className="text-white text-sm">
                      {message.message}
                    </span>
                  </div>
                  <div className="mt-5">
                    <button
                      onClick={(event) =>
                        onSubmitEvent(event, product.quantity)
                      }
                      type="button"
                      id="AddToCart"
                      className="rounded-sm border border-black py-2 w-full uppercase tracking-wider font-bold hover:text-gray-600"
                    >
                      Add Cart
                    </button>
                  </div>
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={(event) =>
                        onSubmitEvent(event, product.quantity)
                      }
                      id="buyItNow"
                      className="rounded-sm tracking-wider py-2 w-full uppercase tracking-wider font-bold bg-gray-900 text-white hover:bg-gray-700"
                    >
                      Buy it now
                    </button>
                  </div>
                </form>
                <Description
                  description={product.description}
                  gender={product.gender}
                  productName={product.product}
                />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default withRouter(Collection);
