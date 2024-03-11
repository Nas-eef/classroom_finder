import db from "../config/db.js";

export const deleteUser = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ error: 'Missing user ID' });
    }

    const sql = "DELETE FROM users WHERE id = ?";
    const values = [id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('user deleted');
        res.status(200).json({ message: "User deleted successfully" });
    });
};

export const deleteStaff = (req, res) => {
    const id = req.params.id;
    console.log(id);

    if (!id) {
        return res.status(400).json({ error: 'Missing  ID' });
    }

    const sql = "DELETE FROM staffs WHERE id = ?";
    const values = [id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error deleting ', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('Owner deleted');
        res.status(200).json({ message: "Deleted successfully" });
    });
};
export const deleteBlock = (req, res) => {
    const id = req.params.id;
    console.log(id);

    if (!id) {
        return res.status(400).json({ error: 'Missing  ID' });
    }

    const sql = "DELETE FROM blocks WHERE id = ?";
    const values = [id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error deleting ', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('Block deleted');
        res.status(200).json({ message: "Deleted successfully" });
    });
};
export const deleteClassroom = (req, res) => {
    const id = req.params.id;
    console.log(id);

    if (!id) {
        return res.status(400).json({ error: 'Missing  ID' });
    }

    const sql = "DELETE FROM classrooms WHERE id = ?";
    const values = [id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error deleting ', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('ClassRoom deleted');
        res.status(200).json({ message: "Deleted successfully" });
    });
};

