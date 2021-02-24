import React from 'react'
import { Link } from "react-router-dom";
function ErrorPage() {
    return (
        <section className="section has-text-centered" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh"
        }}>
            <div className="container">
                <h1 className="title">404</h1>
                <h2 className="subtitle">
                    Page you're looking for, not found.
                </h2>
                <Link className="button is-primary is-outlined" to="/">Go to home</Link>
            </div>
        </section>
    )
}

export default ErrorPage
