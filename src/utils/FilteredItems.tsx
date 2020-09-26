//**Table sorting */
export const sortTypes = ["descend", "ascend"];
export const sortString = (a: any, b: any) => (a.product < b.product ? 1 : -1);
export const sortNumber = (a: any, b: any) => b.price - a.price;

//**return all pending items
export const pendingItems = (cartItems: any) => {
  return cartItems.filter((obj: any) => {
    return obj.status.itemStatus === "pending";
  });
};

//**return filtered items according to gender in shop */
export const filterItems = (items: any, gender: string) => {
  return items.filter((obj: any) => {
    return obj.gender.toLowerCase() === gender.toLowerCase();
  });
};

//**filtered items according to user authentication */
export const filtered = (productItems: any, currentUseriId: any) => {
  return productItems.filter((obj: any) => {
    return obj.uid === currentUseriId.uid;
  });
};

//**Returning match search value from server */
export const onSearch = (value: any, items: any) => {
  return items.filter((customerInfo: any) => {
    return Object.keys(customerInfo).some((key: any) => {
      return String(customerInfo[key])
        .toLowerCase()
        .includes(value.toLowerCase());
    });
  });
};

//**Return new set of array according to current user id */
export const newCustomerArray = (customerInfo: any, currentUser: any) => {
  customerInfo.forEach((element: any) => {
    element.uid = element.uid.filter((search: any) =>
      search.id.includes(currentUser.uid)
    );
  });
  let newArray = customerInfo.filter((element: any) => element.uid.length);
  return newArray;
};

//**Get current user full name */
export const getuserUid = (currentUser: any, app: any) => {
  return new Promise(async (resolve) => {
    if (Object.keys(currentUser).length > 0) {
      const document = app.firestore().collection("user").doc(currentUser.uid);
      const userInformation = await document.get();
      return resolve(
        `${userInformation.data().firstname} ${userInformation.data().lastname}`
      );
    }
  });
};

//* return numerica and alphabetical sorted data
export const sorted = (filterProduct: any, sortTypes: any) => {
  const sortedData = filterProduct.sort((a: any, b: any) => {
    if (sortTypes === "product" || sortTypes === "purpose") {
      return a[sortTypes] === b[sortTypes]
        ? 0
        : a[sortTypes] > b[sortTypes]
        ? 1
        : -1;
    } else {
      return b[sortTypes] - a[sortTypes];
    }
  });

  return sortedData;
};
