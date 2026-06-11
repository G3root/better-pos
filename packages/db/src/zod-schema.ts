import { createSchemaFactory } from "drizzle-zod";
import { z } from "zod";
import {
  user,
  session,
  account,
  verification,
  organization,
  member,
  invitation,
  team,
  teamMember,
} from "./schema/auth";
import {
  store,
  unit,
  category,
  supplier,
  tax,
  product,
  productVariant,
  compositeItem,
  productTax,
  storeInventory,
  inventoryTransaction,
  customer,
  discount,
  purchaseOrder,
  purchaseOrderItem,
  cashRegister,
  cashRegisterTransaction,
  order,
  orderItem,
  orderItemTax,
  orderDiscount,
  payment,
} from "./schema/pos";

const { createInsertSchema, createSelectSchema, createUpdateSchema } = createSchemaFactory({
  zodInstance: z,
});

// User schemas
export const selectUserSchema = createSelectSchema(user);
export type TSelectUser = z.infer<typeof selectUserSchema>;
export const createUserSchema = createInsertSchema(user).omit({
  updatedAt: true,
});
export type TCreateUser = z.infer<typeof createUserSchema>;
export const updateUserSchema = createUpdateSchema(user);
export type TUpdateUser = z.infer<typeof updateUserSchema>;

// Session schemas
export const selectSessionSchema = createSelectSchema(session);
export type TSelectSession = z.infer<typeof selectSessionSchema>;
export const createSessionSchema = createInsertSchema(session).omit({
  updatedAt: true,
});
export type TCreateSession = z.infer<typeof createSessionSchema>;
export const updateSessionSchema = createUpdateSchema(session);
export type TUpdateSession = z.infer<typeof updateSessionSchema>;

// Account schemas
export const selectAccountSchema = createSelectSchema(account);
export type TSelectAccount = z.infer<typeof selectAccountSchema>;
export const createAccountSchema = createInsertSchema(account).omit({
  updatedAt: true,
});
export type TCreateAccount = z.infer<typeof createAccountSchema>;
export const updateAccountSchema = createUpdateSchema(account);
export type TUpdateAccount = z.infer<typeof updateAccountSchema>;

// Verification schemas
export const selectVerificationSchema = createSelectSchema(verification);
export type TSelectVerification = z.infer<typeof selectVerificationSchema>;
export const createVerificationSchema = createInsertSchema(verification).omit({
  updatedAt: true,
});
export type TCreateVerification = z.infer<typeof createVerificationSchema>;
export const updateVerificationSchema = createUpdateSchema(verification);
export type TUpdateVerification = z.infer<typeof updateVerificationSchema>;

// Organization schemas
export const selectOrganizationSchema = createSelectSchema(organization);
export type TSelectOrganization = z.infer<typeof selectOrganizationSchema>;
export const createOrganizationSchema = createInsertSchema(organization).omit({
  updatedAt: true,
});
export type TCreateOrganization = z.infer<typeof createOrganizationSchema>;
export const updateOrganizationSchema = createUpdateSchema(organization);
export type TUpdateOrganization = z.infer<typeof updateOrganizationSchema>;

// Member schemas
export const selectMemberSchema = createSelectSchema(member);
export type TSelectMember = z.infer<typeof selectMemberSchema>;
export const createMemberSchema = createInsertSchema(member);
export type TCreateMember = z.infer<typeof createMemberSchema>;
export const updateMemberSchema = createUpdateSchema(member);
export type TUpdateMember = z.infer<typeof updateMemberSchema>;

// Invitation schemas
export const selectInvitationSchema = createSelectSchema(invitation);
export type TSelectInvitation = z.infer<typeof selectInvitationSchema>;
export const createInvitationSchema = createInsertSchema(invitation);
export type TCreateInvitation = z.infer<typeof createInvitationSchema>;
export const updateInvitationSchema = createUpdateSchema(invitation);
export type TUpdateInvitation = z.infer<typeof updateInvitationSchema>;

