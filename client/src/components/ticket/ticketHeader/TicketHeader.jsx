import "./TicketHeader.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
const TicketHeader = ({ closePopup, setReply, type }) => {
  return (
    <div className="ticket-header">
      <CloseRoundedIcon className="icon-btn" onClick={() => closePopup()} />
      {type === "reply" && (
        <button onClick={() => setReply(true)}>répondre</button>
      )}
    </div>
  );
};

export default TicketHeader;
