/**
 * JNT Express shipping client stub.
 *
 * TODO: Wire real JNT (or Biteship-as-proxy) API once credentials exist:
 *   JNT_API_KEY, JNT_CUSTOMER_ID, JNT_ORIGIN_ZIP
 * Prefer Biteship if direct JNT onboarding is slow.
 */

export type OngkirQuoteParams = {
  destinationZip: string;
  weightGrams: number;
};

export type OngkirQuote = {
  courier: "JNT";
  service: string;
  etd: string;
  priceIdr: number;
  stub: true;
};

export type BookingParams = {
  orderNumber: string;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  recipientCity: string;
  recipientZip: string;
  weightGrams: number;
  itemDescription: string;
};

export type BookingResult = {
  bookingId: string;
  trackingNumber: string;
  stub: true;
};

function assertConfigured() {
  const apiKey = process.env.JNT_API_KEY;
  const customerId = process.env.JNT_CUSTOMER_ID;
  const originZip = process.env.JNT_ORIGIN_ZIP ?? "20111"; // Medan default
  return {
    apiKey,
    customerId,
    originZip,
    ready: Boolean(apiKey && customerId),
  };
}

/**
 * Quote shipping cost origin warehouse → destination.
 * Stub returns a flat Medan-area estimate for local demo.
 */
export async function quoteOngkir(params: OngkirQuoteParams): Promise<OngkirQuote> {
  const cfg = assertConfigured();
  if (!cfg.ready) {
    console.warn("[jnt] JNT_API_KEY / JNT_CUSTOMER_ID missing — returning stub ongkir");
  }

  // TODO: call JNT / Biteship rate API
  const base = 12_000;
  const weightSurcharge = Math.max(0, Math.ceil(params.weightGrams / 1000) - 1) * 3_000;

  return {
    courier: "JNT",
    service: "EZ",
    etd: "2-4 hari",
    priceIdr: base + weightSurcharge,
    stub: true,
  };
}

/**
 * Book AWB after Midtrans settlement.
 * Stub returns a fake tracking number so admin UI can display the field.
 */
export async function bookShipment(params: BookingParams): Promise<BookingResult> {
  const cfg = assertConfigured();
  if (!cfg.ready) {
    console.warn("[jnt] booking stub — no real AWB created");
  }

  // TODO: call JNT create-order / Biteship create-order after payment settlement
  const trackingNumber = `JNTSTUB${params.orderNumber.replace(/\W/g, "").slice(-10)}`;
  return {
    bookingId: `BOOK-${params.orderNumber}`,
    trackingNumber,
    stub: true,
  };
}
