import React from 'react';
import { Link } from 'react-router-dom';


import './TopNavbar.css';

interface Props {
    onClick: () => void;
}

const TopNavbar: React.FC<Props> = ({ onClick }) => {
    return (
        <nav className="navbar">
            <div className="navbar_main">
                <div className="logo">
                    <img src={"/images/logo.png"} alt="Logo Image" />
                </div>
                <div className="spacer"></div>
                <ul className="navbar_items">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/excalidraw">Excalidraw FlashCard</Link>
                    </li>
                    <li>
                        <Link to="/">Create FlashCard</Link>
                    </li>
                </ul>
                <div className="ham_icon" style={{ margin: "0 8px", cursor: "pointer" }} onClick={onClick}>
                    <img style={{ width: "25 px", height: "18px", padding: "3px" }} src={"/images/menu.svg"} alt="Hamberger menu" />
                </div>
            </div>
        </nav>
    )
}

export default TopNavbar;