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

const initialUsers = [{ username: "admin", password: "admin", name: "admin" }];

module.exports = {
  validateUser,
  initialUsers,
};
