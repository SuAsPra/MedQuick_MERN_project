const Product = require("../models/Product");

const products = [
  // 1. Medicines
  {
    _id: "65a7e24602e12c44f5994501",
    title: "Amoxicillin 500mg Capsules",
    description: "Broad-spectrum antibiotic used to treat bacterial infections such as pneumonia, bronchitis, and infections of the ear, nose, throat, skin, and urinary tract. Prescription required.",
    price: 18.5,
    discountPercentage: 10,
    category: "65a7e24602e12c44f599442c", // Medicines
    brand: "65a7e24602e12c44f5994402", // GSK
    stockQuantity: 45,
    requiresPrescription: true,
    manufacturer: "GlaxoSmithKline Pharmaceuticals Ltd.",
    expiryDate: new Date("2027-08-31"),
    dosage: "500 mg, 3 times daily or as directed",
    medicineType: "Antibiotic Capsule",
    thumbnail: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&auto=format&fit=crop&q=60"
    ],
    isDeleted: false
  },
  {
    _id: "65a7e24602e12c44f5994502",
    title: "Paracetamol 650mg Fast Relief",
    description: "Effective antipyretic and analgesic for quick relief from fever, headache, body aches, toothache, and mild-to-moderate pain.",
    price: 6.99,
    discountPercentage: 5,
    category: "65a7e24602e12c44f599442c", // Medicines
    brand: "65a7e24602e12c44f5994406", // Cipla
    stockQuantity: 120,
    requiresPrescription: false,
    manufacturer: "Cipla Health Ltd.",
    expiryDate: new Date("2028-03-31"),
    dosage: "1 tablet every 6 hours as needed (Max 4g/day)",
    medicineType: "Analgesic / Antipyretic Tablet",
    thumbnail: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=500&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&auto=format&fit=crop&q=60"
    ],
    isDeleted: false
  },
  {
    _id: "65a7e24602e12c44f5994503",
    title: "Lipitor Atorvastatin 20mg",
    description: "Statin medication used to prevent cardiovascular disease in those at high risk and treat abnormal lipid levels. Prescription required.",
    price: 32.0,
    discountPercentage: 8,
    category: "65a7e24602e12c44f599442c", // Medicines
    brand: "65a7e24602e12c44f5994401", // Pfizer
    stockQuantity: 30,
    requiresPrescription: true,
    manufacturer: "Pfizer Inc.",
    expiryDate: new Date("2027-11-30"),
    dosage: "20 mg once daily at bedtime",
    medicineType: "Cholesterol Lowering Tablet",
    thumbnail: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&auto=format&fit=crop&q=60"
    ],
    isDeleted: false
  },

  // 2. First Aid
  {
    _id: "65a7e24602e12c44f5994504",
    title: "Comprehensive Emergency First Aid Kit",
    description: "Complete 180-piece medical emergency first aid kit with sterile bandages, trauma pads, medical shears, adhesive tape, antiseptic wipes, and CPR mask for home, office, or vehicle.",
    price: 38.5,
    discountPercentage: 15,
    category: "65a7e24602e12c44f599442d", // First Aid
    brand: "65a7e24602e12c44f5994404", // Johnson & Johnson
    stockQuantity: 65,
    requiresPrescription: false,
    manufacturer: "Johnson & Johnson MedTech",
    expiryDate: new Date("2029-12-31"),
    dosage: "Apply as needed for wound management",
    medicineType: "First Aid Kit",
    thumbnail: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=500&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=500&auto=format&fit=crop&q=60"
    ],
    isDeleted: false
  },
  {
    _id: "65a7e24602e12c44f5994505",
    title: "Dettol Antiseptic Liquid 500ml",
    description: "Trusted antiseptic disinfectant for first aid wound cleansing, cuts, bites, stings, and personal hygiene.",
    price: 8.5,
    discountPercentage: 5,
    category: "65a7e24602e12c44f599442d", // First Aid
    brand: "65a7e24602e12c44f5994408", // Dettol
    stockQuantity: 150,
    requiresPrescription: false,
    manufacturer: "Reckitt Benckiser / Dettol",
    expiryDate: new Date("2028-06-30"),
    dosage: "Dilute 1:20 in clean water before applying to cuts/wounds",
    medicineType: "Antiseptic Liquid",
    thumbnail: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=60"
    ],
    isDeleted: false
  },

  // 3. Emergency Supplies
  {
    _id: "65a7e24602e12c44f5994506",
    title: "Medical Portable Oxygen Canister (10 Liters)",
    description: "Instant pure oxygen canister with ergonomic mask for emergency breathlessness, altitude sickness, respiratory recovery, and emergency first response.",
    price: 24.0,
    discountPercentage: 10,
    category: "65a7e24602e12c44f599442e", // Emergency Supplies
    brand: "65a7e24602e12c44f5994406", // Cipla
    stockQuantity: 40,
    requiresPrescription: false,
    manufacturer: "Cipla Medpro Systems",
    expiryDate: new Date("2029-01-31"),
    dosage: "3-5 short inhalations as needed in emergency respiratory distress",
    medicineType: "Medical Inhaler / Oxygen Canister",
    thumbnail: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=500&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=500&auto=format&fit=crop&q=60"
    ],
    isDeleted: false
  },
  {
    _id: "65a7e24602e12c44f5994507",
    title: "Sterile Burn Dressing Trauma Blanket",
    description: "Hydrogel sterile burn gel dressing for emergency relief, pain reduction, and thermal burn stabilization.",
    price: 19.99,
    discountPercentage: 0,
    category: "65a7e24602e12c44f599442e", // Emergency Supplies
    brand: "65a7e24602e12c44f5994404", // Johnson & Johnson
    stockQuantity: 25,
    requiresPrescription: false,
    manufacturer: "Johnson & Johnson Emergency Care",
    expiryDate: new Date("2028-09-30"),
    dosage: "Apply directly over burn area immediately",
    medicineType: "Emergency Trauma Dressing",
    thumbnail: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=500&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=500&auto=format&fit=crop&q=60"
    ],
    isDeleted: false
  },

  // 4. Health Devices
  {
    _id: "65a7e24602e12c44f5994508",
    title: "Omron Automatic Blood Pressure Monitor M3",
    description: "Clinically validated upper-arm digital blood pressure monitor with Intellisense technology, hypertension indicator, and memory storage for 2 users.",
    price: 64.99,
    discountPercentage: 12,
    category: "65a7e24602e12c44f599442f", // Health Devices
    brand: "65a7e24602e12c44f5994409", // Omron
    stockQuantity: 50,
    requiresPrescription: false,
    manufacturer: "Omron Healthcare Co., Ltd.",
    expiryDate: new Date("2032-12-31"),
    dosage: "Measure twice daily: morning and evening",
    medicineType: "Digital Diagnostic Device",
    thumbnail: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500&auto=format&fit=crop&q=60"
    ],
    isDeleted: false
  },
  {
    _id: "65a7e24602e12c44f5994509",
    title: "Digital Fingertip Pulse Oximeter",
    description: "High-accuracy SpO2 oxygen saturation and pulse rate monitor with OLED display and audio alarm.",
    price: 29.5,
    discountPercentage: 20,
    category: "65a7e24602e12c44f599442f", // Health Devices
    brand: "65a7e24602e12c44f5994409", // Omron
    stockQuantity: 80,
    requiresPrescription: false,
    manufacturer: "Omron Healthcare Co., Ltd.",
    expiryDate: new Date("2031-10-31"),
    dosage: "Place on index finger for 10-15 seconds for reading",
    medicineType: "Pulse Oximeter Device",
    thumbnail: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&auto=format&fit=crop&q=60"
    ],
    isDeleted: false
  },

  // 5. Personal Care
  {
    _id: "65a7e24602e12c44f599450a",
    title: "Dettol Anti-Bacterial Hand Sanitizer 250ml",
    description: "Kills 99.9% of germs instantly without water. Enhanced with skin moisturizers and Vitamin E.",
    price: 4.99,
    discountPercentage: 0,
    category: "65a7e24602e12c44f5994430", // Personal Care
    brand: "65a7e24602e12c44f5994408", // Dettol
    stockQuantity: 200,
    requiresPrescription: false,
    manufacturer: "Reckitt Benckiser",
    expiryDate: new Date("2027-05-31"),
    dosage: "Apply coin-sized amount and rub until dry",
    medicineType: "Sanitizer Gel",
    thumbnail: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=500&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=500&auto=format&fit=crop&q=60"
    ],
    isDeleted: false
  },
  {
    _id: "65a7e24602e12c44f599450b",
    title: "Aveeno Daily Moisturizing Body Lotion",
    description: "Clinically proven to protect dry skin with prebiotic colloidal oat formula and 24-hour hydration.",
    price: 14.5,
    discountPercentage: 10,
    category: "65a7e24602e12c44f5994430", // Personal Care
    brand: "65a7e24602e12c44f5994404", // Johnson & Johnson
    stockQuantity: 75,
    requiresPrescription: false,
    manufacturer: "Johnson & Johnson Consumer Inc.",
    expiryDate: new Date("2027-09-30"),
    dosage: "Apply liberally to body as needed",
    medicineType: "Dermatological Lotion",
    thumbnail: "https://images.unsplash.com/photo-1608248597359-0092d6e3557e?w=500&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1608248597359-0092d6e3557e?w=500&auto=format&fit=crop&q=60"
    ],
    isDeleted: false
  },

  // 6. Baby Care
  {
    _id: "65a7e24602e12c44f599450c",
    title: "Johnson's Baby Gentle Calming Shampoo 500ml",
    description: "No More Tears formula, pediatrician and dermatologist tested, free of parabens, phthalates, and sulfates.",
    price: 9.25,
    discountPercentage: 5,
    category: "65a7e24602e12c44f5994431", // Baby Care
    brand: "65a7e24602e12c44f5994404", // Johnson & Johnson
    stockQuantity: 90,
    requiresPrescription: false,
    manufacturer: "Johnson & Johnson Healthcare",
    expiryDate: new Date("2028-02-28"),
    dosage: "Gentle lather on wet baby hair, rinse thoroughly",
    medicineType: "Pediatric Care Shampoo",
    thumbnail: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&auto=format&fit=crop&q=60"
    ],
    isDeleted: false
  },

  // 7. Wellness
  {
    _id: "65a7e24602e12c44f599450d",
    title: "Himalaya Pure Herbs Ashwagandha Tablets",
    description: "Ayurvedic rejuvenating herbal supplement that supports stress management, stamina, cognitive clarity, and vitality.",
    price: 15.0,
    discountPercentage: 10,
    category: "65a7e24602e12c44f5994432", // Wellness
    brand: "65a7e24602e12c44f599440a", // Himalaya Wellness
    stockQuantity: 110,
    requiresPrescription: false,
    manufacturer: "The Himalaya Drug Company",
    expiryDate: new Date("2028-08-31"),
    dosage: "1 tablet twice daily with meals or warm water",
    medicineType: "Herbal Wellness Supplement",
    thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&auto=format&fit=crop&q=60"
    ],
    isDeleted: false
  },
  {
    _id: "65a7e24602e12c44f599450e",
    title: "Vitamin C 1000mg + Zinc Immunity Booster",
    description: "Effervescent daily immune support supplement with powerful antioxidants and bioflavonoids for rapid absorption.",
    price: 12.75,
    discountPercentage: 15,
    category: "65a7e24602e12c44f5994432", // Wellness
    brand: "65a7e24602e12c44f5994403", // Abbott
    stockQuantity: 140,
    requiresPrescription: false,
    manufacturer: "Abbott Nutrition",
    expiryDate: new Date("2027-12-31"),
    dosage: "Dissolve 1 effervescent tablet in 200ml water daily",
    medicineType: "Nutritional Vitamin Supplement",
    thumbnail: "https://images.unsplash.com/photo-1577401239170-897942555fb3?w=500&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1577401239170-897942555fb3?w=500&auto=format&fit=crop&q=60"
    ],
    isDeleted: false
  },

  // 8. Daily Essentials
  {
    _id: "65a7e24602e12c44f599450f",
    title: "N95 Medical Protective Respirator Masks (Pack of 10)",
    description: "NIOSH certified 5-layer filtration N95 respirator masks protecting against airborne particulates, pathogens, and allergens.",
    price: 16.5,
    discountPercentage: 5,
    category: "65a7e24602e12c44f5994433", // Daily Essentials
    brand: "65a7e24602e12c44f5994404", // Johnson & Johnson
    stockQuantity: 180,
    requiresPrescription: false,
    manufacturer: "Johnson & Johnson Safety Products",
    expiryDate: new Date("2030-01-31"),
    dosage: "Single use recommended (up to 8 hours continuous wear)",
    medicineType: "Protective Mask Device",
    thumbnail: "https://images.unsplash.com/photo-1586942593568-29361efcd571?w=500&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1586942593568-29361efcd571?w=500&auto=format&fit=crop&q=60"
    ],
    isDeleted: false
  },
  {
    _id: "65a7e24602e12c44f5994510",
    title: "Electrolyte Hydration Rehydration Salts (10 Sachets)",
    description: "WHO recommended formula for rapid restoration of body fluids and essential minerals lost due to dehydration, diarrhea, or heat exhaustion.",
    price: 7.5,
    discountPercentage: 0,
    category: "65a7e24602e12c44f5994433", // Daily Essentials
    brand: "65a7e24602e12c44f5994406", // Cipla
    stockQuantity: 210,
    requiresPrescription: false,
    manufacturer: "Cipla Health Ltd.",
    expiryDate: new Date("2028-05-31"),
    dosage: "Mix 1 sachet in 1 liter of fresh drinking water",
    medicineType: "Oral Electrolyte Solution Powder",
    thumbnail: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=500&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=500&auto=format&fit=crop&q=60"
    ],
    isDeleted: false
  }
];

exports.seedProduct = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Products seeded successfully (16 healthcare items across 8 categories)");
  } catch (error) {
    console.log(error);
  }
};
