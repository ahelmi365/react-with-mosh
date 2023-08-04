import { useEffect, useState } from "react";
import "./App.css";
import ExpenseForm from "./components/expenseForm/ExpenseForm";
import ExpenseList from "./components/expenseList/ExpenseList";
import ExpenseFilter from "./components/expenseFilter/ExpenseFilter";
import Posts from "./components/posts/Posts";
import Users from "./components/users/Users";

const categories = ["Groceries", "Utilities", "Entertainment"];
const currencies = ["EGP - E£", "USD - $"];
export interface IExpenseFormData {
  id: number;
  description: string;
  amount: number;
  category: string;
}

function App() {
  const [currency, setCurrency] = useState(currencies[0].split(" - ")[1]);
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

  const handleDeleteAllItems = () => {
    setFilteredExpenseList([]);
    setExpenseList([]);
  };
  const handleSelectCategory = (filterCategory: string) => {
    if (filterCategory === "-1" || filterCategory == "all") {
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
          <div className="col-sm-12 col-md-4 expense-form-container">
            <ExpenseForm
              updateExpenseList={updateExpenseList}
              categories={categories}
            />
          </div>

          <div className="col-sm-12 col-md-8">
            <div className="row">
              <div className="col-8">
                <ExpenseFilter
                  handleSelectCategory={handleSelectCategory}
                  categories={categories}
                />
              </div>
              <div className="col-4 d-flex align-items-end">
                <select
                  className="form-select"
                  aria-label="select currency"
                  id="currency"
                  defaultValue={"-1"}
                  onChange={(e) => {
                    setCurrency(e.target.value.split(" - ")[1]);
                  }}
                  required
                >
                  <option value="-1">select currency</option>

                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <hr />
            <ExpenseList
              filteredExpenseList={filteredExpenseList}
              handleDeleteItem={handleDeleteItem}
              handleDeleteAllItems={handleDeleteAllItems}
              currency={currency}
            />
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-12 col-md6">
            {/* <Posts/> */}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-12 col-md6">
            <Users/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
