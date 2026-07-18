import LoginForm from "../components/auth/LoginForm";
import LoginIllustration from "../components/auth/LoginIllustration";

export default function Login() {
  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center p-8">
      <div className="w-full max-w-[1500px] h-[900px] rounded-3xl border border-[#1E293B] bg-[#07111F] flex overflow-hidden shadow-2xl">

        <LoginForm />

        <LoginIllustration />

      </div>
    </div>
  );
}