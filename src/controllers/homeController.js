import db from '../models';

let getHomePage = async (req, res) => {
    let data = await db.User.findAll();
    return res.render('homepage.ejs', {data: JSON.stringify(data)});
}

let getAboutPage = (req, res) => {
    return res.render('about');
}

module.exports = {
    getHomePage,
    getAboutPage
}