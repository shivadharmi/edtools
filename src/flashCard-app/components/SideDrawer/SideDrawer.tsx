import React from 'react';
import {Link} from 'react-router-dom';
import './SideDrawer.css';
import HamIcon from '../../assets/images/close.svg';
interface Props{
    onClick:() => void;
}

const SideDrawer:React.FC<Props> = ({onClick}) => {
    return (
        <nav id="sideDrawer_main" className="sideDrawer_main">
            <div style={{margin:"2px",cursor:"pointer"}} onClick={onClick}>
                <img style={{width:"22 px",height:"18px",padding:"3px"}} src={HamIcon} alt="Hamberger menu" />
            </div>
            <ul className="nav_items">
                <li className="nav_item"><Link to="/">Home</Link></li>
                <li className="nav_item"><Link to="/excalidraw">Excalidraw FlashCard</Link></li>
                <li className="nav_item"><Link to="/cbf">Create Basic FlashCard</Link></li>
            </ul>
        </nav>
    );
}

export default SideDrawer;