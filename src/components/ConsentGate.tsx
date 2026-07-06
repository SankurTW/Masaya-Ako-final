import { MapPin, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/Button";
import { Modal } from "./ui/Modal";

const CONSENT_KEY = "masaya_consent_v1";

export function ConsentGate() {
  const [accepted, setAccepted] = useState(() => localStorage.getItem(CONSENT_KEY) === "true");
  const [locationAck, setLocationAck] = useState(false);
  const [privacyAck, setPrivacyAck] = useState(false);

  if (accepted) return null;

  const canContinue = locationAck && privacyAck;

  return (
    <Modal
      open
      onClose={() => undefined}
      title="Before you drive"
      description="Masaya Ako needs your consent to collect and use data required for core features."
    >
      <div className="consent-panel">
        <article className="consent-item">
          <MapPin size={22} />
          <div>
            <strong>Location while tracking</strong>
            <p>
              When you tap Start Tracking, we collect precise GPS to calculate distance, routes, and
              optional community map presence. Tracking stops when you tap Stop Tracking.
            </p>
          </div>
          <label className="toggle-row">
            <input type="checkbox" checked={locationAck} onChange={(e) => setLocationAck(e.target.checked)} />
          </label>
        </article>

        <article className="consent-item">
          <ShieldCheck size={22} />
          <div>
            <strong>Privacy &amp; account data</strong>
            <p>
              We store your profile, chat, and settings in Supabase when cloud mode is enabled. Read
              our{" "}
              <Link to="/privacy" target="_blank" rel="noreferrer">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link to="/terms" target="_blank" rel="noreferrer">
                Terms of Service
              </Link>
              .
            </p>
          </div>
          <label className="toggle-row">
            <input type="checkbox" checked={privacyAck} onChange={(e) => setPrivacyAck(e.target.checked)} />
          </label>
        </article>

        <Button
          disabled={!canContinue}
          onClick={() => {
            localStorage.setItem(CONSENT_KEY, "true");
            setAccepted(true);
          }}
        >
          I Agree &amp; Continue
        </Button>
      </div>
    </Modal>
  );
}
