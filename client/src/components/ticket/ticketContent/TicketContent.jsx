import React from "react";
import "./TicketContent.css";

const TicketContent = ({ ticket }) => {
  return (
    <div className="ticket-content">
      <div className="ticket-info">
        <div className="ticket-objet">
          <span>Objet:</span> {ticket?.objet}
        </div>
        <div className={`ticket-etat ticket-${ticket?.etat}`}>
          {ticket?.etat}
        </div>
      </div>
      <div className="ticket-deadline">
        <span>Date limite:</span> {ticket?.deadline}
      </div>
      <div className="ticket-description">
        <span>Description:</span>
        <br />
        {ticket?.description}
      </div>

      <div className="ticket-piece-jointes"></div>
    </div>
  );
};

export default TicketContent;
