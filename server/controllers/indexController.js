const User = require('../models/user')

exports.user_create_post = async (req, res) => {
  const query = await User.find({ name: req.body.username }).exec()
  if (Array.isArray(query) && query.length) {
    res.send({code: 409})
  } else {
    const user = new User({
      name: req.body.username,
      password: req.body.password
    })
  
    user.save(function (err) {
      if (err) return handleError(err);
    });
    const { name, _id } = user
    res.send({name, userId: _id, code: 201})
  }
}