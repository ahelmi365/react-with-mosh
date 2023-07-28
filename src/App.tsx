import { useEffect, useState } from "react";
import "./App.css";
import ExpenseForm from "./components/expenseForm/ExpenseForm";
import ExpenseList from "./components/expenseList/ExpenseList";
import ExpenseFilter from "./components/expenseFilter/ExpenseFilter";

export interface IExpenseFormData {
  id: number;
  description: string;
  amount: number;
  category: string;
}

function App() {
  const [expenseList, setExpenseList] = useState<IExpenseFormData[]>(
    JSON.parse(window.localStorage.getItem("myExpenseListItems") || "[]")
  );

  useEffect(() => {
    const localStorageExpenseList = JSON.parse(
      window.localStorage.getItem("myExpenseListItems") || "[]"
    );
    setExpenseList(localStorageExpenseList);
    setFilteredExpenseList(expenseList);
    return () => {
      setExpenseList([]);
      setFilteredExpenseList([]);
    };
  }, []);

  const [filteredExpenseList, setFilteredExpenseList] = useState<
    IExpenseFormData[]
  >([]);

  const updateExpenseList = (newExpenseList: IExpenseFormData) => {
    setExpenseList((prev) => [...prev, newExpenseList]);
    setFilteredExpenseList((prev) => [...prev, newExpenseList]);
  };
  useEffect(() => {
    localStorage.setItem("myExpenseListItems", JSON.stringify(expenseList));
  }, [expenseList]);

  const handleDeleteItem = (itemId: number) => {
    const updateList = expenseList.filter((item) => item.id !== itemId);
    setExpenseList(updateList);
    setFilteredExpenseList(updateList);
    localStorage.setItem("myExpenseListItems", JSON.stringify(updateList));
  };
 
  const handleFilterCategories = (filterCategory: string) => { 
    if (filterCategory === "-1") {
      setFilteredExpenseList(expenseList);
    } else {
      setFilteredExpenseList(
        expenseList.filter((item) => item.category === filterCategory)
      );
    }
  }; 
  return (
    <div className="main">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-4 border-end border-warning">
            <ExpenseForm updateExpenseList={updateExpenseList} />
          </div>

          <div className="col-sm-12 col-md-8">
            <ExpenseFilter handleFilterCategories={handleFilterCategories} />
            <hr />
            <ExpenseList
              filteredExpenseList={filteredExpenseList}
              handleDeleteItem={handleDeleteItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
