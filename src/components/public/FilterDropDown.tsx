import React from "react";
import { ChevronDown, ChevronRight } from "react-feather";

interface PropType {
  toggleDropdown: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  getSortData: (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    category: string,
    element: string
  ) => void;
  className: string;
  toggle: boolean;
  itemArray: any;
  textName: string;
  id: string;
}

const FilterDropDown: React.FC<PropType> = ({
  toggleDropdown,
  className,
  toggle,
  itemArray,
  textName,
  id,
  getSortData,
}) => {
  return (
    <div className="inline-block px-2 relative">
      <div className="flex cursor-pointer">
        <span className={className} id={id} onClick={toggleDropdown}>
          {textName}
        </span>
        {toggle ? (
          <i className="ml-2">
            <ChevronDown size="20" />
          </i>
        ) : (
          <i className="ml-2">
            <ChevronRight size="20" />
          </i>
        )}
      </div>
      <div
        className={`${
          toggle ? "block" : "hidden"
        } origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg z-50`}
      >
        <div className="rounded-md bg-white shadow-xs">
          {itemArray.map((element: any, index: number) => (
            <span
              key={index}
              className="block cursor-pointer px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
              onClick={(event) => getSortData(event, element.category, element)}
            >
              {element.category || element}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterDropDown;
