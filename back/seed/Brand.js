const Brand = require("../models/Brand");

const brands = [
  { _id: "65a7e24602e12c44f5994401", name: "Pfizer" },
  { _id: "65a7e24602e12c44f5994402", name: "GSK" },
  { _id: "65a7e24602e12c44f5994403", name: "Abbott" },
  { _id: "65a7e24602e12c44f5994404", name: "Johnson & Johnson" },
  { _id: "65a7e24602e12c44f5994405", name: "Bayer" },
  { _id: "65a7e24602e12c44f5994406", name: "Cipla" },
  { _id: "65a7e24602e12c44f5994407", name: "Sun Pharma" },
  { _id: "65a7e24602e12c44f5994408", name: "Dettol" },
  { _id: "65a7e24602e12c44f5994409", name: "Omron" },
  { _id: "65a7e24602e12c44f599440a", name: "Himalaya Wellness" },
];

exports.seedBrand = async () => {
  try {
    await Brand.deleteMany({});
    await Brand.insertMany(brands);
    console.log("Brands seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
