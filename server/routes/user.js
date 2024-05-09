const router = require("express").Router();
const {getAllUsers, getUser, deleteUser, updateUser, createUser} = require("../controller/user")
const upload = require('../helper/multerConfig');

router.post("/", getAllUsers);

router.get("/:id", getUser)

router.post("/register",upload.single('file'), createUser);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);


module.exports = router;