import React from "react";

const RoomEntry = ({ roomInput, setRoomInput }) => {
    const roomEntryHandler = (e) => {
        setRoomInput(e.target.value)
    }

    return (
        <input type="text" placeholder="Enter Room Code here" onChange={roomEntryHandler} value={roomInput} />
    )
}

export default RoomEntry;