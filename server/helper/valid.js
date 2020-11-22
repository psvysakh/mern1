const {check} = require('express-validator');

exports.validSignUp=[
    check('name','Name is required').trim().notEmpty(),
    check('email','Email must between 3 to 32 character')
        .isEmail()
        .withMessage('Please enter valid email')
        .normalizeEmail(),
    check('password','Password is required').trim().notEmpty(),
    check('password')
        .isLength({min:5})
        .withMessage('Password must contain min 5 Character')
        .matches(/\d/)
        .withMessage('Password must contain one digit')
   
]

exports.validSignIn=[
    check('email','Email must between 3 to 32 character')
        .isEmail()
        .withMessage('Please enter valid email')
        .normalizeEmail(),
    check('password','Password is required').trim().notEmpty(),
    check('password')
        .isLength({min:5})
        .withMessage('Password must contain min 5 Character')
        .matches(/\d/)
        .withMessage('Password must contain one digit')
   
]
exports.validEmail=[
    check('email','Email must between 3 to 32 character')
    .isEmail()
    .withMessage('Please enter valid email')
    .normalizeEmail()
]
exports.validPassword=[
    check('password','Password is required').trim().notEmpty(),
    check('password')
        .isLength({min:5})
        .withMessage('Password must contain min 5 Character')
        .matches(/\d/)
        .withMessage('Password must contain one digit')
]
