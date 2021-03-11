const bycrypt = require('bcrypt')

const User = require('../models/user')

exports.user_create_post = async (req, res) => {
  const query = await User.find({ name: req.body.username }).exec()
  if (Array.isArray(query) && query.length) {
    res.send({code: 409, error: 'Username taken'})
  } else if (Array.isArray(query) && !query.length) {
    const user = new User({
      name: req.body.username,
      password: req.body.password
    })
  
    user.save(function (err) {
      if (err) return handleError(err);
    });
    const { name, _id } = user
    res.send({name, userId: _id, code: 201, redirectUrl: '/chat'})
  } else {
    res.send({error: 'Something went wrong'})
  }
}

exports.user_login_post = async (req, res) => {
  const query = await User.find({ name: req.body.username }).exec()

  if (Array.isArray(query) && query.length) {
    bycrypt.compare(req.body.password, query[0].password, function(err, result) {
      if (result) {
        const { name, _id } = query[0]
        res.send({name, userId: _id, code: 201, redirectUrl: '/chat'})
      } else {
        res.send({code: 401, error: 'Incorrect credentials'})
      }
    })    
  } else if (Array.isArray(query) && !query.length) {
    res.send({code: 404, error: 'Not registered'})
  } else {
    res.send({error: 'Something went wrong'})
  }
}

exports.list_of_users_get = async (req, res) => {
  const query = await User.find({})
  res.send({data: query})
}