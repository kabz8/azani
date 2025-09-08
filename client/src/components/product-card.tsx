import { Heart } from "lucide-react";
import { useState } from "react";
import { useCurrency } from "@/hooks/use-currency";
import { convertKESToUSD, formatPrice } from "@/lib/currency";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const { currency } = useCurrency();

  const price = currency === 'USD' ? convertKESToUSD(product.priceKES) : product.priceKES;
  const formattedPrice = formatPrice(price, currency);

  return (
    <div className="group" data-testid={`card-product-${product.id}`}>
      <div className="relative overflow-hidden rounded-xl bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-80 object-cover group-hover:scale-105 smooth-hover"
          data-testid={`img-product-${product.id}`}
        />
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 smooth-hover"
          data-testid={`button-favorite-${product.id}`}
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorited ? 'text-destructive fill-destructive' : 'text-muted-foreground hover:text-destructive'
            }`}
          />
        </button>
      </div>
      <div className="pt-4 space-y-2">
        <h3 className="font-semibold text-foreground" data-testid={`text-product-name-${product.id}`}>
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground" data-testid={`text-product-description-${product.id}`}>
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-foreground" data-testid={`text-product-price-${product.id}`}>
            {formattedPrice}
          </span>
          <div className="flex space-x-1">
            {product.availableSizes?.map((size) => (
              <span
                key={size}
                className="px-2 py-1 bg-muted text-xs rounded"
                data-testid={`text-product-size-${product.id}-${size}`}
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
