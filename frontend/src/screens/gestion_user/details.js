import axios from "axios";
import React, { useEffect, useState } from "react";
import { InputGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
function Details() {
  const [form, setForm] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await axios
      .put("http://localhost:5000"+`/api/users/${id}`, form)
      .then((res) => {})
      .catch((err) => setErrors(err.response.data));
  };

  useEffect(async () => {
    await axios.get("http://localhost:5000"+`/api/users/${id}`).then((res) => {
      setForm(res.data);
    });
  }, []);
  return (
    <div className="container mt-4 col-12 col-lg-4">
      <form onSubmit={onSubmitHandler}>
        <InputGroup
          label="Email"
          type="text"
          name="Email"
          onChangeHandler={onChangeHandler}
          errors={errors.Email}
          value={form.Email}
        />
        <InputGroup
          label="name"
          type="text"
          name="name"
          onChangeHandler={onChangeHandler}
          errors={errors.name}
          value={form.name}
        />
        <InputGroup
          label="roles"
          type="text"
          name="roles"
          onChangeHandler={onChangeHandler}
          errors={errors.roles}
          value={form.roles}
        />
        <InputGroup
          label="actif"
          type="checkbox"
          name="actif"
          onChangeHandler={onChangeHandler}
          errors={errors.actif}
          value={form.actif}
        />
        <button className="btn btn-primary" type="submit">
          Add user
        </button>
      </form>
    </div>
  );
}

export default Details;
