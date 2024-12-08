import type { User } from "src/types/user";
import { createResourceId } from "src/utils/create-resource-id";
import { decode, JWT_EXPIRES_IN, JWT_SECRET, sign } from "src/utils/jwt";
import { wait } from "src/utils/wait";
import { users } from "./data";

const STORAGE_KEY: string = "users";

// NOTE: We use sessionStorage since memory storage is lost after page reload.
//  This should be replaced with a server call that returns DB persisted data.

const getPersistedUsers = (): User[] => {
  try {
    const data = sessionStorage.getItem(STORAGE_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data) as User[];
  } catch (err) {
    console.error(err);
    return [];
  }
};

const persistUser = (user: User): void => {
  try {
    const users = getPersistedUsers();
    const data = JSON.stringify([...users, user]);
    sessionStorage.setItem(STORAGE_KEY, data);
  } catch (err) {
    console.error(err);
  }
};

type SignInRequest = {
  email: string;
  password: string;
};

type SignInResponse = Promise<{
  accessToken: string;
}>;

type SignUpRequest = {
  email: string;
  name: string;
  password: string;
};

type SignUpResponse = Promise<{
  accessToken: string;
}>;

type MeRequest = {
  accessToken: string;
};

type MeResponse = Promise<User>;

class AuthApi {
  async signIn(request: SignInRequest): SignInResponse {
    const { email, password } = request;

    await wait(500);

    return new Promise((resolve, reject) => {
      try {
        // this will come from API response
        const accessToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11enphbW1pbEB0YWxlbnRzY2FuLmNvbSIsInBhc3N3b3JkIjoibXV6emFtbWlsQHRhbGVudCIsImlhdCI6MTcyOTY0OTQyMn0.AE8x9PgOwIPOgitdMQSjtAoDupMyJyO0bacrTgA7Jjo";

        resolve({ accessToken });
      } catch (err) {
        console.error("[Auth Api]: ", err);
        reject(new Error("Internal server error"));
      }
    });
  }

  async signInCompany(request: SignInRequest): SignInResponse {
    const { email, password } = request;

    await wait(500);

    return new Promise((resolve, reject) => {
      try {
        // this will come from API response
        const accessToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11enphbW1pbEB0YWxlbnRzY2FuLmNvbSIsInBhc3N3b3JkIjoibXV6emFtbWlsQHRhbGVudCIsImlhdCI6MTcyOTY0OTQyMn0.AE8x9PgOwIPOgitdMQSjtAoDupMyJyO0bacrTgA7Jjo";

        resolve({ accessToken });
      } catch (err) {
        console.error("[Auth Api]: ", err);
        reject(new Error("Internal server error"));
      }
    });
  }

  async signUp(request: SignUpRequest): SignUpResponse {
    const { email, name, password } = request;

    await wait(1000);

    return new Promise((resolve, reject) => {
      try {
        // this will come from API response
        const accessToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11enphbW1pbEB0YWxlbnRzY2FuLmNvbSIsInBhc3N3b3JkIjoibXV6emFtbWlsQHRhbGVudCIsImlhdCI6MTcyOTY0OTQyMn0.AE8x9PgOwIPOgitdMQSjtAoDupMyJyO0bacrTgA7Jjo";

        resolve({ accessToken });
      } catch (err) {
        console.error("[Auth Api]: ", err);
        reject(new Error("Internal server error"));
      }
    });
  }

  async signUpCompany(request: SignUpRequest): SignUpResponse {
    const { email, name, password } = request;

    await wait(1000);

    return new Promise((resolve, reject) => {
      try {
        // this will come from API response
        const accessToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11enphbW1pbEB0YWxlbnRzY2FuLmNvbSIsInBhc3N3b3JkIjoibXV6emFtbWlsQHRhbGVudCIsImlhdCI6MTcyOTY0OTQyMn0.AE8x9PgOwIPOgitdMQSjtAoDupMyJyO0bacrTgA7Jjo";

        resolve({ accessToken });
      } catch (err) {
        console.error("[Auth Api]: ", err);
        reject(new Error("Internal server error"));
      }
    });
  }

  me(request: MeRequest): MeResponse {
    const { accessToken } = request;

    return new Promise((resolve, reject) => {
      try {
        resolve({
          id: "user_1",
          avatar: 'https://picsum.photos/80',
          email: 'muzzammil@talentscan.com',
          name: 'muzzammil',
          // plan: user.plan,
        });
      } catch (err) {
        console.error("[Auth Api]: ", err);
        reject(new Error("Internal server error"));
      }
    });
  }
  meCompany(request: MeRequest): MeResponse {
    const { accessToken } = request;

    return new Promise((resolve, reject) => {
      try {
        resolve({
          id: "user_1",
          avatar: 'https://picsum.photos/80',
          email: 'muzzammil@talentscan.com',
          name: 'muzzammil',
          // plan: user.plan,
        });
      } catch (err) {
        console.error("[Auth Api]: ", err);
        reject(new Error("Internal server error"));
      }
    });
  }
}

export const authApi = new AuthApi();
