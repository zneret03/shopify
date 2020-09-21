import React, { useState, useContext, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Header from "./Header";
import { app } from "../../config/firebase";
import { AuthContext } from "../../auth/AuthProvider";
import Loading from "./Loading";
import axios from "axios";
import { Trash } from "react-feather";

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

const AddProduct: React.FC = () => {
  const context = useContext(AuthContext);
  const data: object[] = [];
  data.push(context);

  const [myFile, setMyFile] = useState<any[]>([]);

  //put file in a state so that we have access to remove it
  const onDrop = useCallback(
    (acceptedFiles: any[]) => {
      if (myFile.length > 0) {
        setMessage({
          status: true,
          message: "Invalid Approach!!!",
          loading: false,
        });
      } else {
        setMyFile([...myFile, ...acceptedFiles]);
      }
    },
    [myFile]
  );

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragActive,
    isDragReject,
  } = useDropzone({ accept: "image/png", onDrop });

  //fetch file display as list
  const files: any = myFile.map((file) => {
    return (
      <li
        className="py-1 px-2 max-w-sm bg-blue-300 rounded mb-1"
        key={file.name}
      >
        <div className="flex items-center justify-between">
          <span className="text-white text-sm">
            {file.name} - {file.size}
          </span>
          <button type="button" onClick={() => handleDeleteFile(myFile)}>
            <Trash size="22" color="#FFF" className="cursor-pointer" />
          </button>
        </div>
      </li>
    );
  });

  //delete specific product item
  const handleDeleteFile = (file: any) => {
    const specific_file = [...file];
    specific_file.length > 0 && specific_file.splice(file, 1);
    setMyFile(specific_file);
  };

  //remove file from state
  const removeFile = () => {
    if (myFile) {
      const newFiles = [...myFile];
      newFiles.splice(newFiles.indexOf(files), 1);
      setMyFile(newFiles);
    }
  };

  //input onChange
  const [
    { product, title, purpose, price, quantity, gender, description },
    setState,
  ] = useState(initialState);

  const [message, setMessage] = useState({
    status: false,
    message: "",
    loading: false,
  });
  const [size, setSize] = useState<any>([]);

  const clearState = () => {
    setState({ ...initialState });
    setSize([]);
  };

  //removing and adding input fields dynamically
  const buttonEventHandle = (event: any) => {
    event.preventDefault();

    //get all the data in array
    const sizeArr = [...size];
    if (event.target.id === "decrementInputs") {
      if (size.length !== 0) {
        //remove data 1 by 1
        sizeArr.splice(size, 1);
        setMessage({ status: false, message: "", loading: false });
        setSize(sizeArr);
      }
    }

    if (event.target.id === "incrementInput") {
      if (size.length < 6) {
        setSize([...size, ""]);
      } else {
        setMessage({
          status: true,
          message: "Not more than 6 inputs",
          loading: false,
        });
      }
    }
  };

  //**Input change event */
  const onChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    event.preventDefault();
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  //**Get size change event */
  const sizeOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    event.preventDefault();
    size[index] = event.target.value;
    //setting all the change event from input
    setSize([...size]);
  };

  //**get UserUid
  const getUserUId = () => {
    return new Promise((resolve, reject) => {
      if (data.length > 0) {
        data.forEach((user: any) => {
          resolve(user.uid);
        });
      } else {
        reject({
          message: "empty array",
        });
      }
    });
  };

  const loadSpinner = () => {
    setMessage({ status: false, message: "", loading: true });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log({product, title, purpose, price, quantity, gender, description, size});

    //Load Spinner
    loadSpinner();

    getUserUId()
      .then((data) => {
        acceptedFiles.map(async (file) => {
          if (file) {
            let today = new Date();
            let date = `${today.getMonth()} ${today.getDay()}, ${today.getFullYear()}`;

            const storageRef = app.storage().ref();
            const fileRef = storageRef.child(`Product/${file.name}`);
            await fileRef.put(file);
            await fileRef
              .getDownloadURL()
              .then((imageUrl) => {
                if (imageUrl) {
                  const config = { date, imageUrl, data, file: file.name };
                  uploadeFileHttpsRequest(config);
                }
              })
              .catch((error) => {
                console.log(error.message);
              });
          }
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const uploadeFileHttpsRequest = (config: any) => {
    const { date, imageUrl, data, file } = config;
    const prod: string = product.toLowerCase();
    const purp: string = purpose.toLowerCase();
    axios({
      method: "POST",
      url: "/api/index?name=addProduct",
      headers: { "Access-Control-Allow-Origin": "*" },
      data: {
        uid: data,
        fileName: file,
        product: prod,
        title: title,
        purpose: purp,
        price: price,
        quantity: quantity,
        imageUrl: imageUrl,
        date: date,
        gender: gender,
        description,
        size,
      },
    })
      .then((response: any) => {
        if (response) {
          setMessage({
            status: true,
            message: response.data.message,
            loading: false,
          });
          setMessage({
            status: false,
            message: "Successfully Inserted",
            loading: false,
          });
          setTimeout(() => {
            clearState();
            removeFile();
            setMessage({ status: false, message: "", loading: false });
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      {message.loading && <Loading />}
      <Header pageName={"Add Products"}>
        <p
          className={`${
            message.status ? "bg-red-500" : "bg-green-500"
          } text-center py-1 rounded text-white`}
        >
          {message.message}
        </p>
        <div>
          <form className="lg:flex" onSubmit={(event) => onSubmit(event)}>
            {/**Start */}
            <div className="lg:w-1/2 mr-5">
              <div className="grid sm:grid-cols-3 sm:gap-3">
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
              </div>
              <div className="grid grid-cols-3 gap-3">
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
                  <span>Quantity</span>
                  <input
                    value={quantity}
                    required
                    pattern="[0-9]"
                    name="quantity"
                    onChange={(event) => onChange(event)}
                    className="border w-full py-1 px-3  rounded"
                    type="number"
                  />
                </div>
                <div className="mb-3">
                  <span>Gender</span>
                  <select
                    name="gender"
                    className="border w-full py-2 px-3 bg-white rounded"
                    value={gender}
                    onChange={(event) => onChange(event)}
                  >
                    <option value=""></option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-6 sm:gap-3">
                {size.map((size: any, index: number) => {
                  return (
                    <div className="mb-3 relative" key={index}>
                      <input
                        value={size}
                        required
                        name="size"
                        onChange={(event) => sizeOnChange(event, index)}
                        className="border w-full py-1 px-3 rounded uppercase"
                        maxLength={5}
                        placeholder="Size"
                        type="text"
                      />
                    </div>
                  );
                })}
              </div>
              <div>
                <span>Description</span>
                <textarea
                  value={description}
                  onChange={(event) => onChange(event)}
                  required
                  name="description"
                  className="w-full border rounded px-2 py-1"
                  cols={30}
                  rows={7}
                />
              </div>
              <div className="flex justify-end items-end mt-3">
                <button
                  id="decrementInputs"
                  onClick={(event) => buttonEventHandle(event)}
                  className={`${
                    size.length > 0 ? "block" : "hidden"
                  } px-3 py-1 rounded-full bg-red-500 hover:bg-red-400 text-white mr-2`}
                >
                  -
                </button>
                <button
                  id="incrementInput"
                  onClick={(event) => buttonEventHandle(event)}
                  className="px-3 py-1 rotate-45 rounded-full bg-red-500 hover:bg-red-400 text-white"
                >
                  +
                </button>
              </div>
            </div>
            {/*end*/}
            <div className="lg:w-1/2">
              <div className="mt-6">
                <div {...getRootProps({ className: "dropzone" })}>
                  <div className="flex items-center justify-center bg-gray-200 py-32 border-dashed border-4 cursor-pointer">
                    <input {...getInputProps()} />
                    {!isDragActive && (
                      <p className="text-center">
                        Drag 'n' drop some image here, or click to select files
                      </p>
                    )}
                  </div>
                  <div className="mt-3">
                    {isDragAccept && (
                      <p className="text-center py-1 bg-green-500 rounded text-white">
                        You got it right brotho
                      </p>
                    )}
                    {isDragReject && (
                      <p className="text-center py-1 bg-red-500 rounded text-white">
                        This image is not allowed
                      </p>
                    )}
                  </div>
                </div>
                <aside className="mt-2">
                  <h4>Files</h4>
                  <ul>{files}</ul>
                </aside>
              </div>
              <div className="flex justify-end items-end">
                <button
                  type="submit"
                  className="px-4 py-1 rounded-sm bg-red-500 hover:bg-red-400 text-white"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </Header>
    </>
  );
};

export default AddProduct;
