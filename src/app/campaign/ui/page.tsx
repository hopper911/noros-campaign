import { CampaignShell } from "@/components/campaign/CampaignShell";
import { ProductMock } from "@/components/ui/ProductMock";

export default function UIHeroPage() {
  return (
    <CampaignShell title="Product UI hero graphic">
      <p className="mb-8 max-w-2xl text-sm text-muted">
        Original chat + chart composition for launch surfaces. Not a product screenshot.
      </p>
      <div className="mx-auto max-w-3xl">
        <ProductMock />
      </div>
      <div className="mx-auto mt-8 max-w-md">
        <p className="mb-3 text-xs uppercase tracking-[0.14em] text-muted">Compact variant</p>
        <ProductMock compact />
      </div>
    </CampaignShell>
  );
}
