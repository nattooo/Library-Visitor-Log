const router = require ('express').Router() // express router

require('../utils/db')  // call mongoose
const VisitorLog = require('../model/visitor-log') // mongoose schema for visitorlogs collection

// Welcome Page
router.get('/welcome/:id', async (req, res) => {
  const visitorLog = await VisitorLog.findOne({id: req.params.id})

  res.render('welcome', {
    title: 'Welcome Page',
    layout: 'layouts/main-layout',
    visitorLog,
  })
})

// Enter Process
router.post('/welcome/:id', async (req,res) => {
  await VisitorLog.create(req.body)
  const memberId = req.body.id
  res.redirect(`/welcome/${memberId}`)
})


module.exports = router