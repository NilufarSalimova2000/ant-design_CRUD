import { request } from "../../config/request";
import { useMutation } from "@tanstack/react-query";
import { client } from "../../config/query-client";

export const useEditUsers = () => {
    return useMutation({
        mutationFn: (id, data) => request.put(`/clients/${id}`, data).then((res) => res.data),
        onSuccess: () => {
            client.invalidateQueries(["users"]);
        }
    })
}