import React from "react";
import { Link } from "react-router-dom";
import Thumbnail from "./Thumbnail";
import getDate from "./GetDate";
import "../css/ListVideo.css"


const ListVideo = ({ data, dates }) => {
  if (data.length === 0) {
    return (
      <img src="https://beaumonthfsi.com/img/no-video.gif" />
    )
  }
  return (
    <div className="lv-main">
      {
        data.map((element, index) => {
          if (data.length === 0) {

            return (
              <div>
                <h3>No Videos Found !! Please upload videos</h3>
              </div>
            )
          } else {
            return (
              <Link
                to={`/video/${element._id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="lv-box">
                  <div className="left-box">
                    <img src={element.thumbnailpath} key={index} />
                  </div>
                  <div className="right-box">
                    <h4 className="lv-video-title">{element.videoname}</h4>

                    <h4
                      style={{
                        fontSize: "1rem",
                        color: "white",
                      }}
                    >
                      {element.description}
                    </h4>
                    <p className="lv-date">{getDate(dates[index])}</p>
                  </div>
                </div>
              </Link>
            )
          }
        })

      }
    </div>
  );
};

export default ListVideo;
