import db from '../config/db.js'



export const addusers = (req, res) => {
    const { name, email, password, phoneNumber} = req.body;
  
    const sql = "INSERT INTO users (name, email, password, phone_number) VALUES (?, ?, ?, ?)";
    const values = [name, email, password, phoneNumber]; // Removed the duplicate'
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error adding user:', err);
        res.status(500).json({ error: 'Error adding user' });
        return;
      }
      console.log('User added successfully');
      res.status(200).json({ message: 'User added successfully' });
    });
};

export const addStaff = (req, res) => {
    const { name, email, password, phoneNumber} = req.body;
  
    const sql = "INSERT INTO staffs (name, email, password, phone_number) VALUES ( ?, ?, ?,? )";
    const values = [name, email, password, phoneNumber]; 
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error adding Staff:', err);
        res.status(500).json({ error: 'Error adding Staff' });
        return;
      }
      console.log('Staff added successfully');
      res.status(200).json({ message: 'Staff added successfully' });
    });
  };
export const addClassroom = (req, res) => {
    const { room_number, block, floor} = req.body;
  
    const sql = "INSERT INTO classrooms (room_number, block, floor) VALUES ( ?, ?,? )";
    const values = [room_number, block, floor]; 
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error adding Classroom:', err);
        res.status(500).json({ error: 'Error adding Classroom' });
        return;
      }
      console.log('Classroom added successfully');
      res.status(200).json({ message: 'Classroom added successfully' });
    });
  };

export const addEvents = (req, res) => {
    const {event_name,description,room_number,date,staff_id} = req.body;
  
    const sql = "INSERT INTO events (event_name,description,room_number,date,staff_id) VALUES ( ?,?, ?,?,? )";
    const values = [event_name,description,room_number,date,staff_id]; 
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error adding Event:', err);
        res.status(500).json({ error: 'Error adding Event' });
        return;
      }
      console.log('Event added successfully');
      res.status(200).json({ message: 'Event added successfully' });
    });
  };
  



  