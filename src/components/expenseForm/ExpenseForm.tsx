import React, { FormEvent, useRef, useState } from "react";
import "./form.css";
import { IExpenseFormData } from "../../App";

interface ExpenseFormProps {
  updateExpenseList: (newExpenseList: IExpenseFormData) => void;
}
const ExpenseForm = ({ updateExpenseList }: ExpenseFormProps) => {
  const [expenseFormData, setExpenseFormData] = useState<IExpenseFormData>({
    id: Math.floor(Math.random() * 1000),
    description: "",
    amount: 0,
    category: "",
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    updateExpenseList(expenseFormData);
    setExpenseFormData({
      id: Math.floor(Math.random() * 1000),
      description: "",
      amount: 0,
      category: "-1",
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      {/* row 1 */}
      <div className="row">
        {/* description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            value={expenseFormData.description}
            onChange={(e) =>
              setExpenseFormData({
                ...expenseFormData,
                description: e.target.value,
              })
            }
            required
            id="description"
            type="text"
            className="form-control"
          />
        </div>

        {/* amount */}
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            value={expenseFormData.amount}
            onChange={(e) =>
              setExpenseFormData({
                ...expenseFormData,
                amount: e.target.valueAsNumber,
              })
            }
            required
            id="amount"
            type="number"
            className="form-control"
          />
        </div>

        {/* category */}
        <div className="mb-3">
          <select
            className="form-select"
            aria-label="Default select example"
            id="category"
            defaultValue={expenseFormData.category}
            onChange={(e) =>
              setExpenseFormData({
                ...expenseFormData,
                category: e.target.value,
              })
            }
            required
          >
            <option value="-1">Select Category</option>
            <option value="Grocieries">Grocieries</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>
        {/* submit */}
        <div className="mb-3">
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;
