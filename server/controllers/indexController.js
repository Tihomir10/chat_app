const User = require('../models/user')

exports.user_create_post = (req, res) => {
  const user = new User({
    name: req.body.username,
    password: req.body.password
  })

  user.save(function (err) {
    if (err) return handleError(err);
  });
  res.send('done')
}