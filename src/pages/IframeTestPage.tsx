export function IframeTestPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A1330] p-8">
      <h1 className="font-heading text-brand-h1 text-white mb-4">Iframe Test Page</h1>
      <p className="font-body text-body text-[var(--color-text-muted)] mb-8 text-center max-w-sm">
        This page is used for iframe embedding tests. The main Moment Engine content
        is available at <code className="text-[var(--color-gs-neon)]">/</code>.
      </p>
      <div
        className="w-full max-w-[960px] rounded-brand border overflow-hidden"
        style={{ borderColor: 'var(--color-border)', height: '600px' }}
      >
        <iframe
          src="/"
          title="Moment Engine Preview"
          className="w-full h-full"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  )
}
