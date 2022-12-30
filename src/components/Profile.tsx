import { FC, useContext, useEffect, useState } from "react";
import { UserProfile } from "../models/Config";
import { ConfigContext } from "../App";

interface Props {
  onGetSelectedShipIdsRequest?: () => number[];
  onSetSelectShipIds?: (ids: number[]) => void;
}

const Profile: FC<Props> = ({
  onGetSelectedShipIdsRequest,
  onSetSelectShipIds,
}: Props) => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [newProfileName, setNewProfileName] = useState("");
  const [removeMode, setRemoveMode] = useState(false);
  const [config, setConfig] = useContext(ConfigContext);

  useEffect(() => {
    if (!config?.profiles) return;
    setProfiles(config.profiles);
  }, []);

  function addProfile() {
    if (!onGetSelectedShipIdsRequest) {
      return;
    }
    setProfiles((p) => {
      const np = [...p];
      const id = getNextFreeNumber(np ? np.map((p) => p.id) : []);
      np.push({
        id: id,
        name: newProfileName,
        shipIds: onGetSelectedShipIdsRequest(),
      });
      return np;
    });
  }

  function getNextFreeNumber(numbers: number[]) {
    if (!numbers || numbers.length === 0) {
      return 0;
    }

    numbers.sort((a, b) => a - b);

    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] !== i) {
        return i;
      }
    }

    return numbers.length;
  }

  function activateProfile(id: number) {
    if (!onSetSelectShipIds) return;
    const item = profiles.find((p) => p.id === id);
    if (!item || !item.shipIds) return;
    onSetSelectShipIds(item.shipIds);
  }

  function removeProfile(id: number) {
    setProfiles((p) => {
      const profilesToSet = p.filter((p) => p.id !== id);

      return profilesToSet;
    });
  }

  useEffect(() => {
    const newConfig = { ...config };
    newConfig.profiles = profiles;
    setConfig(newConfig);
  }, [profiles]);

  function profileButton(p: UserProfile) {
    if (removeMode) {
      return (
        <button onClick={() => removeProfile(p.id)} key={p.id}>
          {p.name ? p.name : p.id} ❌
        </button>
      );
    }
    return (
      <button onClick={() => activateProfile(p.id)} key={p.id}>
        {p.name ? p.name : p.id}
      </button>
    );
  }

  return (
    <div className="config-section" style={{ display: "block" }}>
      <div>
        <button onClick={addProfile}>+</button>
        <input
          placeholder="profile name"
          style={{ width: "10rem" }}
          type="text"
          value={newProfileName}
          onChange={(e) => {
            setNewProfileName(e.target.value);
          }}
        ></input>
        <input
          type="checkbox"
          id="removeMode"
          checked={removeMode}
          onChange={() => setRemoveMode((p) => !p)}
        />
        <label htmlFor="removeMode">Remove mode</label>
      </div>
      <div>
        {profiles.map((p) => {
          return profileButton(p);
        })}
      </div>
    </div>
  );
};

export default Profile;
