import { Context, Status } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { User } from "../../model/userModel.ts";

export const createUserController = async (ctx: Context) => {
  try {
    const { name, email, password, gender } = ctx.request.body;

    if (!ctx.request.hasBody) {
      return (ctx.response.status = Status.BadRequest);
    }
    const newUser = new User(
      "INSERT INTO users (name, email, password, gender) VALUES ($1, $2) RETURNING *",
      name,
      email,
      password,
      gender
    );
    await User.save();
    if (newUser) {
      ctx.response.status = Status.OK;
      ctx.response.body = {
        code: 1,
        message: "Data Saved",
        data: { user: newUser },
      };
    } else {
      ctx.response.status = Status.BadRequest;
      ctx.response.body = {
        code: 0,
        message: "Data not Saved",
        data: { message: "Data not Saved" },
      };
    }
  } catch (error) {
    console.error(error);
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = {
      code: 0,
      message: "Internal Server Error",
      data: { message: "Internal Server Error" },
    };
  }
};

export async function getUserById(userId: number): Promise<User | null> {
  try {
    const result = await User.queryObject(
      "SELECT * FROM users WHERE id = $1",
      userId
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error getting user by ID:", error);
    return null;
  }
}

// Function to get all users
export async function getAllUsers(): Promise<User[]> {
  try {
    const result = await User.queryObject("SELECT * FROM users");
    return result.rows;
  } catch (error) {
    console.error("Error getting all users:", error);
    return [];
  }
}
