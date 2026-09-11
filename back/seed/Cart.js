const Cart = require("../models/Cart");

const cartItems = [
  {
    _id: "65c357fe2f21c40d167c276b",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e24602e12c44f5994502", // Paracetamol
    quantity: 2,
  },
  {
    _id: "65c3581d2f21c40d167c278f",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e24602e12c44f5994505", // Dettol Antiseptic
    quantity: 1,
  }
];

exports.seedCart = async () => {
  try {
    await Cart.deleteMany({});
    await Cart.insertMany(cartItems);
    console.log("Cart seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
