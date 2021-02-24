import React, { useState, useContext, useEffect } from 'react'
import { ContentfulHotelContext } from '../stores/ContentfulHotelContext';
import { createClient } from 'contentful'
import NavigationHero from '../components/containers/NavigationHero/index'
import RoomCard from '../components/bases/RoomCard'

function HomePage() {
    const { rooms, setRooms } = useContext(ContentfulHotelContext);

    const db = createClient({
        space: "9oejpyqc4ewh",
        accessToken: "p97BkUcTqK2DtlzKUnCsxTcJXor0DwqSGO48lWKaju8"
    })

    useEffect(() => {
        db.getEntries()
            .then((response) => {
                const assets = response.includes.Asset
                const result = response.items.map(item => {
                    item.fields.images = item.fields.images.map(image => {
                        image = assets.find(asset => asset.sys.id === image.sys.id)
                        return image.fields.file.url
                    })

                    return { id: item.sys.id, ...item.fields }
                })

                setRooms(result)
            })
            .catch(console.error)
    }, [])

    return (
        <React.Fragment>
            <NavigationHero title="Contentful Hotels" subtitle="find the best room as your bed tonight">
                {/* <!-- Hero footer: will stick at the bottom --> */}
                <div className="hero-foot">
                    <nav className="tabs is-boxed is-fullwidth">
                        <div className="container">
                            <ul>
                                <li className="is-active"><a href="!#">All</a></li>
                                <li><a href="!#">Single</a></li>
                                <li><a href="!#">Double</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </NavigationHero>

            <section className="section container">
                <div className="columns">
                    {rooms.map(room => <RoomCard key={room.id} room={room} />)}
                </div>
            </section>
        </React.Fragment>
    )
}

export default HomePage
