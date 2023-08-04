import React, { FormEvent, useEffect, useRef, useState } from "react";
import "./expenseForm.css";
import { IExpenseFormData } from "../../App";

interface ExpenseFormProps {
  updateExpenseList: (newExpenseList: IExpenseFormData) => void;
  categories: string[];
}
const ExpenseForm = ({ updateExpenseList, categories }: ExpenseFormProps) => {
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState("");
  const [amountErrorMessage, setAmountErrorMessage] = useState("");
  const [categoryErrorMessage, setCategoryErrorMessage] = useState("");

  const [expenseFormData, setExpenseFormData] = useState<IExpenseFormData>({
    id: Math.floor(Math.random() * 1000),
    description: "",
    amount: 0,
    category: "-1",
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (expenseFormData.description.trim() === "") {
      alert("Please add a non-empty description");
      setDescriptionErrorMessage("Please add a non-empty description");
    } else if (expenseFormData.category === "-1") {
      alert("Please select a Category");
      setCategoryErrorMessage("Please select a Category");
    } else {
      updateExpenseList(expenseFormData);
      resetFormFields();
    }
  };

  const resetFormFields = () => {
    setExpenseFormData({
      id: Math.floor(Math.random() * 1000),
      description: "",
      amount: 0,
      category: "-1",
    });
  };

  useEffect(() => {
    resetFormFields();
  }, [updateExpenseList]);
  return (
    <div className="expense-form">
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
            {/* {descriptionErrorMessage&& <p>{descriptionErrorMessage}</p>} */}
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
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              required={true}
              aria-label="Default select example"
              id="category"
              // defaultValue={expenseFormData.category}
              value={expenseFormData.category}
              onChange={(e) => {
                setExpenseFormData({
                  ...expenseFormData,
                  category: e.target.value,
                });
              }}
            >
              <option value="-1">Select Category</option>

              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
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
    </div>
  );
};

export default ExpenseForm;
