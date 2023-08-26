"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { FiGithub } from "react-icons/fi";

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [githubloading, setGithubLoading] = useState<Boolean>(false);
  const [googleloading, setGoogleLoading] = useState<Boolean>(false);
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormValues({ username: "", password: "" });

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      if (!res.ok) {
        setError("Unable to register you");
        return;
      }

      signIn(undefined, { callbackUrl: "/" });
      toast.success("Registered Successfull");
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  const loginWithGoogle = useCallback(async () => {
    setGoogleLoading(true);

    try {
      await signIn("google");
    } catch (error) {
    } finally {
      setGoogleLoading(false);
      router.push("/");
      toast.success("Registered Successfull");
    }
  }, []);

  const loginWithGithub = useCallback(async () => {
    setGithubLoading(true);

    try {
      await signIn("github");
    } catch (error) {
    } finally {
      setGithubLoading(false);
      router.push("/");
      toast.success("Registered Successfull");
    }
  }, []);

  return (
    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
      <form onSubmit={onSubmit}>
        {error && (
          <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
        )}

        <h1 className="mb-8 text-3xl text-center">Sign up</h1>
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
      </form>
      <Button
        size={"sm"}
        className="w-full mb-3"
        isLoading={googleloading}
        onClick={loginWithGoogle}
      >
        {googleloading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="h-4 w-4 mr-2" />
        )}
        Google
      </Button>
      <Button
        size={"sm"}
        className="w-full"
        onClick={loginWithGithub}
        isLoading={googleloading}
      >
        {githubloading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FiGithub style={{ color: "white" }} className="h-4 w-4 mr-2" />
        )}
        Github
      </Button>
    </div>
  );
};
