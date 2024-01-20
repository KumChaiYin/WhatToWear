import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/users.js'
import outfitRoutes from './routes/outfits.js'
import wardrobeRoutes from './routes/wardrobe.js'

const app = express()
dotenv.config();

app.use(bodyParser.json({limit : "30mb", extended : true})); 
app.use(bodyParser.urlencoded({limit : "30mb", extended : true})); 
// app.use(cors());

app.use(cors({origin: 'https://what-to-wear-frontend.vercel.app'}));

app.use('/user', userRoutes);
app.use('/outfits', outfitRoutes);
app.use('/wardrobe', wardrobeRoutes);

const PORT = process.env.PORT || 5000; 

mongoose.connect(process.env.CONNECTION_URL, 
{useNewUrlParser : true, useUnifiedTopology : true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
    .catch((error) => console.log(error.message));

export default app;