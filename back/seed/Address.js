const Address = require("../models/Address");

const addresses = [
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
  {
    _id: "65c26412e1e1a2106ac8fbd8",
    user: "65b8e564ea5ce114184ccb96",
    street: "Level 4, MedTech Tower, Cyber City",
    city: "Gurugram",
    state: "Haryana",
    phoneNumber: "9876543211",
    postalCode: "122002",
    country: "India",
    type: "Business",
  },
];

exports.seedAddress = async () => {
  try {
    await Address.deleteMany({});
    await Address.insertMany(addresses);
    console.log("Address seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
