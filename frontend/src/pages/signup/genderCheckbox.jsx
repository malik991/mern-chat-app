const GenderCheckbox = ({ onCheckBoxChange, selectedGender }) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label
          className={`label cursor-pointer gap-x-1 ${
            selectedGender === "male" ? "selected" : ""
          }`}
        >
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={selectedGender === "male"}
            onChange={() => onCheckBoxChange("male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label cursor-pointer gap-x-1 ${
            selectedGender === "female" ? "selected" : ""
          }`}
        >
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            className="checkbox checkbox-secondary"
            checked={selectedGender === "female"}
            onChange={() => onCheckBoxChange("female")}
          />
        </label>
      </div>
    </div>
  );
};
export default GenderCheckbox;
