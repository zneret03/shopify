//*New arrival
const shoesInformation = [
  {
    id: 1,
    title: "THE NEW UNIFORIA",
    slogan: "KICK START",
    image: "nike1.png",
    buttonName: "SHOP NOW",
    redirect: "/shop",
  },
  {
    id: 2,
    title: "4KD RUN",
    slogan: "FEEL THE FUTURE",
    image: "nike2.png",
    buttonName: "SHOP 4KD",
    redirect: "/shop",
  },
];

//*Items
const shoes = [
  {
    id: 1,
    image: "Shoes1.png",
    name: "superstart",
    redirect: "/shop",
  },
  {
    id: 2,
    image: "Shoes2.png",
    name: "rookie",
    redirect: "/shop",
  },
  {
    id: 3,
    image: "4kd.png",
    name: "ultraboost",
    redirect: "/shop",
  },
  {
    id: 4,
    image: "Clothing.png",
    name: "clothing",
    redirect: "/shop",
  },
];

//*Category
const CategoryInformation = [
  {
    id: 1,
    image: "Mens.jpg",
    buttonName: "mens",
    redirect: "shop?gender=men",
  },
  {
    id: 2,
    image: "Women.jpg",
    buttonName: "women",
    redirect: "shop?gender=women",
  },
  {
    id: 3,
    image: "Kids.jpg",
    buttonName: "Kids",
    redirect: "shop?gender=kids",
  },
];

export { shoesInformation, shoes, CategoryInformation };
