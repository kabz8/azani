import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCustomOrderSchema, insertContactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Products endpoints
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const products = await storage.getProductsByCategory(category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products by category" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Custom orders endpoints
  app.post("/api/custom-orders", async (req, res) => {
    try {
      const validatedData = insertCustomOrderSchema.parse(req.body);
      const order = await storage.createCustomOrder(validatedData);
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create custom order" });
    }
  });

  app.get("/api/custom-orders", async (req, res) => {
    try {
      const orders = await storage.getCustomOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch custom orders" });
    }
  });

  // Contact form endpoint
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json(contact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  // Currency conversion endpoint
  app.get("/api/exchange-rate", async (req, res) => {
    try {
      // In a real application, fetch from a currency API
      // For now, using a fixed rate
      const rate = 150; // 1 USD = 150 KES (approximate)
      res.json({ usdToKes: rate, kesToUsd: 1 / rate });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch exchange rate" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
