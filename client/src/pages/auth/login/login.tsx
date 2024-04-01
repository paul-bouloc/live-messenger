import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email('Email incorrect').min(1,'Champ obligatoire'),
  password: z.string().min(1,'Champ obligatoire')
})

export default function Login() {

  const navigate = useNavigate();

  const loginQuery = useMutation({
    mutationFn: (values: z.infer<typeof loginFormSchema>) => {
      return axios.post(import.meta.env.VITE_API_URL + '/auth/login', values, {withCredentials:true}).then(res => res.data)
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Identifiants incorrects",
        variant: "destructive"
      })
    },
    onSuccess: (data) => {
      console.log(data)
      toast({
        title: "Connecté",
        description: "Bonjour " + data.user.name,
      })
      navigate('/')
    },
  })

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    loginQuery.mutate(values);
  }

  return (
    <>
      <div className="flex flex-col w-full gap-4 p-4 bg-white border shadow max-w-96 rounded-2xl">
        <div className="flex items-center justify-center w-full gap-2">
          <Send className="mt-1 text-sky-500" />
          <span className="text-2xl font-bold">LiveMessenger</span>
        </div>
        <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="jeandupont@mail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input placeholder="p4ssw0rd!" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-4" disabled={loginQuery.isPending}>
                <Loader2 size={20} className={loginQuery.isPending ? 'animate-spin mr-2' : 'hidden'} />
                Se connecter
              </Button>
            </form>
          </Form>
      </div>
      <span className="flex gap-1 mt-4">
        Pas encore de compte ?
        <Link to="/auth/register" className="text-sky-500 hover:underline">S'inscrire</Link>
      </span>
    </>
  )
}