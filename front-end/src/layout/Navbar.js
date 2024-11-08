import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div>

            <nav className="navbar bg-primary" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Substation PING</a>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">

                        <Link className='btn btn-outline-light me-md-2' to="/ping_all_substation">Ping all</Link>
                        <Link className='btn btn-outline-light' to="/add_substation">Add substation</Link>
                    </div>
                </div>
            </nav>


        </div>
    )
}
