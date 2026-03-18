interface Props {
  tipo: string | null
  nombre: string | null
  url: string | null
}

const getExt = (tipo: string | null, nombre: string | null): string => {
  if (tipo?.includes('pdf')) return 'PDF'
  if (tipo?.includes('presentation') || nombre?.endsWith('.pptx')) return 'PPT'
  if (tipo?.includes('word') || nombre?.endsWith('.docx')) return 'DOC'
  if (tipo?.includes('video')) return 'MP4'
  return 'FILE'
}

export default function FileIcon({ tipo, nombre, url }: Props) {
  if (!url) {
    return (
      <span className="text-[10px] tracking-wide text-gray-300 dark:text-white/20">
        Sin archivo
      </span>
    );
  }

  const ext = getExt(tipo, nombre);

  return (
    <a
      href={url || undefined}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 px-2.5 py-1 border border-zymo-red/40 text-zymo-red text-[10px] font-bold tracking-widest uppercase hover:bg-zymo-red-muted transition-colors"
    >
      <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
        <path d="M8 2v8M5 7l3 3 3-3M3 13h10"
          stroke="#E31E24" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {ext}
    </a>
  );
}