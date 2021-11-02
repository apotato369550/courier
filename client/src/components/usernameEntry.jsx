import React from "react";

const UsernameEntry = ({ username, setUsername }) => {

    const usernameHandler = (e) => {
        setUsername(e.target.value)
    }
   
    return (
        <input type="text" placeholder="Username" onChange={usernameHandler} />
    )
}

export default UsernameEntry;