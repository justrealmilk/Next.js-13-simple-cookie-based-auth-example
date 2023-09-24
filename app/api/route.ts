import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getData } from "@/utils/data";

export async function GET() {
  const data = await getData(cookies().get("token")?.value);

  try {
    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
