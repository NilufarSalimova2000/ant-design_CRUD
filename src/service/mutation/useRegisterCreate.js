import { request } from "../../config/request";
import { useMutation } from "@tanstack/react-query";
import { saveState } from "../../config/storage";

export const useRegisterCreate = () => {
    return useMutation({
        mutationFn: (data) => request.post("/register", data),
        onSuccess: (data) => {
            saveState("userData", data)
        }
    })
}