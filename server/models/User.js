const { Sequelize, Model } = require("sequelize");
const sequelize = require("../helpers/database/connectDatabase");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

class User extends Model {}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    surname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
    },
    birthdate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    aboutUs: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    profileImage: {
      type: Sequelize.STRING,
      defaultValue: "default.jpg",
      allowNull: true,
    },
    activationCode: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue : false,
      allowNull: false,
    },
    activeAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    isModified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    resetPasswordToken: {
      type: Sequelize.STRING,
    },
    resetPasswordExpire: {
      type: Sequelize.DATE,
    },
    activationToken: {
      type: Sequelize.DATE,
    }
  },
  {
    sequelize,
    modelName: "user",
  }
);

User.beforeCreate((user, options) => {

  if (!user.isModified) {
    return bcrypt.hash(user.password, 10)
    .then(hash => {
        user.password = hash;
        user.isModified = true;
    })
    .catch(err => { 
        throw new Error(); 
    });
  }
});

User.beforeSave((user) =>{

  if (!user.isModified) {
    return bcrypt.hash(user.password, 10)
    .then(hash => {
        user.password = hash;
        user.isModified = true;
    })
    .catch(err => { 
        throw new Error(); 
    });
  }
})



User.prototype.generateJwtFromUser = (user) => {
  const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;

  const payload = {
    id: user.id,
    name: user.name,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE });

  return token;
};

User.prototype.getResetPasswordTokenFromUser = function () {
  const randomHexString = crypto.randomBytes(15).toString("hex");
  const { RESET_PASSWORD_EXPIRE } = process.env;

  const resetPasswordToken = crypto
    .createHash("SHA256")
    .update(randomHexString)
    .digest("hex");

  this.resetPasswordToken = resetPasswordToken;
  this.resetPasswordExpire = Date.now() + parseInt(RESET_PASSWORD_EXPIRE);

  return resetPasswordToken;
};

User.prototype.getActivationToken = function(){
  const randomHexString = crypto.randomBytes(15).toString("hex");

  const activationToken = crypto
  .createHash("SHA256")
  .update(randomHexString)
  .digest("hex");

  this.activationToken = activationToken;

  return activationToken;
}

module.exports = User;
