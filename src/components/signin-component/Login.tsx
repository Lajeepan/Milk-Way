import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify"; 
import { useRouter } from "next/router";

const Loginpage: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/user/login", { email, password });
       // Declare role once here
      if (response.status === 201) {
        toast.success(response.data.message, { style: { width: "400px" } });
        // Redirect based on role
        router.push("/dashboard");
      } else {
        toast.error(response.data.error);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
          required
          className="input-field"
        />
        <div className="password-container">
          <input
            onChange={(e) => setPassword(e.target.value)}
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            required
            className="input-field"
          />
          <span
            className="show-password"
            onClick={togglePasswordVisibility}
            role="button"
          >
          </span>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        <Link href="/signup" className="create-account">
          Create Account
        </Link>
      </form>
    </div>
  );
};

export default Loginpage;