// Team schemas
export const selectTeamSchema = createSelectSchema(team);
export type TSelectTeam = z.infer<typeof selectTeamSchema>;
export const createTeamSchema = createInsertSchema(team).omit({
  updatedAt: true,
});
export type TCreateTeam = z.infer<typeof createTeamSchema>;
export const updateTeamSchema = createUpdateSchema(team);
export type TUpdateTeam = z.infer<typeof updateTeamSchema>;

// TeamMember schemas
export const selectTeamMemberSchema = createSelectSchema(teamMember);
export type TSelectTeamMember = z.infer<typeof selectTeamMemberSchema>;
export const createTeamMemberSchema = createInsertSchema(teamMember);
export type TCreateTeamMember = z.infer<typeof createTeamMemberSchema>;
export const updateTeamMemberSchema = createUpdateSchema(teamMember);
export type TUpdateTeamMember = z.infer<typeof updateTeamMemberSchema>;

// Store schemas
export const selectStoreSchema = createSelectSchema(store);
export type TSelectStore = z.infer<typeof selectStoreSchema>;
export const createStoreSchema = createInsertSchema(store).omit({
  updatedAt: true,
});
export type TCreateStore = z.infer<typeof createStoreSchema>;
export const updateStoreSchema = createUpdateSchema(store);
export type TUpdateStore = z.infer<typeof updateStoreSchema>;

// Unit schemas
export const selectUnitSchema = createSelectSchema(unit);
export type TSelectUnit = z.infer<typeof selectUnitSchema>;
export const createUnitSchema = createInsertSchema(unit).omit({
  updatedAt: true,
});
export type TCreateUnit = z.infer<typeof createUnitSchema>;
export const updateUnitSchema = createUpdateSchema(unit);
export type TUpdateUnit = z.infer<typeof updateUnitSchema>;

// Category schemas
export const selectCategorySchema = createSelectSchema(category);
export type TSelectCategory = z.infer<typeof selectCategorySchema>;
export const createCategorySchema = createInsertSchema(category).omit({
  updatedAt: true,
});
export type TCreateCategory = z.infer<typeof createCategorySchema>;
export const updateCategorySchema = createUpdateSchema(category);
export type TUpdateCategory = z.infer<typeof updateCategorySchema>;

// Supplier schemas
export const selectSupplierSchema = createSelectSchema(supplier);
export type TSelectSupplier = z.infer<typeof selectSupplierSchema>;
export const createSupplierSchema = createInsertSchema(supplier).omit({
  updatedAt: true,
});
export type TCreateSupplier = z.infer<typeof createSupplierSchema>;
export const updateSupplierSchema = createUpdateSchema(supplier);
export type TUpdateSupplier = z.infer<typeof updateSupplierSchema>;

// Tax schemas
export const selectTaxSchema = createSelectSchema(tax);
export type TSelectTax = z.infer<typeof selectTaxSchema>;
export const createTaxSchema = createInsertSchema(tax).omit({
  updatedAt: true,
});
export type TCreateTax = z.infer<typeof createTaxSchema>;
export const updateTaxSchema = createUpdateSchema(tax);
export type TUpdateTax = z.infer<typeof updateTaxSchema>;

// Product schemas
export const selectProductSchema = createSelectSchema(product);
export type TSelectProduct = z.infer<typeof selectProductSchema>;
export const createProductSchema = createInsertSchema(product).omit({
  updatedAt: true,
});
export type TCreateProduct = z.infer<typeof createProductSchema>;
export const updateProductSchema = createUpdateSchema(product);
export type TUpdateProduct = z.infer<typeof updateProductSchema>;

// ProductVariant schemas
export const selectProductVariantSchema = createSelectSchema(productVariant);
export type TSelectProductVariant = z.infer<typeof selectProductVariantSchema>;
export const createProductVariantSchema = createInsertSchema(productVariant).omit({
  updatedAt: true,
});
export type TCreateProductVariant = z.infer<typeof createProductVariantSchema>;
export const updateProductVariantSchema = createUpdateSchema(productVariant);
export type TUpdateProductVariant = z.infer<typeof updateProductVariantSchema>;

