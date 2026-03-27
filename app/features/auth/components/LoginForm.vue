<script setup lang="ts">
import { ref, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const password = ref<string>("");
const email = ref<string>("");
const showPassword = ref<boolean>(false);

type LoginPayload = {
  email: string;
  password: string;
};

const emit = defineEmits<{
  (e: "login", payload: LoginPayload): void;
}>();

function loginSubmit() {
  emit("login", {
    email: email.value,
    password: password.value,
  });
}

function togglePassword() {
  showPassword.value = !showPassword.value;
}
</script>

<template>
  <div :class="cn('w-full max-w-3xl px-4 space-y-4', props.class)">
    <Card class="overflow-hidden p-2 border-white/10 bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl">
      <CardContent class="grid p-0 md:grid-cols-2 w-full">
        
        <form class="p-6 md:p-10" @submit.prevent="loginSubmit">
          <FieldGroup class="gap-6">
            <div class="flex flex-col items-center gap-2 text-center mb-4">
              <h1 class="text-3xl font-bold tracking-tight text-slate-900">Seja bem-vindo!</h1>
              <p class="text-slate-500 text-sm">
                Insira suas credenciais para continuar.
              </p>
            </div>

            <Field class="space-y-2">
              <FieldLabel for="email" class="text-slate-700 font-semibold">E-mail</FieldLabel>
              <Input
                id="email"
                v-model="email"
                type="email"
                class="bg-slate-50/50 border-slate-200 focus:ring-slate-400"
                placeholder="nome@exemplo.com"
                required
              />
            </Field>

            <Field class="space-y-2">
              <div class="flex items-center justify-between">
                <FieldLabel for="password" class="text-slate-700 font-semibold">Senha</FieldLabel>
                <NuxtLink to="#" class="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors">
                  Esqueci minha senha
                </NuxtLink>
              </div>
              <div class="relative">
                <Input
                  id="password"
                  v-model="password"
                  class="pr-12 bg-slate-50/50 border-slate-200"
                  :type="showPassword ? 'text' : 'password'"
                  required
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-600"
                  @click="togglePassword"
                >
                  <img 
  :src="showPassword ? '/icons/Hide.svg' : '/icons/Unhide.svg'" 
  class="w-5 h-5 opacity-70" 
>
                </button>
              </div>
            </Field>

            <Button type="submit" class="w-full bg-slate-900 hover:bg-slate-800 text-white transition-all py-6 text-lg rounded-xl">
              Entrar na conta
            </Button>

            <FieldSeparator class="text-slate-400 text-xs uppercase tracking-widest font-bold">
              Ou continue com
            </FieldSeparator>

            <Button variant="outline" type="button" class="border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl py-6">
              <svg class="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="currentColor"/>
              </svg>
              Google
            </Button>

            <p class="text-center text-sm text-slate-500">
              Não possui uma conta?
              <NuxtLink to="/register" class="ml-1 font-bold text-slate-900 hover:underline">
                Crie uma agora!
              </NuxtLink>
            </p>
          </FieldGroup>
        </form>

        <div class="bg-slate-100 relative hidden md:block">
           <div class="absolute inset-0 bg-linear-to-br from-slate-200/50 to-slate-400/20 shadow-inner" />
           <img
            src="#" 
            alt="Dashboard Preview"
            class="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-overlay"
          >
        </div>
      </CardContent>
    </Card>

    <p class="px-6 text-center text-xs text-slate-400/80 leading-relaxed">
      Ao clicar em continuar, você concorda com nossos <br >
      <NuxtLink to="#" class="text-slate-300 hover:text-white underline decoration-slate-500">Termos de Serviço</NuxtLink> e
      <NuxtLink to="#" class="text-slate-300 hover:text-white underline decoration-slate-500">Política de Privacidade</NuxtLink>.
    </p>
  </div>
</template>
