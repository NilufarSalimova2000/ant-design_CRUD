import { request } from "../../config/request";
import { useMutation } from "@tanstack/react-query";
import { saveState } from "../../config/storage";

export const useLoginCreate = () => {
    return useMutation({
        mutationFn: (data) => request.post("/login", data).then((res) => res.data),
        onSuccess: (data) => {
            saveState("userData", data)
        }
    })
}