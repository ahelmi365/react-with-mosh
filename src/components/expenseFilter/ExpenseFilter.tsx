import React from "react";
interface props {
  handleSelectCategory: (filterItem: string) => void;
  categories: string[];
}
const ExpenseFilter = ({ handleSelectCategory, categories }: props) => {
  return (
    <div className="row align-items-end">
      <div className="col-sm-12 col-md-5">
        <h6>Filter By Category</h6>
      </div>

      <div className="col-sm-12 col-md-7">
        <select
          className="form-select"
          aria-label="Default select example"
          id="category"
          defaultValue={"-1"}
          onChange={(e) => handleSelectCategory(e.target.value)}
          required
        >
          <option value="-1">select category</option>
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ExpenseFilter;
