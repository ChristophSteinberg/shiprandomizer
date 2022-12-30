import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Ship } from "./models/Config";
import useConfig from "./hooks/useConfig";
import Randomizer from "./service/Randomizer";
import JSConfetti from "js-confetti";

function App() {
  const [config, setConfig] = useConfig();
  const [currentShip, setCurrentShip] = useState<Ship>();
  const [running, setRunning] = useState(false);

  const randomizer = useRef(new Randomizer());
  const jsConfetti = useRef(new JSConfetti());

  function goHandler() {
    setRunning(true);
    randomizer.current.ships = config.ships;
    randomizer.current.start();
    randomizer.current.changeShipHandler = (ship) => {
      setCurrentShip(ship);
    };
    randomizer.current.randomizerStoppedHandler = () => {
      var audio = new Audio(`assets/sounds/${config.sound.file}.mp3`);
      audio.volume = config.sound ? config.sound.volume : 0.3;
      audio.play();

      jsConfetti.current.addConfetti({
        emojis: ["💀", "⚓"],
        // emojis: [...getConfig().explosionIcons],
      });
      setRunning(false);
    };
  }

  useEffect(() => {
    return () => randomizer.current.stop();
  }, []);

  return (
    <div>
      {/* <Config></Config> */}

      <div className="content">
        <div className="panel">
          <div className="ship-name">{currentShip ? currentShip.name : ""}</div>
          <div className="ship-nation">
            {currentShip ? currentShip.nation : ""}
          </div>
          <div className="control">
            <button
              onClick={goHandler}
              disabled={running}
              className="go"
            ></button>
          </div>
        </div>
      </div>

      {/* <Description></Description> */}
    </div>
  );
}

export default App;
