import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function AuthErrorPage() {
  return (
    <div className="flex h-[calc(100vh-65px)] items-center justify-center">
      <Card className="h-fit">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-6 w-6 text-red-500" />
            <CardTitle>Authentication Error</CardTitle>
          </div>
          <CardDescription>
            There was a problem with your authentication.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            This could be due to an expired session, invalid credentials, or a
            temporary system issue.
          </p>
        </CardContent>
        <CardFooter>
          <Link href="/auth/signin" passHref>
            <Button className="w-full">Try Signing In Again</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
