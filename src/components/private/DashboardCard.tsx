import React, { ReactNode } from "react";

interface PropTypes {
  icon: ReactNode;
  title: string;
  numberData: any;
  iconColor: string;
  cardColor: string;
}

const DashboardCard: React.FC<PropTypes> = ({
  icon,
  title,
  numberData,
  iconColor,
  cardColor,
}) => {
  return (
    <>
      <section
        className={`${cardColor} text-white shadow-lg rounded-sm px-6 py-4`}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm">{title}</div>
          </div>
          <div className={`${iconColor} py-2 px-2 rounded-full`}>{icon}</div>
        </div>
        <div className="text-xl uppercase font-bold">{numberData}</div>
      </section>
    </>
  );
};

export default DashboardCard;
