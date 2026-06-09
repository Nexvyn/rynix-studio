import { GeistPixelSquare } from "geist/font/pixel";

export function Specs() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-8 py-28">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          <div>
            <h3 className={`text-sm font-medium text-foreground ${GeistPixelSquare.className}`}>
              // BROWSER_NATIVE
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Runs entirely in WebGL and Canvas 2D. No installation, no backend, no file size limits.
              Everything stays on your device.
            </p>
          </div>
          <div>
            <h3 className={`text-sm font-medium text-foreground ${GeistPixelSquare.className}`}>
              // REAL_TIME
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Every slider, toggle, and option updates the canvas instantly. See your changes as you make them, frame by frame.
            </p>
          </div>
          <div>
            <h3 className={`text-sm font-medium text-foreground ${GeistPixelSquare.className}`}>
              // ANY_FORMAT
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Export as PNG (1×–4× scale), plain text, plain HTML, colored HTML, SVG, animated HTML, or typewriter animation. Copy as React component or embeddable code.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
