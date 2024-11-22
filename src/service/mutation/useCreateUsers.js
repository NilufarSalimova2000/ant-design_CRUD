import { request } from "../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useCreateUsers = () => {
    return useMutation({
        mutationFn: (data) => request.post("/clients", data).then((res) => res.data),
    })
}