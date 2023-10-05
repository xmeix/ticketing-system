import "./ListParams.css";
import { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const ListParams = () => {
  const [role, setRole] = useState("AFR");

  const etats = ["RESOLU", "ENCOURS", "OUVERT"];
  return (
    <div className="list-params  flex-row justify-between align-center">
      <div className=" flex-column select-group">
        <label className="input-sticky-label" htmlFor="etat">
          filtrer par etat
        </label>
        <select className="form-control" name="etat" id="etat">
          {etats.map((etat) => (
            <option value={etat}>{etat}</option>
          ))}
        </select>
      </div>
      {role === "AFR" && (
        <button>
          nouveau ticket
          {/* <AddRoundedIcon className="btn-icon"/> */}
        </button>
      )}
    </div>
  );
};

export default ListParams;
