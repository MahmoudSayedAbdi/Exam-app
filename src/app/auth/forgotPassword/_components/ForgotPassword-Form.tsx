"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email("A valid email address must be entered."),
});

export default function ForgotPasswordForm() {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
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
          <p className="text-2xl font-bold"> Forgot your password?</p>
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


          {/* submit */}
          <Button className="hover:bg-blue-800 py-5  w-full rounded-[20px]" type="submit">Send code</Button>
        </form>
      </Form>
    </div>
  );
}
