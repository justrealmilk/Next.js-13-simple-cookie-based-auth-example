import { cookies } from "next/headers";
import Link from "next/link";

import { getData } from "@/utils/requests";

import ClientComponent from "@/app/ClientComponent";

export default async function _() {
  const data = await getData(cookies().get("token")?.value);

  return <ClientComponent data={data} />;
}
