import { Schema, Types, model } from "mongoose";

const studentSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
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

studentSchema.pre("save", function (next) {
    this.dateUpdate = Date.now();
    next();
});

const Student = model("Student", studentSchema);

export default Student;
