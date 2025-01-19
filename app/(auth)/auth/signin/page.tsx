import { auth } from "@/auth";
import SignInForm from "@/components/form/SignInForm";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="flex h-[calc(100vh-65px)] bg-background">
      <SignInForm />
    </div>
  );
}
