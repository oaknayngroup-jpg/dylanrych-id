import { ProductForm } from "../product-form";

export const metadata = { title: "Tambah produk · Admin" };

export default function NewProductPage() {
  return (
    <>
      <h1>Tambah produk</h1>
      <p className="muted" style={{ marginBottom: "1.5rem" }}>
        Default harga Rp179.900 · 35 ml · path gambar di /public/products
      </p>
      <ProductForm />
    </>
  );
}
