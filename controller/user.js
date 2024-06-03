const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {setUser ,getUser} = require("../middlewares/auth")

const JWT_SECRET = "your_secret_key";

async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

const handleGetUserById = async(req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required." });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ msg: "Invalid email or password." });
    }

    // Compare provided password with hashed password in database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password." });
    }

    // const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
    //   expiresIn: "1h",
    // });

    const token = setUser(user)
    // Passwords match, return success response
    return res
      .status(200)
      .json({ msg: "Login successful", userId: user.id, token: token });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Error logging in", error: err.message });
  }
}

const handleUpdateUserById = async (req, res) => {
  const { firstName, lastName, email, gender, jobTitle } = req.body;
  const updateFields = {};

  // Only add fields to the update object if they are provided
  if (firstName) updateFields.firstName = firstName;
  if (lastName) updateFields.lastName = lastName;
  if (email) updateFields.email = email;
  if (gender) updateFields.gender = gender;
  if (jobTitle) updateFields.jobTitle = jobTitle;

  try {
    // Find the user by ID and update with new fields
    const user = await User.findByIdAndUpdate(req.params.id, updateFields, { new: true });

    if (!user) {
      return res.status(404).json({ status: "FAILURE", msg: "User not found" });
    }

    return res.json({ status: "SUCCESS", user });
  } catch (err) {
    return res.status(500).json({ status: "FAILURE", msg: "Error updating user", error: err.message });
  }
};

async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "Deleted" });
}

const handleCreateNewUser = async (req, res) => {
  const body = req.body;

  if (
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title ||
    !body.password
  ) {
    return res.status(400).json({ msg: "All fields are required." });
  }

  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const result = await User.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      password: hashedPassword,
      gender: body.gender,
      jobTitle: body.job_title,
    });

    return res.status(201).json({ msg: "success", id: result.id });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Error creating user", error: err.message });
  }
};

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
