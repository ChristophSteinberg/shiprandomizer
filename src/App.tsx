import { createContext, useEffect, useMemo, useRef, useState } from "react";
import useConfig from "./hooks/useConfig";
import Randomizer from "./service/Randomizer";
import JSConfetti from "js-confetti";
import ConfigPanel from "./components/ConfigPanel";
import Description from "./components/Description";
import DefaultConfig from "./service/DefaultConfig";
import { Ship, Config } from "./models/Config";

type ConfigContextType = [config: Config, setConfig: (config: Config) => void];

const defaultValue: ConfigContextType = [DefaultConfig, (config: Config) => {}];

export const ConfigContext = createContext<ConfigContextType>(defaultValue);

const randomizer = new Randomizer();
const jsConfetti = new JSConfetti();

function App() {
  const [config, setConfig] = useConfig();
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
        // emojis: [...getConfig().explosionIcons],
      });
      setRunning(false);
    };
  }

  useEffect(() => {
    return () => randomizer.stop();
  }, []);

  return (
    <ConfigContext.Provider value={[config, setConfig]}>
      <div>
        <div className="content">
          <div className="panel">
            <div className="logo-top"></div>
            <div className="ship-name">
              {currentShip ? currentShip.name : ""}
            </div>
            <div className="ship-nation">
              {currentShip ? currentShip.nation : ""}
            </div>
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

        <ConfigPanel />
        <Description />
      </div>
    </ConfigContext.Provider>
  );
}

export default App;
