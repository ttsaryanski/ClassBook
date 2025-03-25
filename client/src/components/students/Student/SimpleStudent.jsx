import { useEffect, useState } from "react";
import { Link } from "react-router";

import { useError } from "../../../contexts/ErrorContext";

export default function SimpleStudent({ _id, firstName, lastName, grades }) {
    console.log(grades);

    return (
        <tr>
            <td>{lastName}</td>
            <td>{firstName}</td>
            <td>xxx</td>
        </tr>
    );
}
