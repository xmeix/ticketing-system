import "./ListHeader.css";
import { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
const ListHeader = () => {
  const [role, setRole] = useState("AFR");

  
  return (
    <div className="list-header flex-row justify-between align-center">
      <h2 className="list-header-title">Les tickets</h2>
      {role === "AFR" && (
        <button>
          créer ticket <AddRoundedIcon />
        </button>
      )}
    </div>
  );
};

export default ListHeader;
