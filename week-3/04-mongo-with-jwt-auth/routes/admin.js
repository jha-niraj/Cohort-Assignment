const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config");

const { Admin, Course } = require("../db");

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.headers.username;
    const password = req.headers.password;
    
    await Admin.create({
        username,
        password
    })
    res.json({
        msg: "Admin created successfully"
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.headers.username;
    const password = req.headers.password;

    const user = await Admin.find({
        username,
        password
    })
    if(user) {
        const token = jwt.sign({
            username
        }, jwt_secret);
        res.json({
            token
        })
    } else {
        res.json({
            msg: "Admin is not authenticated!!!"
        })
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const newCourse = await Course.create({
        title: title,
        descritpion: description,
        imageLink: imageLink,
        price: price
    })
    res.json({
        msg: "Course created successfully",
        courseId: newCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const allCourses = await Course.find({});
    res.json({
        course: allCourses
    })
});

module.exports = router;