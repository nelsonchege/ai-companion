"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";

export const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFormValues({ username: "", password: "" });

      const res = await signIn("credentials", {
        redirect: false,
        username: formValues.username,
        password: formValues.password,
        callbackUrl,
      });

      setLoading(false);

      console.log(res);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        console.log("invalid username or password");
        setError("invalid username or password");
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        {error && (
          <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
        )}
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Login</h1>
          <input
            required
            type="username"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            placeholder="username"
            className="block border border-grey-light w-full p-3 rounded mb-4"
          />
          <input
            required
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
          />
          <button
            type="submit"
            style={{ backgroundColor: `${loading ? "#ccc" : "#3446eb"}` }}
            className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
            disabled={loading}
          >
            {loading ? "loading..." : "Sign Up"}
          </button>
          <div className="flex">
            <span className="w-full text-center">or</span>
          </div>

          <Button size={"sm"} className="w-full mb-3">
            <Icons.google className="h-4 w-4 mr-2" />
            Google
          </Button>

          <Button size={"sm"} className="w-full">
            <Icons.github className="h-4 w-4 mr-2 " />
            Google
          </Button>
        </div>
      </form>
    </div>
  );
};
