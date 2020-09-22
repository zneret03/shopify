import React, { useEffect, useState, useContext } from "react";
import Header from "../components/private/Header";
import { app } from "../config/firebase";
import Card from "../utils/Card";
import Back from "../utils/Back";
import { HelpCircle } from "react-feather";
import { AuthContext } from "../auth/AuthProvider";
import { withRouter } from "react-router-dom";
import { filteredProduct } from "../utils/FilteredItems";
import { Popover } from "antd";
import DropdownComponent from "../components/Forms/DropdownComponent";

const CustomerOrders: React.FC = (props: any) => {
  const params = new URLSearchParams(props.location.search);
  const getId = params.get("id");
  const document = app.firestore();
  const [filter, setFilter] = useState<any[]>([]);
  const currentUser: any = useContext(AuthContext);

  //**Redirect uti customerOrder/OrderInformation */
  const redirectRequest = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    id: string
  ) => {
    event.preventDefault();
    id &&
      props.history.push(
        `/dashboard/order/customerOrder/OrderInformation?id=${id}&customerId=${getId}`
      );
  };

  /**Get Items Data from server */
  const onFetchItems = async (items: any) => {
    if (items) {
      const arrayItems = items.map(async (id: any) => {
        const fetchItems = document.collection("transaction").doc(id);
        const getDataItems = await fetchItems.get();
        if (getDataItems) {
          return { ...getDataItems.data(), id: getDataItems.id };
        }
      });

      const data = await Promise.all(arrayItems);
      setFilter(data);
    }
  };

  //**Get customer id */
  const fetchItems = () => {
    (async () => {
      const fetchItems = document.collection("customerInformation").doc(getId);
      const customerItemsData = await fetchItems.get();

      if (customerItemsData) {
        onFetchItems(customerItemsData.data().items);
      }
    })();
  };

  //*Render all id coming from URL query string*/
  useEffect(fetchItems, [getId]);

  //**Get products according to user owner ID */
  const filterProduct: any = filteredProduct(filter, currentUser);

  const tax_total = filterProduct.reduce(
    (a: any, b: any) => a + b.Subtotal * b.valueAddedTax,
    0
  );
  const subTotal = filterProduct.reduce((a: any, b: any) => a + b.Subtotal, 0);
  const total = subTotal - tax_total;

  const [sortingTypes, setSortingTypes] = useState([]);

  //**Sorted Data */
  const getSortData = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    type: string
  ) => {
    const map = {
      price: "Subtotal",
      product: "product",
      purpose: "purpose",
    };
    const sortTypes = map[type];

    const sorted = filterProduct.sort((a: any, b: any) => {
      if (sortTypes === "product" || sortTypes === "purpose") {
        if (a[sortTypes] < b[sortTypes]) {
          return -1;
        }
        if (a[sortTypes] > b[sortTypes]) {
          return 1;
        }
        return 0;
      } else {
        return b[sortTypes] - a[sortTypes];
      }
    });

    setSortingTypes(sorted);
  };

  const sortTypes = ["price", "product", "purpose"];

  const content = (
    <div>
      <span className="block">0.12 of vat is already </span>
      <span className="block">deducted to your</span>
      <span>total product sales</span>
    </div>
  );

  return (
    <Header pageName={`Customer Order`}>
      <Back path="/order" />
      <div className="flex items-center">
        <span className="text-lg mr-2">
          <strong>Total</strong> :{" "}
          <strong className="text-red-500">
            {total && total.toLocaleString()}
          </strong>
        </span>
        <Popover
          title="Notice"
          trigger="hover"
          content={content}
          className="mr-6 cursor-pointer hover:text-black"
        >
          <HelpCircle size="15" />
        </Popover>
        <DropdownComponent
          getSortData={(event, types) => getSortData(event, types)}
          sortTypes={sortTypes}
        />
      </div>
      <Card
        filteredItems={sortingTypes.length <= 0 ? filterProduct : sortingTypes}
        onClick={(
          event: React.MouseEvent<HTMLLIElement, MouseEvent>,
          id: string
        ) => redirectRequest(event, id)}
      />
    </Header>
  );
};

export default withRouter(CustomerOrders);
