const User = require("../models/User");
const Comment = require("../models/Comment");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
    let errors = { username: "", email: "", password: "" };

    //incorrect email
    if (err.message === "Incorrect email") {
        errors.email = "Incorrect email";
    }

    //incorrect password
    if (err.message === "Incorrect password") {
        errors.password = "Incorrect password";
    }

    //validation errors
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;

}

const maxAge = 3 * 24 * 60 * 60


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
}

module.exports.signup_post = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        //duplicate email or username errors
        let errors = await User.isDuplicateUser(username, email);
        if (errors.email !== "" || errors.email !== "") {
            res.status(400).json({ errors });
            return;
        }
        const user = await User.create({ username, email, password });
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user.username });
    } catch (err) {
        errors = handleErrors(err);
        res.status(400).json({ errors });
    }

}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user.username });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.end();
}

module.exports.auth_post = (req, res) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.statusMessage = "Invalid token";
                res.status(400).json({ err: "Invalid token" });
            } else {
                try {
                    let user = await User.findById(decodedToken.id);
                    res.status(201).json({ user: user.username });
                } catch (err) {
                    console.log(err);
                    res.status(400).json({ err });
                }
            }
        })
    } else {
        res.statusMessage = "Invalid token";
        res.status(400).json({ err: "Invalid token" });
    }
}

module.exports.comment_post = (req, res) => {
    const token = req.cookies.jwt;
    const { content, user, post_id } = req.body;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.statusMessage = "Invalid token";
                res.status(400).json({ err: "Invalid token" });
            } else {
                try {
                    const comment = await Comment.create({ user, post_id, content });
                    res.status(201).json({ comment });
                } catch (err) {
                    console.log(err);
                    res.status(400).json({ err });
                }
            }
        })
    } else {
        res.statusMessage = "Invalid token";
        res.status(400).json({ err: "Invalid token" });
    }
}

module.exports.comment_get = (req, res) => {
    const post_id = req.params.id;
    Comment.find({ post_id: post_id }, (error, data) => {
        if (error) {
            console.log(error);
            res.status(400).json({ error });
        } else {
            res.status(200).json(data);
        }
    })
}