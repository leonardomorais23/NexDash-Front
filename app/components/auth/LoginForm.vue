<script setup lang="ts">
import { ref, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
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
  email: string
  password: string
}

const emit = defineEmits<{
  (e: 'login', payload: LoginPayload): void
}>()

function loginSubmit() {
  emit('login', {
    email: email.value,
    password: password.value
  })
}

function togglePassword() {
  showPassword.value = !showPassword.value;
}

</script>

<template>
  <div :class="cn('w-full max-w-3xl px-4', props.class)">
    <Card class="overflow-hidden p-2">
      <CardContent class="grid p-0 md:grid-cols-2 w-full">
        <form class="p-6 md:p-8" @submit.prevent="loginSubmit">
          <FieldGroup>
            <div class="flex flex-col items-center gap-2 text-center">
              <h1 class="text-2xl font-bold">Seja bem-vindo!</h1>
              <p class="text-muted-foreground text-balance">
                Insira suas credenciais para continuar.
              </p>
            </div>
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
              <div
                class="flex items-center [&>a]:text-black [&>a]:underline-offset-4 [&>a:hover]:underline [&>a:hover]:text-blue-500"
              >
                <FieldLabel for="password"> Senha: </FieldLabel>
                <RouterLink to="#" class="ml-auto text-sm">
                  Esqueci minha senha
                </RouterLink>
              </div>
              <div class="relative">
                <Input
                  id="password"
                  v-model="password"
                  name="password"
                  autocomplete="current-password"
                  class="pr-12"
                  :type="showPassword ? 'text' : 'password'"
                  required
                />

                <button
                  type="button"
                  class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 transition-colors"
                  @click="togglePassword"
                >
                  <img
                    v-if="showPassword"
                    src="/icons/hide.svg"
                    alt="Ocultar senha"
                    class="w-4 h-4"
                  >
                  <img
                    v-else
                    src="/icons/unhide.svg"
                    alt="Mostrar senha"
                    class="w-4 h-4"
                  >
                </button>
              </div>
            </Field>
            <Field>
              <Button type="submit"> Login </Button>
            </Field>
            <FieldSeparator
              class="*:data-[slot=field-separator-content]:bg-card"
            >
              Ou continue com
            </FieldSeparator>
            <Field class="gap-4">
              <Button variant="outline" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                <span class="sr-only">Realize login com Google</span>
              </Button>
            </Field>
            <FieldDescription
              class="text-center text-gray-800 [&>a]:text-black [&>a]:underline-offset-4 [&>a:hover]:underline [&>a:hover]:text-blue-600"
            >
              Não possui uma conta?
              <RouterLink
                to="/register"
                class="ml-1 text-sm underline-offset-2 hover:underline"
              >
                Crie uma agora!
              </RouterLink>
            </FieldDescription>
          </FieldGroup>
        </form>
        <div class="bg-muted relative hidden md:block">
          <img
            src="#"
            alt="Image"
            class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          >
        </div>
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
