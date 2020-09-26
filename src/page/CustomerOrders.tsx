import React, { useEffect, useState, useContext } from "react";
import { app } from "../config/firebase";
import { HelpCircle } from "react-feather";
import { Popover } from "antd";

//*Components
import Header from "../components/private/Header";
import Card from "../utils/Card";
import Back from "../utils/Back";
import { AuthContext } from "../auth/AuthProvider";
import { withRouter } from "react-router-dom";
import { filtered, sorted } from "../utils/FilteredItems";
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
  const filterProduct: any = filtered(filter, currentUser);

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
    event.preventDefault();
    const map = {
      price: "Subtotal",
      product: "product",
      purpose: "purpose",
    };
    const sortTypes = map[type];

    const sortedData = sorted(filterProduct, sortTypes);
    sortedData && setSortingTypes(sortedData);
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
      <Back path="/dashboard/order" />
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
