import React from "react";
import { IExpenseFormData } from "./../../App";
import "./expenseList.css";
import cancelIcon from "./../../assets/cancel.svg";

interface IExpenseListProps {
  filteredExpenseList: IExpenseFormData[];
  handleDeleteItem: (itemId: number) => void;
  handleDeleteAllItems: () => void;
  currency: string;
}
const ExpenseList = ({
  filteredExpenseList,
  handleDeleteItem,
  handleDeleteAllItems,
  currency,
}: IExpenseListProps) => {
  return (
    <div>
      <table className="table table-striped" style={{ position: "relative" }}>
        <thead>
          <tr>
            {/* <th scope="col">#</th> */}
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Category</th>
            <th scope="col" className="delete-all-items-th">
              {filteredExpenseList.length > 0 && (
                <button
                  role="button"
                  className="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteAllItemsModal"
                >
                  Empty
                </button>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenseList.length > 0 ? (
            <>
              {filteredExpenseList.map((expenseItem: IExpenseFormData) => (
                <tr key={expenseItem.id}>
                  {/* <th scope="row">{expenseItem.id}</th> */}
                  <td>{expenseItem.description}</td>
                  <td>{expenseItem.amount}</td>
                  <td>{expenseItem.category}</td>
                  <td className="delete-item-td">
                    <span
                      className=""
                      onClick={() => handleDeleteItem(expenseItem.id)}
                      role="button"
                    >
                      <img
                        src={cancelIcon}
                        alt="Cancel Item"
                        style={{ width: "1.5rem" }}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tr className="text-danger">
              <th scope="row" className="text-danger">
                0
              </th>
              <td colSpan={4} className="text-danger text-center">
                No data to show
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Total</th>
            {/* <td></td> */}
            <td style={{ fontWeight: "bold" }}>
              {currency}  {" "}
              {filteredExpenseList
                .reduce((acc, expenseItem) => acc + expenseItem.amount, 0)
                .toFixed(2)}
            </td>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </table>

      {/* Modal to confirm delete all items */}

      <div
        role="dialog"
        aria-modal="true"
        className="modal fade"
        id="deleteAllItemsModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete All Items</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete all items?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No, cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleDeleteAllItems}
              >
                Yes, delete all Items
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
