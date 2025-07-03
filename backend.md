mkdir -p backend/{controllers,models,middlewares,routes,db,utils} &&
cd backend &&
touch app.js index.js constants.js .env &&
touch controllers/userController.js &&
touch models/userModel.js &&
touch routes/userRoutes.js
touch db/connectDB.js

bun init -y
bun add express mongodb mongoose mongoose-aggregate-paginate-v2 multer cors dotenv body-parser cookie-parser jsonwebtoken bcryptjs express-session nodemon joi axios cloudinary

echo "import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";

  
  

const connectDB = async () => {

try {

const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);

} catch (error) {

console.log("MONGODB connection FAILED ", error);

process.exit(1)

}

}

  

export default connectDB" > db/connectDB.js

echo "PORT=8000

MONGODB_URI=mongodb+srv://hitesh:your-password@cluster0.lxl3fsq.mongodb.net

CORS_ORIGIN=*

ACCESS_TOKEN_SECRET=chai-aur-code

ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=chai-aur-backend

REFRESH_TOKEN_EXPIRY=10d

  

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=" >> 