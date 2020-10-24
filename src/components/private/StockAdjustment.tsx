import React, { useState, useContext, useEffect } from "react";
import { Divider } from "antd";

//*Components
import { ProductContext } from "../../Context/ProductProvider";
import Header from "./Header";
import Back from "../../utils/Back";
import ProductCard from "./ProductCard";
import httpRequest from "../../api/httpRequest";
import Loading from "../private/Loading";

interface PropTypes {
  uid: string;
  id: string;
  remarks: string;
  action: string;
  qty: string;
  date_created: string;
  description: string;
}

const initialState: PropTypes = {
  uid: "",
  id: "",
  remarks: "",
  action: "",
  qty: "",
  date_created: "",
  description: "",
};

const StockAdjustment: React.FC = (props: any) => {
  const params = new URLSearchParams(props.location.search);
  const id = params.get("id");

  const { dispatch, fetchProd } = useContext(ProductContext);

  //*TODO : add or remove quantity */

  const [
    { uid, remarks, action, qty, date_created, description },
    setState,
  ] = useState(initialState);

  //*Get onChange event of every input */
  const onChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    event.preventDefault();
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    id && dispatch({ type: "fetchProduct", payload: { id } });
  }, [id, dispatch]);

  //**get all data and assign to each inputbox
  fetchProd &&
    fetchProd.map((product: any) => {
      return Object.assign(initialState, product);
    });

  const [message, setMessage] = useState({
    status: false,
    message: "",
    loading: false,
  });

  const loadingSpinner = () =>
    setMessage({ status: false, message: "", loading: true });

  //*Get all input data ang submit
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    loadingSpinner();

    const config = { uid, id, remarks, action, qty, date_created, description };
    httpRequest
      .post(
        "/.netlify/functions/index?name=stockAdjustment&&component=stockAdjustmentComponent",
        config
      )
      .then(() => {
        setMessage({
          status: true,
          message: "Done processing",
          loading: false,
        });

        setTimeout(() => {
          setMessage({ status: false, message: "", loading: false });
        }, 2000);
      });
  };

  return (
    <>
      {message.loading && <Loading />}
      <Header pageName="Stock Adjustment">
        <div className="md:flex md:items-center">
          <div className="md:w-1/2">
            <Back path="/dashboard/stockManagement/" />
            <div className="mb-3 text-gray-600">
              <span>Date Created : </span>
              <span>{date_created}</span>
            </div>
            <form onSubmit={(event) => onSubmit(event)}>
              <div className="grid sm:grid-cols-2 sm:gap-3">
                <div className="mb-3">
                  <span>User Identification</span>
                  <input
                    defaultValue={uid}
                    required
                    name="uid"
                    readOnly
                    onChange={(event) => onChange(event)}
                    className="border w-full py-1 px-3 rounded bg-gray-200"
                    type="text"
                  />
                </div>
                <div className="mb-3">
                  <span>Identification</span>
                  <input
                    defaultValue={id}
                    required
                    name="id"
                    onChange={(event) => onChange(event)}
                    readOnly
                    className="border w-full py-1 px-3 rounded bg-gray-200"
                    type="text"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 sm:gap-3">
                <div className="mb-3">
                  <span>Quantity</span>
                  <input
                    defaultValue={qty}
                    required
                    name="qty"
                    onChange={(event) => onChange(event)}
                    className="border w-full py-1 px-3 rounded"
                    type="number"
                  />
                </div>
                <div className="mb-3">
                  <span>Action</span>
                  <select
                    name="action"
                    className="border w-full py-2 px-3 bg-white rounded"
                    onChange={(event) => onChange(event)}
                    value={action}
                  >
                    <option value=""></option>
                    <option value="add">Add Quantity</option>
                    <option value="remove">Remove Quantity</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="mb-3">
                  <span>Remarks</span>
                  <input
                    defaultValue={remarks}
                    required
                    name="remarks"
                    onChange={(event) => onChange(event)}
                    className="border w-full py-1 px-3 rounded"
                    type="text"
                  />
                </div>
              </div>
              <div className="mb-1">
                <span>Description</span>
                <textarea
                  defaultValue={description}
                  required
                  name="description"
                  onChange={(event) => onChange(event)}
                  className="w-full border rounded px-2 py-1 bg-gray-200"
                  readOnly
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

export default StockAdjustment;
