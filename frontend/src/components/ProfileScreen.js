import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import styles from "../css/ProfileScreen.module.css";
import logo from "../images/logo-2.png";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import FetchDataById from "./FetchDataById";
import ListVideo from "./ListVideo";
import axios from "axios";
import bgVideo2 from "../images/bgVideo2.mp4";

const ProfileScreen = () => {
  const [tabState, setTabState] = useState(true);
  const history = useHistory();
  const { isAuthenticated, toggleAuth } = useAuth();

  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState("");
  const handleDetails = (value) => {
    setData(value);
  };
  const handleDates = (value) => {
    setDates(value);
  };

  const logoutMethod = () => {
    Cookies.remove("token");
    Cookies.remove("avatar");
    history.push("/home/all");
    toggleAuth(false);
  };

  useEffect(() => {
    const token = Cookies.get("token");
    FetchDataById(token, handleDetails, handleDates);
    const avatar = Cookies.get("avatar");
    setAvatar(avatar);
    axios
      .get(`http://localhost:8000/getName?token=${token}`)
      .then((res) => {
        console.log(res.data);
        setName(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className={styles.PSCSS}>
      <video autoPlay loop muted className={styles.bgVideo}>
        <source src={bgVideo2} type="video/mp4" />
      </video>
      <div className={` ${styles.navbarCustom}`}>
        <img
          src={logo}
          className={styles.img1}
          style={{ marginLeft: "1rem" }}
        />

        <h2 className={styles.cafeTitle}> VIDEO CAFE </h2>

        <button className={styles.upldBtn} onClick={logoutMethod}>
          Logout
        </button>
      </div>
      <div className={styles.psBody}>
        <div className={styles.psLeftPart}>
          <div class={styles.psCard}>
            <div class={styles.psCardHeader}>
              <div class={styles.psCardPhoto}>
                <img src={avatar} alt="" />
              </div>
            </div>
            <div class={styles.psCardBody}>
              <h3 class={styles.psCardName}>{name}</h3>
              <p class={styles.psCardDescription}>
                User Interface Designer and <br />
                front-end developer
              </p>
              <div class={styles.psCardButton}>
                <Link to="/upload">
                  <button class={`${styles.psBtn}  ${styles.psBtnPrimary}`}>
                    Upload
                  </button>
                </Link>
                <Link to="/home/all">
                  <button
                    class={`${styles.psBtn} ${styles.psBtnOutlinePrimary}`}
                  >
                    Home
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.psRightPart} style={{ paddingTop: "4rem" }}>
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
            <button
              className={styles.tabBtn}
              onClick={() => {
                console.log("tab1");
                setTabState(true);
              }}
            >
              Your Videos
            </button>

            {/* // WILL DO LATER */}
            {/* <button
              className={styles.tabBtn}
              onClick={() => {
                console.log("tab2");
                setTabState(false);
              }}
            >
              Liked Videos
            </button> */}
          </div>
          <div className={styles.rightBody}>
            <div
              className={`${tabState ? styles.activeTab : styles.hiddenTab}`}
            >
              <ListVideo data={data} dates={dates} />
            </div>
            <div
              className={`${tabState ? styles.hiddenTab : styles.activeTab}`}
            >
              CODING IN PROGRESS! CHECK BACK LATER
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
