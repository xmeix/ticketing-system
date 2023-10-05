import "./TicketHeader.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
const TicketHeader = () => {
  return (
    <div className="ticket-header">
      <CloseRoundedIcon onClick={() => closePopup()} />
      <button>répondre</button>
    </div>
  );
};

export default TicketHeader;
