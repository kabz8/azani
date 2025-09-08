import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Product } from "@shared/schema";

export default function ReadyShop() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const filteredProducts = products?.filter(product => 
    selectedCategory === "all" || product.category === selectedCategory
  ) || [];

  const categories = [
    { value: "all", label: "All Products" },
    { value: "african-prints", label: "African Prints" },
    { value: "suits", label: "Suits & Blazers" },
    { value: "traditional", label: "Traditional Wear" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-muted to-background" data-testid="section-shop-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-serif font-bold text-foreground mb-6" data-testid="text-shop-title">
            Ready to Wear
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-shop-description">
            Carefully curated pieces available for immediate purchase and shipping. Each item represents our commitment to exceptional quality and authentic African style.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-card border-b border-border" data-testid="section-filters">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">Filter by category:</span>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px]" data-testid="select-category-filter">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-muted-foreground" data-testid="text-product-count">
              {filteredProducts.length} products found
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-background" data-testid="section-products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20" data-testid="empty-products">
              <p className="text-xl text-muted-foreground mb-4">No products found in this category.</p>
              <Button onClick={() => setSelectedCategory("all")} data-testid="button-show-all">
                Show All Products
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card" data-testid="section-cta">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-6" data-testid="text-cta-title">
            Don't See What You're Looking For?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="text-cta-description">
            Let us create something unique just for you. Our custom tailoring service allows you to design the perfect piece.
          </p>
          <Button size="lg" className="px-8 py-4 text-lg" data-testid="button-cta-custom">
            Start Custom Order
          </Button>
        </div>
      </section>
    </div>
  );
}
