const express = require('express')
const router = express.Router()
const passport = require('passport')

const validateProjectInput = require('../../../validation/project')

/*** LOAD MODELS ***/
const User = require("../../../models/User")
const Project = require("../../../models/Project")
/******************/

// @route   GET api/admin/projects/
// @desc    Get all projects associated to the current authenticated user
// @access  Private
router.get('/', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
    User.findOne({ _id: req.user.id })
        .then(user => {
            Project.find({ user: { $eq: req.user.id }})
            .then(projects => res.status(200).json(projects))
            .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).json(err))
})

// @route   GET api/admin/projects/:id
// @desc    Get a project data by their id
// @access  Private
router.get('/:id', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
    User.findOne({ _id: req.user.id })
        .then(user => {
            Project.findOne({ _id: req.params.id })
                .then(project => res.status(200).json(project))
                .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).json(err))
})

// @route   POST api/admin/projects/create
// @desc    Create a new app project
// @access  Private
router.post('/create', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
    const { errors, isValid } = validateProjectInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }

    const projectFields = {}
    projectFields.user = req.user.id
    if (req.body.name) projectFields.name = req.body.name
    if (req.body.description) projectFields.description = req.body.description
    if (req.body.platform) projectFields.platform = req.body.platform

    Project.findOne({ name: req.body.name })
        .then(project => {
            if (project) {
                errors.name = 'The project name already exists'
                return res.status(400).json(errors)
            } else {
                new Project(projectFields).save()
                    .then(project => res.status(200).json(project))
                    .catch(err => res.status(400).json(err))
            }
        })
})

module.exports = router