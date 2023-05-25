import React, { useEffect } from "react";
import axios from "axios";
import mom1 from "../../src/assets/mom1.jpg";
import mom2 from "../../src/assets/mom2.jpg";
const Try = () => {
  // useEffect(() => {
  //   const reqOptions = {
  //     method: "GET",
  //     headers: {
  //       // "Content-Length": 0,
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //       // "X-Auth-Token": "c8e7e31d3f014e2bb8f5e0d783d4ee8b",
  //     },
  //   };

  //   axios.get(
  //     "https://api.football-data.org/v4/competitions?areas=2077&plan=TIER_ONE"
  //   );
  // }, []);

  const checkk = () => {

    const opts = {
      "Access-Control-Allow-Origin": "https://api.football-data.org/v4/competitions?areas=2077&plan=TIER_ONE",
    }
    axios.get(
      "https://api.football-data.org/v4/competitions?areas=2077&plan=TIER_ONE", opts
    );
  };
  return (
    <div onClick={checkk}>
      <img src={mom1} />
      <p></p>
    </div>
  );
};

export default Try;
