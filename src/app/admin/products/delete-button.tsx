"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function onDelete() {
    if (!confirm(`Hapus produk “${name}”?`)) return;
    setPending(true);
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    setPending(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      alert(data?.error ?? "Gagal menghapus");
      return;
    }
    router.refresh();
  }

  return (
    <button type="button" className="btn btn-danger" disabled={pending} onClick={onDelete}>
      Hapus
    </button>
  );
}
