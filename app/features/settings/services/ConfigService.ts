import type { UserTableResponse } from "~/features/settings/types/ConfigTypes";

export const ConfigService = {
    getUsersTableConfig() {
        const { $api } = useNuxtApp();
        return $api<UserTableResponse[]>("/settings/users", {
            method: "GET",
            retry: 0,
        });
    },

    updateUsersTableConfig(id: number, userData: Partial<UserTableResponse>) {
    const { $api } = useNuxtApp();
    

    return $api<UserTableResponse[]>(`/settings/editUser/${id}`, {
        method: "PATCH",
        body: userData, 
    });
}

}
