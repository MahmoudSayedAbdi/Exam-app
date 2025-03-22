"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";

// تعريف المخطط (Schema) للتحقق من صحة المدخلات باستخدام Zod
const formSchema = z.object({
  password: z.string().min(2, "A valid password address must be entered."),
  email: z.string().email("A valid email address must be entered."),
});

export default function MyForm() {
  // إعداد النموذج باستخدام React Hook Form
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

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-96">
        <p className="text-2xl font-bold"> sign in</p>
        {/* Field Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="my-7">
              <FormControl>
                <Input type="email" className="p-5" placeholder="Enter Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      
        {/* password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-7">
              <FormControl>
                <Input type="password" className="p-5" placeholder="Enter Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button onClick={() => router.push("/")} className="mb-7 mt-3 text-end   text-primary">Recover Password ?</button>

        {/* submit */}
        <Button className="hover:bg-blue-800 w-full rounded-[20px]" type="submit">Sign in</Button>
      </form>
    </Form>
  );
}
