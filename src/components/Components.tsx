import "../App.css";
import { useState } from "react";

interface TaskItem {
  id: number;
  value: string;
  date: string;
  checked: boolean;
}

function Components() {
  // Get Current Date
  const currentDate = new Date().toLocaleDateString("en-US", {
    timeZone: "Pacific/Auckland",
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // Task Form
  const [newItem, setNewItem] = useState("");
  const [newDate, setNewDate] = useState("");
  const [items, setItems] = useState<TaskItem[]>([]);
  function addItem() {
    if (!newItem) {
      return;
    }
    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
      date: newDate,
      checked: false,
    };
    setItems((oldList) => [...oldList, item]);
    setNewItem("");
  }
  function deleteItem(id: number) {
    const newArray = items.filter((item) => item.id != id);
    setItems(newArray);
  }
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="container">
      {/* Header */}
      <h2>My To Do List</h2>
      <span>{currentDate}</span>
      <hr />
      {/* Task Form */}
      {/* This component will include a form for users to add new tasks. It will have input fields for the task name, and any other relevant information like due date, priority or notes. When submitted, it will trigger a function in the App component to add the task to the list. */}
      <h4>Add a new task</h4>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add a new task"
      />
      <input
        type="date"
        value={newDate}
        onChange={(e) => setNewDate(e.target.value)}
      />
      <button onClick={() => addItem()} className="button">
        ADD
      </button>
      <hr />

      {/* Task List */}
      {/* This component will recieve a list of tasks as a prop and render the Individual Task components. It will display its details in a list format. */}
      <h4>My Tasks</h4>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.id} className={item.checked ? "strikethrough" : ""}>
              <input
                type="checkbox"
                className="checkbox"
                checked={item.checked}
                onChange={() => {
                  const updatedItems = items.map((i) =>
                    i.id === item.id ? { ...i, checked: !i.checked } : i
                  );
                  setItems(updatedItems);
                }}
              />
              {item.value} - {formatDate(item.date)}
              <button onClick={() => deleteItem(item.id)} className="button2">
                X
              </button>
            </li>
          );
        })}
      </ul>
      <hr />
      {/* Footer */}
      <p>2023 | Alisya Syarief</p>
    </div>
  );
}

export default Components;
