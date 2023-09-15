import { Request, Response } from "express";
import { loginService, registerService, userListService, userProfileService } from "../services/userServices";

const register = async (req: Request, res: Response) => {
  try {
    const {
      id,
      firstName,
      lastName,
      username,
      email,
      password,
    } = req.body;

    const newUser = await registerService(
      id,
      firstName,
      lastName,
      username,
      email,
      password,
    );

    res.status(200).json({
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      error,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const loginUser = await loginService(email, password);

    if ("error" in loginUser) {
      res.status(400).json({
        error: loginUser.error,
      });
    } else {
      res.status(200).json({
        user: loginUser,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      error,
    });
  }
};

const userProfile = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;

    const profileUser = await userProfileService(email);

    res.status(200).json({
      user: profileUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      error,
    });
  }
};

const userLists = async (req: Request, res: Response) => {
  try {
    const userList = await userListService();
    res.status(200).json({
      user: userList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      error,
    });
  }
};

export { register, login, userProfile, userLists };