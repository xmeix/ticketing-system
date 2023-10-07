import { useSelector } from "react-redux";
import "./TicketHeader.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
const TicketHeader = ({ closePopup, setReply, type, ticket }) => {
  const { user } = useSelector((state) => state.auth);
  
  return (
    <div className="ticket-header">
      <CloseRoundedIcon className="icon-btn" onClick={() => closePopup()} />
      {type === "reply" && user.role === "ADZ" && ticket.adz === user.id && (
        <button onClick={() => setReply(true)}>répondre</button>
      )}
    </div>
  );
};

export default TicketHeader;
