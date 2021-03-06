import axios from "axios";

const fetchData = (category, handleDetails, handleDates, data, mid) => {
  axios
    .get(`http://localhost:8000/details2?category=${category}&mid=${mid}`)
    .then((res) => {
      var dataDuplicate = [];
      for (var i = 0; i < res.data.length; i++) {
        dataDuplicate = [
          ...dataDuplicate,
          {
            _id: res.data[i]._id,
            videoname: res.data[i].videoName,
            description: res.data[i].description,
            thumbnailpath: res.data[i].thumbnailPath,
            ownerName: res.data[i].ownerName,
            ownerAvatar: res.data[i].ownerAvatar,
            date: res.data[i].uploadDate,
          },
        ];
      }

      //   axios
      //     .get("http://localhost:8000/date")
      //     .then((res) => {
      //       console.log(res.data);
      //       const needyDate = res.data.filter((date) => {
      //         const mydate = dataDuplicate.find((ele) => {
      //           return ele._id === date._id;
      //         });

      //         return mydate;
      //       });

      //       let clone = [];

      //       needyDate.forEach((element) => {
      //         clone.push(element.uploadDate);
      //       });

      //   handleDates(clone);
      // })
      // .catch((err) => {
      //   console.log(err);
      // });

      handleDates([]);

      handleDetails([...data, ...dataDuplicate]);
    })
    .catch((e) => {
      console.log(e);
    });
};

export default fetchData;
