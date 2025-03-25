"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email("A valid email address must be entered."),
  password: z.string().min(2, "A valid password  must be entered."),  
});

export default function LoginForm() {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("القيم المُدخلة:", values);
  }

  const router = useRouter();

  const [eye, setEye] = useState(false)

  return (
    <div className="flex justify-center ">
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <p className="text-2xl font-bold"> sign in</p>
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
                    <button type="button" onClick={() => { eye ? setEye(false) : setEye(true) }} className="absolute opacity-50 right-3 inset-y-0 flex justify-center items-center">
                      {eye ? <Eye /> :<EyeClosed />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

          <button type="button" onClick={() => router.push("/forgotPassword")} className="mb-7 mt-3 w-full text-end text-primary">Recover Password ?</button>

          {/* submit */}
          <Button className="hover:bg-blue-800 py-5  w-full rounded-[20px]" type="submit">Sign in</Button>
        </form>
      </Form>
    </div>
  );
}
