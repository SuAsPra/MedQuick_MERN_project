const Category = require("../models/Category");

const categories = [
  { _id: "65a7e24602e12c44f599442c", name: "Medicines" },
  { _id: "65a7e24602e12c44f599442d", name: "First Aid" },
  { _id: "65a7e24602e12c44f599442e", name: "Emergency Supplies" },
  { _id: "65a7e24602e12c44f599442f", name: "Health Devices" },
  { _id: "65a7e24602e12c44f5994430", name: "Personal Care" },
  { _id: "65a7e24602e12c44f5994431", name: "Baby Care" },
  { _id: "65a7e24602e12c44f5994432", name: "Wellness" },
  { _id: "65a7e24602e12c44f5994433", name: "Daily Essentials" }
];

exports.seedCategory = async () => {
  try {
    await Category.insertMany(categories);
    console.log("Category seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
