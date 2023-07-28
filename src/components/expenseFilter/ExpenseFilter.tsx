import React from "react";
interface props {
  handleFilterCategories: (filterItem: string) => void;
}
const ExpenseFilter = ({ handleFilterCategories }: props) => {
  return (
    <div className="row ">
      <div className="col-6">
        <h6>Filter By Category</h6>
      </div>

      <div className="col-6">
        <select
          className="form-select"
          aria-label="Default select example"
          id="category"
          defaultValue={"-1"}
          onChange={(e) => handleFilterCategories(e.target.value)}
          required
        >
          <option value="-1">Select Category</option>
          <option value="Grocieries">Grocieries</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
        </select>
      </div>
    </div>
  );
};

export default ExpenseFilter;
