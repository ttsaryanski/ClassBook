import { connect } from "mongoose";

import { LocalDB_URL } from "./constans.js";

export default async function mongooseInit() {
    try {
        await connect(LocalDB_URL, { dbName: "ClassBook" });

        console.log("Successfully connect to local DB!");
    } catch (error) {
        console.log("Failed to connect to local DB!");
        console.log(error.message);

        try {
            await connect(process.env.CLOUD_DB_URL, {
                dbName: "ClassBook",
            });

            console.log("Successfully connect to cloud DB!");
        } catch (error) {
            console.log("Failed to connect to cloud DB!");
            console.log(error.message);
        }
    }
}
