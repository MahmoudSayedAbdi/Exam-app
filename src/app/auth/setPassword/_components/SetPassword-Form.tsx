"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { JSON_HEADER } from "@/lib/constant/api.constant";

// zod
const Schema = z.object({
  email: z.string().min(4, "A valid Password address must be entered."),
  newPassword: z.string().min(6, "A valid Password address must be entered.").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password is not matched"), 
});

type formSchema = z.infer<typeof Schema>;

export default function SetPasswordForm() {

  // React Hook Form
  const form = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      email: "",
      newPassword: "",
    },
  });
  const { register , setError, handleSubmit, formState: { errors }, control } = form;

  // onSubmit function
  async function onSubmit(values: formSchema) {
    const response =await fetch(`${process.env.NEXT_PUBLIC_API}/auth/resetPassword`, {
      method: "PUT",
      headers: {... JSON_HEADER},
      body: JSON.stringify(values),
    })
    
    const data = await response.json();
    if (response.ok) {
      window.location.href = "/auth/signin";     // window is good in refresh all page
    }else {
      setError("root", { message: data.error });
    }
  }

  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="flex justify-center ">
      <Form {...form} >
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <p className="text-2xl font-bold"> Set a Password</p>
          <p className="mt-5 text-red-500">{errors.root?.message}</p>

          {/* Field Email */}
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="mt-7 ">
                <FormControl >
                  <Input {...register('email')} type="email" className="p-5" placeholder="Email" {...field}  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* rePassword  // eye >> click on eye cover to close eye */}
          <FormField
            control={control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="mt-7  mb-7">
                <div className="relative">
                  <FormControl >
                    <Input {...register('newPassword')} type={showPassword ? "text" : "password"} className="p-5" placeholder="Re-enter Password" {...field} />
                  </FormControl>
                  <button type="button" onClick={togglePasswordVisibility} className="absolute opacity-50 right-3 inset-y-0 flex justify-center items-center">
                    {showPassword ? <Eye /> : <EyeClosed />}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* submit */}
          <Button className="hover:bg-blue-800 py-5  w-full rounded-[20px]" type="submit">Set Password</Button>
        </form>
      </Form>
    </div>
  );
}
