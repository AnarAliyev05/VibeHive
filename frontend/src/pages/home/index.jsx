import React from 'react'
import './style.css'
function HomePage() {
    return (
        <><div className="homepage">
            <div className='side_navbar'>
                <div className="side_navbar__logo"> <span id='vibe'>Vibe</span><span id='hive'>Hive</span></div>
                <div className="side_navbar__options">
                    <div className="option"><i className="fa-solid fa-house"></i> Home Page</div>
                    <div className="option"><i className="fa-solid fa-compass"></i> Explore</div>
                    <div className="option"><i className="fa-solid fa-comment"></i> Messages</div>
                    <div className="option"><i className="fa-solid fa-bell"></i> Notifications</div>
                    <div className="option"><i className="fa-solid fa-plus"></i> New Post</div>
                    <div className="option"><i className="fa-solid fa-user"></i> Profile</div>
                </div>
                <div className="side_navbar__settings">
                    <div className="option"><i class="fa-solid fa-bars"></i> Settings</div>
                </div>
            </div>
            <div className="posts">

            </div>
            <div className="extras">
                
            </div>
        </div></>
    )
}

export default HomePage