import React from "react";
import { IExpenseFormData } from "./../../App";
interface IExpenseListProps {
  filteredExpenseList: IExpenseFormData[];
  handleDeleteItem: (itemId: number) => void;
}
const ExpenseList = ({
  filteredExpenseList,
  handleDeleteItem,
}: IExpenseListProps) => {
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            {/* <th scope="col">#</th> */}
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Category</th>
            <th scope="col">{""}</th>
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
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDeleteItem(expenseItem.id)}
                    >
                      Delete
                    </button>
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
            <td></td>
            <td style={{ fontWeight: "bold" }}>
              $
              {filteredExpenseList
                .reduce((acc, expenseItem) => acc + expenseItem.amount, 0)
                .toFixed(2)}
            </td>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ExpenseList;
