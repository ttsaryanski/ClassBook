import { Schema, Types, model } from "mongoose";

const studentSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First name is required!"],
        minLength: [3, "First name should be at least 3 characters long!"],
    },
    lastName: {
        type: String,
        required: [true, "Last name is required!"],
        minLength: [3, "Last name should be at least 3 characters long!"],
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

studentSchema.pre("save", function (next) {
    this.dateUpdate = Date.now();
    next();
});

const Student = model("Student", studentSchema);

export default Student;
