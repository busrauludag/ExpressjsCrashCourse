const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const members = require('./Memebers');

const app = express();

// Init Middleware
app.use(logger);

// Gets All Members
app.get('/api/members', (req, res) => {
  res.json(members);
});

// Get Single Member
app.get('/api/members/:id', (req, res) => {
  // res.send(req.params.id);
  const found = members.some(memeber => memeber.id === parseInt(req.params.id)); // it returns true or false

  if(found){
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  }else{
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
  
});

/**
 * app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'index.html'));
 });
 */

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

