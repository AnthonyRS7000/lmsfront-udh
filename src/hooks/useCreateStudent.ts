import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";

export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newStudent: { name: string; email: string; dni: string }) => {
      const res = await api.post("/students", newStudent);
      return res.data;
    },
    onSuccess: () => {
      // refresca la lista automáticamente
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
}
