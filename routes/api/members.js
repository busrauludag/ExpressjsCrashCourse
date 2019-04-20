const express = require('express');
const uuid = require('uuid');
const router = express.Router();

const members = require('../../Members.js');

// Gets All Members
router.get('/', (req, res) => {
  res.json(members);
});

// Get Single Member
router.get('/:id', (req, res) => {
  // res.send(req.params.id);
  const found = members.some(memeber => memeber.id === parseInt(req.params.id)); // it returns true or false

  if(found){
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  }else{
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Create New Member
router.post('/', (req, res) => {
  // res.send(req.body);
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  }

  if(!newMember.name || !newMember.email){
    return res.status(400).json({ msg: 'Please include a name and an email!' });
  }

  members.push(newMember);
  res.json(members);
});

// Update Member


module.exports = router;