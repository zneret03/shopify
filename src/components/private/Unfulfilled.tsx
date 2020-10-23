import React, { useContext, useState, useEffect } from "react";
import { notification } from "antd";
import { Trash2 } from "react-feather";

//*Components
import httpRequest from "../../api/httpRequest";
import { CartContext } from "../../Context/CartProvider";
import { filterTotal, sorted } from "../../utils/FilteredItems";
import Card from "../../utils/Card";
import DropdownComponent from "../Forms/DropdownComponent";

const Unfulfilled = () => {
  const { unfulfilled } = useContext(CartContext);
  const total = filterTotal(unfulfilled);

  const [sortingTypes, setSortingTypes] = useState([]);

  //**Pop up notification */
  const onNotification = (message: string, description: string, icon: any) => {
    notification.open({
      message: message,
      description: description,
      icon: icon,
    });
  };

  //**Delete items*/
  const deleteProduct = async (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    id: string
  ) => {
    event.preventDefault();
    await httpRequest.delete(
      "/api/index?name=deleteUnfulfilled&&component=unfulfilledComponent",
      { id }
    );
    onNotification(
      "Notice",
      "Successfully Deleted",
      <Trash2 size="25" color="#ff4444" />
    );
  };

  useEffect(() => {
    onNotification(
      "Notice",
      "Click to delete items",
      <Trash2 size="25" color="#ff4444" />
    );
  }, []);

  //**Sorted Data */
  const getSortData = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    type: string
  ) => {
    event.preventDefault();
    const map = {
      price: "Subtotal",
      product: "product",
      purpose: "purpose",
    };
    const sortTypes = map[type];

    const sortedData = sorted(unfulfilled, sortTypes);
    sortedData && setSortingTypes(sortedData);
  };

  const sortTypes = ["price", "product", "purpose"];

  return (
    <>
      <div>
        {unfulfilled.length > 0 ? (
          <>
            <div className="flex items-center">
              <span className="text-lg mr-5">
                <strong>Total </strong> :{" "}
                <strong className="text-red-500">
                  {total && total.toLocaleString()}
                </strong>
              </span>
              <DropdownComponent
                getSortData={(event, types) => getSortData(event, types)}
                sortTypes={sortTypes}
              />
            </div>
            <Card
              filteredItems={
                sortingTypes.length <= 0 ? unfulfilled : sortingTypes
              }
              onClick={(
                event: React.MouseEvent<HTMLLIElement, MouseEvent>,
                id: string
              ) => deleteProduct(event, id)}
            />
          </>
        ) : (
          <div className="text-center">
            <span>Empty Unfulfilled Items</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Unfulfilled;
