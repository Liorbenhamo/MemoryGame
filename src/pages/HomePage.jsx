import React, { useEffect, useState } from "react";
import Card from "../component/card";
import "./homepage.css";
const HomePage = () => {
  const [disneyCharacters, setDisneyCharacters] = useState([]);
  const [checksame, setCheckSame] = useState([]);
  const [failedindex, setFailedindex] = useState([]);
  const [corrent, setCorrent] = useState();
  const [foundcounter, setFoundcounter] = useState(0);
  const [pages, setPages] = useState(1);
  const [starttime, setstarttime] = useState(new Date().getTime());
  let endtime;
  let pagetime;
  function resetfunc() {
    setCheckSame([]);
    setCorrent();
    setFailedindex([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    ]);
    if (foundcounter == 10) {
      setstarttime(new Date().getTime());
      if (pages < 149) {
        setPages(pages + 1);
      } else {
        setPages(1);
      }
    }

    setFoundcounter(0);
  }
  useEffect(() => {
    const test = async () => {
      try {
        const res = await fetch(
          `https://api.disneyapi.dev/character?page=${pages}`
        );
        const { data } = await res.json();
        let ten = data.slice(0, 10);
        let twenty = [...ten, ...ten];
        let sorted = twenty.sort((a, b) => 0.5 - Math.random());
        setDisneyCharacters(sorted);
      } catch (err) {
        console.log(err);
      }
    };
    test();
  }, [pages]);
  useEffect(() => {
    if (checksame.length === 2) {
      if (checksame[0].name !== checksame[1].name) {
        setFailedindex([checksame[0].index, checksame[1].index]);
      } else {
        setCorrent(checksame[0]);
        setFoundcounter(foundcounter + 1);
      }
      setCheckSame([]);
    }
  }, [checksame]);
  useEffect(() => {
    if (foundcounter === 10) {
      endtime = new Date().getTime();
      console.log(starttime);
      console.log(endtime);

      pagetime = (endtime - starttime) / 1000;
      console.log(pagetime);
      pagetime = alert(`you won by ${pagetime} second`);
    }
  }, [foundcounter]);
  return (
    <div className="devision">
      <div className="father">
        {disneyCharacters.map((item, index) => (
          <Card
            setFailedindex={setFailedindex}
            failedindex={failedindex}
            index={index}
            checksame={checksame}
            setCheckSame={setCheckSame}
            data={disneyCharacters[index]}
          />
        ))}
      </div>
      <div>
        <div className="infofather">
          <img src={corrent?.img} alt={corrent?.name} />
          <br />
          <h1>name:{corrent?.name}</h1>
          <br />
          <h2>createdAt:{corrent?.createdAt.slice(0, 10)}</h2>
          <br />
          <h3>
            films:
            {corrent?.films.join(",")}
          </h3>
          <br />
          <h3>tvShows:{corrent?.tvShows.join(",")}</h3>
          <br />
          <h3>videoGames:{corrent?.videogames.join(",")}</h3>
          <br />
          <h3>enemies:{corrent?.enemies.join(",")}</h3>
          <br />
          <h3>allies:{corrent?.allies.join(",")}</h3>
          <br />
          <br />
          <button onClick={() => resetfunc()}>reset</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
