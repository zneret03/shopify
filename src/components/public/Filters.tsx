import React, { useState, useContext } from "react";
import { CategoryContext } from "../../Context/CategoryProvider";
import FilterDropDown from "../public/FilterDropDown";

interface PropTypes {
  getSortData: (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    category: string,
    element: string
  ) => void;
}

const Filters: React.FC<PropTypes> = ({ getSortData }) => {
  const { fetchCategory } = useContext(CategoryContext);
  const [toggleCategory, setToggleCategory] = useState<boolean>(false);
  const [toggleSortBy, setToggleSortBy] = useState<boolean>(false);

  //* Toggle Filter dropdown
  const toggleDropdown = (event: any) => {
    event.preventDefault();
    const productCategory = event.target.id === "productCategory";
    const sortBy = event.target.id === "sortBy";

    if (sortBy) {
      !toggleSortBy ? setToggleSortBy(true) : setToggleSortBy(false);
      setToggleCategory(false);
    }

    if (productCategory) {
      !toggleCategory ? setToggleCategory(true) : setToggleCategory(false);
      setToggleSortBy(false);
    }
  };

  const sortBy = ["price", "product", "purpose"];

  return (
    <div className="border border-black">
      <div className="py-4 px-4 w-full">
        <div className="flex items-center justify-between">
          <div className="flex">
            <div>
              <FilterDropDown
                getSortData={(event, type, element) =>
                  getSortData(event, type, element)
                }
                toggleDropdown={(event) => toggleDropdown(event)}
                toggle={toggleCategory}
                itemArray={fetchCategory}
                textName="Product Category"
                className="sm:text-sm text-xs"
                id="productCategory"
              />
            </div>
          </div>
          <div>
            <FilterDropDown
              getSortData={(event, type, element) =>
                getSortData(event, type, element)
              }
              toggleDropdown={(event) => toggleDropdown(event)}
              toggle={toggleSortBy}
              itemArray={sortBy}
              textName="Sort by"
              className="sm:text-sm text-xs"
              id="sortBy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
