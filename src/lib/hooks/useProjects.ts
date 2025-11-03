import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post, put, del } from "@/lib/api/client";
import {
  Project,
  ProjectForm,
  ProjectFilters,
  PaginatedResponse,
} from "@/lib/types";

/**
 * Fetch all projects with optional filters
 */
export function useProjects(filters?: ProjectFilters) {
  return useQuery({
    queryKey: ["projects", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.status) params.append("status", filters.status);
      if (filters?.client) params.append("client", filters.client);
      if (filters?.search) params.append("search", filters.search);

      const response = await get<PaginatedResponse<Project>>(
        `/api/projects?${params.toString()}`
      );
      return response.data;
    },
  });
}

/**
 * Fetch a single project by ID
 */
export function useProject(id: string) {
  return useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      const response = await get<Project>(`/api/projects/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

/**
 * Create a new project
 */
export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProjectForm) => {
      const response = await post<Project>("/api/projects", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

/**
 * Update an existing project
 */
export function useUpdateProject(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<ProjectForm>) => {
      const response = await put<Project>(`/api/projects/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", id] });
    },
  });
}

/**
 * Delete a project
 */
export function useDeleteProject(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await del(`/api/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}
