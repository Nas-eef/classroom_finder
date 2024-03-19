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
export const getDepartments = (req,res)=>{
    const sql = "Select * from departments ";
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error getting classrooms:', err);
        res.status(500).json({ error: 'Error ' });
        return;
      }
      res.status(200).json({ data:result });
  });
}
export const getEvents = (req, res) => {
  const sql = `
      SELECT e.*, s.name, s.phone_number, s.department, s.designation
      FROM events e
      INNER JOIN staffs s ON e.staff_id = s.id
  `;
  db.query(sql, (err, result) => {
      if (err) {
          console.error('Error getting Events:', err);
          res.status(500).json({ error: 'Error ' });
          return;
      }
      res.status(200).json({ data: result });
  });
};

export const getClassMap = (req, res) => {
  const { query } = req.body;
  console.log('Received roomNumber:', query); // Log the received roomNumber
  const sql = `
      SELECT c.*, b.image
      FROM classrooms c
      JOIN blocks b ON c.block = b.name
      WHERE c.room_number = ?
  `;
  db.query(sql, [query], (err, result) => {
      if (err) {
          console.error('Error getting Classroom:', err);
          res.status(500).json({ error: 'Error ' });
          return;
      }
      console.log(result);
      res.status(200).json({ data: result });
  });
};
export const getDepartmentMap = (req, res) => {
  const { query } = req.body;
  console.log('Received text:', query); // Log the received roomNumber
  const sql = `
      SELECT c.*, b.image
      FROM departments c
      JOIN blocks b ON c.block = b.name
      WHERE c.name = ?
  `;
  db.query(sql, [query], (err, result) => {
      if (err) {
          console.error('Error getting Classroom:', err);
          res.status(500).json({ error: 'Error ' });
          return;
      }
      console.log(result);
      res.status(200).json({ data: result });
  });
};




