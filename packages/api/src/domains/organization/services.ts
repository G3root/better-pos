import { ORPCError } from "@orpc/server";
import { eq } from "drizzle-orm";

import { db } from "@better-pos/db";
import { member, organization, session } from "@better-pos/db/schema";
import { generateId } from "@better-pos/utils/id";

import type { TCreateOrganization, TSelectOrganization } from "./schemas";
import { slugify } from "@better-pos/utils/url";

export async function createOrganization(input: TCreateOrganization, userId: string) {
  const now = new Date();
  const orgId = await generateId("organization");
  const slug = slugify(input.name);

  const [org] = await db
    .insert(organization)
    .values({
      id: orgId,
      name: input.name,
      slug,
      createdAt: now,
      updatedAt: now,
    })
    .returning();

  if (!org) {
    throw new ORPCError("INTERNAL_SERVER_ERROR", {
      message: "Failed to create organization",
    });
  }

  const memberId = await generateId("member");

  await db.insert(member).values({
    id: memberId,
    userId,
    organizationId: org.id,
    role: "owner",
    createdAt: now,
  });

  return org;
}

export async function selectOrganization(input: TSelectOrganization, userId: string) {
  const now = new Date();

  // Verify the user is a member of the organization
  const membership = await db.query.member.findFirst({
    where: (member, { and, eq }) =>
      and(eq(member.userId, userId), eq(member.organizationId, input.organizationId)),
  });

  if (!membership) {
    throw new ORPCError("FORBIDDEN", {
      message: "You are not a member of this organization",
    });
  }

  // Update the session to set active organization
  await db
    .update(session)
    .set({
      activeOrganizationId: input.organizationId,
      updatedAt: now,
    })
    .where(eq(session.userId, userId));

  return { success: true, organizationId: input.organizationId };
}
