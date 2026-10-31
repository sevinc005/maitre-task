import { useCallback, useEffect, useMemo, useState } from "react";
import type { Product, ProductInput } from "../api/api";
import { useCategories } from "../hooks/useCategories";
import { PAGE_SIZE, useProducts } from "../hooks/useProducts";
import { usePendingToggles, useProductMutations } from "../hooks/useProductMutations";
import { useURLFilters } from "../hooks/useURLFilters";
import PageHeader from "../components/products/PageHeader";
import ProductFilters from "../components/products/ProductFilters";
import ProductTable from "../components/products/ProductTable";
import ProductForm from "../components/products/ProductForm";
import EmptyState from "../components/products/EmptyState";
import ErrorState from "../components/products/ErrorState";
import { Modal } from "../components/ui/Modal";
import { Pagination } from "../components/ui/Pagination";
import { TableSkeleton } from "../components/ui/Skeleton";
import { Toast, type ToastMessage } from "../components/ui/Toast";

// "new" - yeni mehsul, Product - duzelis
type FormTarget = "new" | Product;

export default function ProductsPage() {
  const filters = useURLFilters();
  const { search, categoryId, page, setPage } = filters;

  const products = useProducts({ search: search || undefined, categoryId, page });
  const categories = useCategories();
  const { create, update, toggle } = useProductMutations();
  const busyIds = usePendingToggles();

  // modal baglananda target saxlanilir ki, animasiya zamani forma yox olmasin
  const [formTarget, setFormTarget] = useState<FormTarget>("new");
  const [formOpen, setFormOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const openForm = (target: FormTarget) => {
    setFormTarget(target);
    setFormOpen(true);
  };
  const closeForm = useCallback(() => setFormOpen(false), []);

  const notify = (text: string, tone: ToastMessage["tone"] = "success") =>
    setToast({ id: Date.now(), text, tone });
  const closeToast = useCallback(() => setToast(null), []);

  const editing = formTarget !== "new" ? formTarget : null;

  const categoryMap = useMemo(
    () => new Map((categories.data ?? []).map((c) => [c.id, c])),
    [categories.data]
  );

  const data = products.data;
  const total = data?.total ?? 0;

  // URL-de movcud olmayan sehife varsa (mes. ?page=9) sonuncu sehifeye kecirik
  useEffect(() => {
    if (!data || data.items.length > 0 || page === 1) return;
    setPage(Math.max(1, Math.ceil(data.total / PAGE_SIZE)));
  }, [data, page, setPage]);

  function handleToggle(product: Product) {
    const next = !product.isAvailable;
    toggle.mutate(
      { id: product.id, isAvailable: next },
      {
        onError: () =>
          notify(`“${product.nameAz}” statusu dəyişmədi. Yenidən cəhd edin.`, "error"),
      }
    );
  }

  async function handleSubmit(input: ProductInput) {
    if (editing) {
      await update.mutateAsync({ id: editing.id, input });
      notify("Dəyişikliklər yadda saxlanıldı");
    } else {
      await create.mutateAsync(input);
      notify("Məhsul əlavə olundu");
    }
    setFormOpen(false);
  }

  const subtitle = filters.hasFilters
    ? `Axtarış nəticəsi · ${total} məhsul`
    : `Menyudakı bütün məhsullar · ${total} məhsul`;

  function renderContent() {
    // ilk yuklenme
    if (products.isPending) return <TableSkeleton />;

    if (products.isError) {
      return (
        <ErrorState
          message={products.error.message}
          onRetry={() => products.refetch()}
          retrying={products.isFetching}
        />
      );
    }

    if (data!.items.length === 0) {
      return (
        <EmptyState
          filtered={filters.hasFilters}
          onReset={filters.clearFilters}
          onAdd={() => openForm("new")}
        />
      );
    }

    return (
      <>
        <ProductTable
          products={data!.items}
          categories={categoryMap}
          onEdit={openForm}
          onToggle={handleToggle}
          busyIds={busyIds}
          dimmed={products.isPlaceholderData}
        />
        <Pagination page={page} pageSize={PAGE_SIZE} total={total} onChange={setPage} />
      </>
    );
  }

  return (
    <>
      <PageHeader subtitle={products.isPending ? "Yüklənir…" : subtitle} onAdd={() => openForm("new")} />

      <ProductFilters
        search={search}
        categoryId={categoryId}
        categories={categories.data ?? []}
        onSearchChange={filters.setSearch}
        onCategoryChange={filters.setCategoryId}
      />

      {categories.isError && (
        <p className="mb-4 text-sm text-danger">
          Kateqoriyalar yüklənmədi.{" "}
          <button type="button" className="underline" onClick={() => categories.refetch()}>
            Yenidən cəhd et
          </button>
        </p>
      )}

      {renderContent()}

      <Modal isOpen={formOpen} onClose={closeForm} title={editing ? "Məhsulu düzəlt" : "Yeni məhsul"}>
        <ProductForm
          // basqa mehsul acilanda forma sifirdan qurulsun
          key={editing?.id ?? "new"}
          product={editing}
          categories={categories.data ?? []}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      </Modal>

      <Toast toast={toast} onClose={closeToast} />
    </>
  );
}
