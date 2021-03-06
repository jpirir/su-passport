var Joi = require('joi');

module.exports = {
    // POST /api/users
    createUser: {
        body: {
            username: Joi.string().required(),
            mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
        }
    },
    // POST /api/posts
    createPost: {
        body: {
            title: Joi.string().required(),
        }
    },
    // UPDATE /api/users/:userId
    updateUser: {
        body: {
            username: Joi.string().required(),
            mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
        },
        params: {
            userId: Joi.string().hex().required()
        }
    },
    // UPDATE /api/posts/:postId
    updatePost: {
        body: {
            title: Joi.string().required(),
        },
        params: {
            postId: Joi.string().hex().required()
        }
    },
    // POST /api/auth/login
    login: {
        body: {
            loginType: Joi.string().required(),
            socialId: Joi.string(),
            socialType: Joi.string(),
            email: Joi.string(),
            password: Joi.string()
        }
    }
};