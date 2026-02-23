<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const email = ref<string>("");
const name = ref<string>("");
const password = ref<string>("");
const confirmPassword = ref<string>("");

const emit = defineEmits<{
  (e: "signup", payload: { email: string; name: string; password: string }): void;
}>();

const handleSubmit = () => {
  if (password.value !== confirmPassword.value) {
    alert("As senhas não coincidem.");
    return;
  }
  
  emit("signup", {
    email: email.value,
    name: name.value,
    password: password.value
  });
}
</script>

<template>
  <div :class="cn('flex flex-col gap-6 p-5 w-110', props.class)">
    <Card>
      <CardHeader class="text-center">
        <CardTitle class="text-xl"> Crie sua conta </CardTitle>
        <CardDescription>
          Insira seus dados para criar uma nova conta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleSubmit">
          <FieldGroup>
            <Field>
              <FieldLabel for="name"> Nome completo: </FieldLabel>
              <Input
                id="name"
                v-model="name"
                type="text"
                name="name"
                autocomplete="name"
                placeholder="John Doe"
                required
              />
            </Field>
            <Field>
              <FieldLabel for="email"> E-mail: </FieldLabel>
              <Input
                id="email"
                v-model="email"
                type="email"
                name="email"
                autocomplete="email"
                placeholder="m@example.com"
                required
              />
            </Field>
            <Field>
              <Field class="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel for="password"> Senha: </FieldLabel>
                  <Input 
                  id="password" 
                  v-model="password"
                  type="password" 
                  name="password"
                  autocomplete="new-password"
                  required />
                </Field>
                <Field>
                  <FieldLabel for="confirm-password">
                    Confirmar senha:
                  </FieldLabel>
                  <Input 
                  id="confirm-password"
                  v-model="confirmPassword"
                  type="password" 
                  name="confirm-password"
                  autocomplete="new-password"
                  required 
                  />
                </Field>
              </Field>
              <FieldDescription>
                Deve ter pelo menos 8 caracteres.
              </FieldDescription>
            </Field>
            <Field>
              <Button type="submit"> Criar conta </Button>
              <FieldDescription class="text-center">
                Já tem uma conta?
                <RouterLink
                  to="/login"
                  class="text-sm underline-offset-2 hover:underline"
                >
                  Faça login
                </RouterLink>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
    <FieldDescription
      class="px-6 text-center text-gray-200 [&>a]:text-gray-100 [&>a]:underline-offset-4 [&>a:hover]:underline [&>a:hover]:text-blue-400"
    >
      Ao clicar em continuar, você concorda com nossos
      <RouterLink to="#" class="underline">Termos de Serviço</RouterLink> e
      <RouterLink to="#" class="underline">Política de Privacidade</RouterLink>.
    </FieldDescription>
  </div>
</template>
