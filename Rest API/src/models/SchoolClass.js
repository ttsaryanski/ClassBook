import { Schema, model, Types } from "mongoose";

const schoolClassSchema = new Schema({
    classTitle: {
        type: String,
        trim: true,
    },
    teacher: {
        type: Types.ObjectId,
        ref: "User",
    },
    students: [
        {
            student: {
                type: Types.ObjectId,
                ref: "User",
            },
        },
    ],
    createdAt: {
        type: String,
        trim: true,
    },
    updatedAt: {
        type: String,
        trim: true,
    },
});

const SchoolClass = model("SchoolClass", schoolClassSchema);

export default SchoolClass;
