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

const registerFormSchema = z.object({
  name: z.string().min(1,'Champ obligatoire'),
  email: z.string().min(1,'Champ obligatoire').email('Email incorrect'),
  password: z.string().min(8,'Le mot de passe doit contenir au moins 8 caractères')
}).required()

export default function Register() {

  const navigate = useNavigate();

  const registerQuery = useMutation({
    mutationFn: (values: z.infer<typeof registerFormSchema>) => {
      return axios.post(
        import.meta.env.VITE_API_URL + '/auth/register',
        values,
        {
          withCredentials:true
        })
        .then(res => res.data)
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Erreur lors de l'inscription",
        variant: "destructive"
      })
    },
    onSuccess: (data) => {
      toast({
        title: "Inscription réussie",
        description: "Bonjour " + data.user.name,
      })
      navigate('/')
    },
  })

  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  function onSubmit(values: z.infer<typeof registerFormSchema>) {
    registerQuery.mutate(values);
  }

  return (
    <>
      <div className="flex flex-col w-full gap-4 p-4 bg-white border shadow max-w-96 rounded-2xl">
        <div className="flex items-center justify-center w-full gap-2">
          <Send className="mt-1 text-sky-500" />
          <span className="text-2xl font-bold">LiveMessenger</span>
        </div>
        <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <FormField
                control={registerForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Jean Dupont" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
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
                control={registerForm.control}
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
              <Button type="submit" className="w-full mt-4" disabled={registerQuery.isPending}>
                <Loader2 size={20} className={registerQuery.isPending ? 'animate-spin mr-2' : 'hidden'} />
                S'inscrire
              </Button>
            </form>
          </Form>
      </div>
      <span className="flex gap-1 mt-4">
        Vous avez déjà un compte ?
        <Link to="/auth" className="font-semibold text-sky-500 hover:underline">Se connecter</Link>
      </span>
    </>
  )
}