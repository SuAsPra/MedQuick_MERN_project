const Order = require("../models/Order");

const orders = [
  {
    _id: "65c2658db53f820728d0745a",
    user: "65b8e564ea5ce114184ccb96", // Demo Customer
    item: [
      {
        user: "65b8e564ea5ce114184ccb96",
        product: {
          _id: "65a7e24602e12c44f5994501",
          title: "Amoxicillin 500mg Capsules",
          description: "Broad-spectrum antibiotic used to treat bacterial infections.",
          price: 18.5,
          discountPercentage: 10,
          stockQuantity: 45,
          brand: { _id: "65a7e24602e12c44f5994402", name: "GSK" },
          category: "65a7e24602e12c44f599442c",
          requiresPrescription: true,
          dosage: "500 mg, 3 times daily",
          medicineType: "Antibiotic Capsule",
          thumbnail: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60",
          images: [
            "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60"
          ],
          isDeleted: false,
        },
        quantity: 2,
        _id: "65c26581b53f820728d07456",
      },
      {
        user: "65b8e564ea5ce114184ccb96",
        product: {
          _id: "65a7e24602e12c44f5994502",
          title: "Paracetamol 650mg Fast Relief",
          description: "Effective antipyretic and analgesic for quick relief from fever and pain.",
          price: 6.99,
          discountPercentage: 5,
          stockQuantity: 120,
          brand: { _id: "65a7e24602e12c44f5994406", name: "Cipla" },
          category: "65a7e24602e12c44f599442c",
          requiresPrescription: false,
          dosage: "1 tablet every 6 hours as needed",
          medicineType: "Analgesic / Antipyretic Tablet",
          thumbnail: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=500&auto=format&fit=crop&q=60",
          images: [
            "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=500&auto=format&fit=crop&q=60"
          ],
          isDeleted: false,
        },
        quantity: 1,
        _id: "65c26581b53f820728d07457",
      }
    ],
    address: [
      {
        _id: "65c26398e1e1a2106ac8fbd5",
        user: "65b8e564ea5ce114184ccb96",
        street: "24 Park Avenue, Green Health Enclave",
        city: "Mumbai",
        state: "Maharashtra",
        phoneNumber: "9876543210",
        postalCode: "400001",
        country: "India",
        type: "Home",
      },
    ],
    status: "Confirmed",
    paymentMode: "CARD",
    total: 43.99,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    _id: "65c265c6b53f820728d0749c",
    user: "65b8e564ea5ce114184ccb96",
    item: [
      {
        _id: "65c265a2b53f820728d07474",
        user: "65b8e564ea5ce114184ccb96",
        product: {
          _id: "65a7e24602e12c44f5994508",
          title: "Omron Automatic Blood Pressure Monitor M3",
          description: "Clinically validated upper-arm digital blood pressure monitor.",
          price: 64.99,
          discountPercentage: 12,
          stockQuantity: 50,
          brand: { _id: "65a7e24602e12c44f5994409", name: "Omron" },
          category: "65a7e24602e12c44f599442f",
          requiresPrescription: false,
          dosage: "Measure twice daily",
          medicineType: "Digital Diagnostic Device",
          thumbnail: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500&auto=format&fit=crop&q=60",
          images: [
            "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500&auto=format&fit=crop&q=60"
          ],
          isDeleted: false,
        },
        quantity: 1,
      }
    ],
    address: [
      {
        _id: "65c26398e1e1a2106ac8fbd5",
        user: "65b8e564ea5ce114184ccb96",
        street: "24 Park Avenue, Green Health Enclave",
        city: "Mumbai",
        state: "Maharashtra",
        phoneNumber: "9876543210",
        postalCode: "400001",
        country: "India",
        type: "Home",
      },
    ],
    status: "Out for Delivery",
    paymentMode: "COD",
    total: 57.19,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  }
];

exports.seedOrder = async () => {
  try {
    await Order.deleteMany({});
    await Order.insertMany(orders);
    console.log("Orders seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
