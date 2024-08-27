const asyncHandler = require("express-async-handler")
const upload = require("../utils/upload")
const User = require("../models/User")
const fs = require("fs")
const path = require("path")
const { customValidator } = require("../utils/validator")

exports.createUser = asyncHandler(async (req, res) => {


    upload(req, res, async (err) => {
        const { fname, lname, email, phone, gender, status, profile, location } = req.body

        const { isError, error } = customValidator({ fname, lname, email, phone, gender, status, location })
        if (isError) {
            return res.status(400).json({ message: "All Fields Required", error })
        }

        const x = await User.findOne({ email })
        if (x) {
            return res.status(400).json({ message: "Email already exist" })
        }
        if (err) {
            return res.status(400).json({ message: err.message | "unable to upload" })
        }
        const user = await User.create({ ...req.body, profile: req.file.filename })
        res.status(200).json({ message: "user create success", result: user })
    })
})

exports.getAllUsers = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const skip = (page - 1) * limit
    const sortCriteria = req.query.sortByOrder === "desc" ? { createdAt: -1 } : { createdAt: 1 }

    let filter = {}

    // Modify filter based on search criteria if they exist in the request
    if (req.query.searchUser) {
        const searchRegex = new RegExp(req.query.searchUser, 'i');
        filter = {
            ...filter,
            $or: [
                { fname: { $regex: searchRegex } },
                { lname: { $regex: searchRegex } }
            ]
        };
    }

    if (req.query.filterByGender && req.query.filterByGender !== 'all') {
        filter = {
            ...filter,
            gender: req.query.filterByGender
        };
    }

    if (req.query.filterByStatus && req.query.filterByStatus !== 'all') {
        filter = {
            ...filter,
            status: req.query.filterByStatus
        };
    }

    // Second way
    // const { page = 1, limit = 5, searchUser = '', filterByGender = 'all', filterByStatus = 'all', sortByOrder = 'desc' } = req.query;
    // const skip = (page - 1) * limit
    // const sortCriteria = sortByOrder === 'desc' ? { createdAt: -1 } : { createdAt: 1 };


    // const query = {
    //     $and: [
    //         searchUser ? { $or: [{ fname: new RegExp(searchUser, 'i') }, { lname: new RegExp(searchUser, 'i') }] } : {},
    //         filterByGender !== 'all' ? { gender: filterByGender } : {},
    //         filterByStatus !== 'all' ? { status: filterByStatus } : {}
    //     ]
    // };

    const total = await User.countDocuments(filter)

    const result = await User.find(filter).sort(sortCriteria).skip(skip).limit(limit)

    res.status(200).json({ message: "users get success", result, total, page, limit })
})

exports.deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    await User.findByIdAndDelete(id)
    res.status(200).json({ message: "user delete success" })
})

exports.updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    upload(req, res, async (err) => {
        console.log(req.body);
        console.log(req.file);
        if (err) {
            return res.status(400).json({ message: err.message || "unable to profile update" })
        }
        if (req.file) {
            fs.unlinkSync(path.join(__dirname, "..", "public", req.body.remove))
            await User.findByIdAndUpdate(id, { ...req.body, profile: req.file.filename })
            res.status(200).json({ message: "user update success" })
        } else {
            await User.findByIdAndUpdate(id, req.body)
            res.status(200).json({ message: "user update success" })
        }
    })

})
