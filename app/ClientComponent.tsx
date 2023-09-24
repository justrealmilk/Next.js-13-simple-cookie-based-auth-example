"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ClientComponent({ data }) {
  const router = useRouter();

  async function handler_logout(event) {
    event.preventDefault();

    try {
      await fetch("/api/auth/logout");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main>
      <p>
        <strong>{data}</strong>
      </p>
      <p>
        <Link href="/login">Login</Link>
        <br />
        <Link href="/logout" onClick={handler_logout}>
          Logout
        </Link>
      </p>
    </main>
  );
}
