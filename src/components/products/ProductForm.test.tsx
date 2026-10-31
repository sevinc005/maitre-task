import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductForm from "./ProductForm";

const categories = [
  { id: 1, name: "Şorbalar" },
  { id: 2, name: "Salatlar" },
];

describe("ProductForm", () => {
  it("bos formada xeta mesajlari gosterir ve gondermir", async () => {
    const onSubmit = vi.fn();
    render(<ProductForm categories={categories} onSubmit={onSubmit} onCancel={() => {}} />);

    await userEvent.click(screen.getByRole("button", { name: "Yadda saxla" }));

    expect(await screen.findByText("Azərbaycan dilində ad məcburidir")).toBeInTheDocument();
    expect(screen.getByText("Kateqoriya seçin")).toBeInTheDocument();
    expect(screen.getByText("Qiyməti daxil edin")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("duzgun deyerlerle API formatinda gonderir", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<ProductForm categories={categories} onSubmit={onSubmit} onCancel={() => {}} />);

    await userEvent.type(screen.getByLabelText(/Azərbaycan dilində/), "Çoban salatı");
    await userEvent.selectOptions(screen.getByLabelText(/Kateqoriya/), "2");
    await userEvent.type(screen.getByLabelText(/Qiymət/), "5,5");
    await userEvent.click(screen.getByRole("button", { name: "Yadda saxla" }));

    expect(onSubmit).toHaveBeenCalledWith({
      nameAz: "Çoban salatı",
      nameEn: null,
      categoryId: 2,
      price: 5.5,
      isAvailable: true,
    });
  });

  it("server xetasini formada gosterir", async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error("Server xətası. Yenidən cəhd edin."));
    const product = { id: 3, nameAz: "Şah plov", nameEn: "Shah pilaf", categoryId: 1, price: 18, isAvailable: true };
    render(<ProductForm product={product} categories={categories} onSubmit={onSubmit} onCancel={() => {}} />);

    expect(screen.getByLabelText(/Azərbaycan dilində/)).toHaveValue("Şah plov");

    await userEvent.click(screen.getByRole("button", { name: "Yadda saxla" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Server xətası");
  });
});
