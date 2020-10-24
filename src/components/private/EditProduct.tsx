import React, { useState, useEffect, useContext } from "react";
import { Divider } from "antd";
import Header from "./Header";
import { ProductContext } from "../../Context/ProductProvider";

//*Components
import httpRequest from "../../api/httpRequest";
import Loading from "./Loading";
import ProductCard from "./ProductCard";
import Back from "../../utils/Back";

interface productStateTypes {
  product: string;
  title: string;
  purpose: string;
  price: number;
  quantity: number;
  gender: string;
  description: string;
}

const initialState: productStateTypes = {
  product: "",
  title: "",
  purpose: "",
  price: 0,
  quantity: 0,
  gender: "",
  description: "",
};

const EditProduct: React.FC = (props: any) => {
  //input onChange

  const { dispatchProd, fetchProd } = useContext(ProductContext);

  const [
    { product, title, purpose, price, quantity, gender, description },
    setState,
  ] = useState(initialState);
  const params = new URLSearchParams(props.location.search);
  const id = params.get("id");

  //get input onChange
  const onChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    event.preventDefault();
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const [message, setMessage] = useState({
    status: false,
    message: "",
    loading: false,
  });

  const loadSpinner = () => {
    setMessage({ status: false, message: "", loading: true });
  };

  //update functions
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const items: productStateTypes = {
      product,
      title,
      purpose,
      price,
      quantity,
      gender,
      description,
    };

    loadSpinner();

    httpRequest
      .put(
        `/.netlify/functions/index?name=updateProduct&&component=productComponent&&productId=${id}`,
        items
      )
      .then(() => {
        setMessage({
          status: true,
          message: "successfully updated",
          loading: false,
        });

        setTimeout(() => {
          setMessage({ status: false, message: "", loading: false });
        }, 5000);
      });
  };

  useEffect(() => {
    id && dispatchProd({ type: "fetchProduct", payload: { id } });
  }, [id, dispatchProd]);

  //**get all data and assign to each inputbox
  fetchProd &&
    fetchProd.map((productState: any) => {
      return Object.assign(initialState, productState);
    });

  if (fetchProd.length <= 0) {
    return (
      <div className="h-screen w-screen md:pl-64 flex items-center justify-center">
        Loading
      </div>
    );
  }

  return (
    <>
      {message.loading && <Loading />}
      <Header pageName={"Edit Products"}>
        <div className="md:flex">
          <div className="md:w-1/2">
            <Back path="/dashboard/products/viewProducts" />
            <form onSubmit={(event) => onSubmit(event)}>
              <div className="grid sm:grid-cols-2 sm:gap-3">
                <div className="mb-3">
                  <span>Product Name</span>
                  <input
                    value={product}
                    required
                    name="product"
                    onChange={(event) => onChange(event)}
                    className="border w-full py-1 px-3 rounded"
                    type="text"
                  />
                </div>
                <div className="mb-3">
                  <span>Title</span>
                  <input
                    value={title}
                    required
                    name="title"
                    onChange={(event) => onChange(event)}
                    className="border w-full py-1 px-3  rounded"
                    type="text"
                  />
                </div>
              </div>
              <div className="mb-3">
                <span>Purpose</span>
                <input
                  value={purpose}
                  required
                  name="purpose"
                  onChange={(event) => onChange(event)}
                  className="border w-full py-1 px-3  rounded"
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="mb-3">
                  <span>Price</span>
                  <input
                    value={price}
                    required
                    pattern="[0-9]"
                    name="price"
                    onChange={(event) => onChange(event)}
                    className="border w-full py-1 px-3  rounded"
                    type="number"
                  />
                </div>
                <div className="mb-3">
                  <span>Gender</span>
                  {gender && (
                    <select
                      name="gender"
                      className="border w-full py-2 px-3 bg-white rounded"
                      defaultValue={gender}
                      onChange={(event) => onChange(event)}
                    >
                      <option value={gender}></option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Kids">Kids</option>
                    </select>
                  )}
                </div>
              </div>
              <div className="mb-1">
                <span>Description</span>
                <textarea
                  value={description}
                  onChange={(event) => onChange(event)}
                  required
                  name="description"
                  className="w-full border rounded px-2 py-1"
                  cols={30}
                  rows={3}
                />
              </div>
              {message.status ? (
                <div className="bg-green-400 w-full rounded text-center">
                  <p className="py-1 text-white">{message.message}</p>
                </div>
              ) : null}
              <Divider />
              <div className="flex justify-end items-end">
                <button className="px-4 py-1 rounded-sm bg-red-500 hover:bg-red-400 text-white">
                  Update
                </button>
              </div>
            </form>
          </div>
          <div className="md:w-1/2 flex md:justify-center justify-center">
            {fetchProd && <ProductCard dataObject={fetchProd} />}
          </div>
        </div>
      </Header>
    </>
  );
};

export default EditProduct;
