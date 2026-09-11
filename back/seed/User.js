const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.seedUser = async () => {
  try {
    await User.deleteMany({});

    const adminPassword = await bcrypt.hash("Admin@1234", 10);
    const customerPassword = await bcrypt.hash("Customer@1234", 10);

    const users = [
      {
        _id: "65b8e564ea5ce114184ccb90",
        name: "MedQuick Admin",
        email: "admin@medquick.com",
        password: adminPassword,
        isVerified: true,
        isAdmin: true,
      },
      {
        _id: "65b8e564ea5ce114184ccb96",
        name: "Demo Customer",
        email: "customer@medquick.com",
        password: customerPassword,
        isVerified: true,
        isAdmin: false,
      },
      {
        _id: "65c2526fdcd9253acfbaa731",
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        password: customerPassword,
        isVerified: true,
        isAdmin: false,
      }
    ];

    await User.insertMany(users);
    console.log("Users seeded successfully (Admin: admin@medquick.com / Admin@1234, Customer: customer@medquick.com / Customer@1234)");
  } catch (error) {
    console.log(error);
  }
};
