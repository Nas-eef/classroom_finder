import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import addRoutes from '../Backend/routes/addRoute.js'
import authRoutes from '../Backend/routes/authRoutes.js'
import getRoutes from '../Backend/routes/getRoute.js'
import deleteRoutes from '../Backend/routes/deleteRoute.js'
import updateRoutes from '../Backend/routes/updateRoute.js'
import db from './config/db.js';
import multer from "multer";
import path from "path";
import { log } from 'console';

const app = express();
app.use(express.json());
app.use(cors(
    {
        origin:["http://localhost:3000"],
        methods:['GET , POST ,PUT','DELETE'],
        credentials:true
      }
      ))
      
app.use('/api/auth',authRoutes)
app.use('/api/add', addRoutes)
app.use('/api/get', getRoutes)
app.use('/api/update', updateRoutes)
app.use('/api/delete', deleteRoutes)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/src/Uploads'); // Save uploaded files in the 'uploads' folder
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp + file extension as filename
    }
  });
  
const upload = multer({ storage: storage });




app.post('/addHouseBoat', upload.single('productImage'), (req, res) => {
  console.log("hyyyy");
  if (!req.file) {
      res.status(400).json({ message: "No image file uploaded." });
      return;
  }
  const {owner_id, name, description, location,amenities ,rate } = req.body;
  console.log(req.body);
  const imagePath = req.file.filename;

  const BoatSql = "INSERT INTO boats (owner_id, name, description, location, amenities, rate, pic) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const BoatValues = [owner_id, name, description, location, amenities, rate, imagePath];
  db.query(BoatSql, BoatValues, (profileErr, BoatResult) => {
      if (profileErr) {
          console.error('Error adding Boat:', profileErr);
          res.status(500).json({ error: 'Error adding Boat' });
          return;
      }
      console.log('House boat added successfully');
      res.status(200).json({ message: 'House boat added successfully' });
  });
  
});
app.put('/UpdateHouseBoat/:id', upload.single('productImage'), (req, res) => {
  console.log("hyyyy");
  if (!req.file) {
    res.status(400).json({ message: "No image file uploaded." });
    return;
  }
  const {id}=req.params
  const {  owner_id, name, description, location, amenities, rate } = req.body;
  console.log(req.body);
  const imagePath = req.file.filename;

  const BoatSql = "UPDATE boats SET owner_id = ?, name = ?, description = ?, location = ?, amenities = ?, rate = ?, pic = ? WHERE id = ?";
  const BoatValues = [owner_id, name, description, location, amenities, rate, imagePath, id];
  db.query(BoatSql, BoatValues, (profileErr, BoatResult) => {
    if (profileErr) {
      console.error('Error updating Boat:', profileErr);
      res.status(500).json({ error: 'Error updating Boat' });
      return;
    }
    console.log('House boat updated successfully');
    res.status(200).json({ message: 'House boat updated successfully' });
  });
});


app.post('/addBlocks', upload.single('productImage'), (req, res) => {
  console.log("hyyyy");

    if (!req.file) {
        res.status(400).json({ message: "No image file uploaded." });
        return;
    }
    const imagePath = req.file.filename;
    const {name} =req.body
    console.log(req.body,"iddd");
    const sql = "INSERT INTO blocks (image,name) VALUES ( ?,?)";
    const values = [imagePath,name];  
    db.query(sql, values, (err, result) => {
      if (err) {
          console.error('Error adding Block:', err);
          res.status(500).json({ error: 'Error adding Block' });
          return;
      }
      console.log('Block added successfully');
      res.status(200).json({ message: 'Block added successfully' });
  });
  
});

app.post('/updateProduct/:id', (req, res) => {
const {id}=req.params
  const { product_name, product_type, product_cost,description} = req.body;  

  const sql = "UPDATE  products SET product_name=? ,product_type=? ,product_cost=?,description=? where id=?";
  const values = [product_name, product_type, product_cost,description,id];  

  db.query(sql, values, (err, result) => {
      if (err) {
          console.error('Error updating product:', err);
          res.status(500).json({ error: 'Error updating product' });
          return;
      }
      console.log('Product updated successfully');
      res.status(200).json({ message: 'Product updated successfully' });
  });
});



app.listen(8081, () => {
  console.log('Server is running');
});
