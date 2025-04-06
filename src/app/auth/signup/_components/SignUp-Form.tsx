"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { JSON_HEADER } from "@/lib/constant/api.constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "next-auth/react";
;

// zod 
const Schema = z.object({
  username: z.string().min(4, "At least 4 letters are required"),
  firstName: z.string().min(4, "At least 4 letters are required"),
  lastName: z.string().min(4, "At least 4 letters are required"),
  email: z.string().email("A valid email address must be entered."),
  password: z.string().trim().min(8, "Password must be at least 8 characters long").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password is not matched"),
  rePassword: z.string().min(6, "Confirm password must be at least 6 characters"),
  phone: z.string().min(2, "A valid phone must be entered."),
});
// zod schema , typeScript
type formSchema = z.infer<typeof Schema>;

export default function SignUpForm() {

  const router = useRouter();

  //  show password
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const form = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    }
  });
  const { setError, register, handleSubmit, formState: { errors }, control } = form;

  //  onSubmit function
  async function onSubmit(values: formSchema) {

    const responese = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: { ...JSON_HEADER },
    });

    const data = await responese.json();

    if (responese.ok) {
      router.push("/auth/signin")
    } else {
      setError('root', { message: data.message });
    }

  }


  return (
    <div className="flex justify-center ">
      <Form {...form} >
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <p className="text-2xl font-bold"> sign Up</p>
          <p className="text-red-500 mt-5">{errors.root?.message}</p>
          {/* Field Fname */}
          <FormField
            control={control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="my-7">
                <FormControl className="relative">
                  <Input {...register('firstName')} type="text" className="p-5" placeholder="Enter Fname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Field Lname */}
          <FormField
            control={control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="my-7">
                <FormControl className="relative">
                  <Input {...register('lastName')} type="text" className="p-5" placeholder="Enter Lname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Field userName */}
          <FormField
            control={control}
            name="username"
            render={({ field }) => (
              <FormItem className="my-7">
                <FormControl className="relative">
                  <Input {...register('username')} type="text" className="p-5" placeholder="Enter username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Field Email */}
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="my-7">
                <FormControl className="relative">
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
                  <button type="button" onClick={togglePasswordVisibility} className="absolute opacity-50 right-3 inset-y-0 flex justify-center items-center">
                    {showPassword ? <Eye /> : <EyeClosed />}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* rePassword  // eye >> click on eye cover to close eye */}
          <FormField
            control={control}
            name="rePassword"
            render={({ field }) => (
              <FormItem className="mt-7 ">
                <div className="relative">
                  <FormControl >
                    <Input {...register('rePassword')} type={showPassword ? "text" : "password"} className="p-5" placeholder="Enter rePassword" {...field} />
                  </FormControl>
                  <button type="button" onClick={togglePasswordVisibility} className="absolute opacity-50 right-3 inset-y-0 flex justify-center items-center">
                    {showPassword ? <Eye /> : <EyeClosed />}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* phone   */}
          <FormField
            control={control}
            name="phone"
            render={({ field }) => (
              <FormItem className="mt-7 ">
                <FormControl >
                  <Input {...register('phone')} type="tel" className="p-5" placeholder="Enter phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="mb-4 mt-3  text-end">Already have an account? <button type="button" onClick={() => router.push("/auth/signin")} className="mb-7 mt-3  text-end text-primary">Login</button></p>

          {/* submit */}
          <Button className="hover:bg-blue-800 py-5  w-full rounded-[20px]" type="submit">Sign Up</Button>

        </form>
      </Form>
    </div>
  );
}
