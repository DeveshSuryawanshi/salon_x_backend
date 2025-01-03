# Salon_X_Backend

```
project-root/
├── logs/                # Log files
│   └── application.log  # Main application log file
│
├── public/               # Static files accessible to the client
│   ├── css/              # CSS files
│   │   └── styles.css
│   ├── js/               # JavaScript files
│   │   └── scripts.js
│   ├── images/           # Images
│   │   └── logo.png
│   ├── index.html        # Example static HTML file
│
├── src/
│   ├── config/           # Configuration files
│   │   └── db.mjs         # Database configuration
│   │   └── env.mjs        # Environment variables setup
│   │   └── logger.mjs     # Logging configuration
│
│   ├── models/           # Mongoose models or database schemas
│   │   └── user.model.mjs # Example: User model
│   │   └── order.model.mjs
│
│   ├── controllers/      # Route controllers
│   │   └── user.controller.mjs
│   │   └── order.controller.mjs
│
│   ├── services/         # Business logic and reusable services
│   │   └── user.service.mjs
│   │   └── order.service.mjs
│
│   ├── routes/           # Express route definitions
│   │   └── user.routes.mjs
│   │   └── order.routes.mjs
│   │   └── index.mjs      # Combine all routes
│
│   ├── middlewares/      # Custom middlewares
│   │   └── auth.middleware.mjs
│   │   └── error.middleware.mjs
│
│   ├── utils/            # Utility functions/helpers
│   │   └── jwt.util.mjs   # JWT helper
│   │   └── email.util.mjs # Email helper
│
│   ├── validations/      # Request validation schemas
│   │   └── user.validation.mjs
│   │   └── order.validation.mjs
│
│   ├── app.mjs            # Initialize app, middleware, routes
│   ├── server.mjs         # Entry point to start the server
│
├── tests/                # Unit and integration tests
│   ├── user.test.mjs
│   ├── order.test.mjs
│
├── .env                  # Environment variables
├── .gitignore            # Git ignore file
├── package.json          # Dependencies and scripts
├── README.md             # Documentation

```