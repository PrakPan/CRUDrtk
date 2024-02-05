import React from "react";
import { useDispatch } from "react-redux";
import { create } from "../../src/components/redux/slice/index";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    dispatch(create(values));
    console.log(values);
    navigate("/");
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  return (
    <div className="vh-100 text-center">
      <h2 className="mt-3">Fill the details of User</h2>
      <Formik
        initialValues={{ name: "", email: "" }}
        validate={validate}
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

export default Create;
