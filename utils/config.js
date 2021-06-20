require('dotenv').config();

//DON'T FORGET TO EDIT THE .env FILE WHEN SWITCHING BETWEEN WSL & MACOS
//ENSURE MONGODB_ENV ARE SET TO THE CORRECT CLUSTERS

const PORT = process.env.PORT;
const MONGODB_URI = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;
// const MONGODB_URI = process.env.TEST_MONGODB_URI; //USE FOR DEBUGGING ONLY

module.exports = {
  MONGODB_URI,
  PORT
};