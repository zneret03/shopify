import React from "react";

interface PropTypes {
  pending: Object[];
  deleteCartItems: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => void;
}

const CartCard: React.FC<PropTypes> = ({ pending, deleteCartItems }) => {
  return (
    <div className="grid grid-rows gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {pending.map(
        (items: any, index: number) =>
          items.quantity > 0 && (
            <div
              className={`${
                items.status.color === "#ff4444" ? "block" : "hidden"
              } border`}
              key={index}
            >
              <div className="bg-gray-200 py-6 px-6 relative">
                <div className="absolute top-0 right-0 px-2">
                  <button onClick={(event) => deleteCartItems(event, items.id)}>
                    x
                  </button>
                </div>
                <img
                  className="w-40 h-40 object-contain mx-auto"
                  src={items.imageUrl}
                  alt=""
                />
              </div>
              <div className="px-4 py-2 font-segoe-UI">
                <div className="flex justify-between">
                  <span className="block text-xs text-gray-600 mb-4">
                    {items.purpose}
                  </span>
                  <div
                    className="rounded-full bg-gray-500 h-2 w-2 mt-2"
                    style={{ backgroundColor: items.status.color }}
                  ></div>
                </div>
                <span className="block text-xs   text-gray-600 uppercase tracking-wide mb-1">
                  {items.productName}
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-black text-xs text-gray-800">
                    ₱{items.Subtotal.toLocaleString()}
                  </span>
                  <span className="block text-xs text-gray-800 uppercase">
                    {items.gender}
                  </span>
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default CartCard;
