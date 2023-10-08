import React from "react";
import "./TicketContent.css";
import {
  getDDL,
  getDate,
  getEmail,
  getName,
} from "../../../utils/utilFunctions";

const TicketContent = ({ ticket, type, ticketResponse }) => {
  const handleFileDownload = () => {
    if (type !== "reply-ticket" && ticket?.piecesjointes) {
      window.open("http://localhost:8000/" + ticket?.piecesjointes, "_blank");
    } else if (type === "reply-ticket" && ticketResponse?.piecesjointes) {
      window.open(
        "http://localhost:8000/" + ticketResponse?.piecesjointes,
        "_blank"
      );
    }
  };
  function getFileNameFromURL(url) {
    const urlParts = url.split("/");
    const fileName = urlParts[urlParts.length - 1];
    return fileName;
  }

  return (
    <div className={`ticket-content ${type === "reply-ticket" && "reponse"}`}>
      <div className="ticket-info">
        <div className="ticket-objet">
          <span>Objet:</span>{" "}
          {type === "reply-ticket" ? ticketResponse?.objet : ticket?.objet}
        </div>
        {type !== "reply-ticket" && (
          <div className={`ticket-etat ticket-${ticket?.etat}`}>
            {ticket?.etat}
          </div>
        )}
      </div>
      {type !== "reply-ticket" && (
        <div className="ticket-deadline">
          <span>Date limite:</span>{" "}
          <span className="deadline">{getDDL(ticket)}</span>
        </div>
      )}
      <div className="ticket-description">
        <span>Description:</span>

        <div className="desc-ticket">
          {type === "reply-ticket"
            ? ticketResponse?.description
            : ticket?.description}
        </div>
      </div>
      {((type !== "reply-ticket" && ticket?.piecesjointes) ||
        (type === "reply-ticket" && ticketResponse?.piecesjointes)) && (
        <div className="files-attached">
          <div className="file-name">
            {type === "reply-ticket"
              ? getFileNameFromURL(ticketResponse?.piecesjointes)
              : getFileNameFromURL(ticket?.piecesjointes)}
          </div>
          <button className="download-file" onClick={handleFileDownload}>
            Télécharger
          </button>
        </div>
      )}{" "}
      <div className="flex-row justify-between">
        <div className="ticket-creator flex-column">
          <span>Créé Par:</span>{" "}
          <div className="creator-name">
            {type === "normal-ticket"
              ? getName(ticket, "afr")
              : getName(ticket, "adz")}
          </div>
          <span>Email:</span>
          <div className="creator-email">
            {type === "normal-ticket"
              ? getEmail(ticket, "afr")
              : getEmail(ticket, "adz")}
          </div>
        </div>
        <div className="ticket-creation-date flex-row">
          <span>Créé le:</span>
          {getDate(ticket)}
        </div>
      </div>
      {ticket?.adz !== null && type === "normal-ticket" && (
        <>
          <hr />
          <div className="flex-row justify-between">
            <div className="ticket-creator flex-column">
              <span>Pris Par:</span>
              <div className="creator-name">
                {type === "normal-ticket" ? getName(ticket, "adz") : "/"}
              </div>
              <span>Email:</span>
              <div className="creator-email">
                {type === "normal-ticket" ? getEmail(ticket, "adz") : "/"}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TicketContent;
