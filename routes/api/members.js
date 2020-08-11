const express = require('express');
const uuid = require('uuid');
const members = require('../../Members');

const router = express.Router();

// Gets All members
router.get('/', (req, res) => res.json(members));

// Get single member
router.get('/:id', (req, res) => {
  const found = members.filter(
    (members) => members.id === parseInt(req.params.id)
  );

  if (found.length > 0) {
    res.json(found);
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Create Member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active',
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: 'Please include name & email' });
  }

  members.push(newMember);
  res.json(members);
});

// Update Member
router.put('/:id', (req, res) => {
  const found = members.filter(
    (members) => members.id === parseInt(req.params.id)
  );

  if (found.length > 0) {
    const updateMember = req.body;
    found[0].name = updateMember.name ? updateMember.name : found[0].name;
    found[0].email = updateMember.email ? updateMember.email : found[0].email;
    res.json({ msg: 'Member updated', member: found[0] });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Delete member
router.delete('/:id', (req, res) => {
  const found = members.filter(
    (members) => members.id === parseInt(req.params.id)
  );

  if (found.length > 0) {
    res.json({
      msg: 'Member deleted',
      member: members.filter((member) => member.id !== parseInt(req.params.id)),
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

module.exports = router;
