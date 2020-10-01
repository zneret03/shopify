//*New arrival
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const pharagraph = [
  {
    paragraph:
      " We have a 14-day return policy, which means you have 14 days after receiving your item to request a return.",
  },
  {
    paragraph:
      "To be eligible for a return, your item must be in the samecondition that you received it, unworn or unused, " +
      "with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.",
  },
  {
    Link: "admin@developer.com",
    paragraph:
      "To start a return, you can contact us at" +
      "If your return is accepted, you will need to self-ship to return" +
      "items back to us with any carrier of your choosing, with this" +
      "option no deductions are made if a refund is issued.",
  },
  {
    paragraph:
      "Items sent back to us without first requesting a return will not be accepted.",
  },
  {
    Link: "admin@developer.com",
    paragraph: "You can always contact us for any return question at",
  },
  {
    title: "Exchanges",
    paragraph:
      "We currently don't offer exchanges. To make our returns process as easy as possible, we only offer refunds.",
  },
  {
    title: "Refunds",
    paragraph:
      "We will notify you once we’ve received and inspected your return," +
      "and let you know if the refund was approved or not. If approved," +
      "you’ll be automatically refunded on your original payment method." +
      "Please remember it can take some time for your bank or credit card" +
      "company to process and post the refund too.",
  },
  {
    title: "Damages and issues",
    paragraph:
      " Please inspect your order upon reception and contact us" +
      "immediately if the item is defective, damaged or if you receive" +
      "the wrong item, so that we can evaluate the issue and make it right.",
  },
];

const shoesInformation = [
  {
    id: 1,
    title: "THE NEW UNIFORIA",
    slogan: "Kick start",
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
    name: "superstar",
    redirect: "/shop?item=superstar",
  },
  {
    id: 2,
    image: "Shoes2.png",
    name: "rookie",
    redirect: "/shop?item=rookie",
  },
  {
    id: 3,
    image: "4kd.png",
    name: "ultraboost",
    redirect: "/shop?item=ultraboost",
  },
  {
    id: 4,
    image: "Clothing.png",
    name: "clothing",
    redirect: "/shop?item=clothing",
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

export { shoesInformation, shoes, CategoryInformation, months, pharagraph };
