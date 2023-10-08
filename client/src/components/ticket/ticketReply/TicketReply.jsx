import { useRef, useState } from "react";
import "./TicketReply.css";
import { useDispatch } from "react-redux";
import {
  createReply,
  createTicket,
  getTickets,
} from "../../../store/apiCalls/ticket";
import toast from "react-hot-toast";
import TicketContent from "../ticketContent/TicketContent";

const TicketReply = ({ type, ticket, closePopup }) => {
  const [object, setObjet] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(
    new Date(Date.now() + 86400000).toISOString().split("T")[0]
  );
  const [attachment, setAttachment] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleTicketAction = async () => {
    // console.log("handleTicket", ticket);

    let form_data = new FormData();
    if (selectedFile) {
      form_data.append("piecesjointes", selectedFile);
    }
    form_data.append("description", description);

    if (type === "new") {
      form_data.append("deadline", deadline);
      form_data.append("objet", object);
      if (
        object.trim() !== "" &&
        description.trim() !== "" &&
        deadline.trim() !== ""
      ) {
        await dispatch(createTicket(form_data));
        await dispatch(getTickets());
        closePopup();
      } else {
        toast.error("Veuillez remplir les champs nécessaires..", {
          id: "reply-empty",
        });
      }
    } else {
      form_data.append("objet", `Re: ${ticket?.objet}`);
      if (description.trim() !== "") {
        await dispatch(
          createReply({
            id: ticket?.id,
            reply: form_data,
          })
        );
        await dispatch(getTickets());

        closePopup();
      } else {
        toast.error("Veuillez remplir les champs nécessaires..", {
          id: "reply-empty",
        });
      }

      // dispatch(getTickets())
    }
  };

  return (
    <div className="ticket-reply">
      <div className="ticket-reply-form">
        <div className="form-title">
          {type === "new" ? "Créer un nouveau ticket" : "Réponds à ce ticket"}
        </div>
        {type === "new" && (
          <div className="form-group">
            <label htmlFor="reply-text">Objet</label>
            <input
              type="text"
              className="input-text"
              placeholder="Objet ticket"
              onChange={(e) => setObjet(e.target.value)}
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="reply-text">
            {type === "new" ? "Description" : "Remarques:"}
          </label>
          <textarea
            id="reply-text"
            name="reply-text"
            rows="4"
            placeholder="Description de ticket..."
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        {type === "new" && (
          <div className="form-group">
            <label htmlFor="deadline">Date limite:</label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              onChange={(e) => setDeadline(e.target.value)}
              min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="attachment">
            {selectedFile ? (
              <div className="files-selected">
                <div className="files-number">{`fichier sélectionné:`}</div>
                <div className="file-name">{"- " + selectedFile.name}</div>
              </div>
            ) : (
              ""
            )}
          </label>
          <input
            type="file"
            id="attachment"
            name="piecesjointes"
            onChange={handleFileInputChange}
          />
        </div>

        <button type="submit" onClick={handleTicketAction}>
          {type === "new" ? "Créer" : "Envoyer"}
        </button>
      </div>
    </div>
  );
};

export default TicketReply;
