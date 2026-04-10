import { motion } from "motion/react";
import { useState } from "react";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";
import GradientButton from "../components/GradientButton";
import { useToast } from "../hooks/useToast";

const TABS = [
  { id: "ai", label: "AI Configuration" },
  { id: "storage", label: "Storage" },
  { id: "integrations", label: "Integrations" },
  { id: "branding", label: "Branding" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function Toggle({
  checked,
  onChange,
}: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all ${
        checked ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-muted"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function SettingRow({
  label,
  description,
  children,
}: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-0">
      <div className="flex-1 mr-4">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState<TabId>("ai");
  const { success } = useToast();

  // AI Config state
  const [maxGen, setMaxGen] = useState(500);
  const [modelQuality, setModelQuality] = useState("high");
  const [contentMod, setContentMod] = useState(true);
  const [nsfwFilter, setNsfwFilter] = useState(true);

  // Storage state
  const [storageLimit, setStorageLimit] = useState(100);
  const [autoDelete, setAutoDelete] = useState(false);
  const [cdnProvider, setCdnProvider] = useState("cloudflare");

  // Integration state
  const [integrations, setIntegrations] = useState({
    instagram: { connected: true, apiKey: "ig_live_aBcDeFgHiJkLmN" },
    facebook: { connected: true, apiKey: "fb_access_xYzAbCdEfGhIjK" },
    twitter: { connected: true, apiKey: "tw_bearer_MnOpQrStUvWxYz" },
    linkedin: { connected: false, apiKey: "" },
  });

  const [companyName, setCompanyName] = useState("FlyBiz Inc.");

  const selectClass =
    "bg-muted border border-border rounded-lg text-sm text-foreground px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring";

  const handleSave = () =>
    success(
      "Settings saved successfully!",
      "Changes will take effect immediately",
    );

  const toggleIntegration = (platform: keyof typeof integrations) => {
    setIntegrations((prev) => ({
      ...prev,
      [platform]: { ...prev[platform], connected: !prev[platform].connected },
    }));
    success(
      `${platform} ${integrations[platform].connected ? "disconnected" : "connected"}!`,
    );
  };

  const platformInfo = [
    {
      key: "instagram" as const,
      name: "Instagram",
      icon: <SiInstagram style={{ color: "#E1306C" }} />,
    },
    {
      key: "facebook" as const,
      name: "Facebook",
      icon: <SiFacebook style={{ color: "#1877F2" }} />,
    },
    {
      key: "twitter" as const,
      name: "Twitter",
      icon: <SiX style={{ color: "#1DA1F2" }} />,
    },
    {
      key: "linkedin" as const,
      name: "LinkedIn",
      icon: <FaLinkedinIn style={{ color: "#0077B5" }} />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5 max-w-3xl"
    >
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            type="button"
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            data-ocid={`settings.${t.id}.tab`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === t.id
                ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white shadow"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border shadow-card">
        {/* AI Configuration */}
        {activeTab === "ai" && (
          <div className="p-5">
            <h3 className="font-display font-semibold text-foreground mb-1">
              AI Configuration
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Control how AI content generation behaves for your platform users.
            </p>
            <SettingRow
              label="Max Generations Per Month"
              description="Maximum AI generations allowed per user per billing cycle"
            >
              <input
                type="number"
                value={maxGen}
                onChange={(e) => setMaxGen(Number(e.target.value))}
                className="w-24 text-right bg-muted border border-border rounded-lg text-sm text-foreground px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="settings.ai.input"
              />
            </SettingRow>
            <SettingRow
              label="Default Model Quality"
              description="Quality preset applied when users don't specify"
            >
              <select
                value={modelQuality}
                onChange={(e) => setModelQuality(e.target.value)}
                className={selectClass}
                data-ocid="settings.ai.select"
              >
                <option value="draft">Draft (fastest)</option>
                <option value="standard">Standard</option>
                <option value="high">High (default)</option>
                <option value="ultra">Ultra (slowest)</option>
              </select>
            </SettingRow>
            <SettingRow
              label="Content Moderation"
              description="Automatically review AI output for policy violations"
            >
              <Toggle checked={contentMod} onChange={setContentMod} />
            </SettingRow>
            <SettingRow
              label="NSFW Filter"
              description="Block explicit or adult content from being generated"
            >
              <Toggle checked={nsfwFilter} onChange={setNsfwFilter} />
            </SettingRow>
          </div>
        )}

        {/* Storage */}
        {activeTab === "storage" && (
          <div className="p-5">
            <h3 className="font-display font-semibold text-foreground mb-1">
              Storage Settings
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Manage how and where your AI-generated content is stored.
            </p>
            <SettingRow
              label="Storage Limit (GB)"
              description="Maximum storage allocated per user"
            >
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={10}
                  max={500}
                  value={storageLimit}
                  onChange={(e) => setStorageLimit(Number(e.target.value))}
                  className="w-32 accent-blue-600"
                />
                <span className="text-sm font-medium text-foreground w-12 text-right">
                  {storageLimit} GB
                </span>
              </div>
            </SettingRow>
            <SettingRow
              label="Auto-Delete Old Content"
              description="Automatically remove content older than 90 days when limit is reached"
            >
              <Toggle checked={autoDelete} onChange={setAutoDelete} />
            </SettingRow>
            <SettingRow
              label="CDN Provider"
              description="Content delivery network for serving media files"
            >
              <select
                value={cdnProvider}
                onChange={(e) => setCdnProvider(e.target.value)}
                className={selectClass}
              >
                <option value="cloudflare">Cloudflare R2</option>
                <option value="aws">Amazon S3</option>
                <option value="gcp">Google Cloud Storage</option>
                <option value="azure">Azure Blob Storage</option>
              </select>
            </SettingRow>
          </div>
        )}

        {/* Integrations */}
        {activeTab === "integrations" && (
          <div className="p-5">
            <h3 className="font-display font-semibold text-foreground mb-1">
              Social Platform Integrations
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Connect social media platforms to enable direct publishing.
            </p>
            <div className="space-y-4">
              {platformInfo.map((p) => {
                const info = integrations[p.key];
                return (
                  <div
                    key={p.key}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl bg-muted/40 border border-border"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-xl">{p.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {p.name}
                        </p>
                        <p
                          className={`text-xs ${info.connected ? "text-emerald-400" : "text-muted-foreground"}`}
                        >
                          {info.connected ? "Connected" : "Not connected"}
                        </p>
                      </div>
                    </div>
                    {info.connected && (
                      <input
                        type="password"
                        value={info.apiKey}
                        readOnly
                        className="flex-1 text-xs bg-muted border border-border rounded-lg px-3 py-2 text-muted-foreground"
                        data-ocid={`settings.${p.key}.input`}
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => toggleIntegration(p.key)}
                      data-ocid={`settings.${p.key}.button`}
                      className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                        info.connected
                          ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20"
                          : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      }`}
                    >
                      {info.connected ? "Disconnect" : "Connect"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Branding */}
        {activeTab === "branding" && (
          <div className="p-5">
            <h3 className="font-display font-semibold text-foreground mb-1">
              Branding Settings
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Customize the look and feel of your platform.
            </p>
            <SettingRow
              label="Company Name"
              description="Display name shown across the platform"
            >
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-48 bg-muted border border-border rounded-lg text-sm text-foreground px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="settings.branding.input"
              />
            </SettingRow>
            <SettingRow
              label="Logo"
              description="Upload your company logo (PNG, SVG recommended)"
            >
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-muted border border-border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                data-ocid="settings.branding.upload_button"
              >
                Upload Logo
              </button>
            </SettingRow>
            <SettingRow
              label="Primary Color"
              description="Brand color used for buttons and accents"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 border border-border" />
                <span className="text-xs font-mono text-muted-foreground">
                  #2563EB → #EC4899
                </span>
              </div>
            </SettingRow>
            <SettingRow
              label="Font Family"
              description="Typography used across the platform"
            >
              <select className={selectClass}>
                <option>Bricolage Grotesque</option>
                <option>Plus Jakarta Sans</option>
                <option>Inter</option>
                <option>Geist</option>
              </select>
            </SettingRow>
          </div>
        )}

        {/* Save Button */}
        <div className="px-5 pb-5">
          <GradientButton onClick={handleSave} data-ocid="settings.save_button">
            Save Changes
          </GradientButton>
        </div>
      </div>
    </motion.div>
  );
}
