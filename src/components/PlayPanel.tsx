import { useContext, useState } from "react";
import { Ship } from "../models/Config";
import JSConfetti from "js-confetti";
import Randomizer from "../service/Randomizer";
import { ConfigContext } from "../App";

const randomizer = new Randomizer();
const jsConfetti = new JSConfetti();

export default function PlayPanel() {
  const [config, setConfig] = useContext(ConfigContext);
  const [currentShip, setCurrentShip] = useState<Ship>();
  const [running, setRunning] = useState(false);

  function goHandler() {
    setRunning(true);
    randomizer.ships = config.ships;
    randomizer.start();
    randomizer.changeShipHandler = (ship) => {
      setCurrentShip(ship);
    };
    randomizer.randomizerStoppedHandler = () => {
      var audio = new Audio(`sounds/${config.sound.file}.mp3`);
      audio.volume = config.sound ? config.sound.volume : 0.3;
      audio.play();

      jsConfetti.addConfetti({
        emojis: ["💀", "⚓"],
      });
      setRunning(false);
    };
  }

  return (
    <div className="content">
      <div className="panel">
        <div className="logo-top"></div>
        <div className="ship-name">{currentShip ? currentShip.name : ""}</div>
        <div className="ship-nation">
          {currentShip ? currentShip.nation : ""}
        </div>
        <div className="ship-tier">{currentShip ? currentShip.tier : ""}</div>
        <div className="go-button">
          <button
            onClick={goHandler}
            disabled={running}
            className="go"
          ></button>
        </div>
        <div className="logo-bottom"></div>
        <div className="empty-bottom"></div>
      </div>
    </div>
  );
}
