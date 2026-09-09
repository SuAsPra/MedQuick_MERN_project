const Product = require("../models/Product");

const products = [
  {
    _id: "65a7e45902e12c44f599444e",
    title: "Paracetamol 500mg",
    description: "Effective relief from fever and mild to moderate pain.",
    price: 5,
    discountPercentage: 10,
    stockQuantity: 500,
    brand: "65a7e20102e12c44f59943df", // GSK
    category: "65a7e24602e12c44f599442c", // Medicines
    thumbnail: "https://via.placeholder.com/150",
    images: ["https://via.placeholder.com/500"],
    isDeleted: false,
    requiresPrescription: false,
    manufacturer: "GSK",
    dosage: "500mg",
    medicineType: "Tablet"
  },
  {
    _id: "65a7e45902e12c44f599444f",
    title: "Amoxicillin 250mg",
    description: "Antibiotic used to treat a number of bacterial infections.",
    price: 15,
    discountPercentage: 5,
    stockQuantity: 200,
    brand: "65a7e20102e12c44f59943da", // Pfizer
    category: "65a7e24602e12c44f599442c", // Medicines
    thumbnail: "https://via.placeholder.com/150",
    images: ["https://via.placeholder.com/500"],
    isDeleted: false,
    requiresPrescription: true,
    manufacturer: "Pfizer",
    dosage: "250mg",
    medicineType: "Capsule"
  },
  {
    _id: "65a7e45902e12c44f5994450",
    title: "Dettol Antiseptic Liquid",
    description: "First aid antiseptic liquid for cleaning wounds and cuts.",
    price: 8,
    discountPercentage: 0,
    stockQuantity: 300,
    brand: "65a7e20102e12c44f59943e5", // Dettol
    category: "65a7e24602e12c44f599442d", // First Aid
    thumbnail: "https://via.placeholder.com/150",
    images: ["https://via.placeholder.com/500"],
    isDeleted: false,
    requiresPrescription: false,
    manufacturer: "Reckitt Benckiser",
    medicineType: "Liquid"
  },
  {
    _id: "65a7e45902e12c44f5994451",
    title: "Digital Thermometer",
    description: "Fast and accurate digital thermometer for fever measurement.",
    price: 25,
    discountPercentage: 15,
    stockQuantity: 100,
    brand: "65a7e20102e12c44f59943db", // Johnson & Johnson
    category: "65a7e24602e12c44f599442f", // Health Devices
    thumbnail: "https://via.placeholder.com/150",
    images: ["https://via.placeholder.com/500"],
    isDeleted: false,
    requiresPrescription: false,
    manufacturer: "Johnson & Johnson"
  }
];

exports.seedProduct = async () => {
  try {
    await Product.insertMany(products);
    console.log('Product seeded successfully');
  } catch (error) {
    console.log(error);
  }
};
