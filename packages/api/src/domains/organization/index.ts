import { protectedProcedure } from "#@/lib/procedures/factory";
import {
  createOrganizationSchema,
  selectOrganizationSchema,
} from "./schemas";
import { createOrganization, selectOrganization } from "./services";

export const organizationRouter = {
  create: protectedProcedure
    .route({
      description:
        "Create a new organization and assign the current user as owner",
      method: "POST",
    })
    .input(createOrganizationSchema)
    .handler(async ({ input, context }) => {
      return createOrganization(input, context.session.user.id);
    }),

  select: protectedProcedure
    .route({
      description:
        "Select an organization as the active organization for the current user",
      method: "POST",
    })
    .input(selectOrganizationSchema)
    .handler(async ({ input, context }) => {
      return selectOrganization(input, context.session.user.id);
    }),
};
