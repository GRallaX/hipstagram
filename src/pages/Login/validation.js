const validation = {
  login: {
    required: { value: true, message: "Login is required" },
    maxLength: {
      value: 30,
      message: "Login should contain 2–30 characters",
    },
    minLength: {
      value: 2,
      message: "Login should contain 2–30 characters",
    },
    pattern: {
      value: /^[A-Z0-9]+$/gi,
      message: "Login should contain only numbers and letters",
    },
  },

  email: {
    required: { value: true, message: "Email is required" },
    pattern: {
      value: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g,
      message: "Email should be 'test@gmail.com' format",
    },
  },

  password: {
    required: { value: true, message: "Password is required" },
    maxLength: {
      value: 16,
      message: "Password should contain 8–16 characters",
    },
    minLength: {
      value: 8,
      message: "Password should contain 8–16 characters",
    },
    pattern: {
      value: /^[A-Z0-9]+$/gi,
      message: "Password should contain only numbers and letters",
    },
  },

  password1: {
    required: { value: true, message: "Password is required" },
    maxLength: {
      value: 16,
      message: "Password should contain 8–16 characters",
    },
    minLength: {
      value: 8,
      message: "Password should contain 8–16 characters",
    },
    pattern: {
      value: /^[A-Z0-9]+$/gi,
      message: "Password should contain only numbers and letters",
    },
  },
};

export default validation;
