/**
 * Settings: About Tab.
 */
import { html } from "lit";
import type { AppViewState } from "../../app-view-state.ts";
import { t } from "../../i18n.ts";
import * as ipc from "../../data/ipc-bridge.ts";

const s = {
  oneClawVersion: "",
  openClawVersion: "",
  initialized: false,
};

async function init(state: AppViewState) {
  if (s.initialized) return;
  s.initialized = true;
  try {
    const about = await ipc.settingsGetAboutInfo();
    s.oneClawVersion = about.oneClawVersion ?? "";
    s.openClawVersion = about.openClawVersion ?? "";
    state.requestUpdate();
  } catch {}
}

export function cleanupAboutTab() {
  s.initialized = false;
}

export function renderTabAbout(state: AppViewState) {
  if (!s.initialized) init(state);

  return html`
    <div class="oc-settings__section">
      <h2 class="oc-settings__section-title">${t("settings.nav.about")}</h2>

      <div class="oc-settings__card">
        <div class="oc-settings__card-title">${t("settings.about.version")}</div>
        <div style="font-size:13px;display:flex;flex-direction:column;gap:6px">
          <div><strong>${t("settings.about.oneclaw")}</strong>: ${s.oneClawVersion}</div>
          <div><strong>${t("settings.about.openclaw")}</strong>: ${s.openClawVersion}</div>
        </div>
      </div>
    </div>
  `;
}
