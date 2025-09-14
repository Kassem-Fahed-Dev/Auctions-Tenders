// seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './config.env' });

// Import your model (adjust path & name as needed)
const Category = require('./models/Category'); // 👈 replace with correct model

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ DB connection successful'))
  .catch((err) => console.error('❌ DB connection error:', err));

// Data to seed
const seedData = [
  {
    type: "auction",
    name: "سيارات ",
    image: "https://static.arabwheels.ae/2024/12/30060850/unnamed-3-2.jpg",
    properties: [
      { key: "الموديل", required: true, dataType: "string" },
      { key: "سنة الصنع", required: true, dataType: "number" },
      { key: "عدد الكيلومترات", required: false, dataType: "number" },
      { key: "نوع الوقود", required: true, dataType: "string" }
    ]
  },
  {
    type: "auction",
    name: "أجهزة لابتوب",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRn3reJ5wnYhOq7YaTzMUOdtopxfxT3Y575w&s",
    properties: [
      { key: "الشاشة", required: true, dataType: "string" },
      { key: "المعالج", required: true, dataType: "string" },
      { key: "الذاكرة العشوائية (RAM)", required: true, dataType: "number" },
      { key: "سعة التخزين", required: false, dataType: "string" }
    ]
  },
  {
    type: "auction",
    name: "عقارات",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    properties: [
      { key: "المساحة", required: true, dataType: "number" },
      { key: "عدد الغرف", required: false, dataType: "number" },
      { key: "الموقع", required: true, dataType: "string" },
      { key: "السعر", required: true, dataType: "number" }
    ]
  },
  {
    type: "auction",
    name: "إلكترونيات منزلية",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZdb8wOry6Bf-d-1JDxd_5wf_0aOQLPO4mQ&s",
    properties: [
      { key: "اسم المنتج", required: true, dataType: "string" },
      { key: "العلامة التجارية", required: true, dataType: "string" },
      { key: "القدرة الكهربائية", required: false, dataType: "number" },
      { key: "الضمان", required: true, dataType: "string" }
    ]
  },
  {
    type: "auction",
    name: "معدات طبية",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS5KJaw1EyZsQfcqrDptY0c4fjVtY6JU2DIA&s",
    properties: [
      { key: "اسم الجهاز", required: true, dataType: "string" },
      { key: "الشركة المصنعة", required: true, dataType: "string" },
      { key: "بلد المنشأ", required: false, dataType: "string" },
      { key: "تاريخ الصلاحية", required: true, dataType: "date" }
    ]
  },
  {
    "type": "auction",
    "name": "موبايلات",
    "image":"https://m-cdn.phonearena.com/images/article/64576-wide-two_1200/The-Best-Phones-My-top-picks-tried-and-tested.jpg",
    "properties": [
        {
            "key": "اسم الجهاز",
            "required": true,
            "dataType": "string"
        },
        {
            "key": "العلامة التجارية",
            "required": true,
            "dataType": "string"
        },
        {
            "key": "المعالج",
            "required": true,
            "dataType": "string"
        },
        {
            "key": "سعة التخزين",
            "required": true,
            "dataType": "string"
        }
    ]
    },  {
    type: "tender",
    name: "مناقصات إنشاءات",
    image: "https://shapwasco.com.eg/wp-content/uploads/2017/05/%D9%85%D9%86%D8%A7%D9%82%D8%B5%D8%A7%D8%AA-435x260.jpg",
    properties: [
      { key: "اسم المشروع", required: true, dataType: "string" },
      { key: "الموقع", required: true, dataType: "string" },
      { key: "الميزانية", required: true, dataType: "number" },
      { key: "مدة التنفيذ", required: false, dataType: "string" }
    ]
  },
  {
    type: "tender",
    name: "مناقصات توريد مواد",
    image: "https://cdn.corporatefinanceinstitute.com/assets/procurement.jpeg",
    properties: [
      { key: "نوع المواد", required: true, dataType: "string" },
      { key: "الكمية المطلوبة", required: true, dataType: "number" },
      { key: "تاريخ التسليم", required: true, dataType: "date" },
      { key: "الشروط الخاصة", required: false, dataType: "string" }
    ]
  },
  {
    type: "tender",
    name: "مناقصات تكنولوجيا",
    image: "https://shapwasco.com.eg/wp-content/uploads/2017/05/%D9%85%D9%86%D8%A7%D9%82%D8%B5%D8%A7%D8%AA-435x260.jpg",
    properties: [
      { key: "نوع الأجهزة", required: true, dataType: "string" },
      { key: "عدد الأجهزة", required: true, dataType: "number" },
      { key: "البرمجيات المطلوبة", required: false, dataType: "string" },
      { key: "مدة الضمان", required: true, dataType: "string" }
    ]
  },
  {
    type: "tender",
    name: "مناقصات صحية",
    image: "https://shapwasco.com.eg/wp-content/uploads/2017/05/%D9%85%D9%86%D8%A7%D9%82%D8%B5%D8%A7%D8%AA-435x260.jpg",
    properties: [
      { key: "نوع الأجهزة الطبية", required: true, dataType: "string" },
      { key: "بلد المنشأ", required: false, dataType: "string" },
      { key: "تاريخ الصلاحية", required: true, dataType: "date" },
      { key: "الكمية", required: true, dataType: "number" }
    ]
  },
  {
    type: "tender",
    name: "مناقصات تعليمية",
    image: "https://shapwasco.com.eg/wp-content/uploads/2017/05/%D9%85%D9%86%D8%A7%D9%82%D8%B5%D8%A7%D8%AA-435x260.jpg",
    properties: [
      { key: "اسم المواد التعليمية", required: true, dataType: "string" },
      { key: "عدد القطع", required: true, dataType: "number" },
      { key: "المستوى التعليمي", required: true, dataType: "string" },
      { key: "موعد التسليم", required: true, dataType: "date" }
    ]
  },
  {
    type: "tender",
    name: "مناقصات لوجستية",
    image: "https://shapwasco.com.eg/wp-content/uploads/2017/05/%D9%85%D9%86%D8%A7%D9%82%D8%B5%D8%A7%D8%AA-435x260.jpg",
    properties: [
      { key: "نوع الخدمة", required: true, dataType: "string" },
      { key: "مدة العقد", required: true, dataType: "string" },
      { key: "المنطقة المستهدفة", required: true, dataType: "string" },
      { key: "التكلفة المتوقعة", required: true, dataType: "number" }
    ]
  }

];
const auctionSeedData = [
  {
    "auction": {
      "auctionTitle": "Luxury Car Auction",
      "startTime": "2025-09-01T09:00:00Z",
      "endTime": "2025-09-10T12:00:00Z",
      "minimumIncrement": "500",
      "startingPrice": "20000",
      "numberOfItems": "3",
      "city": "Damascus"
    },
    "item": {
      "category": "68c66bbd8f9fe32ac8e3f8ef",
      "name": "Toyota Corolla 2018",
      "description": "Used but in excellent condition",
      "status": "مستعمل",
      "properties": [
        { "key": "الموديل", "value": "Corolla" },
        { "key": "سنة الصنع", "value": "2018" },
        { "key": "عدد الكيلومترات", "value": "45000" },
        { "key": "نوع الوقود", "value": "بنزين" }
      ]
    }
  },
  {
    "auction": {
      "auctionTitle": "Laptop Mega Sale",
      "startTime": "2025-09-05T09:00:00Z",
      "endTime": "2025-09-15T12:00:00Z",
      "minimumIncrement": "50",
      "startingPrice": "500",
      "numberOfItems": "5",
      "city": "Aleppo"
    },
    "item": {
      "category": "68c66bbd8f9fe32ac8e3f8f4",
      "name": "MacBook Pro 2020",
      "description": "Laptop with 16GB RAM and 512GB SSD",
      "status": "مستعمل",
      "properties": [
        { "key": "الشاشة", "value": "16 inch" },
        { "key": "المعالج", "value": "Intel i7" },
        { "key": "الذاكرة العشوائية (RAM)", "value": "16" },
        { "key": "سعة التخزين", "value": "512GB" }
      ]
    }
  },
  {
    "auction": {
      "auctionTitle": "Real Estate Auction",
      "startTime": "2025-09-02T10:00:00Z",
      "endTime": "2025-09-12T16:00:00Z",
      "minimumIncrement": "1000",
      "startingPrice": "150000",
      "numberOfItems": "2",
      "city": "Homs"
    },
    "item": {
      "category": "68c66bbd8f9fe32ac8e3f8f9",
      "name": "Apartment in City Center",
      "description": "3 rooms, 2 bathrooms, 120 sqm",
      "status": "مستعمل",
      "properties": [
        { "key": "المساحة", "value": "120" },
        { "key": "عدد الغرف", "value": "3" },
        { "key": "الموقع", "value": "City Center" },
        { "key": "السعر", "value": "150000" }
      ]
    }
  },
  {
    "auction": {
      "auctionTitle": "Home Electronics Auction",
      "startTime": "2025-09-03T08:00:00Z",
      "endTime": "2025-09-13T12:00:00Z",
      "minimumIncrement": "20",
      "startingPrice": "200",
      "numberOfItems": "4",
      "city": "Latakia"
    },
    "item": {
      "category": "68c66bbd8f9fe32ac8e3f8fe",
      "name": "Samsung Refrigerator",
      "description": "Double door, 400L",
      "status": "جديد",
      "properties": [
        { "key": "اسم المنتج", "value": "Refrigerator" },
        { "key": "العلامة التجارية", "value": "Samsung" },
        { "key": "القدرة الكهربائية", "value": "400" },
        { "key": "الضمان", "value": "2 years" }
      ]
    }
  },
  {
    "auction": {
      "auctionTitle": "Medical Equipment Auction",
      "startTime": "2025-09-04T09:00:00Z",
      "endTime": "2025-09-14T15:00:00Z",
      "minimumIncrement": "100",
      "startingPrice": "1000",
      "numberOfItems": "3",
      "city": "Hama"
    },
    "item": {
      "category": "68c66bbd8f9fe32ac8e3f903",
      "name": "X-Ray Machine",
      "description": "Portable digital X-Ray machine",
      "status": "جديد",
      "properties": [
        { "key": "اسم الجهاز", "value": "X-Ray Machine" },
        { "key": "الشركة المصنعة", "value": "Siemens" },
        { "key": "بلد المنشأ", "value": "Germany" },
        { "key": "تاريخ الصلاحية", "value": "2030-12-31" }
      ]
    }
  },
  {
    "auction": {
      "auctionTitle": "Mobile Phone Auction",
      "startTime": "2025-09-05T09:00:00Z",
      "endTime": "2025-09-15T12:00:00Z",
      "minimumIncrement": "50",
      "startingPrice": "300",
      "numberOfItems": "6",
      "city": "Tartus"
    },
    "item": {
      "category": "68c66bbd8f9fe32ac8e3f908",
      "name": "iPhone 12 Pro",
      "description": "256GB, Blue",
      "status": "مستعمل",
      "properties": [
        { "key": "اسم الجهاز", "value": "iPhone 12 Pro" },
        { "key": "العلامة التجارية", "value": "Apple" },
        { "key": "المعالج", "value": "A14 Bionic" },
        { "key": "سعة التخزين", "value": "256GB" }
      ]
    }
  },
  {
    "auction": {
      "auctionTitle": "Vintage Car Auction",
      "startTime": "2025-09-06T10:00:00Z",
      "endTime": "2025-09-16T14:00:00Z",
      "minimumIncrement": "1000",
      "startingPrice": "50000",
      "numberOfItems": "1",
      "city": "Deir ez-Zor"
    },
    "item": {
      "category": "68c66bbd8f9fe32ac8e3f8ef",
      "name": "Mercedes 280SL 1969",
      "description": "Classic vintage car",
      "status": "مستعمل",
      "properties": [
        { "key": "الموديل", "value": "280SL" },
        { "key": "سنة الصنع", "value": "1969" },
        { "key": "عدد الكيلومترات", "value": "120000" },
        { "key": "نوع الوقود", "value": "بنزين" }
      ]
    }
  },
  {
    "auction": {
      "auctionTitle": "Laptop Auction 2",
      "startTime": "2025-09-07T09:00:00Z",
      "endTime": "2025-09-17T12:00:00Z",
      "minimumIncrement": "75",
      "startingPrice": "600",
      "numberOfItems": "3",
      "city": "Idlib"
    },
    "item": {
      "category": "68c66bbd8f9fe32ac8e3f8f4",
      "name": "Dell XPS 15",
      "description": "Laptop with Intel i9 and 32GB RAM",
      "status": "جديد",
      "properties": [
        { "key": "الشاشة", "value": "15 inch" },
        { "key": "المعالج", "value": "Intel i9" },
        { "key": "الذاكرة العشوائية (RAM)", "value": "32" },
        { "key": "سعة التخزين", "value": "1TB" }
      ]
    }
  },
  {
    "auction": {
      "auctionTitle": "Apartment Auction",
      "startTime": "2025-09-08T08:00:00Z",
      "endTime": "2025-09-18T16:00:00Z",
      "minimumIncrement": "2000",
      "startingPrice": "120000",
      "numberOfItems": "2",
      "city": "Aleppo"
    },
    "item": {
      "category": "68c66bbd8f9fe32ac8e3f8f9",
      "name": "Luxury Apartment",
      "description": "2 bedrooms, 2 bathrooms, 150 sqm",
      "status": "جديد",
      "properties": [
        { "key": "المساحة", "value": "150" },
        { "key": "عدد الغرف", "value": "2" },
        { "key": "الموقع", "value": "Downtown" },
        { "key": "السعر", "value": "120000" }
      ]
    }
  },
  {
    "auction": {
      "auctionTitle": "Refrigerator Auction",
      "startTime": "2025-09-09T08:00:00Z",
      "endTime": "2025-09-19T12:00:00Z",
      "minimumIncrement": "50",
      "startingPrice": "250",
      "numberOfItems": "4",
      "city": "Homs"
    },
    "item": {
      "category": "68c66bbd8f9fe32ac8e3f8fe",
      "name": "LG Refrigerator",
      "description": "Double door, 350L",
      "status": "جديد",
      "properties": [
        { "key": "اسم المنتج", "value": "Refrigerator" },
        { "key": "العلامة التجارية", "value": "LG" },
        { "key": "القدرة الكهربائية", "value": "350" },
        { "key": "الضمان", "value": "3 years" }
      ]
    }
  }
];


// Import data into DB
const importData = async () => {
  try {
    await Category.deleteMany(); // Clear collection before seeding (optional)
    await Category.insertMany(seedData);
    console.log('✅ Data successfully seeded!');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding data:', err);
    process.exit(1);
  }
};

importData();
