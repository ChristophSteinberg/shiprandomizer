import { createContext } from "react";
import useConfig from "./hooks/useConfig";
import ConfigPanel from "./components/ConfigPanel";
import Description from "./components/Description";
import DefaultConfig from "./service/DefaultConfig";
import { Config } from "./models/Config";
import PlayPanel from "./components/PlayPanel";

type ConfigContextType = [config: Config, setConfig: (config: Config) => void];

const defaultValue: ConfigContextType = [DefaultConfig, (config: Config) => {}];

export const ConfigContext = createContext<ConfigContextType>(defaultValue);

function App() {
  const [config, setConfig] = useConfig();
  return (
    <ConfigContext.Provider value={[config, setConfig]}>
      <div>
        <ConfigPanel />
        <Description />
        <PlayPanel />
      </div>
    </ConfigContext.Provider>
  );
}

export default App;
