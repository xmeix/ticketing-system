import "./Input.css";
const Input = ({ label, name, type, placeholder, inputRef }) => {
  return name === "role" ? (
    <div className="input-group">
      <label htmlFor="role">Rôle *</label>
      <select id="role" ref={inputRef}>
        {["ADM", "AFR", "ADZ"].map((option) => (
          <option key={option} value={option}>
            {option === "ADM"
              ? "administrateur"
              : option === "ADZ"
              ? "assistante DZ"
              : "assistante FR"}
          </option>
        ))}
      </select>
    </div>
  ) : (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type={type}
        ref={inputRef}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default Input;
