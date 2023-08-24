import { RegisterForm } from "./Form";

export default function RegisterPage() {
  return (
    <>
      <div className="bg-slate-100 min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <RegisterForm />
          <div className="text-grey-dark mt-6 ">
            Already have an account?{" "}
            <a
              className="no-underline border-b border-blue text-blue"
              href="/login"
            >
              Log in
            </a>
            .
          </div>
        </div>
      </div>
    </>
  );
}
