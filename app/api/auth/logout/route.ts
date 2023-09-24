import { revalidatePath } from "next/cache";
import { serialize } from "cookie";

export async function GET(request: Request) {
  revalidatePath("/");

  const seralized = serialize("token", "bye", {
    httpOnly: true,
    secure: true, //process.env.NODE_ENV === "production",
    domain: "5t23fw-3000.csb.app",
    sameSite: "none",
    maxAge: -1,
    path: "/",
  });

  console.log("Logout...");

  return new Response(null, {
    status: 200,
    headers: {
      "Set-Cookie": seralized,
    },
  });
}
