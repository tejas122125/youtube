import { relations, sql } from "drizzle-orm";
import {
  boolean,
  doublePrecision,
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `HI_Website_${name}`);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdById: varchar("created_by", { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (example) => ({
    createdByIdIdx: index("created_by_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  })
);

export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  password: varchar("password", { length: 255 }).notNull(),
  image: varchar("image", { length: 255 }),
  isVerified: varchar("isVerified", { length: 255 }).notNull().default("false"),
});

export const appUsers = createTable("appUsers", {
  id: serial("id").notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 255 }).notNull().unique(),
  image: varchar("image", { length: 255 }).notNull().default(""),
});

export const userCart = createTable("userCart", {
  id: serial("id").notNull().primaryKey(),
  userId: integer("userId")
    .notNull()
    .references(() => appUsers.id),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
});

export const userCartRelations = relations(userCart, ({ one, many }) => ({
  user: one(appUsers, { fields: [userCart.userId], references: [appUsers.id] }),
  cartItems: many(cartItems),
}));

export const cartItems = createTable("cartItems", {
  id: serial("id").notNull().primaryKey(),
  cartId: integer("cartId")
    .notNull()
    .references(() => userCart.id),
  foodItemId: varchar("foodItemId", { length: 255 })
    .notNull()
    .references(() => foodItems.id),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
    withTimezone: true,
  }).$onUpdate(() => new Date()),
});

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  cart: one(userCart, {
    fields: [cartItems.cartId],
    references: [userCart.id],
  }),
  foodItem: one(foodItems, {
    fields: [cartItems.foodItemId],
    references: [foodItems.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const restaurants = createTable("restaurant", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  lat: doublePrecision("lat").notNull().default(0),
  lng: doublePrecision("lng").notNull().default(0),
  phone: varchar("phone", { length: 15 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  image: varchar("image", { length: 255 }).notNull().default(""),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  isVerified: varchar("isVerified", { length: 255 }).notNull().default("false"),
  categories: text("categories")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  rating: integer("rating").default(0).notNull(),
});

export const foodItems = createTable("food_item", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  categoryId: varchar("categoryId", { length: 255 }).notNull(),
  restaurantId: varchar("restaurantId", { length: 255 })
    .notNull()
    .references(() => restaurants.id, { onDelete: "cascade" }),
  image: varchar("image", { length: 255 }).notNull().default(""),
  isAvailable: boolean("isAvailable").notNull().default(true),
  type: varchar("type", { length: 255 }).notNull(),
});

export const foodCategories = createTable("food_category", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  image: varchar("image", { length: 255 }).notNull().default(""),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  restaurants: text("restaurants")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
});

export const orders = createTable("orders", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: integer("userId")
    .notNull()
    .references(() => appUsers.id),
  restaurantId: varchar("restaurantId", { length: 255 })
    .notNull()
    .references(() => restaurants.id),
  totalAmount: integer("totalAmount").notNull(),
  status: varchar("status", { length: 255 }).notNull().default("pending"),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
    withTimezone: true,
  }).$onUpdate(() => new Date()),

  razorpayPaymentId: varchar("razorpayPaymentId", { length: 255 }).notNull(),
});

export const orderItems = createTable("orderItems", {
  id: serial("id").notNull().primaryKey(),
  orderId: varchar("orderId", { length: 255 })
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  foodItemId: varchar("foodItemId", { length: 255 })
    .notNull()
    .references(() => foodItems.id),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
});

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(appUsers, { fields: [orders.userId], references: [appUsers.id] }),
  orderItems: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
}));

export const restaurantsRelations = relations(restaurants, ({ many }) => ({
  foodItems: many(foodItems),
}));

export const foodItemsRelations = relations(foodItems, ({ one }) => ({
  restaurant: one(restaurants, {
    fields: [foodItems.restaurantId],
    references: [restaurants.id],
  }),
  foodCategory: one(foodCategories, {
    fields: [foodItems.categoryId],
    references: [foodCategories.id],
  }),
}));
