const validator = require("validator")

exports.customValidator = (userData) => {
    console.log(userData);
    isError = false
    error = []

    for (const key in userData) {
        if (validator.isEmpty(userData[key])) {
            isError = true
            error.push(`${key} is required`)
        }
    }

    if (!spaceAllowed(userData.fname)) {
        isError = true
        error.push("First name cannot contain spaces")
    }

    if (!spaceAllowed(userData.lname)) {
        isError = true
        error.push("Last name cannot contain spaces")
    }

    if (!validator.isEmail(userData.email)) {
        isError = true
        error.push("Please enter a valid email")
    }

    if (!validator.isMobilePhone(userData.phone, "en-IN", { strictMode: false })) {
        isError = true
        error.push("Please enter a valid phone number")
    }
    return { isError, error }

}

const spaceAllowed = (field) => {
    const regex = /\s/;
    return !regex.test(field);
}