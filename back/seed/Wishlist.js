const Wishlist = require("../models/Wishlist");

const wishlistItem = [
  {
    _id: "65c2441232078478e340ab60",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e24602e12c44f5994508", // Omron BP Monitor
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "65c2441332078478e340ab64",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e24602e12c44f5994504", // First Aid Kit
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "65c2441532078478e340ab68",
    user: "65b8e564ea5ce114184ccb96",
    product: "65a7e24602e12c44f599450d", // Ashwagandha
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

exports.seedWishlist = async () => {
  try {
    await Wishlist.deleteMany({});
    await Wishlist.insertMany(wishlistItem);
    console.log("Wishlist seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
