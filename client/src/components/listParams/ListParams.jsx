import "./ListParams.css";
import { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useSelector } from "react-redux";

const ListParams = ({ setFilter }) => {
  const { user } = useSelector((state) => state.auth);
  const etats = ["RESOLU", "ENCOURS", "OUVERT"];
  return (
    <div className="list-params  flex-row justify-between align-center">
      <div className=" flex-column select-group">
        <label className="input-sticky-label" htmlFor="etat">
          filtrer par etat
        </label>
        <select
          className="form-control"
          name="etat"
          id="etat"
          onChange={(e) => setFilter(e.target.value)}
        >
          {etats.map((etat, i) => (
            <option key={i} value={etat}>
              {etat}
            </option>
          ))}
        </select>
      </div>
      {user.role === "ADM" && (
        <button className="addas">
          ajouter assistante
          {/* <AddRoundedIcon className="btn-icon"/> */}
        </button>
      )}
      {user.role !== "ADZ" && (
        <button className="add-ticket">
          nouveau ticket
          {/* <AddRoundedIcon className="btn-icon"/> */}
        </button>
      )}
    </div>
  );
};

export default ListParams;
