import React, { useEffect, useState } from "react";
import fetchData from "./FetchData";
import Render from "./Render";


const All = () => {

  const [dates, setDates] = useState([]);
  const [data, setData] = useState([]);
  const [mid, setMid] = useState(0);

  const handleDetails = (value) => {
    setData(value)
  }
  const handleDates = (value) => {
    setDates(value)
  }

  const handleScroll = (e) => {
    // const bottom = Math.floor(e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight;
    // console.log(e.target.scrollHeight)
    // console.log(Math.floor(e.target.scrollHeight - e.target.scrollTop))
    // console.log(e.target.clientHeight)
    // console.log(bottom)
    if (e.target.clientHeight + e.target.scrollTop >= e.target.scrollHeight) {
      // alert("haa vai")
      // console.log("hello there")
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

export default All;
