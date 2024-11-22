import { request } from "../../config/request";
import { useMutation } from "@tanstack/react-query";
import { client } from "../../config/query-client";

export const useDeleteUsers = () => {
    return useMutation({
        mutationFn: (id) => request.delete(`/clients/${id}`).then((res) => res.data),
        onSuccess: () => {
            client.invalidateQueries(["users"]);
        }
    })
}