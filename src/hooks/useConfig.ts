import { useEffect, useMemo, useRef, useState } from "react";
import { Config } from "../models/Config";
import DefaultConfig from "../service/DefaultConfig";

const useConfig = (): [Config, (config: Config) => void] => {
  const [config, setConfig] = useState<Config>(() => {
    let config: Config | null = null;
    try {
      if (localStorage) {
        const configString = localStorage.getItem("config");
        if (configString) {
          config = JSON.parse(configString);
        }
      }
    } catch {
      console.log("Failed to read config");
    }

    if (
      config == undefined ||
      config.configVisible == undefined ||
      config.descriptionVisible == undefined ||
      config.sound == undefined ||
      config.sort == undefined ||
      config.ships == undefined ||
      config.version != DefaultConfig.version
    ) {
      console.log("Load default config");
      config = JSON.parse(JSON.stringify(DefaultConfig)) as Config;
      if (config) {
        storeConfig(config);
      }
    }

    return config as Config;
  });

  useEffect(() => {
    config.lastChange = new Date();
    console.log("Config chnaged", config.lastChange);
    storeConfig(config);
  }, [config]);

  function storeConfig(config: Config) {
    localStorage.setItem("config", JSON.stringify(config));
  }

  return [config, setConfig];
};

export default useConfig;
