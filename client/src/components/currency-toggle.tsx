import { useCurrency } from "@/hooks/use-currency";

export function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex items-center bg-muted rounded-full p-1 currency-toggle">
      <button
        onClick={() => setCurrency('KES')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          currency === 'KES'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        data-testid="button-currency-kes"
      >
        KES
      </button>
      <button
        onClick={() => setCurrency('USD')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          currency === 'USD'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        data-testid="button-currency-usd"
      >
        USD
      </button>
    </div>
  );
}
