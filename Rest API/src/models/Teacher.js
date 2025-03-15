import { Schema, Types, model } from "mongoose";

const teacherSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    speciality: {
        type: String,
    },
    clss: [
        {
            type: Types.ObjectId,
            ref: "Clss",
        },
    ],
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    dateUpdate: {
        type: Date,
        default: Date.now,
    },
});

teacherSchema.pre("save", function (next) {
    this.dateUpdate = Date.now();
    next();
});

const Teacher = model("Teacher", teacherSchema);

export default Teacher;
