import React from "react";

// CategoryForm component for adding new categories
const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      {/* Form for submitting new category */}
      <form onSubmit={handleSubmit}>
        <div className="d-flex">
          {/* Input field for entering new category */}
          <input
            type="text"
            className="form-control m-2"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {/* Submit button for the form */}
          <button type="submit" className="btn btn-primary m-2">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
