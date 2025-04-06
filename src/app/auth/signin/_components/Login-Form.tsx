"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react"

// zod
const Schema = z.object({
  email: z.string().email("A valid email address must be entered."),
  password: z.string().trim().min(8, "Password must be at least 8 characters long").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password is not matched"), 
});

// zod schema , typeScript 
type formSchema= z.infer<typeof Schema>;

export default function LoginForm() {

  const router = useRouter()

  // React Hook Form
  const form = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      email: "",
      password: "",
    }
  });
  const { setError, register, handleSubmit, formState: { errors }, control } = form;

  // onSubmit function
  const onSubmit = async (values: formSchema) => {
    const response = await signIn('credentials', {
      callbackUrl: '/',
      redirect: false,
      email: values.email,
      password: values.password
    })

    if (response?.ok) {
      window.location.href = response?.url || "/";     // window is good in refresh all page
    }
    else if (response?.error) {
      setError("root", { message: response.error });
    }
  };

  // eye password
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="flex justify-center ">
      <Form {...form} >
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <p className="text-2xl font-bold"> sign in</p>
          <p className="text-red-600 mt-2">{errors.root?.message}</p>
          {/* Field Email */}
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="my-7">
                <FormControl >
                  <Input {...register('email')} type="email" className="p-5" placeholder="Enter Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* password  // eye >> click on eye cover to close eye */}
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-7 ">
                <div className="relative">
                  <FormControl >
                    <Input {...register('password')} type={showPassword ? "text" : "password"} className="p-5" placeholder="Enter Password" {...field} />
                  </FormControl>
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute opacity-50 right-3 inset-y-0 flex justify-center items-center"
                  >
                    {showPassword ? <Eye /> : <EyeClosed />}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
         
          <button type="button" onClick={() => router.push('/auth/forgotPassword') }className="mb-7 mt-3 w-full text-end text-primary">
            Recover Password ?
          </button>

          {/* submit */}
          <Button  className="hover:bg-blue-800 py-5  w-full rounded-[20px]" type="submit">
           Sign in
          </Button>
        </form>
      </Form>
    </div>
  );
}
