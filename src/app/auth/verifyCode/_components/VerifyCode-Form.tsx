"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { JSON_HEADER } from "@/lib/constant/api.constant";

const Schema = z.object({
  resetCode: z.string().min(4, "At least 4 letters are required"),
});

type formSchema = z.infer<typeof Schema>;
export default function VerifyCodeForm() {
  // router
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      resetCode: "",
    },
  });
  const { setError, register, handleSubmit, formState: { errors }, control } = form;

  async function onSubmit(values:formSchema) {
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/verifyResetCode`, {
      method: "POST",
      headers: {...JSON_HEADER},
      body: JSON.stringify(values),
    })
    const data = await response.json();

    if(response.ok) {
      router.push("/auth/setPassword")
    }
    else {
      setError("root", { message: data.error });
    }

  }


  return (
    <div className="flex justify-center ">
      <Form {...form} >
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <p className="text-2xl font-bold"> Verify code</p>
          <p className="mt-5 text-red-500">{errors.root?.message}</p>
          {/* Field Fname */}
          <FormField
            control={control}
            name="resetCode"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormControl className="relative">
                  <Input {...register('resetCode')} type="resetCode" className="p-5" placeholder="Enter Code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="mb-4   text-end">Didn't receive a code? <button type="button" onClick={() => router.push("/auth/forgotPassword")} className="mb-7 mt-3  text-end text-primary">Resend</button></p>

          {/* submit */}
          <Button className="hover:bg-blue-800 py-5  w-full rounded-[20px]" type="submit">Verify</Button>
        </form>
      </Form>
    </div>
  );
}
