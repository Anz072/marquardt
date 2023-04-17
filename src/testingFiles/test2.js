function daw(properties, context) {
  //let updatex = false;
  const axios = require("axios");
  if (properties.returnedtag != properties.generatedtag) {
    let userID = properties.userid;
    let userTAGx = properties.usertag;
    let userTAG = userTAGx.split("");
    let userRoomType = "";
    if (userTAG[2] == "I") {
      userRoomType = "single";
    } else if (userTAG[2] == "J") {
      userRoomType = "double";
    } else if (userTAG[2] == "K") {
      userRoomType = "singlespecial";
    } else if (userTAG[2] == "L") {
      userRoomType = "doublespecial";
    }

    let hotelRoomsId = {
      user_id: userID,
    };

    function getDataFromXano(apiUrl, apiKey, hotelRoomsId, context) {
      const options = {
        headers: {
          "X-Data-Source": `dw ${apiKey}`,
          Authorization: `Bearer ${apiKey}`,
        },
      };

      const data = hotelRoomsId;

      return context.async((callback) => {
        axios
          .post(apiUrl, data, options)
          .then((response) => {
            callback(null, response.data);
          })
          .catch((error) => {
            console.error(error);
            callback(error);
          });
      });
    }

    const apiUrl =
      "https://xslu-ibva-wvti.f2.xano.io/api:k89R8KDn:v1/plugin/usercheckforhotels";
    const apiUrl2 =
      "https://xslu-ibva-wvti.f2.xano.io/api:k89R8KDn:v1/plugin/assignuserandaddhotel";
    const apiKey = properties.token;

    let saddd = "gi";
    let hotelTAG = [];
    let hotelroomInfo = getDataFromXano(apiUrl, apiKey, hotelRoomsId, context);
    let hotelid = 0;
    let hotelroomid = 0;
    if (hotelroomInfo != []) {
      let filthotelroomInfo = hotelroomInfo.filter(
        (hotel) =>
          hotel._hotel_rooms.single_rooms >
            hotel._hotel_rooms.single_rooms_taken ||
          hotel._hotel_rooms.double_rooms >
            hotel._hotel_rooms.double_rooms_taken ||
          hotel._hotel_rooms.handicap_rooms >
            hotel._hotel_rooms.handicap_rooms_taken ||
          hotel._hotel_rooms.handicapDouble_rooms >
            hotel._hotel_rooms.handicapDouble_rooms_taken
      );

      let filthotelroomInfo2 = filthotelroomInfo.some((hotel) => {
        hotelTAG = hotel._tag.name.split("");
        saddd += hotel._tag.name;
        if (
          hotelTAG.includes(userTAG[0]) &&
          hotelTAG.includes(userTAG[1]) &&
          hotelTAG.includes(userTAG[2])
        ) {
          if (
            userTAG[2] == "I" &&
            hotel._hotel_rooms.single_rooms >
              hotel._hotel_rooms.single_rooms_taken
          ) {
            hotelid = hotel.id;
            hotelroomid = hotel.hotel_rooms_id;
            return true;
          } else if (
            userTAG[2] == "J" &&
            hotel._hotel_rooms.double_rooms >
              hotel._hotel_rooms.double_rooms_taken
          ) {
            hotelid = hotel.id;
            hotelroomid = hotel.hotel_rooms_id;
            return true;
          } else if (
            userTAG[2] == "K" &&
            hotel._hotel_rooms.handicap_rooms >
              hotel._hotel_rooms.handicap_rooms_taken
          ) {
            hotelid = hotel.id;
            hotelroomid = hotel.hotel_rooms_id;
            return true;
          } else if (
            userTAG[2] == "L" &&
            hotel._hotel_rooms.handicapDouble_rooms >
              hotel._hotel_rooms.handicapDouble_rooms_taken
          ) {
            hotelid = hotel.id;
            hotelroomid = hotel.hotel_rooms_id;
            return true;
          }
        }
      });

      if (filthotelroomInfo2) {
        //1. assign user a hotel id
        //2. assign new value of +1 to hotelroomid
        let payload = {
          user_id: userID,
          hotel_id: hotelid,
          hotel_room_id: hotelroomid,
          usertype: userRoomType,
        };

        updatex = getDataFromXano(apiUrl2, apiKey, payload, context);
      }
    }

    return {
      completed: hotelroomInfo,
      tesst: saddd,
      userid: userID,
      hotelid: hotelid,
      hotelroomid: hotelroomid,
      userroomtype: userRoomType,
    };
  } else {
    return {
      completed: true,
      tesst: "x",
      userid: 0,
      hotelid: 0,
      hotelroomid: 0,
      userroomtype: "0",
    };
  }
}
