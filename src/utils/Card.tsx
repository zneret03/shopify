import React from "react";
import { withRouter } from "react-router-dom";
import Flipmove from "react-flip-move";

interface PropsType {
  filteredItems: object[];
  onClick?: (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    id: string
  ) => void;
}

const Card: React.FC<PropsType> = ({ filteredItems, onClick }) => {
  return (
    <Flipmove
      typeName="ul"
      className="grid grid-rows md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {filteredItems.map(
        (item: any) =>
          item.quantity > 0 && (
            <li
              className="border mt-5 mr-2 cursor-pointer"
              key={item.id}
              onClick={(event) => onClick(event, item.id)}
            >
              <div className="py-6 px-12 bg-gray-200">
                <img
                  className="sm:w-64 sm:h-64 object-contain mx-auto"
                  src={item.imageUrl}
                  alt=""
                />
              </div>
              <div className="px-4 py-2 font-segoe-UI">
                <div className="flex items-center justify-between">
                  <span className="block text-xs text-gray-600 mb-4 uppercase">
                    {item.purpose}
                  </span>
                  {item.status !== undefined ? (
                    <span
                      className="rounded-full bg-gray-500 h-2 w-2 mb-3"
                      style={{ backgroundColor: item.status["color"] }}
                    ></span>
                  ) : (
                    <span className="block text-xs text-gray-600 mb-4">
                      {item.quantity}
                    </span>
                  )}
                </div>
                <span className="block text-xs text-gray-600 uppercase tracking-wide mb-1">
                  {item.product}
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-black text-xs text-gray-800">
                    ₱
                    {item.price === undefined
                      ? item.Subtotal.toLocaleString()
                      : item.Subtotal === undefined &&
                        item.price.toLocaleString()}
                  </span>
                  <span className="block text-xs text-gray-800 uppercase">
                    {item.gender}
                  </span>
                </div>
              </div>
            </li>
          )
      )}
    </Flipmove>
  );
};

export default withRouter(Card);
