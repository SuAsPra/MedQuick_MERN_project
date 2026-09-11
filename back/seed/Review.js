const Review = require("../models/Review");

const reviews = [
  {
    _id: "65c252e3dcd9253acfbaa76c",
    user: "65c2526fdcd9253acfbaa731",
    product: "65a7e24602e12c44f5994502", // Paracetamol
    rating: 5,
    comment: "Extremely fast relief from headache and mild fever. Genuine medicine delivered in under 20 minutes!",
    createdAt: new Date("2025-01-10"),
  },
  {
    _id: "65c25339dcd9253acfbaa79e",
    user: "65c2526fdcd9253acfbaa731",
    product: "65a7e24602e12c44f5994508", // Omron BP Monitor
    rating: 5,
    comment: "Very accurate digital blood pressure monitor. Clear display and very easy to use for elderly parents.",
    createdAt: new Date("2025-01-15"),
  },
  {
    _id: "65c2535fdcd9253acfbaa7c9",
    user: "65c2526fdcd9253acfbaa731",
    product: "65a7e24602e12c44f5994504", // First Aid Kit
    rating: 5,
    comment: "Essential kit for every household. Contains all necessary bandages, antiseptics, and emergency trauma supplies.",
    createdAt: new Date("2025-01-20"),
  },
  {
    _id: "65c25380dcd9253acfbaa7df",
    user: "65c2526fdcd9253acfbaa731",
    product: "65a7e24602e12c44f599450d", // Ashwagandha
    rating: 4,
    comment: "High quality Ayurvedic supplement. Helped me stay relaxed and focused during hectic work weeks.",
    createdAt: new Date("2025-02-01"),
  }
];

exports.seedReview = async () => {
  try {
    await Review.deleteMany({});
    await Review.insertMany(reviews);
    console.log("Reviews seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
