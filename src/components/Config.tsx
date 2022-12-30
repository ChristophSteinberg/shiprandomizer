"use strict";

import { useEffect, useRef, useState } from "react";
import {
  Ship,
  Tier,
  ShipType,
  shipTypeToString,
  ShipTypeValues,
  TierValues,
} from "../models/Config";
import useConfig from "../hooks/useConfig";
import Search from "./Search";
import Profile from "./Profile";

function Config() {
  const [config, setConfig] = useConfig();
  const [ships, setShips] = useState<Ship[]>([]);
  const [configVisible, setConfigVisible] = useState(false);
  const [highlightedShips, setHighlightedShips] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState({
    by: "id",
    order: "ascending",
  });
  const [isMuted, setIsMuted] = useState(
    config?.sound ? config.sound.volume == 0 : false
  );

  const shipTable = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    setShips(config.ships);
    setConfigVisible(config.configVisible);
    setSortConfig(config.sort);
  }, []);

  function setAllSelectionState(selected: boolean) {
    setShips((p) => {
      p.forEach((s) => (s.selected = selected));
      return [...p];
    });
  }

  function onListItemChanged(id: number) {
    const index = ships.findIndex((s) => s.id == id);
    if (index !== -1) {
      setShips((p) => {
        p[index].selected = !p[index].selected;
        return [...p];
      });
    }
  }

  function changeTierSelection(tier: Tier, selected: boolean) {
    setShips((s) => {
      s.filter((ss) => ss.tier === tier).forEach(
        (s) => (s.selected = selected)
      );
      return [...s];
    });
  }
  function changeNationSelection(nation: string, selected: boolean) {
    setShips((s) => {
      s.filter((ss) => ss.nation === nation).forEach(
        (s) => (s.selected = selected)
      );
      return [...s];
    });
  }

  function setSelectShipType(shipType: ShipType, selected: boolean) {
    setShips((s) => {
      s.filter((ss) => ss.type === shipType).forEach(
        (s) => (s.selected = selected)
      );
      return [...s];
    });
  }

  function foundShips(allFoundShips: number[]) {
    if (!allFoundShips || allFoundShips.length === 0) {
      setHighlightedShips([]);
      return;
    }

    setHighlightedShips(allFoundShips);

    if (!shipTable?.current) {
      return;
    }

    debugger;

    // const trs = Array.from(shipTable.current.children).find((s) =>
    //   allFoundShips.includes(parseInt(s.dataset.id))
    // );

    // if (trs) {
    //   trs.scrollIntoView({ block: "center", inline: "nearest" });
    // }
  }

  function isShipHighlighted(id: number) {
    return highlightedShips.includes(id);
  }

  function getSelectedShipIds() {
    return ships.filter((s) => s.selected).map((s) => s.id);
  }

  function setSelectedShipByIds(ids: number[]) {
    const shipsToSelect = [...ships];

    shipsToSelect.forEach((s) => {
      if (ids.includes(s.id)) {
        s.selected = true;
      } else {
        s.selected = false;
      }
    });

    setShips(shipsToSelect);
  }

  function UpDown(props: { name: string }) {
    let indicator = "";
    if (sortConfig && sortConfig.by === props.name) {
      indicator = sortConfig.order == "descending" ? "🠻" : "🠹";
    }

    return <>{indicator}</>;
  }

  function handleTableHeadClick(headerId: string) {
    setSortConfig((p) => {
      return {
        by: headerId,
        order: p && p.order === "ascending" ? "descending" : "ascending",
      };
    });
  }

  function toggleMuteSound() {
    const newConfig = { ...config };
    if (newConfig.sound.volume == 0) {
      newConfig.sound.volume = 0.3;
      setIsMuted(false);
    } else {
      newConfig.sound.volume = 0;
      setIsMuted(true);
    }
    setConfig(newConfig);
  }

  useEffect(() => {
    if (!ships || ships.length === 0) {
      return;
    }
    const newConfig = { ...config };
    newConfig.ships = ships;
    newConfig.configVisible = configVisible;
    newConfig.sort = sortConfig;
    setConfig(newConfig);
  }, [ships, configVisible, sortConfig]);

  useEffect(() => {
    if (!ships || ships.length === 0) {
      return;
    }
    const toSort = [...ships];

    if (!sortConfig) return;

    type shipProps = keyof Ship;

    toSort.sort((a, b) => {
      const aValue = a[sortConfig.by as shipProps];
      const bValue = b[sortConfig.by as shipProps];

      if (sortConfig.order === "descending") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setShips(toSort);
  }, [sortConfig]);

  return (
    <div>
      <div
        className={
          configVisible
            ? "config-button-panel config-button-panel-open"
            : "config-button-panel"
        }
      >
        <button
          onClick={() => setConfigVisible((p) => !p)}
          className="config-button-toggle"
        >
          {configVisible ? "◀" : "⚙️"}
        </button>
        <button className="mute-button-toggle" onClick={toggleMuteSound}>
          {isMuted && <div>🔇</div>}
          {!isMuted && <div>📢</div>}
        </button>
      </div>
      <div
        className="config-panel"
        style={configVisible ? { display: "block" } : { display: "none" }}
      >
        <div className="config-header">
          {/* <AudioConfig></AudioConfig> */}
          <Search
            onShipIdsFound={(s) => {
              foundShips(s);
            }}
          ></Search>

          <div className="ship-config">
            <div>
              <button
                style={{ width: "100px" }}
                onClick={() => {
                  setAllSelectionState(true);
                }}
              >
                select all
              </button>

              <span
                style={{
                  display: "inline-block",
                  width: "100px",
                  paddingLeft: "1rem",
                }}
              >
                Select Tier:
              </span>
              {TierValues.map((t) => (
                <button key={t} onClick={() => changeTierSelection(t, true)}>
                  {t}
                </button>
              ))}
            </div>

            <div>
              <button
                style={{ width: "100px" }}
                onClick={() => {
                  setAllSelectionState(false);
                }}
              >
                unselect all
              </button>

              <span
                style={{
                  display: "inline-block",
                  width: "100px",
                  paddingLeft: "1rem",
                }}
              >
                Unselect Tier:
              </span>
              {TierValues.map((t) => (
                <button key={t} onClick={() => changeTierSelection(t, false)}>
                  {t}
                </button>
              ))}
            </div>
            <div>
              <span>
                <p>Select Nation: </p>
              </span>
              {[
                "U.K.",
                "Japan",
                "France",
                "U.S.A.",
                "U.S.S.R.",
                "Italy",
                "Germany",
                "Netherlands",
                "Europe",
                "Pan-America",
                "Pan-Asia",
              ].map((t) => (
                <button key={t} onClick={() => changeNationSelection(t, true)}>
                  {t}
                </button>
              ))}
            </div>

            <div>
              <span>
                <p>Select Type </p>
              </span>
              {ShipTypeValues.map((t) => (
                <button key={t} onClick={() => setSelectShipType(t, true)}>
                  {shipTypeToString(t)}
                </button>
              ))}
            </div>
          </div>

          <Profile
            onSetSelectShipIds={(ds) => {
              setSelectedShipByIds(ds);
            }}
            onGetSelectedShipIdsRequest={getSelectedShipIds}
          ></Profile>
        </div>
        <div className="ship-list">
          <table>
            <thead>
              <tr>
                {["Id", "", "Name", "Nation", "Tier", "Kind", "Type"].map(
                  (t) => (
                    <th
                      key={t}
                      onClick={() =>
                        handleTableHeadClick(t.toLocaleLowerCase())
                      }
                    >
                      {t}
                      <UpDown name={t.toLocaleLowerCase()}></UpDown>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody ref={shipTable}>
              {ships.map((s) => (
                <tr key={s.id} data-id={s.id}>
                  <td>{s.id}.</td>
                  <td>
                    <input
                      id={`s.id`}
                      type="checkbox"
                      checked={s.selected}
                      onChange={() => onListItemChanged(s.id)}
                      name={`s.id`}
                    />
                  </td>
                  <td
                    className={isShipHighlighted(s.id) ? "highlighted-row" : ""}
                  >
                    <label htmlFor={`s.id`}>{s.name}</label>
                  </td>
                  <td>
                    <label htmlFor={`s.id`}>{s.nation}</label>
                  </td>
                  <td>
                    <label htmlFor={`s.id`}>{s.tier}</label>
                  </td>
                  <td>
                    <label htmlFor={`s.id`}>{s.kind}</label>
                  </td>
                  <td>
                    <label htmlFor={`s.id`}>{shipTypeToString(s.type)}</label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Config;
