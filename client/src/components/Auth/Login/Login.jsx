import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "@/Redux/user/userSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const { error, loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      // this try and catch block is important for handling the error in the frontend rather than the backend
      e.preventDefault();
      dispatch(signInStart());
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
      console.log(data);
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  console.log(formData);
  return (
    <div className="p-3 max-w-lg mx-auto mt-4 border w-full rounded-lg bg-card">
      <h1 className="text-3xl text-center font-semibold my-7">Log In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="email"
          placeholder="email"
          className=""
          id="email"
          onChange={handleChange}
        />
        <Input
          type="password"
          placeholder="password"
          className=""
          id="password"
          onChange={handleChange}
        />
        <Button size="sm" disabled={loading} className="uppercase" >
          {loading ? "loading..." : "Log In"}
        </Button>
      </form>
      {error && <p className="mt-5">{error}</p>}
    </div>
  );
}
