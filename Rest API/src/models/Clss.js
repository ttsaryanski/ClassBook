import { Schema, Types, model } from "mongoose";

const clssSchema = new Schema({
    title: {
        type: String,
        trim: true,
    },
    teacher: {
        type: Types.ObjectId,
        ref: "User",
    },
    students: [
        {
            type: Types.ObjectId,
            ref: "User",
        },
    ],
    _createdBy: {
        type: Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

clssSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

const Clss = model("Clss", clssSchema);

export default Clss;
