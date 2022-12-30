"use strict";

import { useEffect, useState } from "react";

function AudioConfig() {
  const [volume, setVolume] = useState(getConfig().sound.volume);
  const [file, setFile] = useState(getConfig().sound.file);

  function handleChanged(volume: number) {
    setVolume(volume);
  }

  function handleButtonPlayClick() {
    const config = getConfig();
    var audio = new Audio(`assets/sounds/${config.sound.file}.mp3`);
    audio.volume = config.sound.volume;
    audio.play();
  }

  useEffect(() => {
    const config = getConfig();
    config.sound.volume = volume;
    config.sound.file = file;
    storeConfig(config);
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
        {["explosion1", "explosion2"].map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <button onClick={handleButtonPlayClick}>▶</button>
    </div>
  );
}
