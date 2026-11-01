/**
 * Midtrans Snap client stub.
 *
 * TODO: Replace stubs with real Midtrans Snap API calls once sandbox keys
 * are available (MIDTRANS_SERVER_KEY / MIDTRANS_CLIENT_KEY).
 * Docs: https://docs.midtrans.com/docs/snap-snap-integration-guide
 */

export type SnapCreateParams = {
  orderId: string;
  grossAmount: number;
  customer: {
    firstName: string;
    email: string;
    phone: string;
  };
  itemDetails: Array<{
    id: string;
    price: number;
    quantity: number;
    name: string;
  }>;
};

export type SnapCreateResult = {
  token: string;
  redirectUrl: string;
  stub: true;
};

function assertConfigured() {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const clientKey = process.env.MIDTRANS_CLIENT_KEY;
  const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";
  return { serverKey, clientKey, isProduction, ready: Boolean(serverKey && clientKey) };
}

/**
 * Create a Snap transaction token.
 * Currently returns a deterministic stub so checkout UI can be wired without keys.
 */
export async function createSnapTransaction(
  params: SnapCreateParams,
): Promise<SnapCreateResult> {
  const cfg = assertConfigured();

  // TODO: POST https://app.sandbox.midtrans.com/snap/v1/transactions
  // Authorization: Basic base64(MIDTRANS_SERVER_KEY + ":")
  if (!cfg.ready) {
    console.warn(
      "[midtrans] MIDTRANS_SERVER_KEY / MIDTRANS_CLIENT_KEY missing — returning stub token",
    );
  }

  const token = `STUB-SNAP-${params.orderId}`;
  return {
    token,
    redirectUrl: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${token}`,
    stub: true,
  };
}

/**
 * Verify Midtrans notification signature.
 * TODO: implement sha512(order_id + status_code + gross_amount + serverKey)
 */
export function verifyNotificationSignature(payload: {
  order_id: string;
  status_code: string;
  gross_amount: string;
  signature_key: string;
}): boolean {
  // TODO: sha512(order_id + status_code + gross_amount + serverKey) === signature_key
  void payload;
  console.warn("[midtrans] verifyNotificationSignature is a stub — always false until wired");
  return false;
}

export function getMidtransClientKey() {
  return process.env.MIDTRANS_CLIENT_KEY ?? "";
}
