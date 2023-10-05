import "./TicketHeader.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
const TicketHeader = ({ closePopup, setReply }) => {
  return (
    <div className="ticket-header">
      <CloseRoundedIcon className="icon-btn" onClick={() => closePopup()} />
      <button onClick={() => setReply(true)}>répondre</button>
    </div>
  );
};

export default TicketHeader;
