# wege

### Installation

1. Clone the repository:
   git clone <repository-url>

2. Install dependencies:
   npm install

3. Start the JSON Server (in one terminal):
   npm run json-server

4. Start the development server (in another terminal):
   npm run dev

5. Open [http://localhost:3000](http://localhost:3000) in your browser

The JSON Server will run on [http://localhost:3000](http://localhost:3000)

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run json-server` - Start mock API server
- `npm run lint` - Run ESLint


## 🚀 Deployment

The app can be deployed to Vercel, Netlify, or any platform supporting Next.js:

npm run build
npm run start


## 🌐 API Endpoints

The JSON Server provides the following endpoints:

- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `GET /cart` - Get cart items
- `POST /cart` - Add item to cart
- `PUT /cart/:id` - Update cart item
- `DELETE /cart/:id` - Remove from cart
- `GET /favourites` - Get favourite items
- `POST /favourites` - Add to favourites
- `DELETE /favourites/:id` - Remove from favourites
