"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

const formSchema = z.object({
  password: z.string().min(4, "A valid Password address must be entered."),
  rePassword: z.string().min(4, "A valid Password address must be entered."),
});

export default function SetPasswordForm() {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      rePassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("القيم المُدخلة:", values);
  }

  const [eyePass, setEyePass] = useState(false)
  const [eyeRePass, setEyeRePass] = useState(false)

  return (
    <div className="flex justify-center ">
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <p className="text-2xl font-bold"> Set a Password</p>

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
                  <button type="button" onClick={() => { eyePass ? setEyePass(false) : setEyePass(true) }} className="absolute opacity-50 right-3 inset-y-0 flex justify-center items-center">
                    {eyePass ? <Eye /> : <EyeClosed />}
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
              <FormItem className="mt-7  mb-7">
                <div className="relative">
                  <FormControl >
                    <Input type="rePassword" className="p-5" placeholder="Enter RePassword" {...field} />
                  </FormControl>
                  <button type="button" onClick={() => { eyeRePass ? setEyeRePass(false) : setEyeRePass(true) }} className="absolute opacity-50 right-3 inset-y-0 flex justify-center items-center">
                    {eyeRePass ? <Eye /> : <EyeClosed />}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* submit */}
          <Button className="hover:bg-blue-800 py-5  w-full rounded-[20px]" type="submit">Sign in</Button>
        </form>
      </Form>
    </div>
  );
}
