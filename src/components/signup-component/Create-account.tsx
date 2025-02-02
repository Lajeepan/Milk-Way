import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import styles from "./Create-account.module.css"; // Ensure the correct CSS file name

const SignupPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("buyer");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !phoneNumber || !password || !address) {
      toast.error("All fields are required!", { style: { width: "400px" } });
      return;
    }

    try {
      const response = await axios.post("/api/user/register", {
        name: `${firstName} ${lastName}`,
        email,
        phoneNumber,
        password,
        address,
        role,
      });

      if (response.status === 201) {
        toast.success(response.data.message, { style: { width: "400px" } });
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong.", { style: { width: "400px" } });
    }
  };

  return (
    <div className={styles.signupContainer}>
      <form onSubmit={handleSubmit} className={styles.signupForm}>
        <h2>Signup</h2>

        <label>
          First Name
          <input onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" required />
        </label>

        <label>
          Last Name
          <input onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" required />
        </label>

        <label>
          Email
          <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required />
        </label>

        <label>
          Address
          <input onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Address" required />
        </label>

        <label>
          Phone Number
          <input onChange={(e) => setPhoneNumber(e.target.value)} type="tel" placeholder="Phone Number" required />
        </label>

        <label className={styles.passwordContainer}>
          Password
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className={styles.showPassword}
            onClick={() => setShowPassword(!showPassword)}
          >
          </button>
        </label>

        <label>
          Role
          <select
            name="role"
            className={styles.inputField}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
            <option value="courier">Courier</option>
          </select>
        </label>

        <a href="#" className={styles.forgotPassword}>Forgot Password?</a>

        <button type="submit" className={styles.signupButton}>Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;
