import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addCustomerAction,
  removerCustomerAction,
} from "./store/customerReducer";
import { fetchCustomers } from "./asyncActions/customers";

function App() {
  const dispatch = useDispatch();
  const cash = useSelector((state) => state.cash.cash);
  const customers = useSelector((state) => state.customers.customers);
  console.log(cash);

  const getCash = (cash) => {
    dispatch({ type: "GET_CASH", payload: cash });
  };
  const addCash = (cash) => {
    dispatch({ type: "ADD_CASH", payload: cash });
  };

  const addCustomer = (name) => {
    const customer = {
      name: name,
      id: Date.now(),
    };
    dispatch(addCustomerAction(customer));
  };
  const removeCustomer = (customer) => {
    dispatch(removerCustomerAction(customer.id));
  };

  return (
    <div className="App">
      <div>{cash}</div>
      <div>
        <button onClick={() => addCash(Number(prompt()))}>
          Пополнить счет
        </button>
        <button onClick={() => getCash(Number(prompt()))}>
          Снять со счета
        </button>
        <button onClick={() => addCustomer(prompt())}>Добавить клиента</button>

        <button onClick={() => dispatch(fetchCustomers())}>
          Получить клиентов из базы
        </button>
      </div>
      {customers.length > 0 ? (
        <div>
          {customers.map((customer) => (
            <div
              style={{ border: "1px solid red", cursor: "pointer" }}
              onClick={() => removeCustomer(customer)}
            >
              {customer.name}
            </div>
          ))}
        </div>
      ) : (
        <div>Клиенты отсутствуют</div>
      )}
    </div>
  );
}

export default App;
