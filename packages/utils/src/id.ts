import { createId, verifyId as legidVerifyId } from "legid";

const prefixes = {
  // Auth schema
  user: "usr",
  session: "ses",
  account: "acc",
  verification: "vrf",
  organization: "org",
  member: "mem",
  invitation: "inv",
  team: "tem",
  teamMember: "tme",

  // POS schema
  store: "str",
  unit: "unt",
  category: "cat",
  supplier: "sup",
  tax: "tax",
  product: "prd",
  productVariant: "var",
  compositeItem: "cmp",
  productTax: "ptx",
  storeInventory: "sin",
  inventoryTransaction: "itx",
  customer: "cus",
  discount: "dsc",
  purchaseOrder: "por",
  purchaseOrderItem: "poi",
  cashRegister: "crg",
  cashRegisterTransaction: "crt",
  order: "ord",
  orderItem: "oit",
  orderItemTax: "oit",
  orderDiscount: "odc",
  payment: "pay",
} as const;

type Prefix = keyof typeof prefixes;

export async function generateId(
  prefix: Prefix,
  options?: Parameters<typeof createId>[0],
): Promise<string> {
  const id = await createId(options);
  return `${prefixes[prefix]}-${id}`;
}

export async function verifyId(
  id: string,
  options?: Parameters<typeof legidVerifyId>[1],
): Promise<boolean> {
  const parts = id.split("-");
  if (parts.length < 2) {
    return false;
  }
  return legidVerifyId(parts.slice(1).join("-"), options);
}
