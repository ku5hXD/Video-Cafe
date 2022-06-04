import React, { useEffect, useState } from "react";
import Render from "./Render";
import fetchData from "./FetchData";

const News = () => {

  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);
  const [mid, setMid] = useState(0);

  const handleDetails = (value) => {
    setData(value)
  }
  const handleDates = (value) => {
    setDates(value)
  }

  const handleScroll = (e) => {
    if (e.target.clientHeight + e.target.scrollTop >= e.target.scrollHeight) {
      setMid(data.length)
    }
  }

  useEffect(() => {
    fetchData('', handleDetails, handleDates, data, mid)
  }, [mid]);

  return (
    <div className="right-bar-scroll" onScroll={handleScroll}>
      <Render data={data} dates={dates} />
    </div>)

};

export default News;
