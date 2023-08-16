import React, { useEffect, useState } from "react";
import "./card.css";
const Card = ({
  data,
  checksame,
  setCheckSame,
  index,
  failedindex,
  setFailedindex,
}) => {
  const [touch, setTouch] = useState(false);
  function check() {
    setTouch(true);
    console.log(data);
    setCheckSame([
      ...checksame,
      {
        name: data.name,
        index: index,
        allies: data.allies,
        tvShows: data.tvShows,
        enemies: data.enemies,
        films: data.films,
        videogames: data.videoGames,
        createdAt: data.createdAt,
        img: data.imageUrl,
      },
    ]);
  }
  useEffect(() => {
    for (let i = 0; i < failedindex.length; i++) {
      if (failedindex[i] === index) {
        setTimeout(function () {
          setTouch(false);
        }, 1000);
      }
    }
  }, [failedindex]);
  return (
    <div>
      {touch === false ? (
        <div onClick={() => check()} className="card black"></div>
      ) : (
        <div className="card">
          <h1>{data?.name}</h1>
          <img src={data?.imageUrl} alt={data?.name} />
        </div>
      )}
    </div>
  );
};

export default Card;
