import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { read } from "./redux/slice/index";
import Result from "./Result";
import { ToastContainer } from "react-toastify";

const Read = () => {
  const dispatch = useDispatch();

  const { users, loading } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(read());
  }, []);

  if (loading) {
    return (
      <div className="vh-100 ">
        <p className="align-middle">Loading...</p>
      </div>
    );
  }

  console.log(users);

  return (
    <div>
       <ToastContainer/>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((element, index) => (
            <Result key={element.id} User={element} Count={index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Read;