// CompositeItem schemas
export const selectCompositeItemSchema = createSelectSchema(compositeItem);
export type TSelectCompositeItem = z.infer<typeof selectCompositeItemSchema>;
export const createCompositeItemSchema = createInsertSchema(compositeItem).omit({
  updatedAt: true,
});
export type TCreateCompositeItem = z.infer<typeof createCompositeItemSchema>;
export const updateCompositeItemSchema = createUpdateSchema(compositeItem);
export type TUpdateCompositeItem = z.infer<typeof updateCompositeItemSchema>;

// ProductTax schemas
export const selectProductTaxSchema = createSelectSchema(productTax);
export type TSelectProductTax = z.infer<typeof selectProductTaxSchema>;
export const createProductTaxSchema = createInsertSchema(productTax);
export type TCreateProductTax = z.infer<typeof createProductTaxSchema>;
export const updateProductTaxSchema = createUpdateSchema(productTax);
export type TUpdateProductTax = z.infer<typeof updateProductTaxSchema>;

// StoreInventory schemas
export const selectStoreInventorySchema = createSelectSchema(storeInventory);
export type TSelectStoreInventory = z.infer<typeof selectStoreInventorySchema>;
export const createStoreInventorySchema = createInsertSchema(storeInventory).omit({
  updatedAt: true,
});
export type TCreateStoreInventory = z.infer<typeof createStoreInventorySchema>;
export const updateStoreInventorySchema = createUpdateSchema(storeInventory);
export type TUpdateStoreInventory = z.infer<typeof updateStoreInventorySchema>;

// InventoryTransaction schemas
export const selectInventoryTransactionSchema = createSelectSchema(inventoryTransaction);
export type TSelectInventoryTransaction = z.infer<typeof selectInventoryTransactionSchema>;
export const createInventoryTransactionSchema = createInsertSchema(inventoryTransaction);
export type TCreateInventoryTransaction = z.infer<typeof createInventoryTransactionSchema>;
export const updateInventoryTransactionSchema = createUpdateSchema(inventoryTransaction);
export type TUpdateInventoryTransaction = z.infer<typeof updateInventoryTransactionSchema>;

// Customer schemas
export const selectCustomerSchema = createSelectSchema(customer);
export type TSelectCustomer = z.infer<typeof selectCustomerSchema>;
export const createCustomerSchema = createInsertSchema(customer).omit({
  updatedAt: true,
});
export type TCreateCustomer = z.infer<typeof createCustomerSchema>;
export const updateCustomerSchema = createUpdateSchema(customer);
export type TUpdateCustomer = z.infer<typeof updateCustomerSchema>;

// Discount schemas
export const selectDiscountSchema = createSelectSchema(discount);
export type TSelectDiscount = z.infer<typeof selectDiscountSchema>;
export const createDiscountSchema = createInsertSchema(discount).omit({
  updatedAt: true,
});
export type TCreateDiscount = z.infer<typeof createDiscountSchema>;
export const updateDiscountSchema = createUpdateSchema(discount);
export type TUpdateDiscount = z.infer<typeof updateDiscountSchema>;

// PurchaseOrder schemas
export const selectPurchaseOrderSchema = createSelectSchema(purchaseOrder);
export type TSelectPurchaseOrder = z.infer<typeof selectPurchaseOrderSchema>;
export const createPurchaseOrderSchema = createInsertSchema(purchaseOrder).omit({
  updatedAt: true,
});
export type TCreatePurchaseOrder = z.infer<typeof createPurchaseOrderSchema>;
export const updatePurchaseOrderSchema = createUpdateSchema(purchaseOrder);
export type TUpdatePurchaseOrder = z.infer<typeof updatePurchaseOrderSchema>;

