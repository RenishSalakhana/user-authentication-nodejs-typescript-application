import bcrypt from "bcrypt";
import users from "../models/user";
import { IUserLoginValidation, IUserValidation } from "../interface/interface";

const validateUser = (data: IUserValidation) => {
  const { firstName, lastName, username, email, password } = data;

  if (!firstName.trim() || !lastName.trim()) {
    throw new Error("Please enter valid Firstname and Lastname.");
  }
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    throw new Error("Username can only contain letters and numbers.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Please enter a valid Email.");
  }
  if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
    throw new Error(
      "Password must be at least 8 characters long and contain at least one letter, one number, and one special character."
    );
  }
};

const registerService = async (
  id: number,
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
) => {
  try {
    validateUser({ firstName, lastName, username, email, password });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await users.create({
      id,
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });
    return newUser;
  } catch (error) {
    throw error;
  }
};


const validateLoginInput = (data: IUserLoginValidation) => {
  const { email, password } = data;
  if (!email || !password) {
    throw new Error("Email and password required");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Please enter a valid Email.");
  }
};

const loginService = async (email: string, password: string) => {
  try {
    validateLoginInput({ email, password });

    const loginUser = await users.findOne({
      where: { email },
    });

    if (!loginUser) {
      return { error: "User not found" };
    }

    const isPasswordValid = await bcrypt.compareSync(
      password,
      loginUser.password
    );

    if (!isPasswordValid) {
      return { error: "Incorrect password" };
    }

    return loginUser;
  } catch (error) {
    throw error;
  }
};


const userProfileService = async (email: string) => {
  try {
    const userProfile = await users.findOne({
      where: { email },
    });
    if (!userProfile) {
      throw new Error("Email not found in the database.");
    }
    return userProfile;
  } catch (error) {
    throw error;
  }
};

const userListService = async () => {
  try {
    const userList = await users.findAll({});

    return userList;
  } catch (error) {
    throw error;
  }
};

export { registerService, loginService, userProfileService, userListService };