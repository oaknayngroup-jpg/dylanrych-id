"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-store";

type Props = {
  productId: string;
  slug: string;
  name: string;
  priceIdr: number;
  imageFront: string;
};

export function AddToCartButton(props: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      className="btn btn-gold"
      onClick={() => {
        addItem(props, 1);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1600);
      }}
    >
      {added ? "Ditambahkan" : "Tambah ke keranjang"}
    </button>
  );
}
