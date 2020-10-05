import React from "react";
import { pharagraph } from "../utils/mockData";
const Policy = () => {
  const redirectEmail = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    window.location.href = "mailto:admin@yahoo.com";
  };

  return (
    <div className="flex justify-center">
      <div className="mt-6 text-center">
        <span className="text-4xl text-black font-bold">Refund Policy</span>
        <section className="max-w-lg text-left mt-5 text-gray-800">
          {pharagraph.map((p: any) => (
            <>
              <strong className="text-black">{p.title}</strong>
              <p>
                {p.paragraph}
                <button
                  onClick={(event) => redirectEmail(event)}
                  className="underline ml-1 text-gray-800 hover:text-gray-600"
                >
                  {p.Link}{" "}
                </button>
              </p>
            </>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Policy;
