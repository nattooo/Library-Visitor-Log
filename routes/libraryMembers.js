const router = require ('express').Router() // express router

//To use Flash message
const session = require('express-session')
const flash = require('connect-flash');

const { body, validationResult } = require('express-validator');

require('../utils/db')  // call mongoose
const LibraryMember = require('../model/libraryMember'); // mongoose schema for librarymembers collection
const VisitorLog = require('../model/visitor-log') // mongoose schema for visitorlogs collection

// Flash message configuration
router.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
)
router.use(flash())

// Homepage
router.get('/', async (req,res) => {
  const msg = req.flash('msg')[0]
  //using [0] cz i just use single flash message, so i try to get the first flash message, if i did not include [0] means I want to take array of messages from msg

  res.render('index', {
    title: 'Homepage',
    layout: 'layouts/main-layout',
    msg: msg || undefined, //set msg to undefined if it's falsy or an empty string
  })
})


// Sign Up Form
router.get('/account', async (req,res) => {
  const libraryMembers = await LibraryMember.find()

  res.render('signup', {
    title: 'Sign Up',
    layout: 'layouts/main-layout',
    libraryMembers,
  })
})


// Sign Up Data Process
router.post('/account', [
  body('id')
    .custom(async value => {
      const duplicate = await LibraryMember.findOne({id: value})
      if (duplicate) {
        throw new Error('NIK is already exist!')
      }
      return true
    })
    .isNumeric().withMessage('NIK must be number')
    .isLength({min: 16, max:16}).withMessage('NIK have 16 digit'),
  body('phoneNumber', 'Phone number is not valid!').isMobilePhone('id-ID')
], async (req,res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.render('signup', {
        title:'Sign Up',
        layout: 'layouts/main-layout',
        errors: errors.array(),
      })
    }

    await LibraryMember.create(req.body)
    // send flash message before redirect
    req.flash('msg', 'Successfully created an account');
    res.redirect('/');

  } catch (error) {
    // Handle other error appropriately
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
})


// Homepage Form Id Submission
router.post('/submit', async (req, res) => {
  let msg
  try {
    const memberId = req.body.id
    const libraryMember = await LibraryMember.findOne({ id: memberId })

    // If member is not found
    if (!libraryMember) { 
      const errors = 'Member not found. Please Sign Up'

      return res.render('index', {
        title: 'Homepage',
        layout: 'layouts/main-layout',
        errors,
        msg,
      })
    }
    
    // If member is found
    res.redirect(`/account/${memberId}`)
    
  } catch (error) {
      // Handle other potential errors (e.g., database error)
      console.log(error)
      res.status(500).send('Internal Server Error')
  }
})


// Account
router.get('/account/:id', async (req,res) => {
  const msg = req.flash('msg')[0]
  const libraryMember = await LibraryMember.findOne({id: req.params.id})

  // Format the birth date to display only the date part
  const formattedBirthDate = libraryMember.birthDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Recent visit
  const visits = await VisitorLog.find({id: req.params.id})
  .sort({'visit': -1}) // Order by latest visit
  .limit(5)


  res.render('account', {
    title: 'Account',
    layout: 'layouts/main-layout',
    libraryMember: {
      ...libraryMember.toObject(), // Convert to plain object for rendering, cz I want to change birthdate format
      birthDate: formattedBirthDate
    },
    visits,
    msg: msg || undefined, //set msg to undefined if it's falsy or an empty string
  })
})


// Delete Data Process
router.delete('/account', (req, res) => {
  LibraryMember.deleteOne({id: req.body.id}).then(() => {
    req.flash('msg', 'Contact is successfully deleted')
    res.redirect('/')
  })
})


// Edit Form
router.get('/edit/:id', async (req, res) => {
  const libraryMember = await LibraryMember.findOne({id: req.params.id})

  res.render('edit-member', {
    title: 'Edit Member Information',
    layout: 'layouts/main-layout',
    libraryMember,
  })
})


// Edit Process
router.put('/account/:id', [
  body('id')
    .custom(async (value, {req}) => {
      const duplicate = await LibraryMember.findOne({id: value})
      if ( value !== req.body.oldId && duplicate) {
        throw new Error('NIK is already exist!')
      }
      return true
    })
    .isNumeric().withMessage('NIK must be number')
    .isLength({min: 16, max:16}).withMessage('NIK have 16 digit'),
  body('phoneNumber', 'Phone number is not valid!').isMobilePhone('id-ID')
],
async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.render('edit-member', {
        title:'Edit Member Information',
        layout: 'layouts/main-layout',
        errors: errors.array(),
        libraryMember: req.body, // Get information from req.body in edit-member
      })
    }

    LibraryMember.updateOne(
      {_id : req.body._id},
      {
        $set: {
          id: req.body.id,
          name: req.body.name,
          sex: req.body.sex,
          birthDate: req.body.birthDate,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
        }
      }
    ).then( () => {
      // send flash message before redirect
      req.flash('msg', 'Contact is successfully edited')
      const memberId = req.body.id
      res.redirect(`/account/${memberId}`);
    })

  } catch (error) {
    // Handle other error appropriately
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
})

module.exports = router