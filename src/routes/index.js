const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/register', (req, res) => {
    const { email, password } = req.body;
    req.session.user_data = {email, password};
    req.flash('success', 'Now You are Registered')
    res.redirect('/profile');
});

router.get('/profile', (req, res) => {
    const user = req.session.user_data;

    if(user){
        res.render('profile', {
            user
        });
    }
    if(!user){
        res.redirect('/');
    }
});


router.get('/logout', (req, res) => {
    //delete req.session.user_data;
    req.session.destroy();
    res.redirect('/')
});

module.exports = router;