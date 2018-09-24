const mongoose =  require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const tokenGenerator = require('token-generator')({
  salt: 'welcome to my api ',
  timestampMap: 'abcdefghig'
})

const UserSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1,
  },
  email:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid Email, check your Email and try again'
    }
  },
  password:{
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  token:{
    access:{
      type: String,
      required: true, 
    },
    token:{
      type: String,
      required: true,
    }
  },
  verificationToken:{
    type: String,
    default: 0
  }
});

UserSchema.pre('save', function(next){
  const user = this;
  try{
    if (user.isModified('password')){
      bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(user.password, salt, function(err, hash){
          user.password = hash;
          next();
        });
      });
    }else{
    next();
    }
  }catch(e){
    next();
  }
});

UserSchema.methods.generateAuthToken = async function (){
  try{
    const user = this;
    const access = 'Bearer';
    const token = jwt.sign({_id: user._id.toHexString(),access},'bewareOfHackers').toString();
    user.token.access = access;
    user.token.token = token; 
    await user.save();
    return token;
  }catch(e){
    return e;
  }
};

UserSchema.statics.findByCredentials = async function(email, password){
  const Users = this;
  try{
    const user = await Users.findOne({email});
    if (!user){
    return new Error('Email or Password Not Found');
    };

  let verified = await bcrypt.compare(password, user.password);
    if (verified){
      return user
    }else{
      return new Error('Email or Password is Incorrect');
    }
  }catch(e){
    return e;
  }
};

UserSchema.methods.verifyToken = async function(){
  try{
    const user = this;
    const verificationToken = tokenGenerator.generate();
    user.verificationToken = verificationToken;
    await user.save();
    return verificationToken;
  }catch(e){
    return e;
  }
}

UserSchema.methods.signOut = async function(token){
  const user = this;
  return user.updateOne({
    $unset:{
      token: {token}
    }
  });
};

UserSchema.statics.findByToken = async function(token){
  const Users = this;
  let decoded;
  try{
    decoded = jwt.verify(token,'bewareOfHackers')
    if (!decoded){
      throw new Error('Authorised to Perform this Action');
    }
    return Users.findOne({
      _id: decoded._id,
      'token.access': 'Bearer',
      'token.token': token
    });
  }catch(e){
    return e;
  }
};

const Users = mongoose.model('Users',UserSchema);

module.exports = {Users};