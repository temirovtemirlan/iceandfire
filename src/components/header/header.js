import React from "react";
import './header.scss';

function Header() {
    return (
        <>
            <div className="container d-flex align-items-center justify-content-between">
                <h2 className="header__logo">Game of Trones DB</h2>
                <nav className="d-flex justify-content-between header__nav">
                    <a href="#">Characters</a>
                    <a href="#">Houses</a>
                    <a href="#">Books</a>
                </nav>
            </div>
        </>
    )
}

export default Header;