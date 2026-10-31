import { Button } from "../ui/Button";

interface PageHeaderProps {
  subtitle: string;
  onAdd: () => void;
}

export default function PageHeader({ subtitle, onAdd }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
      <div>
        <h1 className="text-[32px] md:text-[38px] leading-tight font-normal tracking-tight">Məhsullar</h1>
        <p className="mt-1 text-sm text-content-secondary">{subtitle}</p>
      </div>

      <Button onClick={onAdd}>
        <span className="text-xl leading-none -mt-0.5">+</span>
        Yeni məhsul
      </Button>
    </div>
  );
}
