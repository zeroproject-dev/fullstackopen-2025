const validateUser = (json) => {
  const { username, password } = json;
  if ((username?.length ?? 0) < 3)
    return {
      error: "Username is required and must be at least 3 characters long",
    };

  if ((password?.length ?? 0) < 3)
    return {
      error: "Password is required and must be at least 3 characters long",
    };

  return null;
};

const initialUsers = [
  {
    username: "admin",
    password: "$2b$10$YHj/g0ltdmuZn1Sb3XDDweOMvMzVZBxQ/3yYVDixmYUYJdmDTFF.C",
    name: "admin",
  },
];

module.exports = {
  validateUser,
  initialUsers,
};
