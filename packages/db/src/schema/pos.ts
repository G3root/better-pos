import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { organization, team, user } from "./auth";

export const store = pgTable(
  "store",
  {
    id: t.text("id").primaryKey(),
    organizationId: t
      .text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),

    name: t.text("name").notNull(),
    code: t.varchar("code", { length: 20 }),
    address: t.text("address"),
    phone: t.text("phone"),
    email: t.text("email"),

    timezone: t.varchar("timezone", { length: 50 }),

    lowStockThreshold: t.integer("low_stock_threshold").default(10).notNull(),
    enableNegativeStock: t.boolean("enable_negative_stock").default(false).notNull(),

    receiptHeader: t.text("receipt_header"),
    receiptFooter: t.text("receipt_footer"),
    receiptShowLogo: t.boolean("receipt_show_logo").default(true).notNull(),
    receiptShowBarcode: t.boolean("receipt_show_barcode").default(false).notNull(),

    isActive: t.boolean("is_active").default(true).notNull(),

    createdAt: t
      .timestamp("created_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: t
      .timestamp("updated_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [t.index("store_org_idx").on(table.organizationId)],
);

export const unit = pgTable("unit", {
  id: t.text("id").primaryKey(),
  organizationId: t
    .text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),

  name: t.text("name").notNull(),
  abbreviation: t.varchar("abbreviation", { length: 20 }).notNull(),
  type: t.varchar("type", { length: 20 }).notNull().default("quantity"),
  decimals: t.integer("decimals").default(0).notNull(),
  isDefault: t.boolean("is_default").default(false).notNull(),

  createdAt: t
    .timestamp("created_at", { precision: 6, withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: t
    .timestamp("updated_at", { precision: 6, withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const category = pgTable(
  "category",
  {
    id: t.text("id").primaryKey(),
    organizationId: t
      .text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),

    name: t.text("name").notNull(),
    description: t.text("description"),
    parentId: t.text("parent_id"),
    sortOrder: t.integer("sort_order").default(0).notNull(),
    isActive: t.boolean("is_active").default(true).notNull(),

    createdAt: t
      .timestamp("created_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: t
      .timestamp("updated_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    t.index("category_org_idx").on(table.organizationId),
    t.index("category_parent_idx").on(table.parentId),
  ],
);

export const supplier = pgTable("supplier", {
  id: t.text("id").primaryKey(),
  organizationId: t
    .text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),

  name: t.text("name").notNull(),
  contactPerson: t.text("contact_person"),
  email: t.text("email"),
  phone: t.text("phone"),
  address: t.text("address"),
  notes: t.text("notes"),
  isActive: t.boolean("is_active").default(true).notNull(),

  createdAt: t
    .timestamp("created_at", { precision: 6, withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: t
    .timestamp("updated_at", { precision: 6, withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const tax = pgTable("tax", {
  id: t.text("id").primaryKey(),
  organizationId: t
    .text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),

  name: t.text("name").notNull(),
  rate: t.doublePrecision("rate").notNull(),
  type: t.varchar("type", { length: 20 }).notNull().default("percentage"),
  isActive: t.boolean("is_active").default(true).notNull(),
  isDefault: t.boolean("is_default").default(false).notNull(),
  appliesToShipping: t.boolean("applies_to_shipping").default(false).notNull(),

  createdAt: t
    .timestamp("created_at", { precision: 6, withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: t
    .timestamp("updated_at", { precision: 6, withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const product = pgTable(
  "product",
  {
    id: t.text("id").primaryKey(),
    organizationId: t
      .text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),

    name: t.text("name").notNull(),
    description: t.text("description"),
    categoryId: t.text("category_id").references(() => category.id, {
      onDelete: "set null",
    }),
    unitId: t.text("unit_id").references(() => unit.id, {
      onDelete: "set null",
    }),
    taxId: t.text("tax_id").references(() => tax.id, {
      onDelete: "set null",
    }),

    price: t.doublePrecision("price").notNull().default(0),
    costPrice: t.doublePrecision("cost_price").default(0),
    compareAtPrice: t.doublePrecision("compare_at_price"),

    sku: t.varchar("sku", { length: 100 }).unique(),
    barcode: t.varchar("barcode", { length: 100 }),

    image: t.text("image"),

    trackInventory: t.boolean("track_inventory").default(true).notNull(),
    supplierId: t.text("supplier_id").references(() => supplier.id, {
      onDelete: "set null",
    }),

    isActive: t.boolean("is_active").default(true).notNull(),
    hasVariants: t.boolean("has_variants").default(false).notNull(),
    isComposite: t.boolean("is_composite").default(false).notNull(),

    metadata: t.jsonb("metadata"),

    createdAt: t
      .timestamp("created_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: t
      .timestamp("updated_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    t.index("product_org_idx").on(table.organizationId),
    t.index("product_category_idx").on(table.categoryId),
    t.index("product_barcode_idx").on(table.barcode),
    t.index("product_name_idx").on(table.name),
  ],
);

export const productVariant = pgTable(
  "product_variant",
  {
    id: t.text("id").primaryKey(),
    productId: t
      .text("product_id")
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),

    name: t.text("name").notNull(),
    options: t.jsonb("options"),

    sku: t.varchar("sku", { length: 100 }).unique(),
    barcode: t.varchar("barcode", { length: 100 }),
    price: t.doublePrecision("price"),
    costPrice: t.doublePrecision("cost_price"),
    compareAtPrice: t.doublePrecision("compare_at_price"),

    sortOrder: t.integer("sort_order").default(0).notNull(),
    isActive: t.boolean("is_active").default(true).notNull(),

    createdAt: t
      .timestamp("created_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: t
      .timestamp("updated_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    t.index("variant_product_idx").on(table.productId),
    t.index("variant_barcode_idx").on(table.barcode),
  ],
);

export const compositeItem = pgTable("composite_item", {
  id: t.text("id").primaryKey(),
  compositeProductId: t
    .text("composite_product_id")
    .notNull()
    .references(() => product.id, { onDelete: "cascade" }),
  componentProductId: t
    .text("component_product_id")
    .notNull()
    .references(() => product.id, { onDelete: "cascade" }),
  componentVariantId: t.text("component_variant_id").references(
    () => productVariant.id,
    { onDelete: "set null" },
  ),

  quantity: t.doublePrecision("quantity").notNull().default(1),
  unitId: t.text("unit_id").references(() => unit.id, {
    onDelete: "set null",
  }),

  createdAt: t
    .timestamp("created_at", { precision: 6, withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: t
    .timestamp("updated_at", { precision: 6, withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const productTax = pgTable("product_tax", {
  id: t.text("id").primaryKey(),
  productId: t
    .text("product_id")
    .notNull()
    .references(() => product.id, { onDelete: "cascade" }),
  taxId: t
    .text("tax_id")
    .notNull()
    .references(() => tax.id, { onDelete: "cascade" }),

  createdAt: t
    .timestamp("created_at", { precision: 6, withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const storeInventory = pgTable(
  "store_inventory",
  {
    id: t.text("id").primaryKey(),
    storeId: t
      .text("store_id")
      .notNull()
      .references(() => store.id, { onDelete: "cascade" }),
    productId: t
      .text("product_id")
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),
    variantId: t.text("variant_id").references(() => productVariant.id, {
      onDelete: "cascade",
    }),

    quantity: t.integer("quantity").default(0).notNull(),
    lowStockThreshold: t.integer("low_stock_threshold").default(0).notNull(),

    updatedAt: t
      .timestamp("updated_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    t
      .uniqueIndex("storeinv_store_product_variant_idx")
      .on(table.storeId, table.productId, table.variantId),
    t.index("storeinv_product_idx").on(table.productId),
  ],
);

export const inventoryTransaction = pgTable(
  "inventory_transaction",
  {
    id: t.text("id").primaryKey(),
    organizationId: t
      .text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    storeId: t
      .text("store_id")
      .notNull()
      .references(() => store.id, { onDelete: "cascade" }),
    productId: t
      .text("product_id")
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),
    variantId: t.text("variant_id").references(() => productVariant.id, {
      onDelete: "set null",
    }),

    type: t.varchar("type", { length: 30 }).notNull(),
    quantity: t.integer("quantity").notNull(),
    quantityBefore: t.integer("quantity_before").notNull(),
    quantityAfter: t.integer("quantity_after").notNull(),

    referenceType: t.varchar("reference_type", { length: 30 }),
    referenceId: t.text("reference_id"),

    notes: t.text("notes"),

    createdBy: t.text("created_by").references(() => user.id, {
      onDelete: "set null",
    }),
    createdAt: t
      .timestamp("created_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    t.index("invtxn_org_idx").on(table.organizationId),
    t.index("invtxn_store_idx").on(table.storeId),
    t.index("invtxn_product_idx").on(table.productId),
    t.index("invtxn_reference_idx").on(table.referenceType, table.referenceId),
  ],
);

export const customer = pgTable(
  "customer",
  {
    id: t.text("id").primaryKey(),
    organizationId: t
      .text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),

    firstName: t.text("first_name"),
    lastName: t.text("last_name"),
    companyName: t.text("company_name"),

    email: t.text("email"),
    phone: t.text("phone"),
    address: t.text("address"),
    city: t.text("city"),
    state: t.text("state"),
    postalCode: t.varchar("postal_code", { length: 20 }),
    country: t.text("country"),

    notes: t.text("notes"),

    loyaltyPoints: t.integer("loyalty_points").default(0).notNull(),
    customerCode: t.varchar("customer_code", { length: 50 }).unique(),
    isActive: t.boolean("is_active").default(true).notNull(),

    metadata: t.jsonb("metadata"),
    createdAt: t
      .timestamp("created_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: t
      .timestamp("updated_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    t.index("customer_org_idx").on(table.organizationId),
    t.index("customer_email_idx").on(table.email),
    t.index("customer_phone_idx").on(table.phone),
  ],
);

export const discount = pgTable("discount", {
  id: t.text("id").primaryKey(),
  organizationId: t
    .text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),

  name: t.text("name").notNull(),
  code: t.varchar("code", { length: 50 }),
  type: t.varchar("type", { length: 20 }).notNull(),
  value: t.doublePrecision("value").notNull(),

  appliesTo: t.varchar("applies_to", { length: 20 }).notNull().default("all"),
  storeId: t.text("store_id").references(() => store.id, {
    onDelete: "set null",
  }),
  categoryId: t.text("category_id").references(() => category.id, {
    onDelete: "set null",
  }),
  productId: t.text("product_id").references(() => product.id, {
    onDelete: "set null",
  }),
  customerId: t.text("customer_id").references(() => customer.id, {
    onDelete: "set null",
  }),

  minOrderAmount: t.doublePrecision("min_order_amount"),
  maxDiscountAmount: t.doublePrecision("max_discount_amount"),
  usageLimit: t.integer("usage_limit"),
  usageCount: t.integer("usage_count").default(0).notNull(),

  startsAt: t.timestamp("starts_at", { precision: 6, withTimezone: true }),
  endsAt: t.timestamp("ends_at", { precision: 6, withTimezone: true }),
  isActive: t.boolean("is_active").default(true).notNull(),

  createdAt: t
    .timestamp("created_at", { precision: 6, withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: t
    .timestamp("updated_at", { precision: 6, withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const purchaseOrder = pgTable(
  "purchase_order",
  {
    id: t.text("id").primaryKey(),
    organizationId: t
      .text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    storeId: t
      .text("store_id")
      .notNull()
      .references(() => store.id, { onDelete: "cascade" }),
    supplierId: t
      .text("supplier_id")
      .notNull()
      .references(() => supplier.id, { onDelete: "restrict" }),

    orderNumber: t.varchar("order_number", { length: 50 }).notNull(),
    status: t.varchar("status", { length: 20 }).notNull().default("draft"),

    subtotal: t.doublePrecision("subtotal").default(0).notNull(),
    taxTotal: t.doublePrecision("tax_total").default(0),
    shippingCost: t.doublePrecision("shipping_cost").default(0),
    grandTotal: t.doublePrecision("grand_total").default(0).notNull(),

    notes: t.text("notes"),

    orderedAt: t.timestamp("ordered_at", { precision: 6, withTimezone: true }),
    expectedAt: t.timestamp("expected_at", {
      precision: 6,
      withTimezone: true,
    }),
    receivedAt: t.timestamp("received_at", {
      precision: 6,
      withTimezone: true,
    }),

    createdBy: t.text("created_by").references(() => user.id, {
      onDelete: "set null",
    }),
    createdAt: t
      .timestamp("created_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: t
      .timestamp("updated_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    t.index("po_org_idx").on(table.organizationId),
    t.index("po_store_idx").on(table.storeId),
    t.index("po_supplier_idx").on(table.supplierId),
  ],
);

export const purchaseOrderItem = pgTable("purchase_order_item", {
  id: t.text("id").primaryKey(),
  purchaseOrderId: t
    .text("purchase_order_id")
    .notNull()
    .references(() => purchaseOrder.id, { onDelete: "cascade" }),
  productId: t.text("product_id").references(() => product.id, {
    onDelete: "set null",
  }),
  variantId: t.text("variant_id").references(() => productVariant.id, {
    onDelete: "set null",
  }),

  productName: t.text("product_name").notNull(),
  productSku: t.text("product_sku"),

  quantity: t.doublePrecision("quantity").notNull().default(1),
  quantityReceived: t.doublePrecision("quantity_received").default(0),
  unitId: t.text("unit_id").references(() => unit.id, {
    onDelete: "set null",
  }),

  unitCost: t.doublePrecision("unit_cost").notNull(),
  lineTotal: t.doublePrecision("line_total").notNull(),

  createdAt: t
    .timestamp("created_at", { precision: 6, withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const cashRegister = pgTable(
  "cash_register",
  {
    id: t.text("id").primaryKey(),
    organizationId: t
      .text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    storeId: t
      .text("store_id")
      .notNull()
      .references(() => store.id, { onDelete: "cascade" }),

    name: t.text("name").notNull(),
    location: t.text("location"),
    teamId: t.text("team_id").references(() => team.id, {
      onDelete: "set null",
    }),

    userId: t.text("user_id").references(() => user.id, {
      onDelete: "set null",
    }),
    status: t.varchar("status", { length: 20 }).notNull().default("closed"),

    openingAmount: t.doublePrecision("opening_amount").default(0).notNull(),
    currentCashAmount: t.doublePrecision("current_cash_amount").default(0).notNull(),
    expectedCashAmount: t.doublePrecision("expected_cash_amount").default(0).notNull(),

    openedAt: t.timestamp("opened_at", { precision: 6, withTimezone: true }),
    closedAt: t.timestamp("closed_at", { precision: 6, withTimezone: true }),

    isActive: t.boolean("is_active").default(true).notNull(),
    createdAt: t
      .timestamp("created_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: t
      .timestamp("updated_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    t.index("register_org_idx").on(table.organizationId),
    t.index("register_store_idx").on(table.storeId),
    t.index("register_user_idx").on(table.userId),
  ],
);

export const cashRegisterTransaction = pgTable(
  "cash_register_transaction",
  {
    id: t.text("id").primaryKey(),
    cashRegisterId: t
      .text("cash_register_id")
      .notNull()
      .references(() => cashRegister.id, { onDelete: "cascade" }),
    userId: t.text("user_id").references(() => user.id, {
      onDelete: "set null",
    }),

    type: t.varchar("type", { length: 30 }).notNull(),
    amount: t.doublePrecision("amount").notNull(),
    balanceBefore: t.doublePrecision("balance_before").notNull(),
    balanceAfter: t.doublePrecision("balance_after").notNull(),

    note: t.text("note"),
    referenceType: t.varchar("reference_type", { length: 30 }),
    referenceId: t.text("reference_id"),

    createdAt: t
      .timestamp("created_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [t.index("crtxn_register_idx").on(table.cashRegisterId)],
);

export const order = pgTable(
  "order",
  {
    id: t.text("id").primaryKey(),
    organizationId: t
      .text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    storeId: t
      .text("store_id")
      .notNull()
      .references(() => store.id, { onDelete: "cascade" }),

    orderNumber: t.varchar("order_number", { length: 50 }).notNull(),
    status: t.varchar("status", { length: 30 }).notNull().default("pending"),

    customerId: t.text("customer_id").references(() => customer.id, {
      onDelete: "set null",
    }),
    customerName: t.text("customer_name"),
    userId: t.text("user_id").references(() => user.id, {
      onDelete: "set null",
    }),
    cashRegisterId: t.text("cash_register_id").references(
      () => cashRegister.id,
      { onDelete: "set null" },
    ),

    subtotal: t.doublePrecision("subtotal").notNull().default(0),
    discountTotal: t.doublePrecision("discount_total").default(0).notNull(),
    taxTotal: t.doublePrecision("tax_total").default(0).notNull(),
    shippingCost: t.doublePrecision("shipping_cost").default(0).notNull(),
    grandTotal: t.doublePrecision("grand_total").notNull().default(0),
    totalPaid: t.doublePrecision("total_paid").default(0).notNull(),
    balanceDue: t.doublePrecision("balance_due").default(0).notNull(),

    notes: t.text("notes"),
    internalNotes: t.text("internal_notes"),

    orderedAt: t
      .timestamp("ordered_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .notNull(),
    completedAt: t.timestamp("completed_at", {
      precision: 6,
      withTimezone: true,
    }),
    cancelledAt: t.timestamp("cancelled_at", {
      precision: 6,
      withTimezone: true,
    }),

    createdAt: t
      .timestamp("created_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: t
      .timestamp("updated_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    t.index("order_org_idx").on(table.organizationId),
    t.index("order_store_idx").on(table.storeId),
    t.index("order_customer_idx").on(table.customerId),
    t.index("order_user_idx").on(table.userId),
    t.index("order_register_idx").on(table.cashRegisterId),
    t.index("order_status_idx").on(table.status),
    t.index("order_ordered_at_idx").on(table.orderedAt),
  ],
);

export const orderItem = pgTable(
  "order_item",
  {
    id: t.text("id").primaryKey(),
    orderId: t
      .text("order_id")
      .notNull()
      .references(() => order.id, { onDelete: "cascade" }),

    productId: t.text("product_id").references(() => product.id, {
      onDelete: "set null",
    }),
    variantId: t.text("variant_id").references(() => productVariant.id, {
      onDelete: "set null",
    }),

    productName: t.text("product_name").notNull(),
    productSku: t.text("product_sku"),

    unitId: t.text("unit_id").references(() => unit.id, {
      onDelete: "set null",
    }),
    quantity: t.doublePrecision("quantity").notNull().default(1),

    unitPrice: t.doublePrecision("unit_price").notNull(),
    costPrice: t.doublePrecision("cost_price"),
    taxRate: t.doublePrecision("tax_rate").default(0).notNull(),
    taxAmount: t.doublePrecision("tax_amount").default(0).notNull(),
    discountAmount: t.doublePrecision("discount_amount").default(0).notNull(),
    lineTotal: t.doublePrecision("line_total").notNull(),

    notes: t.text("notes"),
    createdAt: t
      .timestamp("created_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    t.index("orderitem_order_idx").on(table.orderId),
    t.index("orderitem_product_idx").on(table.productId),
  ],
);

export const orderItemTax = pgTable("order_item_tax", {
  id: t.text("id").primaryKey(),
  orderItemId: t
    .text("order_item_id")
    .notNull()
    .references(() => orderItem.id, { onDelete: "cascade" }),
  taxId: t.text("tax_id").references(() => tax.id, { onDelete: "set null" }),

  taxName: t.text("tax_name").notNull(),
  taxRate: t.doublePrecision("tax_rate").notNull(),
  taxAmount: t.doublePrecision("tax_amount").notNull(),

  createdAt: t
    .timestamp("created_at", { precision: 6, withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const orderDiscount = pgTable("order_discount", {
  id: t.text("id").primaryKey(),
  orderId: t
    .text("order_id")
    .notNull()
    .references(() => order.id, { onDelete: "cascade" }),
  discountId: t.text("discount_id").references(() => discount.id, {
    onDelete: "set null",
  }),
  orderItemId: t.text("order_item_id").references(() => orderItem.id, {
    onDelete: "cascade",
  }),

  name: t.text("name").notNull(),
  code: t.text("code"),
  type: t.varchar("type", { length: 20 }).notNull(),
  value: t.doublePrecision("value").notNull(),
  amount: t.doublePrecision("amount").notNull(),

  createdAt: t
    .timestamp("created_at", { precision: 6, withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const payment = pgTable(
  "payment",
  {
    id: t.text("id").primaryKey(),
    orderId: t
      .text("order_id")
      .notNull()
      .references(() => order.id, { onDelete: "cascade" }),

    method: t.varchar("method", { length: 30 }).notNull(),
    methodLabel: t.text("method_label"),

    amount: t.doublePrecision("amount").notNull(),
    tipAmount: t.doublePrecision("tip_amount").default(0).notNull(),

    cardLastFour: t.varchar("card_last_four", { length: 4 }),
    cardBrand: t.varchar("card_brand", { length: 20 }),
    referenceNumber: t.text("reference_number"),

    status: t.varchar("status", { length: 20 }).notNull().default("completed"),
    userId: t.text("user_id").references(() => user.id, {
      onDelete: "set null",
    }),

    metadata: t.jsonb("metadata"),

    createdAt: t
      .timestamp("created_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: t
      .timestamp("updated_at", { precision: 6, withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [t.index("payment_order_idx").on(table.orderId)],
);

export const storeRelations = relations(store, ({ one, many }) => ({
  organization: one(organization, {
    fields: [store.organizationId],
    references: [organization.id],
  }),
  inventory: many(storeInventory),
  inventoryTransactions: many(inventoryTransaction),
  cashRegisters: many(cashRegister),
  orders: many(order),
  purchaseOrders: many(purchaseOrder),
  discounts: many(discount),
}));

export const unitRelations = relations(unit, ({ one, many }) => ({
  organization: one(organization, {
    fields: [unit.organizationId],
    references: [organization.id],
  }),
  products: many(product),
}));

export const categoryRelations = relations(category, ({ one, many }) => ({
  organization: one(organization, {
    fields: [category.organizationId],
    references: [organization.id],
  }),
  parent: one(category, {
    fields: [category.parentId],
    references: [category.id],
    relationName: "category_parent",
  }),
  children: many(category, { relationName: "category_parent" }),
  products: many(product),
}));

export const supplierRelations = relations(supplier, ({ one, many }) => ({
  organization: one(organization, {
    fields: [supplier.organizationId],
    references: [organization.id],
  }),
  products: many(product),
  purchaseOrders: many(purchaseOrder),
}));

export const taxRelations = relations(tax, ({ one, many }) => ({
  organization: one(organization, {
    fields: [tax.organizationId],
    references: [organization.id],
  }),
  products: many(product, { relationName: "product_primary_tax" }),
  productTaxes: many(productTax),
}));

export const productRelations = relations(product, ({ one, many }) => ({
  organization: one(organization, {
    fields: [product.organizationId],
    references: [organization.id],
  }),
  category: one(category, {
    fields: [product.categoryId],
    references: [category.id],
  }),
  unit: one(unit, {
    fields: [product.unitId],
    references: [unit.id],
  }),
  tax: one(tax, {
    fields: [product.taxId],
    references: [tax.id],
    relationName: "product_primary_tax",
  }),
  supplier: one(supplier, {
    fields: [product.supplierId],
    references: [supplier.id],
  }),
  variants: many(productVariant),
  taxes: many(productTax),
  components: many(compositeItem, { relationName: "composite_parent" }),
  usedInComposites: many(compositeItem, {
    relationName: "composite_component",
  }),
  storeInventory: many(storeInventory),
  inventoryTransactions: many(inventoryTransaction),
  orderItems: many(orderItem),
}));

export const productVariantRelations = relations(
  productVariant,
  ({ one, many }) => ({
    product: one(product, {
      fields: [productVariant.productId],
      references: [product.id],
    }),
    storeInventory: many(storeInventory),
    inventoryTransactions: many(inventoryTransaction),
    orderItems: many(orderItem),
  }),
);

export const compositeItemRelations = relations(compositeItem, ({ one }) => ({
  compositeProduct: one(product, {
    fields: [compositeItem.compositeProductId],
    references: [product.id],
    relationName: "composite_parent",
  }),
  componentProduct: one(product, {
    fields: [compositeItem.componentProductId],
    references: [product.id],
    relationName: "composite_component",
  }),
  componentVariant: one(productVariant, {
    fields: [compositeItem.componentVariantId],
    references: [productVariant.id],
  }),
  unit: one(unit, {
    fields: [compositeItem.unitId],
    references: [unit.id],
  }),
}));

export const productTaxRelations = relations(productTax, ({ one }) => ({
  product: one(product, {
    fields: [productTax.productId],
    references: [product.id],
  }),
  tax: one(tax, {
    fields: [productTax.taxId],
    references: [tax.id],
  }),
}));

export const storeInventoryRelations = relations(
  storeInventory,
  ({ one }) => ({
    store: one(store, {
      fields: [storeInventory.storeId],
      references: [store.id],
    }),
    product: one(product, {
      fields: [storeInventory.productId],
      references: [product.id],
    }),
    variant: one(productVariant, {
      fields: [storeInventory.variantId],
      references: [productVariant.id],
    }),
  }),
);

export const inventoryTransactionRelations = relations(
  inventoryTransaction,
  ({ one }) => ({
    organization: one(organization, {
      fields: [inventoryTransaction.organizationId],
      references: [organization.id],
    }),
    store: one(store, {
      fields: [inventoryTransaction.storeId],
      references: [store.id],
    }),
    product: one(product, {
      fields: [inventoryTransaction.productId],
      references: [product.id],
    }),
    variant: one(productVariant, {
      fields: [inventoryTransaction.variantId],
      references: [productVariant.id],
    }),
    createdByUser: one(user, {
      fields: [inventoryTransaction.createdBy],
      references: [user.id],
    }),
  }),
);

export const customerRelations = relations(customer, ({ one, many }) => ({
  organization: one(organization, {
    fields: [customer.organizationId],
    references: [organization.id],
  }),
  orders: many(order),
  discounts: many(discount),
}));

export const discountRelations = relations(discount, ({ one, many }) => ({
  organization: one(organization, {
    fields: [discount.organizationId],
    references: [organization.id],
  }),
  store: one(store, {
    fields: [discount.storeId],
    references: [store.id],
  }),
  category: one(category, {
    fields: [discount.categoryId],
    references: [category.id],
  }),
  product: one(product, {
    fields: [discount.productId],
    references: [product.id],
  }),
  customer: one(customer, {
    fields: [discount.customerId],
    references: [customer.id],
  }),
  orderDiscounts: many(orderDiscount),
}));

export const purchaseOrderRelations = relations(
  purchaseOrder,
  ({ one, many }) => ({
    organization: one(organization, {
      fields: [purchaseOrder.organizationId],
      references: [organization.id],
    }),
    store: one(store, {
      fields: [purchaseOrder.storeId],
      references: [store.id],
    }),
    supplier: one(supplier, {
      fields: [purchaseOrder.supplierId],
      references: [supplier.id],
    }),
    createdByUser: one(user, {
      fields: [purchaseOrder.createdBy],
      references: [user.id],
    }),
    items: many(purchaseOrderItem),
  }),
);

export const purchaseOrderItemRelations = relations(
  purchaseOrderItem,
  ({ one }) => ({
    purchaseOrder: one(purchaseOrder, {
      fields: [purchaseOrderItem.purchaseOrderId],
      references: [purchaseOrder.id],
    }),
    product: one(product, {
      fields: [purchaseOrderItem.productId],
      references: [product.id],
    }),
    variant: one(productVariant, {
      fields: [purchaseOrderItem.variantId],
      references: [productVariant.id],
    }),
    unit: one(unit, {
      fields: [purchaseOrderItem.unitId],
      references: [unit.id],
    }),
  }),
);

export const cashRegisterRelations = relations(
  cashRegister,
  ({ one, many }) => ({
    organization: one(organization, {
      fields: [cashRegister.organizationId],
      references: [organization.id],
    }),
    store: one(store, {
      fields: [cashRegister.storeId],
      references: [store.id],
    }),
    team: one(team, {
      fields: [cashRegister.teamId],
      references: [team.id],
    }),
    user: one(user, {
      fields: [cashRegister.userId],
      references: [user.id],
    }),
    transactions: many(cashRegisterTransaction),
    orders: many(order),
  }),
);

export const cashRegisterTransactionRelations = relations(
  cashRegisterTransaction,
  ({ one }) => ({
    cashRegister: one(cashRegister, {
      fields: [cashRegisterTransaction.cashRegisterId],
      references: [cashRegister.id],
    }),
    user: one(user, {
      fields: [cashRegisterTransaction.userId],
      references: [user.id],
    }),
  }),
);

export const orderRelations = relations(order, ({ one, many }) => ({
  organization: one(organization, {
    fields: [order.organizationId],
    references: [organization.id],
  }),
  store: one(store, {
    fields: [order.storeId],
    references: [store.id],
  }),
  customer: one(customer, {
    fields: [order.customerId],
    references: [customer.id],
  }),
  user: one(user, {
    fields: [order.userId],
    references: [user.id],
  }),
  cashRegister: one(cashRegister, {
    fields: [order.cashRegisterId],
    references: [cashRegister.id],
  }),
  items: many(orderItem),
  discounts: many(orderDiscount),
  payments: many(payment),
}));

export const orderItemRelations = relations(orderItem, ({ one, many }) => ({
  order: one(order, {
    fields: [orderItem.orderId],
    references: [order.id],
  }),
  product: one(product, {
    fields: [orderItem.productId],
    references: [product.id],
  }),
  variant: one(productVariant, {
    fields: [orderItem.variantId],
    references: [productVariant.id],
  }),
  unit: one(unit, {
    fields: [orderItem.unitId],
    references: [unit.id],
  }),
  taxes: many(orderItemTax),
  discounts: many(orderDiscount),
}));

export const orderItemTaxRelations = relations(orderItemTax, ({ one }) => ({
  orderItem: one(orderItem, {
    fields: [orderItemTax.orderItemId],
    references: [orderItem.id],
  }),
  tax: one(tax, {
    fields: [orderItemTax.taxId],
    references: [tax.id],
  }),
}));

export const orderDiscountRelations = relations(orderDiscount, ({ one }) => ({
  order: one(order, {
    fields: [orderDiscount.orderId],
    references: [order.id],
  }),
  discount: one(discount, {
    fields: [orderDiscount.discountId],
    references: [discount.id],
  }),
  orderItem: one(orderItem, {
    fields: [orderDiscount.orderItemId],
    references: [orderItem.id],
  }),
}));

export const paymentRelations = relations(payment, ({ one }) => ({
  order: one(order, {
    fields: [payment.orderId],
    references: [order.id],
  }),
  user: one(user, {
    fields: [payment.userId],
    references: [user.id],
  }),
}));
