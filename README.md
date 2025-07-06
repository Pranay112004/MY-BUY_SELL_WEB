# 🛍️ MERN Product Store

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for managing products with a modern, responsive UI built with Tailwind CSS.

## ✨ Features

- **🎨 Modern UI Design** - Beautiful glassmorphism effects with Tailwind CSS
- **📱 Fully Responsive** - Works perfectly on all devices
- **⚡ Fast Performance** - Optimized with Vite and efficient state management
- **🔄 Real-time Updates** - Instant UI updates without page refreshes
- **🎯 User-friendly** - Toast notifications and smooth animations
- **🛠️ Full CRUD Operations** - Create, Read, Update, Delete products

## 🚀 Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Frontend
- **React 19** - UI library with latest features
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **React Router DOM** - Client-side routing
- **React Hot Toast** - Beautiful notifications
- **Vite** - Fast build tool

## 🏗️ Project Structure

```
Mern_website/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── product.controller.js
│   ├── models/
│   │   └── product.js
│   ├── routes/
│   │   └── product.route.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── App.jsx
│   └── package.json
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Mern_website
   ```

2. **Setup Backend**
   ```bash
   # Install backend dependencies
   npm install
   
   # Create .env file in root directory
   echo "MONGO_URI=your_mongodb_connection_string" > .env
   
   # Start backend server
   npm run dev
   ```
   Backend will run on http://localhost:3000

3. **Setup Frontend**
   ```bash
   # Navigate to frontend directory
   cd frontend
   
   # Install frontend dependencies
   npm install
   
   # Start frontend development server
   npm run dev
   ```
   Frontend will run on http://localhost:5173

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Create a new product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

## 🎨 UI Features

- **Glassmorphism Navigation** - Translucent navbar with backdrop blur
- **Gradient Backgrounds** - Beautiful color gradients
- **Hover Animations** - Smooth transitions and hover effects
- **Responsive Grid** - Adapts to all screen sizes
- **Loading States** - Elegant loading animations
- **Toast Notifications** - Real-time feedback

## 🚀 Deployment

### Backend Deployment (Railway/Render/Heroku)
1. Push your code to GitHub
2. Connect your repository to your hosting platform
3. Add environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Configure redirects for SPA routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React team for the amazing library
- Tailwind CSS for the utility-first approach
- MongoDB for the flexible database
- Express.js for the robust backend framework
