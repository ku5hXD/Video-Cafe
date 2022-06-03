import React from "react";
import { Link } from "react-router-dom";
import Thumbnail from "./Thumbnail";
import getDate from "./GetDate";

const Render = ({ data, dates }) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {data.map((element, index) => {
        if (data.length === 0) {
        } else {
          // console.log(element)
          return (
            <div className="custom-card">
              <Link
                to={`/video/${element._id}`}
                style={{ textDecoration: "none" }}
              >
                <Thumbnail thumbnailpath={element.thumbnailpath} screen="mainScreen" key={index} />
                <div className="video-desc" style={{ marginLeft: "0.5rem" }}>
                  <img
                    className="video-desc-left"
                    width={45}
                    height={45}
                    src={element.ownerAvatar}
                    style={{ borderRadius: 50, marginRight: "1rem" }}
                  />
                  <div className="video-desc-right">
                    <h4 className="video-title">{element.videoname}</h4>

                    <h4 className="owner-name">{element.ownerName}</h4>
                    <p className="date">{getDate(element.date)}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Render;
