"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export type ProductFormValues = {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  notesTop: string;
  notesHeart: string;
  notesBase: string;
  character: string;
  bpom: string;
  volumeMl: number;
  priceIdr: number;
  stock: number;
  imageFront: string;
  imageTilt: string;
  active: boolean;
  sortOrder: number;
};

const empty: ProductFormValues = {
  name: "",
  slug: "",
  tagline: "",
  description: "",
  notesTop: "",
  notesHeart: "",
  notesBase: "",
  character: "",
  bpom: "",
  volumeMl: 35,
  priceIdr: 179900,
  stock: 100,
  imageFront: "/products/",
  imageTilt: "",
  active: true,
  sortOrder: 0,
};

export function ProductForm({
  initial,
  productId,
}: {
  initial?: Partial<ProductFormValues>;
  productId?: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState<ProductFormValues>({ ...empty, ...initial });
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  function set<K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const url = productId ? `/api/admin/products/${productId}` : "/api/admin/products";
    const method = productId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    setPending(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? "Gagal menyimpan");
      return;
    }

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form className="form" onSubmit={onSubmit} style={{ maxWidth: 560 }}>
      <label>
        Nama
        <input required value={values.name} onChange={(e) => set("name", e.target.value)} />
      </label>
      <label>
        Slug
        <input required value={values.slug} onChange={(e) => set("slug", e.target.value)} />
      </label>
      <label>
        Tagline
        <input value={values.tagline} onChange={(e) => set("tagline", e.target.value)} />
      </label>
      <label>
        Deskripsi
        <textarea
          required
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
        />
      </label>
      <label>
        Notes top
        <input value={values.notesTop} onChange={(e) => set("notesTop", e.target.value)} />
      </label>
      <label>
        Notes heart
        <input value={values.notesHeart} onChange={(e) => set("notesHeart", e.target.value)} />
      </label>
      <label>
        Notes base
        <input value={values.notesBase} onChange={(e) => set("notesBase", e.target.value)} />
      </label>
      <label>
        Karakter
        <input value={values.character} onChange={(e) => set("character", e.target.value)} />
      </label>
      <label>
        BPOM
        <input value={values.bpom} onChange={(e) => set("bpom", e.target.value)} />
      </label>
      <label>
        Volume (ml)
        <input
          type="number"
          required
          value={values.volumeMl}
          onChange={(e) => set("volumeMl", Number(e.target.value))}
        />
      </label>
      <label>
        Harga (IDR)
        <input
          type="number"
          required
          value={values.priceIdr}
          onChange={(e) => set("priceIdr", Number(e.target.value))}
        />
      </label>
      <label>
        Stok
        <input
          type="number"
          required
          value={values.stock}
          onChange={(e) => set("stock", Number(e.target.value))}
        />
      </label>
      <label>
        Gambar depan (path)
        <input
          required
          value={values.imageFront}
          onChange={(e) => set("imageFront", e.target.value)}
        />
      </label>
      <label>
        Gambar tilt (path)
        <input value={values.imageTilt} onChange={(e) => set("imageTilt", e.target.value)} />
      </label>
      <label>
        Urutan
        <input
          type="number"
          value={values.sortOrder}
          onChange={(e) => set("sortOrder", Number(e.target.value))}
        />
      </label>
      <label style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <input
          type="checkbox"
          checked={values.active}
          onChange={(e) => set("active", e.target.checked)}
        />
        Aktif di toko
      </label>

      {error ? <p className="error-text">{error}</p> : null}

      <div className="form-actions">
        <button type="submit" className="btn btn-gold" disabled={pending}>
          {pending ? "Menyimpan…" : "Simpan"}
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => router.push("/admin/products")}
        >
          Batal
        </button>
      </div>
    </form>
  );
}
