import db from "../config/db.js";


export const getUsers = (req,res)=>{
    const sql = "Select * from users ";
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error getting user:', err);
        res.status(500).json({ error: 'Error ' });
        return;
      }
      res.status(200).json({ data:result });
  });
}
export const getStaff = (req,res)=>{
    const sql = "Select * from Staffs ";
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error getting Staffs:', err);
        res.status(500).json({ error: 'Error ' });
        return;
      }
      res.status(200).json({ data:result });
  });
}
export const getBlocks = (req,res)=>{
    const sql = "Select * from Blocks ";
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error getting Block:', err);
        res.status(500).json({ error: 'Error ' });
        return;
      }
      res.status(200).json({ data:result });
  });
}
export const getClassrooms = (req,res)=>{
    const sql = "Select * from classrooms ";
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error getting classrooms:', err);
        res.status(500).json({ error: 'Error ' });
        return;
      }
      res.status(200).json({ data:result });
  });
}
export const getEvents = (req,res)=>{
    const sql = "Select * from events ";
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error getting Events:', err);
        res.status(500).json({ error: 'Error ' });
        return;
      }
      res.status(200).json({ data:result });
  });
}
export const getClassMap = (req, res) => {
  const { roomNumber } = req.body;
  console.log('Received roomNumber:', roomNumber); // Log the received roomNumber
  const sql = `
      SELECT c.*, b.image
      FROM classrooms c
      JOIN blocks b ON c.block = b.name
      WHERE c.room_number = ?
  `;
  db.query(sql, [roomNumber], (err, result) => {
      if (err) {
          console.error('Error getting Classroom:', err);
          res.status(500).json({ error: 'Error ' });
          return;
      }
      console.log(result);
      res.status(200).json({ data: result });
  });
};




