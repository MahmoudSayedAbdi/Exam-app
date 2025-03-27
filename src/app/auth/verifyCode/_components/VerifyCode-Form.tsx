"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  Code: z.string().min(4, "At least 4 letters are required"),
});

export default function VerifyCodeForm() {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Code: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("القيم المُدخلة:", values);
  }

  const router = useRouter();

  return (
    <div className="flex justify-center ">
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <p className="text-2xl font-bold"> Verify code</p>

          {/* Field Fname */}
          <FormField
            control={form.control}
            name="Code"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormControl className="relative">
                  <Input type="Code" className="p-5" placeholder="Enter Code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="mb-4   text-end">Didn't receive a code? <button type="button" onClick={() => router.push("/forgotPassword")} className="mb-7 mt-3  text-end text-primary">Resend</button></p>

          {/* submit */}
          <Button className="hover:bg-blue-800 py-5  w-full rounded-[20px]" type="submit">Verify</Button>
        </form>
      </Form>
    </div>
  );
}
