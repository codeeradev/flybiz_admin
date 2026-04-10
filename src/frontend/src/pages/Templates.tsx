import { Download, Edit, Star, Upload } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import Badge from "../components/Badge";
import GradientButton from "../components/GradientButton";
import { useToast } from "../hooks/useToast";
import { POSTER_TEMPLATES, VIDEO_TEMPLATES } from "../mockData/templates";

function TemplateCard({
  template,
  idx,
}: { template: (typeof POSTER_TEMPLATES)[0]; idx: number }) {
  const { success } = useToast();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: idx * 0.05 }}
      whileHover={{ y: -3, boxShadow: "0 12px 40px -8px rgba(0,0,0,0.3)" }}
      className="bg-card rounded-xl border border-border overflow-hidden shadow-card"
      data-ocid={`templates.item.${idx + 1}`}
    >
      <div
        className={`aspect-video bg-gradient-to-br ${template.previewColor} relative`}
      >
        {template.isPremium && (
          <span className="absolute top-2 right-2 bg-yellow-500/90 text-black text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Star className="h-3 w-3" />
            Premium
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="font-semibold text-foreground text-sm">
            {template.name}
          </h4>
          <Badge value={template.category} variant="plan" />
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
          <Download className="h-3 w-3" />
          <span>{template.downloads.toLocaleString()} downloads</span>
        </div>
        <button
          type="button"
          onClick={() => success(`Editing "${template.name}"`)}
          data-ocid={`templates.edit_button.${idx + 1}`}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
        >
          <Edit className="h-3 w-3" />
          Edit Template
        </button>
      </div>
    </motion.div>
  );
}

export default function Templates() {
  const { success } = useToast();
  const [, setUploading] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      success("Template uploaded successfully!");
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Poster Templates */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display font-bold text-lg text-foreground">
              Poster Templates
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {POSTER_TEMPLATES.length} templates available
            </p>
          </div>
          <GradientButton
            size="sm"
            onClick={handleUpload}
            data-ocid="templates.upload_button"
          >
            <Upload className="h-3.5 w-3.5" />
            Upload New
          </GradientButton>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {POSTER_TEMPLATES.map((t, i) => (
            <TemplateCard key={t.id} template={t} idx={i} />
          ))}
        </div>
      </section>

      {/* Video Templates */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display font-bold text-lg text-foreground">
              Video Templates
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {VIDEO_TEMPLATES.length} templates available
            </p>
          </div>
          <GradientButton
            size="sm"
            onClick={handleUpload}
            data-ocid="templates.upload_button"
          >
            <Upload className="h-3.5 w-3.5" />
            Upload New
          </GradientButton>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VIDEO_TEMPLATES.map((t, i) => (
            <TemplateCard key={t.id} template={t} idx={i} />
          ))}
        </div>
      </section>
    </motion.div>
  );
}
