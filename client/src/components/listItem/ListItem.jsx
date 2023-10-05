import { useState } from "react";
import "./ListItem.css";
const ListItem = () => {
  const [role, setrole] = useState("ADZ");
  const [etat, setEtat] = useState("OUVERT");
  return (
    <div className="list-item flex-row justify-between">
     
      <div className="ticket-details">
        <p className="section-title">ticket</p>
        <p className="object">Object</p>
        <p className="description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
          blanditiis.
        </p>
      </div>
      <div className="agent">
        <p className="section-title">agent</p>
        <p className="name">Boualouache lamia</p>
        <p className="email">lamiaboualouache@gmail.com</p>
      </div>
      <div className="item-action">
        {role === "ADZ" && <button>Prendre</button>}
        <div className={`ticket-${etat}`}>{etat}</div>
      </div>
    </div>
  );
};

export default ListItem;