// PurchaseOrderItem schemas
export const selectPurchaseOrderItemSchema = createSelectSchema(purchaseOrderItem);
export type TSelectPurchaseOrderItem = z.infer<typeof selectPurchaseOrderItemSchema>;
export const createPurchaseOrderItemSchema = createInsertSchema(purchaseOrderItem);
export type TCreatePurchaseOrderItem = z.infer<typeof createPurchaseOrderItemSchema>;
export const updatePurchaseOrderItemSchema = createUpdateSchema(purchaseOrderItem);
export type TUpdatePurchaseOrderItem = z.infer<typeof updatePurchaseOrderItemSchema>;

// CashRegister schemas
export const selectCashRegisterSchema = createSelectSchema(cashRegister);
export type TSelectCashRegister = z.infer<typeof selectCashRegisterSchema>;
export const createCashRegisterSchema = createInsertSchema(cashRegister).omit({
  updatedAt: true,
});
export type TCreateCashRegister = z.infer<typeof createCashRegisterSchema>;
export const updateCashRegisterSchema = createUpdateSchema(cashRegister);
export type TUpdateCashRegister = z.infer<typeof updateCashRegisterSchema>;

// CashRegisterTransaction schemas
export const selectCashRegisterTransactionSchema = createSelectSchema(cashRegisterTransaction);
export type TSelectCashRegisterTransaction = z.infer<typeof selectCashRegisterTransactionSchema>;
export const createCashRegisterTransactionSchema = createInsertSchema(cashRegisterTransaction);
export type TCreateCashRegisterTransaction = z.infer<typeof createCashRegisterTransactionSchema>;
export const updateCashRegisterTransactionSchema = createUpdateSchema(cashRegisterTransaction);
export type TUpdateCashRegisterTransaction = z.infer<typeof updateCashRegisterTransactionSchema>;

// Order schemas
export const selectOrderSchema = createSelectSchema(order);
export type TSelectOrder = z.infer<typeof selectOrderSchema>;
export const createOrderSchema = createInsertSchema(order).omit({
  updatedAt: true,
});
export type TCreateOrder = z.infer<typeof createOrderSchema>;
export const updateOrderSchema = createUpdateSchema(order);
export type TUpdateOrder = z.infer<typeof updateOrderSchema>;

// OrderItem schemas
export const selectOrderItemSchema = createSelectSchema(orderItem);
export type TSelectOrderItem = z.infer<typeof selectOrderItemSchema>;
export const createOrderItemSchema = createInsertSchema(orderItem);
export type TCreateOrderItem = z.infer<typeof createOrderItemSchema>;
export const updateOrderItemSchema = createUpdateSchema(orderItem);
export type TUpdateOrderItem = z.infer<typeof updateOrderItemSchema>;

// OrderItemTax schemas
export const selectOrderItemTaxSchema = createSelectSchema(orderItemTax);
export type TSelectOrderItemTax = z.infer<typeof selectOrderItemTaxSchema>;
export const createOrderItemTaxSchema = createInsertSchema(orderItemTax);
export type TCreateOrderItemTax = z.infer<typeof createOrderItemTaxSchema>;
export const updateOrderItemTaxSchema = createUpdateSchema(orderItemTax);
export type TUpdateOrderItemTax = z.infer<typeof updateOrderItemTaxSchema>;

// OrderDiscount schemas
export const selectOrderDiscountSchema = createSelectSchema(orderDiscount);
export type TSelectOrderDiscount = z.infer<typeof selectOrderDiscountSchema>;
export const createOrderDiscountSchema = createInsertSchema(orderDiscount);
export type TCreateOrderDiscount = z.infer<typeof createOrderDiscountSchema>;
export const updateOrderDiscountSchema = createUpdateSchema(orderDiscount);
export type TUpdateOrderDiscount = z.infer<typeof updateOrderDiscountSchema>;

// Payment schemas
export const selectPaymentSchema = createSelectSchema(payment);
export type TSelectPayment = z.infer<typeof selectPaymentSchema>;
export const createPaymentSchema = createInsertSchema(payment).omit({
  updatedAt: true,
});
export type TCreatePayment = z.infer<typeof createPaymentSchema>;
export const updatePaymentSchema = createUpdateSchema(payment);
export type TUpdatePayment = z.infer<typeof updatePaymentSchema>;
