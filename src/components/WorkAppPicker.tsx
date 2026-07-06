import { WORK_APPS } from "../config/constants";
import { useProfileStore } from "../stores/useProfileStore";
import type { WorkAppId } from "../types";
import { Modal } from "./ui/Modal";

interface WorkAppPickerProps {
  open: boolean;
  onClose: () => void;
}

export function WorkAppPicker({ open, onClose }: WorkAppPickerProps) {
  const activeApp = useProfileStore((state) => state.activeApp);
  const setActiveApp = useProfileStore((state) => state.setActiveApp);

  const selectApp = (id: WorkAppId) => {
    setActiveApp(id);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Which app are you working for?"
      description="Tap to select your current work platform"
    >
      <div className="app-choice-grid">
        {WORK_APPS.map((app) => (
          <button
            className={`app-choice ${activeApp === app.id ? "selected" : ""}`}
            key={app.id}
            onClick={() => selectApp(app.id)}
          >
            <span>{app.logo}</span>
            <strong>{app.name}</strong>
          </button>
        ))}
      </div>
    </Modal>
  );
}
