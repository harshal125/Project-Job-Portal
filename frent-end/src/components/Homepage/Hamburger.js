import React from 'react'
import './Hamburger.css'

// Icons
import HomeIcon from "../../Images/HomeIcon.svg";
import JobsIcon from "../../Images/JobsIcon.svg";
import Notification from "../../Images/Notification.svg";
import InternIcon from "../../Images/InternIcon.svg";
import Hackthons from "../../Images/Hackthons.svg";
import Bookmark from "../../Images/Bookmark.svg";
import Search from "../../Images/SearchIcon.svg";
import User from "../../Images/User.svg";


const Hamburger = () => {
    return (
        <div className="Hamburger">

            <nav role="navigation">
                <div id="menuToggle">

                    <input type="checkbox" />


                    <span></span>
                    <span></span>
                    <span></span>


                    <ul id="menu">
                        <a href="/"><li>
                            <img src={HomeIcon} alt="" />
                            <p>Home</p>
                        </li></a>

                        <a href="/internship"><li>
                            <img src={InternIcon} alt="" />
                            <p>Internship</p>
                        </li></a>

                        <a href="/job"><li>
                            <img src={JobsIcon} alt="" />
                            <p>Job</p>
                        </li></a>

                        <a href="/hackthon"><li>
                            <img src={Hackthons} alt="" />
                            <p>Hackthon</p>
                        </li></a>

                        <a href="/notification" ><li>
                            <img src={Hackthons} alt="" />
                            <p>Hackthon</p>
                        </li></a>

                        <a href="/bookmark" ><li>
                            <img src={Bookmark} alt="" />
                            <p>Bookmark</p>
                        </li></a>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

<div className="header__center">
    <a href="/">
        <img src={HomeIcon} alt="" />
        <p>Home</p>
    </a>
    <a href="/internship">
        <img src={InternIcon} alt="" />
        <p>Internship</p>
    </a>
    <a href="/job">
        <img src={JobsIcon} alt="" />
        <p>Job</p>
    </a>
    <a href="hackthon">
        <img src={Hackthons} alt="" />
        <p>Hackthon</p>
    </a>
    <a href="/notification">
        <img src={Notification} alt="" />
        <p>Notification</p>
    </a>
    <a href="/bookmark">
        <img src={Bookmark} alt="" />
        <p>Bookmark</p>
    </a>
</div>


export default Hamburger