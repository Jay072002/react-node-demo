const User = require("../models/User")
require("../db/config")

const getAllUsers = async (req, res) => {
  try {
    console.log("getAll Users entry")
    const { page, limit, filter, sort } = req.query;
    const { name, address, field, isAsc } = req.body;

    let users;

    if (page) {
      const offset = +limit * (+page - 1);
      users = await User.find().limit(+limit).skip(+offset);
    } else if (filter === "true") {
      if (name || address) {
        users = await User.find({ $or: [{ name: { $regex: name, $options: "i" } }, { address: { $regex: address, $options: "i" } }] });
      }
    } else if (sort === "true") {
      const sortField = field.toLowerCase();
      const sortOrder = isAsc === true ? 1 : -1;
      const sortQuery = {};
      sortQuery[sortField] = sortOrder;
      users = await User.find().sort(sortQuery);
    } else {
      users = await User.find();
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}



const getUser = async(req,res) => {
    try {
        const {id} = req.params;

        if(!id) {
            res.status(400).json("Bad Request")
        }
        const user = await User.findById(id).exec()

        res.status(200).json(user)
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

const deleteUser = async(req,res) => {
    try {
        const {id} = req.params;

        await User.findByIdAndDelete(id)

        res.status(200).json(id)
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateUser = async(req,res) => {
    try {
        const {id} = req.params;
        const requestBody = req.body;

        await User.findByIdAndUpdate(id, requestBody);

        res.status(200).json("User updated successfullt")
        
    } catch (error) {
        res.status(500).json(error);
    }
}

const createUser = async (req, res) => {
  try {
    const { name, age, address, gender, email } = req.body;
    const file = req.file;

    if (!name) {
      return res.status(400).json("Bad Request");
    }

    const newUser = await User.create({
      name,
      age,
      address,
      gender,
      email,
      profileImage: file?.filename
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
    getAllUsers,
    deleteUser,
    updateUser,
    createUser,
    getUser,
}