"use client";

// We'll use Zod for schema validation, which is standard with shadcn/ui forms
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useState } from "react";
// Using lucide-react for icons, which is the default for shadcn/ui
import { Loader2, Github, Users } from "lucide-react";

// Import the idiomatic shadcn/ui components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage, // This is key for showing errors
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// --- Mocks for your custom code ---
// In a real app, you would import these.
// This is just to make the example complete.

// 1. Mock UseAuth hook
// This simulates the hook you provided.
const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  // This function now receives the validated data from the form
  const handleSignUp = async (data) => {
    setIsLoading(true);
    console.log("Signing up with:", data);
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Sign up successful!");
    setIsLoading(false);
  };

  return { handleSignUp, isLoading };
};

// 2. Mock GoogleProvider component
// This simulates the button component you provided.
const GoogleProvider = () => (
  <Button variant="outline" type="button" className="w-full">
    {/* Simple SVG for Google Icon */}
    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
      <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 21.2 172.9 60.3l-66.8 65.1c-21.6-20.5-50.4-32.5-86.1-32.5-69.5 0-126.5 57.2-126.5 127.3s57 127.3 126.5 127.3c76.3 0 110.2-50.8 114.9-77.7H248v-97.1h236.1c2.3 12.7 3.9 25.9 3.9 40.8z"></path>
    </svg>
    Google
  </Button>
);
// --- End of Mocks ---

// 1. Define the Zod schema for validation
const formSchema = z.object({
  firstname: z.string().min(2, { message: "First name is too short." }),
  lastname: z.string().min(2, { message: "Last name is too short." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

// 2. Renamed component to SignUpPage (more accurate than LoginPage)
export default function SignUpPage() {
  // 3. Get auth methods from your hook
  const { handleSignUp, isLoading } = useAuth();

  // 4. Set up react-hook-form with the Zod resolver
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  // 5. This function is passed to the form's onSubmit
  const onSubmit = (data) => {
    // handleSignUp is already designed to take the form data
    handleSignUp(data);
  };

  return (
    // This div centers the component on the page
    <div className="flex min-h-screen items-center justify-center bg-background p-4 font-sans">

      {/* 6. Use the Card component for a cleaner layout */}
      <Card className="w-full max-w-md">

        <CardHeader className="text-center">
          <a href="/" aria-label="go home" className="inline-block">
            {/* Using a Lucide icon as a placeholder for your logo */}
            <Users className="mx-auto h-12 w-12 text-primary" />
          </a>
          <CardTitle className="mt-4 text-2xl font-bold font-[poppins]">Create an Account</CardTitle>
          <CardDescription className="font-mono text-sm">
            Welcome! Enter your details to get started.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <GoogleProvider />
            <Button variant="outline" type="button" className="w-full">
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button>
          </div>

          {/* A cleaner "OR" separator */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-muted"></div>
            <span className="text-xs text-muted-foreground font-mono">
              OR CONTINUE WITH
            </span>
            <div className="h-px flex-1 bg-muted"></div>
          </div>

          {/* 7. Use the shadcn/ui Form component */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

              {/* First/Last Name in a grid */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono">First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono">Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono">Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono">Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button with loading state */}
              <Button type="submit" className="w-full font-mono font-bold" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

            </form>

    )
          </Form>
        </CardContent>

        {/* 8. Use CardFooter for the sign-in link */}
        <CardFooter className="justify-center">
          <p className="text-center font-mono text-sm text-muted-foreground">
            Have an account?
            <Button asChild variant="link" className="px-2 font-mono text-sm">
              <a href="sign-in">Sign In</a>
            </Button>
          </p>
        </CardFooter>

      </Card>
    </div>
  );
}

Footer
© 2025 GitHub, Inc.
Footer navigation
Terms
P
