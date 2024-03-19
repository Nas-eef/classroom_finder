import db from "../config/db.js";


export const updateStaff = (req, res) => {
  const {id}=req.params

    const { name, email, password, phoneNumber, department, designation } = req.body;
  
    const sql = "UPDATE staffs SET name=?, email=?, password=?, phone_number=?, department=?, designation=? WHERE id=?";
    const values = [name, email, password, phoneNumber, department, designation, id];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error updating Staff:', err);
        res.status(500).json({ error: 'Error updating Staff' });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Staff not found' });
        return;
      }
      console.log('Staff updated successfully');
      res.status(200).json({ message: 'Staff updated successfully' });
    });
  };

  export const updateUserStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    const sql = "UPDATE users SET status=? WHERE id=?";
    const values = [status, id];
  
    db.query(sql, values, (err) => {
      if (err) {
        console.error('Error activating user:', err);
        res.status(500).json({ error: 'Error activating user' });
        return;
      }
      
      console.log('User status updated successfully');
      res.status(200).json({ message: 'Status updated successfully' });
    });
  };
  