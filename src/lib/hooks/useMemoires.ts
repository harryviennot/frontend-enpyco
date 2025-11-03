import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post, uploadFile } from "@/lib/api/client";
import { Memoire, MemoireFilters, MemoireUploadForm, PaginatedResponse } from "@/lib/types";

/**
 * Fetch all reference memoires with optional filters
 */
export function useReferenceMemoires(filters?: MemoireFilters) {
  return useQuery({
    queryKey: ["memoires", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.projectType) params.append("projectType", filters.projectType);
      if (filters?.year) params.append("year", filters.year.toString());
      if (filters?.client) params.append("client", filters.client);
      if (filters?.search) params.append("search", filters.search);

      const response = await get<PaginatedResponse<Memoire>>(
        `/api/memoires?${params.toString()}`
      );
      return response.data;
    },
  });
}

/**
 * Upload a new memoire
 */
export function useUploadMemoire() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: MemoireUploadForm) => {
      const additionalData: Record<string, string> = {
        name: data.name,
        autoIndex: data.autoIndex.toString(),
      };

      if (data.client) additionalData.client = data.client;
      if (data.year) additionalData.year = data.year.toString();
      if (data.projectType) additionalData.projectType = data.projectType;
      if (data.location) additionalData.location = data.location;
      if (data.montant) additionalData.montant = data.montant.toString();

      const response = await uploadFile<Memoire>(
        "/api/memoires/upload",
        data.file,
        additionalData
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memoires"] });
    },
  });
}

/**
 * Index or reindex a memoire
 */
export function useIndexMemoire(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await post<Memoire>(`/api/memoires/${id}/index`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memoires"] });
    },
  });
}
