"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { JSON_HEADER } from "@/lib/constant/api.constant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// schema
const Schema = z.object({
  email: z.string().email("A valid email address must be entered."),
});
// zod schema , typeScript
type formSchema = z.infer<typeof Schema>;

export default function ForgotPasswordForm() {

  const router = useRouter();

  // React Hook Form
  const form = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      email: "",
    },
  });
  const { setError, control, handleSubmit, register, formState: { errors } } = form;

  // onSubmit function
  async function onSubmit(values: formSchema) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/forgotPassword`,
      {
        method: "POST",
        headers: {...JSON_HEADER },
        body: JSON.stringify(values),
      }
    )

    const data = await response.json();
    if (response.ok) {
      // redirect to login page
      router.push("/auth/verifyCode");
    } else {
      setError("root", { message: data.message });
    }
  }

    const [eye, setEye] = useState(false)

    return (
      <div className="flex justify-center ">
        <Form {...form} >
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <p className="text-2xl font-bold"> Forgot your password?</p>
            <p className="text-red-500 mt-5">{errors.root?.message}</p>

            {/* Field Email */}
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem className="my-7">
                  <FormControl className="relative">
                    <Input {...register("email")} type="email" className="p-5" placeholder="Enter Email" {...field} />
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
