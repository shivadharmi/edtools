import React from "react";
import { Link } from "react-router-dom";

import "./TopNavbar.css";
import {t} from '../../../i18n';

interface Props {
    onClick: () => void;
}

const TopNavbar: React.FC<Props> = ({ onClick }) => {
    return (
        <nav className="navbar">
            <div className="navbar_main">
                <div className="logo">
                    <img src={"/images/logo.png"} alt="Logo" />
                </div>
                <div className="spacer"></div>
                <ul className="navbar_items">
                    <li className="nav_item">
                        <Link to="/">{t("Educational tools built with Reactjs and Typescript.")}</Link>
                    </li>
                    <li className="nav_item">
                        <Link to="/excalidraw">{t("Excalidraw FlashCard")}</Link>
                    </li>
                    <li className="nav_item">
                        <Link to="/cbf">{t("Create Basic FlashCard")}</Link>
                    </li>
                </ul>
                <div
                    className="ham_icon"
                    style={{ margin: "0 8px", cursor: "pointer" }}
                    onClick={onClick}
                >
                    <img
                        style={{ width: "25 px", height: "18px", padding: "3px" }}
                        src={"/images/menu.svg"}
                        alt="Hamberger menu"
                    />
                </div>
            </div>
        </nav>
    );
};

export default TopNavbar;
