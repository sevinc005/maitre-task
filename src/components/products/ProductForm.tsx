import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Category, Product, ProductInput } from "../../api/api";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Toggle } from "../ui/Toggle";
import { Button } from "../ui/Button";
import { productSchema, toFormValues, toInput, type ProductFormValues } from "./productSchema";

interface ProductFormProps {
  product?: Product | null;
  categories: Category[];
  onSubmit: (input: ProductInput) => Promise<unknown>;
  onCancel: () => void;
}

export default function ProductForm({ product, categories, onSubmit, onCancel }: ProductFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: toFormValues(product),
  });

  const submit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      await onSubmit(toInput(values));
    } catch (err) {
      // forma acig qalir ki, istifadeci yazdiqlarini itirmesin
      setServerError(err instanceof Error ? err.message : "Xəta baş verdi. Yenidən cəhd edin.");
    }
  });

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <Input
        id="nameAz"
        label="Ad (Azərbaycan dilində) *"
        placeholder="məs. Mərci şorbası"
        autoFocus
        error={errors.nameAz?.message}
        {...register("nameAz")}
      />

      <Input
        id="nameEn"
        label="Ad (ingilis dilində)"
        placeholder="e.g. Lentil soup"
        error={errors.nameEn?.message}
        {...register("nameEn")}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          id="categoryId"
          label="Kateqoriya *"
          placeholder="Seçin"
          options={categories.map((c) => ({ value: c.id, label: c.name }))}
          error={errors.categoryId?.message}
          {...register("categoryId")}
        />

        <div className="relative">
          <Input
            id="price"
            label="Qiymət *"
            placeholder="0,00"
            inputMode="decimal"
            className="pr-10 tabular-nums"
            error={errors.price?.message}
            {...register("price")}
          />
          <span className="absolute right-4 top-[38px] text-content-secondary pointer-events-none">₼</span>
        </div>
      </div>

      <Controller
        control={control}
        name="isAvailable"
        render={({ field }) => (
          <div className="flex items-center justify-between h-12 px-4 rounded-pill bg-surface-main">
            <label htmlFor="isAvailable" className="text-[15px]">
              {field.value ? "Satışda" : "Satışda deyil"}
            </label>
            <Toggle id="isAvailable" checked={field.value} onChange={field.onChange} />
          </div>
        )}
      />

      {serverError && (
        <p role="alert" className="px-4 py-3 rounded-2xl bg-danger-light text-danger text-sm">
          {serverError}
        </p>
      )}

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
        <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Ləğv et
        </Button>
        <Button type="submit" loading={isSubmitting}>
          Yadda saxla
        </Button>
      </div>
    </form>
  );
}
