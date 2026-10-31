import type { Category } from "../../api/api";
import { SearchInput } from "../ui/SearchInput";
import { Select } from "../ui/Select";

interface ProductFiltersProps {
  search: string;
  categoryId?: number;
  categories: Category[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (id?: number) => void;
}

export default function ProductFilters({
  search,
  categoryId,
  categories,
  onSearchChange,
  onCategoryChange,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <div className="sm:w-[312px]">
        <SearchInput value={search} onChange={onSearchChange} placeholder="Ada görə axtar..." />
      </div>

      <div className="sm:w-[196px]">
        <Select
          aria-label="Kateqoriya"
          value={categoryId ?? ""}
          onChange={(e) => onCategoryChange(e.target.value ? Number(e.target.value) : undefined)}
          placeholder="Bütün kateqoriyalar"
          options={categories.map((c) => ({ value: c.id, label: c.name }))}
          className="text-[15px]"
        />
      </div>
    </div>
  );
}
