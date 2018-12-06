const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateProjectInput(data) {
    let errors = {}

    data.name = !isEmpty(data.name) ? data.name : ''
    data.description = !isEmpty(data.description) ? data.description : ''
    data.platform = !isEmpty(data.platform) ? data.platform : ''

    if (!Validator.isLength(data.name, { min: 2, max: 100 })) {
        errors.name = "Project name should contain between 2 and 100 characters"
      }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Project name is required'
      }

    if (!Validator.isLength(data.description, { min: 2, max: 100 })) {
        errors.description = "Project description should contain between 2 and 100 characters"
      }

    if (Validator.isEmpty(data.description)) {
        errors.description = "A description is required"
      }

    if (Validator.isEmpty(data.platform)) {
        errors.platform = "A platform technology is required"
      }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
