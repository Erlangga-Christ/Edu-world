// const express = require("express");
// const app = express();
// const port = 3000;

// app.set("view engine", "ejs");

// app.use(express.urlencoded({ extended: true }));

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
//   });

// const express = require('express')
// const app = express()
// const port = 3003
// const router = require('./routers/index')
// const session = require('express-session')
// const PDFDocument = require('pdfkit');
// const path = require('path');

// app.set('views/appointment', path.join(__dirname, 'views'));
// app.use(express.static(__dirname + '/public'));
// app.use(express.urlencoded({ extended: true }))
// app.set('view engine', 'ejs')

// app.use(session({
//     secret: 'rahsiaa ngab',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure: false,
//         sameSite: true
//     },
// }))

// app.use(router)

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

// ==> controller login

// const { User } = require('../models')
// class LoginController {

//     static async loginUser(req, res) {
//         try {
//             const { error } = req.query
//             res.render('login/loginUser', { error })
//         } catch (error) {
//             res.send(error)
//         }
//     }

//     static async saveLoginUser(req, res) {
//         try {
//             const { username, password } = req.body
//             const isVlaidLogin = await User.checkLogin(username, password)
//             if (isVlaidLogin) {
//                 req.session.user = { id: isVlaidLogin.id, role: isVlaidLogin.role, username: isVlaidLogin.username }
//             }
//             res.redirect('/')
//         } catch (error) {
//             if (error.name === 'errorLogin') {
//                 return res.redirect('/login?error=' + error.msg)
//             }
//             res.send(error)
//         }
//     }

//     static async registerForm(req, res) {
//         try {
//             const { error } = req.query
//             res.render('login/register', { error })
//         } catch (error) {
//             res.send(error)
//         }
//     }

//     static async saveRegister(req, res) {
//         try {
//             const { username, password, email } = req.body
//             await User.create({ username, password, email })
//             res.redirect('/login')
//         } catch (error) {
//             if (error.name === 'SequelizeValidationError') {
//                 const err = error.errors.map(el => {
//                     return el.message
//                 })
//                 return res.redirect('/login/register?error=' + err)
//             }
//             res.send(error)
//         }
//     }

//     static logout(req, res) {
//         try {
//             req.session.destroy(err => {
//                 if (err) throw err
//                 res.redirect('/login')
//             })
//         } catch (error) {
//             res.send(error)
//         }
//     }
// }

// module.exports = LoginController

// ==============={user.model}========================
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// const bcrypt = require('bcrypt');

// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {

//     static associate(models) {
//       // define association here
//       User.hasOne(models.UserProfile, {
//         foreignKey: 'UserId'
//       })
//       User.belongsToMany(models.Doctor, {
//         through: 'Appointment'
//       })
//     }

//     static async checkLogin(username, password) {
//       const getUser = await User.findOne({
//         where: {
//           username
//         }
//       })
//       let getErrors = {
//         name: 'errorLogin',
//         msg: []
//       }
//       if (!getUser) {
//         getErrors.msg.push('Username or password invalid')
//       } else {
//         const isPasswordValid = await bcrypt.compare(password, getUser.password)
//         if (!isPasswordValid) {
//           getErrors.msg.push('Username or password invalid')
//         }
//       }

//       if (getErrors.msg.length > 0) {
//         throw getErrors
//       }

//       return getUser
//     }

//   }
//   User.init({
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notEmpty: {
//           msg: 'Username tidak boleh kosong'
//         },
//         notNull: {
//           msg: 'Username tidak boleh kosong'
//         },
//         async cekUsername(value) {
//           if (value.length < 5) {
//             throw new Error('Username minimum 5 karakter');
//           }
//           const existingUser = await User.findOne({ where: { username: value } });
//           if (existingUser) {
//             throw new Error('Username sudah ada tolong pakai username lain gan');
//           }
//         }
//       }
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notEmpty: {
//           msg: 'Email tidak boleh kosong'
//         },
//         notNull: {
//           msg: 'Email tidak boleh kosong'
//         }
//       }
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notEmpty: {
//           msg: 'Password tidak boleh kosong'
//         },
//         notNull: {
//           msg: 'Password tidak boleh kosong'
//         }
//       },
//       cekPassword(value) {
//         if (value.length < 8) {
//           throw new Error('Password minimum 8 karakter')
//         }
//       }
//     },
//     role: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'User',
//   });

//   User.beforeCreate(async (instance) => {

//     const saltRounds = 8;
//     const myPlaintextPassword = instance.password;

//     const hash = await bcrypt.hash(myPlaintextPassword, saltRounds)
//     instance.password = hash
//     instance.role = 'user'
//   })
//   return User;
// };
