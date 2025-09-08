import { type User, type InsertUser, type Product, type InsertProduct, type CustomOrder, type InsertCustomOrder, type Contact, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  getCustomOrders(): Promise<CustomOrder[]>;
  getCustomOrder(id: string): Promise<CustomOrder | undefined>;
  createCustomOrder(order: InsertCustomOrder): Promise<CustomOrder>;
  
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private customOrders: Map<string, CustomOrder>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.customOrders = new Map();
    this.contacts = new Map();
    
    // Initialize with sample products
    this.initializeProducts();
  }

  private initializeProducts() {
    const sampleProducts: Omit<Product, 'id' | 'createdAt'>[] = [
      {
        name: "Ankara Midi Dress",
        description: "Traditional print, modern silhouette",
        category: "african-prints",
        type: "ready",
        priceKES: 15500,
        images: ["https://pixabay.com/get/g2ea41d46dfdfd9f45b86c1920d6f7f8d3c3f13c8f9bf26bf60b8541d85abc66849ff48b58aed533cb7c570b7e360a2a2083581262323da39aaaefbbe518b6197_1280.jpg"],
        availableSizes: ["S", "M", "L"],
        fabricOptions: ["Ankara Cotton"],
        inStock: 5,
        featured: "true"
      },
      {
        name: "Kitenge Shirt",
        description: "Casual elegance for any occasion",
        category: "african-prints",
        type: "ready",
        priceKES: 8900,
        images: ["https://images.unsplash.com/photo-1618077360395-f3068be8e001?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500"],
        availableSizes: ["M", "L", "XL"],
        fabricOptions: ["Kitenge Cotton"],
        inStock: 8,
        featured: "true"
      },
      {
        name: "Executive Blazer",
        description: "Professional with African flair",
        category: "suits",
        type: "ready",
        priceKES: 22000,
        images: ["https://pixabay.com/get/gca699219ed6e7e08ae359a7739ec13c49d932778c8b5ea9bff80942d4730155a5f861282ff346afd429361890cdb05097899884adb4f83628acecc4097fa5c98_1280.jpg"],
        availableSizes: ["S", "M", "L"],
        fabricOptions: ["Wool Blend"],
        inStock: 3,
        featured: "true"
      },
      {
        name: "Traditional Set",
        description: "Cultural heritage meets modern design",
        category: "traditional",
        type: "ready",
        priceKES: 18500,
        images: ["https://pixabay.com/get/g63acc0ad1baca8d81b41db03a9b5195a7e35ce75b2e441bdcb22d1a6548149bd51435d0fafdda376745de506428a30dc21838c6d849ad68c6824589fdcd2f613_1280.jpg"],
        availableSizes: ["S", "M", "L"],
        fabricOptions: ["Traditional Cotton"],
        inStock: 4,
        featured: "true"
      }
    ];

    sampleProducts.forEach(product => {
      const id = randomUUID();
      const fullProduct: Product = {
        ...product,
        id,
        createdAt: new Date()
      };
      this.products.set(id, fullProduct);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category === category
    );
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct, 
      id, 
      createdAt: new Date(),
      images: insertProduct.images || [],
      availableSizes: insertProduct.availableSizes || null,
      fabricOptions: insertProduct.fabricOptions || null,
      inStock: insertProduct.inStock || null,
      featured: insertProduct.featured || null
    };
    this.products.set(id, product);
    return product;
  }

  async getCustomOrders(): Promise<CustomOrder[]> {
    return Array.from(this.customOrders.values());
  }

  async getCustomOrder(id: string): Promise<CustomOrder | undefined> {
    return this.customOrders.get(id);
  }

  async createCustomOrder(insertOrder: InsertCustomOrder): Promise<CustomOrder> {
    const id = randomUUID();
    const order: CustomOrder = { 
      ...insertOrder, 
      id, 
      status: 'pending',
      estimatedPrice: null,
      createdAt: new Date(),
      specialRequirements: insertOrder.specialRequirements || null
    };
    this.customOrders.set(id, order);
    return order;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
