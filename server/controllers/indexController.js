const bycrypt = require('bcrypt')

const User = require('../models/user')

exports.user_create_post = async (req, res) => {
  try {
    const user = await User.find({ name: req.body.username });

    if (user.length > 0) {
      return res.send({ code: 409, errorMessage: "Username taken" });
    }

    const { name, _id: userId } = await User.create({
      name: req.body.username,
      password: req.body.password,
    });

    res.send({ code: 1, data: { userId, name } });
  } catch (error) {
    console.error("user_create_post", error);
    res.send({ error: "Something went wrong" });
  }
};
  
exports.user_login_post = async (req, res) => {
  try {
    const user = await User.find({ name: req.body.username });

    if (user.length < 1) {
      return res.send({code: 404, errorMessage: 'Not registered'})
    }

    bycrypt.compare(req.body.password, user[0].password, function(err, result) {
      if (result) {
        const { name, _id: userId } = user[0]
        res.send({ code: 1, data: {name, userId} })
      } else {
        res.send({code: 401, errorMessage: 'Incorrect credentials'})
      }
    })
  } catch (error) {
    console.log('user_login_post', error)
    res.send({errorMessage: 'Something went wrong'})
  }
}

exports.list_of_users_get = async (req, res) => {
  const query = await User.find({})
  let usersList = query.map(user => ({ 
    id: user._id,
    name: user.name
}));

  res.send({ code: 1, data: usersList})
}