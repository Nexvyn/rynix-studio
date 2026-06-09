import { GeistPixelSquare } from "geist/font/pixel";
import { Upload, Sliders, Download } from "lucide-react";

const STEPS = [
  {
    number: "01",
    label: "// UPLOAD",
    icon: Upload,
    title: "Drop your media",
    description:
      "Upload an image, video file, or connect your webcam. Supported formats include JPG, PNG, SVG, MP4, WebM, and MOV.",
  },
  {
    number: "02",
    label: "// ADJUST",
    icon: Sliders,
    title: "Dial in the effect",
    description:
      "Fine-tune every parameter in real time. Switch between modes instantly, combine settings, and preview changes live on the canvas.",
  },
  {
    number: "03",
    label: "// EXPORT",
    icon: Download,
    title: "Export anything",
    description:
      "Save as PNG, TXT, HTML, SVG, animated HTML, or video. Scale up to 4× for high-res output. Copy React components or embeddable HTML with one click.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-t border-border">
      <div className="max-w-6xl mx-auto px-8 py-28">
        <div className="mb-16">
          <span className={`text-xs text-muted-foreground tracking-widest ${GeistPixelSquare.className}`}>
            // WORKFLOW
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-medium tracking-tight text-foreground">
            From media to artwork in seconds
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <span
                    className={`text-4xl font-medium text-border ${GeistPixelSquare.className}`}
                  >
                    {step.number}
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <span className={`text-xs text-muted-foreground/60 tracking-widest ${GeistPixelSquare.className}`}>
                  {step.label}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
