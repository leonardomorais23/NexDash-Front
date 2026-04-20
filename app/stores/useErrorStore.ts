import { defineStore } from 'pinia'

export const useErrorStore = defineStore('error', () => {
    const message = ref('')
    let timer: ReturnType<typeof setTimeout> | null = null

    function setError(msg: string, timeout = 60000) {
        message.value = msg

        if (timer) clearTimeout(timer)

        timer = setTimeout(() => {
            message.value = ''
        }, timeout)
    }

    function clearError() {
        message.value = ''
        if (timer) clearTimeout(timer)
    }

    return { message, setError, clearError }
})