const Brand = require("../models/Brand");

const brands = [
  { _id: "65a7e20102e12c44f59943da", name: "Pfizer" },
  { _id: "65a7e20102e12c44f59943db", name: "Johnson & Johnson" },
  { _id: "65a7e20102e12c44f59943dc", name: "Roche" },
  { _id: "65a7e20102e12c44f59943dd", name: "Novartis" },
  { _id: "65a7e20102e12c44f59943de", name: "Merck" },
  { _id: "65a7e20102e12c44f59943df", name: "GSK" },
  { _id: "65a7e20102e12c44f59943e0", name: "Bayer" },
  { _id: "65a7e20102e12c44f59943e1", name: "Abbott" },
  { _id: "65a7e20102e12c44f59943e2", name: "Medtronic" },
  { _id: "65a7e20102e12c44f59943e3", name: "Apollo Pharmacy" },
  { _id: "65a7e20102e12c44f59943e4", name: "Tata 1mg" },
  { _id: "65a7e20102e12c44f59943e5", name: "Dettol" },
  { _id: "65a7e20102e12c44f59943e6", name: "Savlon" },
  { _id: "65a7e20102e12c44f59943e7", name: "Cipla" },
  { _id: "65a7e20102e12c44f59943e8", name: "Sun Pharma" }
];

exports.seedBrand = async () => {
  try {
    await Brand.insertMany(brands);
    console.log('Brand seeded successfully');
  } catch (error) {
    console.log(error);
  }
};
