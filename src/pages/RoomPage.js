import React, { useState, useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { createClient } from 'contentful'
import { ContentfulHotelContext } from '../stores/ContentfulHotelContext';

import { NumberWithCommas } from '../helpers/NumberWithCommas';
import { ArrayChunk } from '../helpers/ArrayChunk';

import DefaultBackground from '../images/dummy.jpg'

import RoomImage from '../components/styled/RoomImage'

import NavigationHero from '../components/containers/NavigationHero/index'

function RoomPage() {
    const { rooms } = useContext(ContentfulHotelContext)
    const [thumbnail, setThumbnail] = useState(DefaultBackground)
    const [room, setRoom] = useState({
        images: [],
        price: 0,
        facilities: []
    })

    const { slug } = useParams()
    const history = useHistory()

    const db = createClient({
        space: "9oejpyqc4ewh",
        accessToken: "p97BkUcTqK2DtlzKUnCsxTcJXor0DwqSGO48lWKaju8"
    })

    useEffect(() => {
        const content_type = 'rooms'
        let result = rooms.find(room => room.slug === slug)

        if (!result) {
            db.getEntries({ content_type, 'fields.slug': slug })
                .then((response) => {
                    if (response.total === 0) {
                        history.push("/error")
                        return
                    }

                    const assets = response.includes.Asset
                    const result = response.items.map(item => {
                        item.fields.images = item.fields.images.map(image => {
                            image = assets.find(asset => asset.sys.id === image.sys.id)
                            return image.fields.file.url
                        })

                        return { id: item.sys.id, ...item.fields }
                    })[0]

                    const [thumb, ...restImages] = result.images
                    if (thumb) setThumbnail(thumb)
                    if (restImages.length >= 1) result.images = restImages

                    setRoom(result)
                })
                .catch(history.push("/error"))
        } else {
            const [thumb, ...restImages] = result.images
            if (thumb) setThumbnail(thumb)
            if (restImages.length >= 1) result.images = restImages

            setRoom(result)
        }

    }, [slug])

    return (
        <React.Fragment>
            <NavigationHero thumbnail={thumbnail} title={room.name} subtitle={`Type ${room.type}`}></NavigationHero>

            <section className="section container">
                <div className="tile is-ancestor">
                    <div className="tile is-parent">
                        <RoomImage className="tile is-child box" image={thumbnail} />
                    </div>
                    <div className="tile is-parent is-vertical">
                        {room.images.map((image, ki) =>
                            <RoomImage key={ki} className="tile is-child box" image={image} height={`300px`} />
                        )}
                    </div>
                </div>
            </section>

            <section className="section container">
                <p className="title">Description</p>
                <p> {room.description} </p>
            </section>

            <section className="section container">
                <p className="title">Facilities</p>
                <div className="columns">
                    {room.facilities.length > 1 && ArrayChunk(room.facilities, 2).map((groupFacilities, gi) =>
                        <div key={gi} className="column">
                            {groupFacilities.length > 1 && groupFacilities.map((facility, fi) =>
                                <label key={fi} className="checkbox mb-3" style={{ display: "flex", alignItems: "center" }} disabled>
                                    <input className="mr-2" type="checkbox" checked disabled />
                                    {facility}
                                </label>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <section className="section has-background-light">
                <div className="container">
                    <nav className="columns">
                        <div className="column is-one-fourth">
                            <div>
                                <p className="heading">Size</p>
                                <p className="has-text-weight-bold" style={{ fontSize: "22px" }}>{room.size}m</p>
                            </div>
                        </div>

                        <div className="column is-one-fourth">
                            <div>
                                <p className="heading">Rate</p>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <p className="has-text-weight-bold mr-1" style={{ fontSize: "22px" }}>{room.rate}</p>
                                    <i className="fas fa-star has-text-warning"></i>
                                </div>
                            </div>
                        </div>

                        <div className="column is-two-thirds">
                            <div>
                                <p className="heading">Price</p>
                                <p className="has-text-weight-bold" style={{ fontSize: "22px" }}>Rp{NumberWithCommas(room.price)}</p>
                            </div>
                        </div>

                        <div className="column" style={{ display: "flex", alignItems: "center" }}>
                            <button className="button is-fullwidth is-primary">Booking</button>
                        </div>
                    </nav>
                </div>
            </section>
        </React.Fragment>
    )
}

export default RoomPage
