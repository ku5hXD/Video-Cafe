import axios from "axios";
import React, { useState, useEffect } from "react";

const Thumbnail = ({ thumbnailpath, screen }) => {
  const [thumbPath, setThumbPath] = useState("");
  useEffect(() => {
    axios.get(thumbnailpath)
      .then((res) => {
        console.log(thumbnailpath)
        setThumbPath(res.data)
      })
  }, [])

  return (
    <div>
      <img
        key={thumbPath}
        src={thumbPath ? thumbPath : "https://ipfs.infura.io/ipfs/QmbkypPjJJDMix9rhiLxkVy1hLFLgPWTBuRrChcU8crTrS"}
        style={{
          width: screen === "mainScreen" ? 350 : 270,
          borderTopRightRadius: screen === "mainScreen" ? "10px" : "0px",
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: screen === "listScreen" ? "10px" : "0px",
        }}
        alt="video-thumbnail"
      />
    </div>
  );
};

export default Thumbnail;
