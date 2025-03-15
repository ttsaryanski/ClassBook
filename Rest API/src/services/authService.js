import bcrypt from "bcrypt";

import User from "../models/User.js";
import File from "../models/File.js";
import Setting from "../models/Setting.js";
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";

import jwt from "../lib/jwt.js";
import InvalidToken from "../models/InvalidToken.js";

const register = async (
    firstName,
    lastName,
    email,
    secretKey,
    password,
    profilePicture
) => {
    const user = await User.findOne({ email });

    if (user) {
        throw new Error("This email already registered!");
    }

    let role = "";

    const settings = await Setting.findOne();

    if (secretKey === settings.teacherKey) {
        role = "teacher";
    } else if (secretKey === settings.directorKey) {
        role = "director";
    } else {
        role = "student";
    }

    const createdUser = await User.create({
        firstName,
        lastName,
        email,
        role,
        password,
        profilePicture: profilePicture || null,
    });

    if (role === "student") {
        await Student.create({
            firstName,
            lastName,
            clss: [],
        });
    }

    if (role === "teacher") {
        await Teacher.create({
            firstName,
            lastName,
            email,
            clss: [],
        });
    }

    return createAccessToken(createdUser);
};

const login = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("User does not exist!");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error("Password does not match!");
    }

    return createAccessToken(user);
};

const logout = (token) => InvalidToken.create({ token });

const getUserById = (id) => User.findById(id);

const saveUserFile = (fileName, fileUrl) => File.create({ fileName, fileUrl });

const editUser = (userId, data) => {
    data.dateUpdate = Date.now();

    return User.findByIdAndUpdate(userId, data, {
        runValidators: true,
        new: true,
    });
};

async function createAccessToken(user) {
    const payload = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    return {
        user,
        accessToken: token,
    };
}

export default {
    register,
    login,
    logout,
    getUserById,
    saveUserFile,
    editUser,
};
