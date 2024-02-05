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
    if (id) {
      const singleUser = users.filter((ele) => ele.id === id);
      setUpdateData(singleUser[0]);
    }
  }, [id, users]);

  const handleSubmit = (values) => {
    dispatch(update(values));
    navigate("/");
  };

  return (
    <div className="vh-100 text-center">
      <h2 className="mt-3">Edit details of User</h2>
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
            />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Update;
