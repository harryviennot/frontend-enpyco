import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post, put } from "@/lib/api/client";
import { Section } from "@/lib/types";

/**
 * Fetch all sections for a project
 */
export function useSections(projectId: string) {
  return useQuery({
    queryKey: ["sections", projectId],
    queryFn: async () => {
      const response = await get<Section[]>(`/api/projects/${projectId}/sections`);
      return response.data;
    },
    enabled: !!projectId,
  });
}

/**
 * Fetch a single section
 */
export function useSection(sectionId: string) {
  return useQuery({
    queryKey: ["section", sectionId],
    queryFn: async () => {
      const response = await get<Section>(`/api/sections/${sectionId}`);
      return response.data;
    },
    enabled: !!sectionId,
  });
}

/**
 * Regenerate a section with custom instructions
 */
export function useRegenerateSection(sectionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (instructions?: string) => {
      const response = await post<Section>(`/api/sections/${sectionId}/regenerate`, {
        instructions,
      });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["section", sectionId] });
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
  });
}

/**
 * Update section content
 */
export function useUpdateSection(sectionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Section>) => {
      const response = await put<Section>(`/api/sections/${sectionId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["section", sectionId] });
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
  });
}

/**
 * Validate a section
 */
export function useValidateSection(sectionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await post<Section>(`/api/sections/${sectionId}/validate`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["section", sectionId] });
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
  });
}
