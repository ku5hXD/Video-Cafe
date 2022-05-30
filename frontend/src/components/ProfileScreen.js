import Cookies from "js-cookie";
import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../contexts/authContext";
import styles from "../css/ProfileScreen.module.css"
import logo from "../images/logo-2.png";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const ProfileScreen = () => {


    const [tabState,setTabState] = useState(true);
    const history = useHistory();
    const { isAuthenticated, toggleAuth } = useAuth();

    const logoutMethod = () => {
        Cookies.remove("token");
        Cookies.remove("avatar");
        history.push("/home/all");
        toggleAuth(false);
    }

    return (
        <div className={styles.PSCSS}>
            <div className={` ${styles.navbarCustom}`}>
                <img src={logo} className={styles.img1} style={{ marginLeft: "1rem" }} />

                <h2 className={styles.cafeTitle}> VIDEO CAFE </h2>

                <button className={styles.upldBtn} onClick={logoutMethod}>Logout</button>

            </div>
            <div className={styles.psBody}>
                <div className={styles.psLeftPart}>
                    <div class={styles.psCard}>
                        <div class={styles.psCardHeader}>
                            <div class={styles.psCardPhoto}>
                                <img src="https://demos.creative-tim.com/impact-design-system-pro/docs/assets/img/team/6.jpg" alt="" />
                            </div>
                        </div>
                        <div class={styles.psCardBody}>
                            <h3 class={styles.psCardName}>Beni Smith</h3>
                            <p class={styles.psCardDescription}>User Interface Designer and <br />front-end developer</p>
                            <div class={styles.psCardButton}>
                                <Link to="/upload">
                                    <button class={`${styles.psBtn}  ${styles.psBtnPrimary}`}>Upload</button>
                                </Link>
                                <button class={`${styles.psBtn} ${styles.psBtnOutlinePrimary}`}>Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.psRightPart} style={{ paddingTop: '4rem' }}>

                    {/* <Tabs>
                        <TabList className="tabList">
                            <Tab className="tabBtn">Title 1</Tab>
                            <Tab>Title 2</Tab>
                        </TabList>

                        <TabPanel>
                            <h2>Any content 1</h2>
                        </TabPanel>
                        <TabPanel>
                            <h2>Any content 2</h2>
                        </TabPanel>
                    </Tabs> */}

                    <div class={styles.rightHeader}>
                        <button className={styles.tabBtn}  onClick={() => {
                           console.log("tab1")
                           setTabState(true);
                       }}>Tab1</button>
                        <button className={styles.tabBtn} onClick={() => {
                           console.log("tab2");
                           setTabState(false);
                       }}>Tab2</button>
                    </div>
                    <div className={styles.rightBody}>
                       <div className={`${tabState ? styles.activeTab : styles.hiddenTab}`}
                      > BODY 1 </div>
                       <div className={`${tabState ? styles.hiddenTab : styles.activeTab}`}
                       > BODY 2</div>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default ProfileScreen