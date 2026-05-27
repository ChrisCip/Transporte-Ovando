// Lightweight wrapper that renders Lucide icons by name.
// Lucide UMD exposes icons as ["svg", attrs, [child, ...]] arrays.
// We convert that into an SVG string and inject via dangerouslySetInnerHTML.
function lucideArrayToSvg(node, size, strokeWidth, fill) {
  const [tag, attrs, children] = node;
  const merged = { ...attrs };
  if (tag === "svg") {
    merged.width = size;
    merged.height = size;
    merged["stroke-width"] = strokeWidth;
    if (fill) merged.fill = fill;
  }
  const attrStr = Object.entries(merged)
    .map(([k, v]) => `${k}="${String(v).replace(/"/g, '&quot;')}"`)
    .join(" ");
  let inner = "";
  if (Array.isArray(children)) {
    for (const c of children) inner += lucideArrayToSvg(c, size, strokeWidth, fill);
  }
  return `<${tag} ${attrStr}>${inner}</${tag}>`;
}

const Icon = ({ name, size = 20, strokeWidth = 1.75, fill, className = "", style = {} }) => {
  const svgString = React.useMemo(() => {
    if (!window.lucide) return "";
    const node = window.lucide[name] || (window.lucide.icons && window.lucide.icons[name]);
    if (!node) {
      console.warn("Icon not found:", name);
      return "";
    }
    return lucideArrayToSvg(node, size, strokeWidth, fill);
  }, [name, size, strokeWidth, fill]);

  return (
    <span
      className={"inline-flex items-center justify-center " + className}
      style={{ width: size, height: size, lineHeight: 0, ...style }}
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  );
};

window.Icon = Icon;
