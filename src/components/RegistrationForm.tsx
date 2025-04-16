import { useState } from "react";
import { motion } from "framer-motion";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState("idle");

  const validate = () => {
    let newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = "Tên không được để trống.";
    if (!formData.email.includes("@")) newErrors.email = "Email không hợp lệ.";
    if (formData.password.length < 6)
      newErrors.password = "Mật khẩu ít nhất 6 ký tự.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Mật khẩu không khớp.";
    if (!formData.termsAccepted)
      newErrors.termsAccepted = "Bạn phải đồng ý với điều khoản.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setStatus("processing");
      setTimeout(() => setStatus("done"), 5000);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Đăng Ký</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Họ và Tên"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          className="w-full p-2 border rounded"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Xác nhận mật khẩu"
          className="w-full p-2 border rounded"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
          />
          <span>Đồng ý với điều khoản</span>
        </label>
        {errors.termsAccepted && (
          <p className="text-red-500 text-sm">{errors.termsAccepted}</p>
        )}

        <motion.button
          type="submit"
          className="w-full flex items-center justify-center bg-blue-500 text-white p-2 rounded"
          whileTap={{ scale: 0.95 }}
        >
          {status === "idle" && "Đăng Ký"}
          {status === "processing" && (
            <motion.span className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-5 h-5 border-2 border-t-transparent border-white rounded-full"
              ></motion.div>
              Processing
            </motion.span>
          )}
          {status === "done" && (
            <motion.span className="flex items-center gap-2">
              ✔ Done
            </motion.span>
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default RegistrationForm;
