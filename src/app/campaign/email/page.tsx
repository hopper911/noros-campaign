import { CampaignShell } from "@/components/campaign/CampaignShell";
import { CAMPAIGN_LINE, DISCLAIMER } from "@/lib/messaging";

export default function EmailPage() {
  return (
    <CampaignShell title="Launch email">
      <div className="mx-auto max-w-xl kit-frame overflow-hidden">
        <div className="border-b border-border bg-space px-6 py-4 constellation">
          <div className="font-display text-xl text-nebula-bright">Noros</div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-muted">
            Launch announcement
          </div>
        </div>

        <div className="space-y-5 px-6 py-8 text-sm leading-relaxed text-star/90">
          <p className="text-xs text-muted">Subject: {CAMPAIGN_LINE}</p>
          <p>Hi {"{{first_name}}"},</p>
          <p>
            Today we&apos;re introducing <strong className="text-star">Noros</strong>—the
            AI for cloud operators. Ask questions about AWS, Azure, and GCP spend in plain
            language. Get answers with reasoning, charts, and the next action.
          </p>
          <p className="font-display text-xl text-star">{CAMPAIGN_LINE}</p>
          <p>Whether you sit in finance, FinOps, or engineering:</p>
          <ul className="list-disc space-y-1 pl-5 text-muted">
            <li>CFOs get forecast confidence and savings they can defend</li>
            <li>FinOps leaders close the anomaly → optimize loop</li>
            <li>Engineers get resource context and recommendations fast</li>
          </ul>
          <p>
            Setup takes about five minutes. Read-only access. Answers within hours—not
            another quarter of spreadsheet archaeology.
          </p>
          <div className="pt-2">
            <span className="btn-primary !text-sm">See a 5-minute demo</span>
          </div>
          <p className="text-xs text-muted">
            Or reply to this email with the cloud question you&apos;ve been meaning to ask.
          </p>
          <p>
            — The Noros launch team
            <br />
            <span className="text-xs text-muted">(Portfolio simulation)</span>
          </p>
        </div>

        <div className="border-t border-border px-6 py-4 text-[10px] leading-snug text-muted">
          {DISCLAIMER}
        </div>
      </div>
    </CampaignShell>
  );
}
