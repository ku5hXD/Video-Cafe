import Cookies from "js-cookie";
import React from "react";
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../contexts/authContext";
import "../css/ProfileScreen.css"
import logo from "../images/logo-2.png";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const ProfileScreen = () => {


    const history = useHistory();
    const { isAuthenticated, toggleAuth } = useAuth();

    const logoutMethod = () => {
        Cookies.remove("token");
        Cookies.remove("avatar");
        history.push("/home/all");
        toggleAuth(false);
    }

    return (
        <div className="PSCSS">
            <div className="navbar navbar-custom">
                <img src={logo} className="img1" style={{ marginLeft: "1rem" }} />

                <h2 className="cafe-title"> VIDEO CAFE </h2>

                <button className="upld-btn" onClick={logoutMethod}>Logout</button>

            </div>
            <div className="ps-body">
                <div className="ps-left-part">
                    <div class="ps-card">
                        <div class="ps-card-header">
                            <div class="ps-card-photo">
                                <img src="https://demos.creative-tim.com/impact-design-system-pro/docs/assets/img/team/6.jpg" alt="" />
                            </div>
                        </div>
                        <div class="ps-card-body">
                            <h3 class="ps-card-name">Beni Smith</h3>
                            <p class="ps-card-description">User Interface Designer and <br />front-end developer</p>
                            <div class="ps-card-button">
                                <Link to="/upload">
                                    <button class="ps-btn ps-btn-primary">Upload</button>
                                </Link>
                                <button class="ps-btn ps-btn-outline-primary">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ps-right-part" style={{ paddingTop: '5rem' }}>

                    <Tabs>
                        <TabList>
                            <Tab>Title 1</Tab>
                            <Tab>Title 2</Tab>
                        </TabList>

                        <TabPanel>
                            <h2>Any content 1</h2>
                        </TabPanel>
                        <TabPanel>
                            <h2>Any content 2</h2>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div >
    )
}

export default ProfileScreen