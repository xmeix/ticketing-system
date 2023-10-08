import { useState } from "react";
import "./Ticket.css";
import TicketHeader from "./ticketHeader/TicketHeader";
import TicketContent from "./ticketContent/TicketContent";
import TicketReply from "./ticketReply/TicketReply";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

const Ticket = ({ ticket, closePopup, type }) => {
  const [reply, setReply] = useState(false);
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="ticket-popup">
      {type === "ticket" && (
        <TicketHeader
          ticket={ticket}
          closePopup={closePopup}
          setReply={setReply}
          type="reply"
        />
      )}
      {type === "ticket" && (
        <TicketContent ticket={ticket} type="normal-ticket" />
      )}
      {type === "ticket" && reply && user?.role === "ADZ" && (
        <TicketReply type="reply" ticket={ticket} />
      )}
      {type === "ticketForm" && (
        <TicketHeader closePopup={closePopup} setReply={setReply} type="new" />
      )}
      {type === "ticketForm" && <TicketReply type="new" ticket={ticket} />}
      {type === "ticket" && ticket?.reply && (
        <TicketContent
          ticket={ticket}
          ticketResponse={ticket?.reply}
          type="reply-ticket"
        />
      )}
    </div>
  );
};

export default Ticket;
