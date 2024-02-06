import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { read } from "./redux/slice/index";
import Result from "./Result";

const Read = () => {
  const dispatch = useDispatch();
  const { users, loading, fetchDone } = useSelector((state) => state.app);

  const itemsPerPage = 10; 
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    document.title = "Get User";
    if (!fetchDone) dispatch(read());
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="vh-100 ">
        <p className="align-middle">Loading...</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table table-bordered border-primary">
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
          {currentItems.map((element, index) => (
            <Result key={element.id} User={element} Count={index + 1 + indexOfFirstItem} />
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: Math.ceil(users.length / itemsPerPage) }, (_, i) => (
          <button key={i + 1} onClick={() => paginate(i + 1) }>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Read;
