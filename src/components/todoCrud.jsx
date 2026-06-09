// Todo Crud

import { useState, useEffect, useContext } from "react";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../services/todoService";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../auth/AuthContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "../Styles/todoCrud.css";
import Navbar from "./Navbar";

const TodoCrud = () => {
  const userName = localStorage.getItem("userName");

  const role = localStorage.getItem("role");

  // create a state variable for todos
  const [todos, setTodos] = useState([]);
  // create a state variable for new todo
  const [newTodo, setNewTodo] = useState({ title: "", completed: false });
  // create a state variable for editing todo
  const [editingTodo, setEditingTodo] = useState(null);

  const auth = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      // Simulate API delay
      setTimeout(async () => {
        const data = await getTodos();
        setTodos(data);
        setLoading(false);
      }, 2000); // 2 seconds delay
    } catch (error) {
      console.error("Error fetching todos:", error);
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const createdTodo = await createTodo(newTodo);
      setTodos([...todos, createdTodo]);
      setNewTodo({ title: "", completed: false });
      toast.success("Todo created successfully!");
    } catch (error) {
      console.error("Error creating todo:", error);
      toast.error("Failed to create todo");
    }
  };

  const handleUpdate = async (id) => {
    try {
      const updatedTodo = await updateTodo(id, editingTodo);
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
      setEditingTodo(null);
      toast.info("Todo updated successfully!");
    } catch (error) {
      console.error("Error updating todo:", error);
      toast.error("Failed to update todo");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
      toast.warn("Todo deleted!");
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("Failed to delete todo");
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        auth.logout();
        //Swal.fire("Logged out!", "You have been logged out.", "success");
        toast.success("Logged out successfully!");
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="mb-4">Todo CRUD</h1>
        <p>User: {userName}</p>
        <p>Role: {role}</p>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
        {/* Loader
      {loading && (
        <div className="text-center my-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )} */}

        {loading && (
          <div className="text-center my-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW3Rlc7xaKXDRc67zoXeoNbzQRgd8-nsq6dA&s" // paste Google image link here
              alt="Loading..."
              className="loader-img"
              width="50"
            />
            <p>Loading, please wait...</p>
          </div>
        )}

        {/* Add Todo */}
        <div className="row mb-3">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Todo"
              value={newTodo.title}
              onChange={(e) =>
                setNewTodo({ ...newTodo, title: e.target.value })
              }
            />
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary w-100" onClick={handleCreate}>
              Add Todo
            </button>
          </div>
        </div>

        {/* Todo List */}
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
              <th width="250">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>

                <td>
                  {editingTodo?.id === todo.id ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editingTodo.title}
                      onChange={(e) =>
                        setEditingTodo({
                          ...editingTodo,
                          title: e.target.value,
                        })
                      }
                    />
                  ) : (
                    todo.title
                  )}
                </td>

                <td>
                  {todo.completed ? (
                    <span className="badge bg-success">Completed</span>
                  ) : (
                    <span className="badge bg-warning text-dark">Pending</span>
                  )}
                </td>

                <td>
                  {editingTodo?.id === todo.id ? (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleUpdate(todo.id)}
                      >
                        Save
                      </button>

                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditingTodo(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => setEditingTodo(todo)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(todo.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}

            {todos.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">
                  No Todos Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TodoCrud;
