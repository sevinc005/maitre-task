# Maitre — Məhsullar paneli
'https://maitre-task.vercel.app/'

Restoran admin panelinin məhsullar səhifəsi. React + TypeScript + Vite.



## İşə salmaq

```bash
npm install
npm run dev        # http://localhost:3000
```

Digər əmrlər:

```bash
npm test           # testlər (watch rejimi)
npm run test:run   # testlər bir dəfə
npm run build      # tip yoxlaması + production build
npm run lint
```

## Nə hazırdır

- Məhsul siyahısı: AZ/EN ad, kateqoriya, qiymət (`4,50 ₼`), status
- Ada görə axtarış (AZ və EN), kateqoriya filtri, səhifələmə
- Yeni məhsul əlavə etmək və düzəltmək (modal forma, validasiya)
- Siyahıdan statusu birbaşa dəyişmək
- Yüklənmə, boş siyahı və xəta vəziyyətləri (yenidən cəhd düyməsi ilə)
- Telefon görünüşü
- Axtarış, filtr və səhifə URL-də saxlanılır (`?q=plov&category=2&page=2`)
- Testlər

## Əsas qərarlar

**TanStack Query.** API gecikmə ilə cavab verir və 10% hallarda xəta qaytarır. Loading/error/retry, keşləmə və səhifələr arası keçiddə köhnə datanın göstərilməsini (`keepPreviousData`) əl ilə yazmaq əvəzinə hazır həll seçdim. Kateqoriyalar dəyişmədiyi üçün bir dəfə yüklənir.

**Status dəyişikliyi optimistic-dir.** Toggle-a basanda dərhal dəyişir, server xəta qaytarsa əvvəlki vəziyyətə qayıdır və bildiriş çıxır. Cavab gələnə qədər həmin toggle bloklanır — gecikmələr təsadüfi olduğu üçün ard-arda iki klik sorğuların qarışıq qayıtmasına səbəb ola bilərdi.

**Forma xətası zamanı modal bağlanmır.** Yadda saxlama uğursuz olarsa, yazılanlar itmir, xəta formanın içində göstərilir.

**URL state.** Filtrlər üçün ayrıca state saxlamıram, mənbə URL-dir. Axtarış 350ms debounce olunur və history-ni doldurmamaq üçün `replace` ilə yazılır; kateqoriya və səhifə dəyişiklikləri isə adi keçid kimidir, yəni "geri" düyməsi işləyir. Filtr dəyişəndə səhifə 1-ə qayıdır.

**Tailwind.** Stil bələdçisindəki rənglər, radiuslar və şriftlər `tailwind.config.ts`-də token kimi təyin olunub.

**React Hook Form + Zod.** Validasiya qaydaları ayrıca faylda (`productSchema.ts`) olduğu üçün komponentdən asılı olmadan test olunur.

## Açıq məqamlar üzrə qərarlar

- **Qiymət:** tapşırıqda "0-dan böyük" yazılıb, API də `price <= 0`-ı rədd edir, ona görə 0 qəbul olunmur. Həm `4,50`, həm `4.50` yazmaq olar; vergüldən sonra ən çox 2 rəqəm.
- **EN ad boş olarsa** `null` göndərilir, siyahıda "—" göstərilir (dizayndakı kimi).
- **Silmə** yoxdur — API-də belə endpoint yoxdur və tələblərdə də istənmir.
- **Satışda olmayan məhsullar** dizayndakı kimi solğun göstərilir.
- **Yeni məhsul** default olaraq "Satışda" yaradılır.
- **Mövcud olmayan səhifə** URL-də yazılıbsa (məs. `?page=99`), sonuncu səhifəyə keçir.
- **Header-dəki istifadəçi** (Nərgiz Əliyeva) statikdir, autentifikasiya tələb olunmur.
- **Telefon:** cədvəl əvəzinə kartlar, forma aşağıdan açılan panel kimi görünür.

## Struktur

```
src/
  api/api.ts              verilən mock API (dəyişdirilməyib)
  hooks/                  data və URL hook-ları
  components/ui/          ümumi komponentlər (Button, Input, Modal, Toggle...)
  components/products/    məhsul səhifəsinin hissələri
  pages/ProductsPage.tsx
```

## Sərf olunan vaxt

Təxminən 3 saat.

## Daha çox vaxt olsaydı

- Modal üçün tam focus trap
- Cədvəldə sıralama (qiymət, ad)
- E2E testlər (Playwright) — xüsusən optimistic toggle və URL ssenariləri üçün
- Formada dəyişiklik varsa, bağlamazdan əvvəl təsdiq soruşmaq
- Server xətalarında avtomatik retry siyasətini incələmək (400 vs 500)
