import React from 'react'
import { NavLink } from "react-router-dom";
import './styles.css'
import RoomThumbnail from '../../styled/RoomThumbnail';

function NavigationHero(props) {
    return (
        <RoomThumbnail className="hero hero--navigation is-primary is-large" thumbnail={props.thumbnail}>
            <div className="hero-overlay">
                {/* <!-- Hero head: will stick at the top --> */}
                <div className="hero-head">
                    <nav className="navbar">
                        <div className="container">
                            <div className="navbar-brand">
                                <NavLink className="navbar-item has-text-weight-bold" to="/">
                                    ContentfulHotels
                                </NavLink>
                                <span className="navbar-burger burger" data-target="navbarMenuHeroA">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </div>
                            <div id="navbarMenuHeroA" className="navbar-menu">
                                <div className="navbar-end">
                                    <NavLink className="navbar-item" exact to="/" activeClassName="is-active">
                                        Home
                                    </NavLink>
                                    <NavLink className="navbar-item" exact to="/about" activeClassName="is-active">
                                        About
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>

                {/* <!-- Hero content: will be in the middle --> */}
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title">
                            {props.title}
                        </h1>
                        <h2 className="subtitle">
                            {props.subtitle}
                        </h2>
                    </div>
                </div>

                {props.children}
            </div>

        </RoomThumbnail>
    )
}

export default NavigationHero
