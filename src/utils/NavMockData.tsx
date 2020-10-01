const inventoryNavigation = [
  {
    name: "Critcal Variants",
    key: "criticalVaritans",
  },
  {
    name: "Top sales",
    key: "topSales",
  },
];

const publicNavigation = [
  {
    name: "Home",
    path: "/",
    className:
      "sm:mr-10 mr-5 border-b-2 py-4 border-white hover:border-black focus:border-black no-underline uppercase font-bold",
  },
  {
    name: "Men",
    path: "/shop?gender=men",
    className:
      "sm:mr-10 mr-5 border-b-2 py-4 border-white hover:border-black focus:border-black no-underline uppercase font-bold",
  },
  {
    name: "Women",
    path: "/shop?gender=women",
    className:
      "sm:mr-10 mr-5 border-b-2 py-4 border-white hover:border-black focus:border-black no-underline uppercase font-bold",
  },
  {
    name: "Kids",
    path: "/shop?gender=kids",
    className:
      "sm:mr-10 mr-5 border-b-2 py-4 border-white hover:border-black focus:border-black no-underline uppercase font-bold",
  },
  {
    name: "Policy",
    path: "/policies/refund-policy",
    className:
      "border-b-2 py-4 border-white hover:border-black focus:border-black no-underline uppercase",
  },
];

export { inventoryNavigation, publicNavigation };
