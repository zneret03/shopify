import React, { useContext, useState } from "react";
import { Divider } from "antd";
import { AuthContext } from "../../auth/AuthProvider";
import { getuserUid } from "../../utils/FilteredItems";
import { app } from "../../config/firebase";
interface Props {
  children: React.ReactNode;
  pageName: string;
}

const Header: React.SFC<Props> = ({ children, pageName }) => {
  const currentUser: any = useContext(AuthContext);

  const [name, setName] = useState(null);
  getuserUid(currentUser, app).then((data: any) => {
    data && setName(data);
  });

  return (
    <div className="container mx-auto sm:px-1 px-8 lg:pl-64 py-6">
      <div className="flex sm:items-center sm:justify-between sm:flex-row flex-col">
        <span className="font-bold text-2xl">{pageName}</span>
        <div className="text-xl font-segoe-UI">
          <span>Welcome to Shopify </span>
          <span className="py-1 px-2 bg-black text-white rounded-sm">
            {name || currentUser.displayName ? (
              <span>{name || currentUser.displayName}</span>
            ) : (
              "loading"
            )}
          </span>
        </div>
      </div>
      <Divider />
      <div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Header;
