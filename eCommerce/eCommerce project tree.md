ecommerce-store/
├── client/             # React (Vite) frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Cart.jsx
│   │   │   └── ...
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   └── ...
│   ├── index.css
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── package.json
│   └── ...
├── server/             # Node.js + Express + Bun backend
│   ├── index.js        # Main server file
│   ├── routes/
│   │   ├── productRoutes.js
│   │   └── ...
│   ├── models/
│   │   ├── Product.js
│   │   └── ...
│   ├── controllers/
│   │   ├── productController.js
│   │   └── ...
│   ├── utils/
│   │   └── db.js
│   ├── package.json
│   └── ...
├── .env                # Environment variables
└── README.md
