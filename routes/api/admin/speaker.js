const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken")
const keys = require("../../../config/keys")
const passport = require("passport");

// TODO: Validate speaker input fields
// Load input validation
const validateSpeakerInput = require("../../../validation/speaker");

// bcrypt for password hash
const bcrypt = require("bcryptjs")

/*** LOAD MODELS ***/
const Project = require("../../../models/Project")
const Speaker = require("../../../models/Speaker")
/******************/

// @route   GET api/admin/speaker/:project_id
// @desc    Get all the speakers by project_id
// @access  Private
router.get('/:project_id', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
    Project.findOne({ _id: req.params.project_id })
        .then(project => {
            const id = project._id
            Speaker.find({ project_id: { 
                $eq: id
                } 
            })
            .then(speakers => res.status(200).json(speakers))
        })
        .catch(err => res.status(400).json(err))
})

// @route   POST api/admin/speaker/create
// @desc    Create a new speaker
// @access  Private
router.post('/create', passport.authenticate('jwt-admin', { session: false }), (req, res) => {

    const speakerFields = {}
    speakerFields.user = req.user.id
    if (req.body.name) speakerFields.name = req.body.name
    if (req.body.lastname) speakerFields.lastname = req.body.lastname
    if (req.body.email) speakerFields.email = req.body.email
    if (req.body.grade) speakerFields.grade = req.body.grade
    if (req.body.bio) speakerFields.bio = req.body.bio
    if (req.body.country) speakerFields.country = req.body.country
    if (req.body.project_id) speakerFields.project_id = req.body.project_id

    Project.findOne({ _id: req.body.project_id})
        .then(project => {
            if (project) {
                new Speaker(speakerFields).save()
                    .then(speaker => res.status(200).json(speaker))
                    .catch(err => res.status(400).json(err))
            } else {
                let err = 'The project_id does not exists'
                return res.status(400).json(err)
            }
        })
        .catch(err => res.status(400).json(err))
})

// @route   GET api/admin/speaker/:id
// @desc    Get the speaker by Id
// @access  Private
router.get('/:id', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
    Speaker.findOne({ _id: req.params.id })
        .then(speaker => {
            return res.status(200).json(speaker)
        })
        .catch(err => res.status(400).json(err))
})

module.exports = router
