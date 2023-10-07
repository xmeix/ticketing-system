import React from "react";
import "./TicketContent.css";

const TicketContent = ({ ticket, type }) => {
  const handleFileDownload = () => {
    if (ticket?.piecesjointes) {
      window.open("http://localhost:8000/" + ticket?.piecesjointes, "_blank");
    }
  };
  function getFileNameFromURL(url) {
    const urlParts = url.split("/");
    const fileName = urlParts[urlParts.length - 1];
    return fileName;
  }

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
        <span>Date limite:</span>{" "}
        <span className="deadline">
          {new Date(ticket?.deadline).getDate() +
            " - " +
            new Date(ticket?.deadline).getMonth() +
            " - " +
            new Date(ticket?.deadline).getFullYear()}
        </span>
      </div>
      <div className="ticket-description">
        <span>Description:</span>

        <div className="desc-ticket">{ticket?.description}</div>
      </div>

      {ticket?.piecesjointes && (
        <div className="files-attached">
          <div className="file-name">
            {getFileNameFromURL(ticket.piecesjointes)}
          </div>
          <button className="download-file" onClick={handleFileDownload}>
            Télécharger
          </button>
        </div>
      )}
      <div className="flex-row justify-between">
        <div className="ticket-creator flex-column">
          <span>Créé Par:</span>{" "}
          <div className="creator-name">
            {type === "normal-ticket"
              ? `${ticket?.afr?.last_name} ${ticket?.afr?.first_name}`.toLowerCase()
              : `${ticket?.adz?.last_name} ${ticket?.adz?.first_name}`.toLowerCase()}
          </div>
          <span>Email:</span>
          <div className="creator-email">
            {type === "normal-ticket"
              ? `${ticket?.afr?.email}`
              : `${ticket?.adz?.email}`}{" "}
          </div>
        </div>
        <div className="ticket-creation-date flex-row">
          <span>Créé le:</span>
          {`${new Date(ticket?.createdAt).getDate()} - ${new Date(
            ticket?.createdAt
          ).getMonth()} - ${new Date(ticket?.createdAt).getFullYear()}`}
        </div>
      </div>
    </div>
  );
};

export default TicketContent;
