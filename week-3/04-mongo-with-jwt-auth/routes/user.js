const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.headers.username;
    const password = req.headers.password;

    await User.create({
        username,
        password
    })
    res.json({
        msg: "User created successfully"
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.headers.username;
    const password = req.headers.password;

    const user = await User.find({
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
            msg: "User is not authenticated!!!"
        })
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const allCourses = await Course.find({});
    res.json({
        course: allCourses
    }) 
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const username = req.username;
    const courseId = req.params.courseId;

    await User.updateOne({
        username
    }, {
        $push: {
            purchasedCourses: courseId
        }
    })
    res.json({
        msg: "Course Updated Successfully"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.username;
    console.log(username)

    const user = await User.findOne({
        username: username
    })
    const purchasedCourse = await Course.find({
        _id: user.purchasedCourses
    })
    res.json({
        purchasedCourse: purchasedCourse
    })
});

module.exports = router