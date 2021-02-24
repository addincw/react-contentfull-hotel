import React, { useState, createContext } from "react";

export const ContentfulHotelContext = createContext();

export const ContentfulHotelProvider = (props) => {
    const [rooms, setRooms] = useState([])

    return (
        <ContentfulHotelContext.Provider value={{ rooms, setRooms }}>
            {props.children}
        </ContentfulHotelContext.Provider>
    )
}
