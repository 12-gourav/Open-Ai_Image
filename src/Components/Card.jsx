import React from "react";
import { downloadImage } from "../utills";
import { download } from "../assets";

const Card = ({ _id, name, prompt, photo }) => {
  return (
    <div className="card">
      <img src={photo} alt={prompt} />
      <div className="data">
        <p>{prompt}</p>
        <div className="dis">
          <div className="div">
            <div className="avtar">{name[0]}</div>
            <i style={{ marginLeft: "0.4rem" }}>{name}</i>
          </div>
          <button
            className="download"
            onClick={() => downloadImage(_id, photo)}
          >
            <img src={download} alt="download" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
