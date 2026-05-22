import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

type Currency = 'LKR' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  exchangeRate: number;
  convertPrice: (priceLKR: number) => number;
  formatPrice: (priceLKR: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('LKR');
  const [exchangeRate, setExchangeRate] = useState<number>(0.0033); // Default fallback rate

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/LKR');
        const data = await response.json();
        if (data.rates && data.rates.USD) {
          setExchangeRate(data.rates.USD);
        }
      } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
      }
    };

    fetchExchangeRate();
    const interval = setInterval(fetchExchangeRate, 60000 * 60); // Update every hour

    return () => clearInterval(interval);
  }, []);

  const convertPrice = useCallback((priceLKR: number) => {
    if (currency === 'LKR') return priceLKR;
    return priceLKR * exchangeRate;
  }, [currency, exchangeRate]);

  const formatPrice = useCallback((priceLKR: number) => {
    const convertedPrice = convertPrice(priceLKR);
    if (currency === 'LKR') {
      return `Rs. ${convertedPrice.toFixed(0)}`;
    }
    return `$${convertedPrice.toFixed(2)}`;
  }, [currency, convertPrice]);

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        exchangeRate,
        convertPrice,
        formatPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
