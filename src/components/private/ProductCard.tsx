import React from "react";

interface PropTypes {
  dataObject: Object[];
}

const ProductCard: React.FC<PropTypes> = ({ dataObject }) => {
  return (
    <>
      {dataObject &&
        dataObject.map((product: any, index: number) => (
          <div className="border mt-5 mr-2" key={index}>
            <div className="py-8 px-12 bg-gray-200">
              <img
                className="sm:w-64 sm:h-64 object-contain mx-auto"
                src={product.imageUrl}
                alt=""
              />
            </div>
            <div className="px-4 py-2 font-segoe-UI">
              <span className="block text-xs text-gray-600 mb-4">
                {product.purpose}
              </span>
              <span className="block text-xs uppercase tracking-wide">
                {product.product}
              </span>
              <div className="flex items-center justify-between">
                <span className="text-black text-xs text-gray-800">
                  ₱{product.price.toLocaleString()}
                </span>
                <span className="block text-xs text-gray-600 uppercase">
                  {product.gender}
                </span>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default ProductCard;
