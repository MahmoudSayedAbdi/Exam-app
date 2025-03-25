"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  Fname: z.string().min(4, "At least 4 letters are required"),
  Lname: z.string().min(4, "At least 4 letters are required"),
  email: z.string().email("A valid email address must be entered."),
  password: z.string().min(2, "A valid password  must be entered."),
  rePassword: z.string().min(2, "A valid rePassword  must be entered."),
});

export default function SignUpForm() {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Fname: "",
      Lname: "",
      email: "",
      password: "",
      rePassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("القيم المُدخلة:", values);
  }

  const router = useRouter();

  const [eyePass, setEyePass] = useState(false)
  const [eyeRePass, setEyeRePass] = useState(false)

  return (
    <div className="flex justify-center ">
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <p className="text-2xl font-bold"> sign in</p>

          {/* Field Fname */}
          <FormField
            control={form.control}
            name="Fname"
            render={({ field }) => (
              <FormItem className="my-7">
                <FormControl className="relative">
                  <Input type="Fname" className="p-5" placeholder="Enter Fname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Field Lname */}
          <FormField
            control={form.control}
            name="Lname"
            render={({ field }) => (
              <FormItem className="my-7">
                <FormControl className="relative">
                  <Input type="Lname" className="p-5" placeholder="Enter Lname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Field Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="my-7">
                <FormControl className="relative">
                  <Input type="email" className="p-5" placeholder="Enter Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* password  // eye >> click on eye cover to close eye */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-7 ">
                <div className="relative">
                  <FormControl >
                    <Input type="password" className="p-5" placeholder="Enter Password" {...field} />
                  </FormControl>
                  <button type="button" onClick={() => { eyeRePass ? setEyeRePass(false) : setEyeRePass(true) }} className="absolute opacity-50 right-3 inset-y-0 flex justify-center items-center">
                    {eyeRePass ? <Eye /> : <EyeClosed />}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* rePassword  // eye >> click on eye cover to close eye */}
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem className="mt-7 ">
                <div className="relative">
                  <FormControl >
                    <Input type="rePassword" className="p-5" placeholder="Enter rePassword" {...field} />
                  </FormControl>
                  <button type="button" onClick={() => { eyePass ? setEyePass(false) : setEyePass(true) }} className="absolute opacity-50 right-3 inset-y-0 flex justify-center items-center">
                    {eyePass ? <Eye /> : <EyeClosed />}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="mb-4 mt-3  text-end">Already have an account? <button type="button" onClick={() => router.push("/forgotPassword")} className="mb-7 mt-3  text-end text-primary">Login</button></p>

          {/* submit */}
          <Button className="hover:bg-blue-800 py-5  w-full rounded-[20px]" type="submit">Sign in</Button>
        </form>
      </Form>
    </div>
  );
}
