"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handler_submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setResponse("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "post",
        body: JSON.stringify({
          token: event.currentTarget.token.value,
        }),
      });

      setResponse(response.text());

      if (response.ok) {
        router.refresh();
        router.push("/");
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <main>
      <form onSubmit={handler_submit}>
        <input
          name="token"
          type="text"
          placeholder="<password>"
          disabled={isLoading}
          autoCapitalize="off"
          required
        />
        <button type="submit" disabled={isLoading}>
          Login
        </button>
      </form>
      {response}
      <br />
      <br />
      <Link href="/">Back</Link>
    </main>
  );
}
