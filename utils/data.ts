import { verify } from "jsonwebtoken";

// database stuff in here for requests.ts

const secret = process.env.JWT_SECRET ?? "";

export async function getData(token: string | undefined) {
  const auth =
    token !== undefined && verify(token, secret) !== undefined
      ? (verify(token, secret) as any).token
      : undefined;

  if (auth === "password123") {
    return "Secret content";
  } else {
    return "Public content";
  }
}
