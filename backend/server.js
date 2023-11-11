const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
port = 8081;


const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root@54321',
      database: 'workflow'
});

app.post('/signup', (req, res) => {
    const name = req.body['name'];
    const email = req.body['email'];
    const password = req.body['password'];

    const sql = "INSERT INTO users (Name, Email, Password) VALUES (?, ?, ?)";
    const values = [name, email, password];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (data.affectedRows > 0) {
            return res.json({ message: "User registered successfully" });
        } else {
            return res.json({ error: "Error in registering user" });
        }
    });
});

app.post('/login', (req, res) => {
    const email = req.body['email'];
    const password = req.body['password'];

    const sql = "SELECT * FROM users WHERE Email = ? AND Password = ?";

    db.query(sql, [email, password], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (data.length > 0) {
            return res.json({ message: "successfully", id: data[0].Id });
        } else {
            return res.json({ error: "failed" });
        }
    });
});

// app.get('/workflow', (req, res) => {
//     const sql = "SELECT * FROM workflow_table";

//     db.query(sql, (err, data) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ error: "Internal Server Error" });
//         }
//         return res.json(data);
//     });
// });

app.post('/workflow/:name/:user', (req, res) => {
    const WorkflowName = req.params.name;
    const UserId = req.params.user;
  
    // Prepare the SQL query
    const sql = `INSERT INTO workflow_table (WorkflowName,user_Id, Status) VALUES (?,?, "Pending")`;
  
    // Execute the query with the specified values
    db.query(sql, [WorkflowName, UserId], (err, results) => {
      if (err) {
        console.error('Error inserting into database:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).send('Workflow Created Successfully');
      }
    });
  });

app.post('/taskAll/:title/:content/:id', (req, res) => {
    const title = req.params.title;
    const Content = req.params.content;
    const workId = req.params.id;
  
    // Prepare the SQL query
    const sql = `INSERT INTO node_table (title,Content, workflow_Id,Status) VALUES (?,?, ?,"Pending")`;
  
    // Execute the query with the specified values
    db.query(sql, [title, Content,workId], (err, results) => {
      if (err) {
        console.error('Error inserting into database:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).send('Workflow Created Successfully');
      }
    });
  });

  app.get('/alltask/:id/:user', (req, res) => {
    const flowId = req.params.id;
    const UserId = req.params.user;

    const sql = `
        SELECT DISTINCT node_table.title, node_table.Content
        FROM node_table
        INNER JOIN workflow_table ON node_table.workflow_Id = workflow_table.Id
        INNER JOIN users ON workflow_table.user_Id = users.Id
        WHERE node_table.workflow_Id = ? AND users.Id = ?
    `;

    db.query(sql, [flowId, UserId], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});


app.get('/workflow/:type/:user', (req, res) => {
    const option = req.params.type;
    const UserId = req.params.user;
    let sql = 'SELECT * FROM workflow_table WHERE user_Id = ?';

    switch (option) {
        case 'Completed':
            sql += ' AND Status = ?';
            break;
        case 'Pending':
            sql += ' AND Status = ?';
            break;
        default:
            // No need to modify the SQL for the 'All' case
            break;
    }

    db.query(sql, [UserId, option], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});
app.delete('/workflow/:id/:user', (req, res) => {
    const workflowId = req.params.id;
    const UserId = req.params.user;

    // Use transactions to ensure atomicity
    db.beginTransaction((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        // Delete from node_table
        const deleteNodeTableQuery = "DELETE FROM node_table WHERE workflow_Id = ?";
        db.query(deleteNodeTableQuery, [workflowId], (err, data) => {
            if (err) {
                console.error(err);
                return db.rollback(() => res.status(500).json({ error: "Internal Server Error" }));
            }

            // Delete from workflow_table
            const deleteWorkflowTableQuery = "DELETE FROM workflow_table WHERE Id = ? AND user_Id = ?";
            db.query(deleteWorkflowTableQuery, [workflowId, UserId], (err, data) => {
                if (err) {
                    console.error(err);
                    return db.rollback(() => res.status(500).json({ error: "Internal Server Error" }));
                }

                // Commit the transaction if all queries are successful
                db.commit((err) => {
                    if (err) {
                        console.error(err);
                        return db.rollback(() => res.status(500).json({ error: "Internal Server Error" }));
                    }

                    res.json({ message: 'Workflow deleted successfully', deletedWorkflowId: workflowId });
                });
            });
        });
    });
});


app.listen(port, () => {
      console.log(`Server is running at port ${port}`);
});