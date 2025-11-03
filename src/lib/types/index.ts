// Project types
export type ProjectStatus = "DRAFT" | "GENERATING" | "READY" | "FINAL" | "ARCHIVED";

export interface Project {
  id: string;
  name: string;
  client?: string;
  description?: string;
  status: ProjectStatus;
  progress: number; // 0-100
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectForm {
  name: string;
  client?: string;
  description?: string;
}

// RC Upload types
export type UploadStatus = "idle" | "uploading" | "parsing" | "done" | "error";

export interface RCUpload {
  file: File;
  status: UploadStatus;
  extractedCriteria?: string[];
}

// Memoire types
export interface Memoire {
  id: string;
  name: string;
  client?: string;
  year?: number;
  projectType?: string;
  location?: string;
  montant?: number;
  similarityScore?: number; // 0-100
  thumbnailUrl?: string;
  downloadUrl?: string;
  indexationStatus?: "pending" | "indexed" | "failed";
}

export interface MemoireUploadForm {
  file: File;
  name: string;
  client?: string;
  year?: number;
  projectType?: string;
  location?: string;
  montant?: number;
  autoIndex: boolean;
}

// Block types
export type BlockType =
  | "PRESENTATION_ENTREPRISE"
  | "ORGANIGRAMME_GROUPE"
  | "HYPOTHESES_CHIFFRAGE"
  | "ORGANISATION_CHANTIER"
  | "METHODOLOGIE"
  | "MOYENS_HUMAINS"
  | "MOYENS_MATERIELS"
  | "PLANNING"
  | "MATERIAUX_EQUIPEMENTS"
  | "DISPOSITIONS_ENVIRONNEMENTALES"
  | "SECURITE_SANTE"
  | "INSERTION_SOCIALE"
  | "REFERENCES";

export type SectionStatus = "pending" | "generating" | "generated" | "validated" | "error";

export interface Section {
  id: string;
  type: BlockType;
  title: string;
  content: string; // Markdown
  images: string[];
  status: SectionStatus;
  version: number;
  tokensUsed?: number;
  generationTime?: number; // in seconds
}

export interface SectionConfig {
  type: BlockType;
  title: string;
  enabled: boolean;
  order: number;
  customImages?: string[];
  customInstructions?: string;
}

// Content Block types
export interface BlockCard {
  id: string;
  type: BlockType;
  title: string;
  thumbnail?: string;
  preview: string;
  tags: string[];
  usageCount: number;
}

// Generation types
export interface GenerationStatus {
  currentSection: string;
  completed: number;
  total: number;
  estimatedTimeRemaining: number; // seconds
}

// Template types
export type TemplateType = "MEMOIRE_COMPLET" | "SECTION" | "PAGE_GARDE";

export interface DocumentTemplate {
  id: string;
  name: string;
  type: TemplateType;
  thumbnailUrl?: string;
  version: string;
  isDefault: boolean;
  downloadUrl: string;
}

// Export types
export type ExportFormat = "docx" | "pdf";

export interface ExportOptions {
  format: ExportFormat;
  includePageNumbers: boolean;
  includeTOC: boolean; // Table of contents
  includeHeaders: boolean;
  includeFooters: boolean;
  customCoverPage?: boolean;
}

// Filter types
export interface ProjectFilters {
  status?: ProjectStatus;
  client?: string;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
}

export interface MemoireFilters {
  projectType?: string;
  year?: number;
  client?: string;
  montantMin?: number;
  montantMax?: number;
  search?: string;
}

export interface BlockFilters {
  type?: BlockType;
  tags?: string[];
  search?: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
