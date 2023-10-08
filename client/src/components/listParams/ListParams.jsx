import "./ListParams.css";
import { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useSelector } from "react-redux";
import usePopup from "../../hooks/usePopup";
import SortRoundedIcon from "@mui/icons-material/SortRounded";
const ListParams = ({ setFilter, handleSort }) => {
  const { user } = useSelector((state) => state.auth);
  const { isOpen, openPopup, closePopup, Popup } = usePopup();
  const etats = ["RESOLU", "ENCOURS", "OUVERT", "EXPIRE", "ALL"];
  return (
    <div className="list-params  flex-row justify-between align-center">
      <div className="flex-row align-center" style={{ gap: "1em" }}>
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
        <SortRoundedIcon className="icon-btn" onClick={() => handleSort()}/>
      </div>

      {user.role !== "ADZ" && (
        <button
          className="add-ticket"
          onClick={() => openPopup(null, "ticketForm")}
        >
          nouveau ticket
          {/* <AddRoundedIcon className="btn-icon"/> */}
        </button>
      )}

      {isOpen && <Popup />}
      {isOpen && <div className="hide" onClick={() => closePopup()}></div>}
    </div>
  );
};

export default ListParams;
