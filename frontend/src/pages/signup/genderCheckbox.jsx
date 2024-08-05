const GenderCheckbox = () => {
  return (
    <div className="flex">
      <div className="form-control">
        <label className="label cursor-pointer gap-x-1">
          <span className="label-text">Male</span>
          <input type="checkbox" className="checkbox checkbox-primary" />
        </label>
      </div>
      <div className="form-control">
        <label className="cursor-pointer label gap-x-1">
          <span className="label-text">Female</span>
          <input type="checkbox" className="checkbox checkbox-secondary" />
        </label>
      </div>
    </div>
  );
};
export default GenderCheckbox;
