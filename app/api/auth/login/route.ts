import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";

export async function POST(request: Request) {
  const body = await request.json();

  // check if token exists here

  if (body.token !== "password123") {
    return NextResponse.json(
      { message: "Unauthorized" },
      {
        status: 401,
      },
    );
  }

  const secret = process.env.JWT_SECRET ?? "";

  const token = sign(
    {
      token: body.token,
    },
    secret,
    {
      expiresIn: 60 * 60 * 24 * 30,
    },
  );

  const seralized = serialize("token", token, {
    httpOnly: true,
    secure: true, //process.env.NODE_ENV === "production",
    domain: "5t23fw-3000.csb.app",
    sameSite: "none",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  const response = {
    message: "Authenticated!",
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "Set-Cookie": seralized,
    },
  });
}
