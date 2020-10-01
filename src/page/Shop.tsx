import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import ReactTypingEffect from "react-typing-effect";

//** components
import Back from "../utils/Back";
import Filters from "../components/public/Filters";
import { ProductContext } from "../Context/ProductProvider";
import { onSearch, sorted } from "../utils/FilteredItems";
import Card from "../utils/Card";

const Shop: React.FC = (props: any) => {
  const { items } = useContext(ProductContext);
  // **const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState([]);

  // **Get query string
  const params: any = new URLSearchParams(props.location.search);
  const gender: string | null = params.get("gender");
  const productName: string | null = params.get("productName");
  const title: string | null = params.get("item");

  // **filter items return if product name is null
  let filteredItems = items.filter((item: any) => {
    if (productName) {
      return (
        item.product.toLowerCase().indexOf(productName.toLowerCase()) !== -1
      );
    } else {
      return item;
    }
  });

  const [badge, setBadge] = useState(true);

  // **badge
  const hideBadge = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (badge) {
      setBadge(false);
      props.history.push("/shop");
    }

    return setBadge(true);
  };

  const [sortedData, setSortedData] = useState([]);

  //*getting sorted data
  const getSortData = (
    event?: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    category?: string,
    element?: string
  ) => {
    event.preventDefault();

    const map = {
      price: "price",
      product: "product",
      purpose: "purpose",
    };
    const sortType = map[element];

    //*Sort by price, product and category
    if (category === undefined) {
      const sortedData = sorted(filteredItems, sortType);
      setSortedData(sortedData);
    }

    //*Sort by category
    if (element !== undefined && category !== undefined) {
      const sortedCategory = filteredItems.filter((obj: any) => {
        return obj.category.toLowerCase() === category.toLowerCase();
      });

      setSortedData(sortedCategory);
    }
  };

  //*fetch data when it match to the given query string
  const onQueryString = () => {
    if (gender) {
      const filteredGender = onSearch(gender, items);
      setFilter(filteredGender);
    } else if (title) {
      const filteredTitle = onSearch(title, items);
      setFilter(filteredTitle);
    } else {
      setFilter(filteredItems);
    }
  };

  // **render if items and queryString value changes
  useEffect(onQueryString, [gender || title, items]);

  const getProductId = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => {
    event.preventDefault();
    if (id) {
      props.history.push(`/shop/collection/the_merch/item?id=${id}`);
    }
  };

  //** get latest product Name each render
  const getProductNameParams = () => {
    productName && setFilter(filteredItems);
  };

  // **render if productName changes
  useEffect(getProductNameParams, [productName]);

  return (
    <div className="font-mono text-black">
      <div className="container mx-auto px-6 py-8">
        <Back path="/" />
        <div className="my-8">
          <span>
            <ReactTypingEffect
              className="uppercase text-3xl font-bold"
              speed={100}
              eraseDelay={500}
              typingDelay={200}
              text={
                gender || title
                  ? `$~${gender || title} Merch`
                  : "$~all products"
              }
            />
          </span>
          <span className="ml-3 text-gray-500">[{filter.length}]</span>
        </div>
        <div className="text-right lg:flex lg:items-center lg:justify-between">
          <div className="mb-3">
            <button
              onClick={(event) => hideBadge(event)}
              className={`${
                badge ? "block" : "hidden"
              } px-5 block bg-gray-300 rounded-sm text-sm hover:bg-red-500 hover:text-white`}
            >
              {gender || title}
            </button>
          </div>
        </div>
        <Filters
          getSortData={(event, category, element) =>
            getSortData(event, category, element)
          }
        />
        {filter.length <= 0 && (
          <div className="flex items-center justify-center mt-6 border bg-gray-200 px-8 py-2">
            Empty Merch :(
          </div>
        )}
        <Card
          filteredItems={sortedData.length <= 0 ? filter : sortedData}
          onClick={(
            event: React.MouseEvent<HTMLDivElement, MouseEvent>,
            id: string
          ) => getProductId(event, id)}
        />
      </div>
    </div>
  );
};

export default withRouter(Shop);
