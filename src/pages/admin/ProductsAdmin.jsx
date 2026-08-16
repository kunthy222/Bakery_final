import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebaseClient";
import { seedProducts } from "../MenuPage";

const emptyForm = { name: "", description: "", price: "", image: "" };

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      () => setLoading(false)
    );
    return () => unsub();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.image) {
      alert("Name, price and image URL are required.");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        image: form.image,
      };

      if (editingId) {
        await updateDoc(doc(db, "products", editingId), payload);
      } else {
        await addDoc(collection(db, "products"), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      }

      resetForm();
    } catch (error) {
      alert("Failed to save product: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name || "",
      description: p.description || "",
      price: p.price || "",
      image: p.image || "",
    });
  };

  const removeProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteDoc(doc(db, "products", id));
    } catch (error) {
      alert("Failed: " + error.message);
    }
  };

  const seedFromMenu = async () => {
    if (!window.confirm(`Add ${seedProducts.length} sample products to your live menu?`)) return;
    setSaving(true);
    try {
      for (const p of seedProducts) {
        await addDoc(collection(db, "products"), {
          name: p.name,
          description: p.description,
          price: p.price,
          image: p.image,
          createdAt: serverTimestamp(),
        });
      }
    } catch (error) {
      alert("Failed to seed products: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="row g-3">
      <div className="col-lg-4">
        <div className="dashboard-table-card">
          <h5 className="mb-3">{editingId ? "Edit Product" : "Add Product"}</h5>

          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                rows="2"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Price ($)</label>
              <input
                className="form-control"
                name="price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Image URL</label>
              <input
                className="form-control"
                name="image"
                value={form.image}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-dark flex-fill" disabled={saving}>
                {editingId ? "Update" : "Add"} Product
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {products.length === 0 && !loading && (
            <button
              className="btn btn-outline-dark w-100 mt-3"
              onClick={seedFromMenu}
              disabled={saving}
            >
              Seed sample products from menu
            </button>
          )}
        </div>
      </div>

      <div className="col-lg-8">
        <div className="dashboard-table-card">
          <h5 className="mb-3">Products ({products.length})</h5>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <img
                          src={p.image}
                          alt={p.name}
                          style={{ width: 45, height: 45, objectFit: "cover", borderRadius: 8 }}
                        />
                      </td>
                      <td>{p.name}</td>
                      <td>{Number(p.price).toFixed(2)}$</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-secondary me-2"
                          onClick={() => startEdit(p)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeProduct(p.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
