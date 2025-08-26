import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";

export function useStudents() {
  return useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const res = await api.get("/students");
      return res.data;
    },
  });
}
