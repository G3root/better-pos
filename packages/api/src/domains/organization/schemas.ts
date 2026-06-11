import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z.string().min(1).max(255),
});

export type TCreateOrganization = z.infer<typeof createOrganizationSchema>;

export const selectOrganizationSchema = z.object({
  organizationId: z.string().min(1),
});

export type TSelectOrganization = z.infer<typeof selectOrganizationSchema>;
