import React from 'react'
import { Link } from 'react-router-dom'
import DefaultBackground from '../../images/dummy.jpg'

import { NumberWithCommas } from '../../helpers/NumberWithCommas'

function RoomCard({ room }) {
    const thumbnail = room.images.length > 0 ? room.images[0] : DefaultBackground
    return (
        <Link to={`room/${room.slug}`} className="column is-one-third">
            <div className="card" style={{ position: "relative", cursor: "pointer" }}>
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img src={thumbnail} alt={`thumbnail-${room.slug}`} />
                    </figure>
                </div>
                <div className="card-content">
                    <div className="media" style={{ alignItems: "stretch" }}>
                        <div className="media-content">
                            <p className="title is-4">{room.name}</p>
                            <p className="subtitle is-6">Rp{NumberWithCommas(room.price)}</p>
                        </div>
                        <div className="media-left" style={{ display: "flex", alignItems: "center" }}>
                            <p className="has-text-weight-bold mr-1" style={{ fontSize: "22px" }}>3</p>
                            <i className="fas fa-star has-text-warning"></i>
                        </div>
                    </div>
                </div>

                <span className="tag is-primary" style={{ position: "absolute", top: "10px", left: "10px" }}>{room.type}</span>
            </div>
        </Link>
    )
}

export default RoomCard
