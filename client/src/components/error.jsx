import React from "react";

const Error = ({ errorNumber }) => {
   // use for loop to render messages
   // completely forgot to add a username feature
    const errors = [
        "",
        "Please enter your username",
        "Please enter the room code of the room you are joining",
        "That room does not exist."
    ]

    return (
        <p>{errors[errorNumber]}</p>
    )
}

export default Error;