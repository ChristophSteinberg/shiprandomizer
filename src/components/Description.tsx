import { useContext, useEffect, useState } from "react";
import { Config } from "../models/Config";
import { ConfigContext } from "../App";

export default function Description() {
  const [config, setConfig] = useContext(ConfigContext);
  const [open, setOpen] = useState(config ? config.descriptionVisible : true);

  useEffect(() => {
    const newConfig: Config = { ...config };
    newConfig.descriptionVisible = open;
    setConfig(newConfig);
  }, [open]);

  function toggleVisibility() {
    setOpen((p) => !p);
  }

  return (
    <div>
      <div>
        <div
          className={
            open
              ? "description-panel description-panel-open"
              : "description-panel description-panel-closed"
          }
        >
          <button
            onClick={() => {
              toggleVisibility();
            }}
            className="description-panel-toggle"
            type="button"
          >
            <span className="">{open ? "▶" : "❔"}</span>
          </button>
          {open && (
            <div className="side-panel">
              <h3>Description</h3>
              <p>
                With the <b>Shiprandomizer</b> you can choose a ship at random.
                Under settings you can choose the tier level from 1-10 and all
                Superships.
              </p>
              <p>
                Either select all ships under "select all" or just select the
                ships you would like to sail from. Your settings will be saved
                in your browser cache. To change the settngs click on the
                setting icon (⚙️) on the left site.
              </p>
              <p>A free community project for World of Warships (TM)</p>
              <p>Contact: graf_de90@gmail.com - twitch.tv/Graf_d</p>
              <p>
                <b>(c) 2022 HighTower & Graf_d</b>
              </p>
              <a
                href="https://www.tipeeestream.com/graf_d/donation"
                target="_blank"
              >
                <button className="button">
                  a small donation for webhosting would make me happy 🙃
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
