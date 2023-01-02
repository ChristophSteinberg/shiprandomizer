"use strict";

import { useContext, useEffect, useState } from "react";
import { ConfigContext } from "../App";

function AudioConfig() {
  const [config, setConfig] = useContext(ConfigContext);
  const [volume, setVolume] = useState(
    config?.sound ? config.sound.volume : 0.3
  );
  const [file, setFile] = useState(config?.sound ? config.sound.file : "");

  function handleChanged(volume: number) {
    setVolume(volume);
  }

  function handleButtonPlayClick() {
    var audio = new Audio(`sounds/${config.sound.file}.mp3`);
    audio.volume = config.sound.volume;
    audio.play();
  }

  useEffect(() => {
    const newConfig = { ...config };
    newConfig.sound.volume = volume;
    newConfig.sound.file = file;
    setConfig(newConfig);
  }, [volume, file]);

  return (
    <div className="config-section">
      <span>
        <small>Volume:</small>
      </span>
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={volume}
        onChange={(e) => {
          handleChanged(e.target.valueAsNumber);
        }}
      />
      <select
        style={{ margin: "2 2" }}
        value={file}
        onChange={(s) => setFile(s.target.value)}
      >
        {["explosion1"].map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <button onClick={handleButtonPlayClick}>▶</button>
    </div>
  );
}
