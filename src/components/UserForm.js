import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { create, update } from "./redux/slice/index";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import Title from "./Title";

/**
 * @description  "Below is the UserForm Function Component "
 * @summary 1. It conditionally shows the update and create forms of user
 *          2. Formik & yup is used Here to validate a form
 *         
 */

const UserForm = () => {
  const { users,success} = useSelector((state) => state.app);
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  useEffect(() => {
   
    if (id) {
      const singleUser = users.find((user) => user._id === id);

      setFormData(singleUser || {});
    } else {
      setFormData({});
    }
  }, [id, users]);

  const validate = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .test("name-validation", "Invalid Name", (value) => /^[a-zA-Z]| [a-zA-Z]+$/i.test(value)),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .test(
        "email-validation",
        "Invalid email address",
        (value) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    if (id) {
      dispatch(update({ ...values, id})); 
    } else {
      dispatch(create(values));
    }
    setSubmitting(false);
    if(success){
    notify(values.name);
    }
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };
  
  const cancelbtnHandler = () => navigate("/");
  const notify = (name) => {
    toast(`${name} ${id ? "Updated" : "Created"}`);
  };

  return (
    <>
    { (id) ? 
    <Title title="Edit User"/> : <Title title="Create User"/>}
    <div className="vh-100 text-center">
      <ToastContainer />
      <h2 className="mt-3">{id ? "Edit" : "Create"} User Details</h2>
      <Formik
        initialValues={{ name: formData.name || "", email: formData.email || "" }}
        onSubmit={handleSubmit}
        enableReinitialize
        validationSchema={validate}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="w-50 mx-auto my-5">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <Field
                type="text"
                name="name"
                className="form-control outline:none rounded"
                placeholder="Enter User Name"
              />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <Field
                type="email"
                name="email"
                className="form-control rounded"
                placeholder="Enter User Email"
              />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ marginRight: "1rem" }}
              onClick={cancelbtnHandler}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-success"
              disabled={!isValid || isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
    </>
  );
};

export default UserForm;
