import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { update } from "../../src/components/redux/slice/index";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Update = () => {
  const { users } = useSelector((state) => state.app);
  const { id } = useParams();
  const [updateData, setUpdateData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title="Update User";
    if (id) {
      const singleUser = users.find((user) => user.id === id);
      setUpdateData(singleUser || {});
    }
  }, [id, users]);

  const handleSubmit = (e) => {
    // e.preventDefault();
    dispatch(update(updateData));
    navigate("/");
  };

  const newData = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  

  return (
    <div className="vh-100 text-center">
      <h2 className="mt-3">Edit User Details</h2>
      <Formik
        initialValues={{ name: updateData.name || "", email: updateData.email || "" }}
        onSubmit={handleSubmit}
      >
        <Form className="w-50 mx-auto my-5">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <Field
              type="text"
              name="name"
              className="form-control outline:none rounded"
              placeholder="Enter name"
              value={updateData && updateData.name}
              onChange={newData}
            />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <Field
              type="email"
              name="email"
              className="form-control rounded"
              placeholder="Enter Email"
              value={updateData && updateData.email}
              onChange={newData}
            />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>
          <button type="button" className="btn btn-secondary" style={{marginRight:"1rem"}}onClick={()=>navigate("/")}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Update;
