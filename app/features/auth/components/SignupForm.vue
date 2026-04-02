<script setup lang="ts">
import { ref, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const props = defineProps<{ class?: HTMLAttributes["class"] }>();

const email = ref<string>("");
const name = ref<string>("");
const password = ref<string>("");
const confirmPassword = ref<string>("");

const emit = defineEmits<{(e: "signup", payload: { email: string; name: string; password: string } ): void; }>();

const handleSubmit = () => {
  
  if (password.value !== confirmPassword.value) {
    alert("As senhas não coincidem.");
    return;
  }
  emit("signup", {
    email: email.value,
    name: name.value,
    password: password.value,
  });
};
</script>

<template>
  <div
    :class="
      cn('flex flex-col gap-6 p-5 w-full max-w-112.5 mx-auto', props.class)
    "
  >
    <Card
      class="border-slate-200/20 bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl"
    >
      <CardHeader class="text-center space-y-1">
        <CardTitle class="text-2xl font-bold tracking-tight text-slate-900">
          Crie sua conta
        </CardTitle>
        <CardDescription class="text-slate-500">
          Insira seus dados para começar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleSubmit">
          <FieldGroup class="gap-4">
            <Field>
              <FieldLabel for="name" class="text-slate-700 font-semibold"
                >Nome completo</FieldLabel
              >
              <Input
                id="name"
                v-model="name"
                placeholder="Ex: João Silva"
                class="bg-slate-50/50 border-slate-200"
                required
              />
            </Field>

            <Field>
              <FieldLabel for="email" class="text-slate-700 font-semibold"
                >E-mail</FieldLabel
              >
              <Input
                id="email"
                v-model="email"
                type="email"
                placeholder="seu@email.com"
                class="bg-slate-50/50 border-slate-200"
                required
              />
            </Field>

            <div class="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel for="password" class="text-slate-700 font-semibold"
                  >Senha</FieldLabel
                >
                <Input
                  id="password"
                  v-model="password"
                  type="password"
                  class="bg-slate-50/50 border-slate-200"
                  required
                />
              </Field>
              <Field>
                <FieldLabel
                  for="confirm-password"
                  class="text-slate-700 font-semibold"
                  >Confirmar</FieldLabel
                >
                <Input
                  id="confirm-password"
                  v-model="confirmPassword"
                  type="password"
                  class="bg-slate-50/50 border-slate-200"
                  required
                />
              </Field>
            </div>

            <Button
              type="submit"
              class="w-full bg-slate-900 hover:bg-slate-800 py-6 text-lg rounded-xl transition-all"
            >
              Finalizar Cadastro
            </Button>

            <p class="text-center text-sm text-slate-500 mt-2">
              Já tem uma conta?
              <NuxtLink
                to="/login"
                class="font-bold text-slate-900 hover:underline"
              >
                Faça login
              </NuxtLink>
            </p>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>

    <p class="px-6 text-center text-xs text-slate-400/90 leading-relaxed">
      Ao clicar em continuar, você concorda com nossos <br />
      <NuxtLink
        to="#"
        class="text-slate-300 underline decoration-slate-500 hover:text-white"
        >Termos de Serviço</NuxtLink
      >
      e
      <NuxtLink
        to="#"
        class="text-slate-300 underline decoration-slate-500 hover:text-white"
        >Política de Privacidade</NuxtLink
      >.
    </p>
  </div>
</template>
