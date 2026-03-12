import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "../../hooks/useReducedMotionSafe";

type MomentDetails = {
  trigger: string;
  description: string;
};

type ThematicBundle = {
  label: string;
  trigger: string;
  description: string;
};

type MomentsAccordionProps = {
  inGameLabels: string[];
  inSeasonLabels: string[];
  thematicBundle: ThematicBundle;
  detailsByLabel: Record<string, MomentDetails>;
  modalTitlePrefix?: string;
};

const MOMENTS_FORM_IFRAME_SRC = "https://digital.geniussports.com/l/822433/2026-03-11/tzl41f";

function toTitleCase(value: string) {
  return value
    .toLowerCase()
    .split(/\s+/)
    .map((word) => (word ? `${word[0].toUpperCase()}${word.slice(1)}` : ""))
    .join(" ");
}

function PlusMinusIcon({ isOpen }: { isOpen: boolean }) {
  const iconFillClass = isOpen ? "text-[var(--color-lightGrey)]" : "text-[#18C971]";
  const iconStroke = isOpen ? "#0d1226" : "#ffffff";

  return (
    <span className="block h-6 w-6" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <rect width="24" height="24" rx="12" fill="currentColor" className={iconFillClass} />
        <path d="M7.5 12h9" stroke={iconStroke} strokeWidth="1.8" strokeLinecap="round" />
        {!isOpen ? <path d="M12 7.5v9" stroke={iconStroke} strokeWidth="1.8" strokeLinecap="round" /> : null}
      </svg>
    </span>
  );
}

function MomentsAccordion({
  inGameLabels,
  inSeasonLabels,
  thematicBundle,
  detailsByLabel,
  modalTitlePrefix = "March Madness Moments"
}: MomentsAccordionProps) {
  const thematicBundleLabel = thematicBundle.label;
  const reducedMotion = useReducedMotionSafe();
  const [mobileOpenId, setMobileOpenId] = useState<string | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [activeModalLabel, setActiveModalLabel] = useState<string | null>(null);
  const mobileItemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const mobileExtraWrapperRef = useRef<HTMLDivElement | null>(null);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [desktopOpenId, setDesktopOpenId] = useState<string | null>(null);
  const labelColumns = [inGameLabels, inSeasonLabels];

  useEffect(() => {
    if (typeof window === "undefined" || !mobileOpenId) {
      return;
    }

    const isMobileViewport = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobileViewport) {
      return;
    }

    const openItemNode = mobileItemRefs.current[mobileOpenId];
    if (!openItemNode) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          setMobileOpenId((current) => (current === mobileOpenId ? null : current));
        }
      },
      { threshold: 0 }
    );

    observer.observe(openItemNode);
    return () => observer.disconnect();
  }, [mobileOpenId]);

  useEffect(() => {
    if (typeof window === "undefined" || !isMobileExpanded) {
      return;
    }

    const isMobileViewport = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobileViewport) {
      return;
    }

    const extraWrapperNode = mobileExtraWrapperRef.current;
    if (!extraWrapperNode) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          setIsMobileExpanded(false);
          setMobileOpenId((current) =>
            current && inSeasonLabels.includes(current) ? null : current
          );
        }
      },
      { threshold: 0 }
    );

    observer.observe(extraWrapperNode);
    return () => observer.disconnect();
      }, [isMobileExpanded, inSeasonLabels]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined" || !isFormModalOpen) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFormModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFormModalOpen]);

  const openFormModal = (label: string) => {
    setActiveModalLabel(label);
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
  };

  const modalTitle = activeModalLabel
    ? `${modalTitlePrefix}: ${toTitleCase(activeModalLabel)}`
    : modalTitlePrefix;

  const columnHeaders = ["In-Game", "In-Season"];

  return (
    <>
      <div className="flex flex-col gap-4 md:hidden">
        <div className="grid grid-cols-1 gap-2">
          {inGameLabels.map((label, index) => {
            const isOpen = mobileOpenId === label;
            const panelId = `mobile-moment-panel-${index}`;
            const details = detailsByLabel[label] ?? {
              trigger: "Moment trigger details for this selection.",
              description:
                "Moment description placeholder explaining how this in-game event connects your message to fan emotion."
            };

            return (
              <div
                key={label}
                ref={(node) => {
                  mobileItemRefs.current[label] = node;
                }}
                className="overflow-hidden rounded-2xl bg-white"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setMobileOpenId((current) => (current === label ? null : label))}
                  className="flex w-full flex-col px-5 py-4 text-left text-sm font-medium text-slate-900"
                >
                  <span className="flex items-center gap-3">
                    <PlusMinusIcon isOpen={isOpen} />
                    <h3 className="m-0 text-left text-18 text-slate-900">
                      {toTitleCase(label)}
                    </h3>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={panelId}
                      key={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: reducedMotion ? 0.12 : 0.22,
                        ease: "easeOut"
                      }}
                      className="overflow-hidden border-t border-[var(--color-lightGrey)] bg-white"
                    >
                      <div className="space-y-2 px-5 pb-4 pt-3 text-left">
                        <p className="font-body text-base text-slate-900">
                          <span className="font-medium">Trigger: </span>
                          {details.trigger}
                        </p>
                        <p className="font-body text-base text-slate-900">
                          <span className="font-medium">Description: </span>
                          {details.description}
                        </p>
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => openFormModal(label)}
                            className="inline-flex items-center justify-center rounded-md bg-[#1D26FF] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#131bdb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D26FF]/70"
                          >
                            Learn more
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
          {inSeasonLabels.length > 0 ? (
            <button
              type="button"
              aria-expanded={isMobileExpanded}
              onClick={() => setIsMobileExpanded((current) => !current)}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left text-base font-medium text-slate-700 shadow-[0_6px_16px_rgba(15,23,42,0.08)]"
            >
              <span className="flex items-center justify-between">
                <span>{isMobileExpanded ? "Show less" : "And more"}</span>
                <span aria-hidden="true" className="text-slate-500">
                  ...
                </span>
              </span>
            </button>
          ) : null}

          <AnimatePresence initial={false}>
            {isMobileExpanded ? (
              <motion.div
                ref={mobileExtraWrapperRef}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: reducedMotion ? 0.12 : 0.22,
                  ease: "easeOut"
                }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 gap-2 pt-1">
                  {inSeasonLabels.map((label, index) => {
                    const isOpen = mobileOpenId === label;
                    const panelId = `mobile-moment-panel-extra-${index}`;
                    const details = detailsByLabel[label] ?? {
                      trigger: "Moment trigger details for this selection.",
                      description:
                        "Moment description placeholder explaining how this in-game event connects your message to fan emotion."
                    };

                    return (
                      <div
                        key={label}
                        ref={(node) => {
                          mobileItemRefs.current[label] = node;
                        }}
                        className="overflow-hidden rounded-2xl bg-white"
                      >
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => setMobileOpenId((current) => (current === label ? null : label))}
                          className="flex w-full flex-col px-5 py-4 text-left text-sm font-medium text-slate-900"
                        >
                          <span className="flex items-center gap-3">
                            <PlusMinusIcon isOpen={isOpen} />
                            <h3 className="m-0 text-left text-18 text-slate-900">
                              {toTitleCase(label)}
                            </h3>
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen ? (
                            <motion.div
                              id={panelId}
                              key={panelId}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: reducedMotion ? 0.12 : 0.22,
                                ease: "easeOut"
                              }}
                              className="overflow-hidden border-t border-[var(--color-lightGrey)] bg-white"
                            >
                              <div className="space-y-2 px-5 pb-4 pt-3 text-left">
                                <p className="font-body text-base text-slate-900">
                                  <span className="font-medium">Trigger: </span>
                                  {details.trigger}
                                </p>
                                <p className="font-body text-base text-slate-900">
                                  <span className="font-medium">Description: </span>
                                  {details.description}
                                </p>
                                <div className="pt-2">
                                  <button
                                    type="button"
                                    onClick={() => openFormModal(label)}
                                    className="inline-flex items-center justify-center rounded-md bg-[#1D26FF] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#131bdb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D26FF]/70"
                                  >
                                    Learn more
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div
          ref={(node) => {
            mobileItemRefs.current[thematicBundleLabel] = node;
          }}
          className="mt-4 overflow-hidden rounded-2xl bg-[#f0f4ff]"
        >
          <button
            type="button"
            aria-expanded={mobileOpenId === thematicBundleLabel}
            aria-controls="mobile-thematic-bundle-panel"
            onClick={() => setMobileOpenId((current) => (current === thematicBundleLabel ? null : thematicBundleLabel))}
            className="flex w-full flex-col px-5 py-4 text-left text-sm font-medium text-slate-900"
          >
            <span className="flex items-center gap-3">
              <PlusMinusIcon isOpen={mobileOpenId === thematicBundleLabel} />
              <h3 className="m-0 text-left text-18 text-navy">
                {toTitleCase(thematicBundleLabel)}
              </h3>
            </span>
          </button>
          <AnimatePresence initial={false}>
            {mobileOpenId === thematicBundleLabel ? (
              <motion.div
                id="mobile-thematic-bundle-panel"
                key="mobile-thematic-bundle-panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: reducedMotion ? 0.12 : 0.22,
                  ease: "easeOut"
                }}
                className="overflow-hidden bg-[#f0f4ff]"
              >
                <div className="space-y-2 px-5 pb-4 pt-3 text-left">
                  <p className="font-body text-base text-slate-900">
                    <span className="font-medium">What it is: </span>
                    {thematicBundle.trigger}
                  </p>
                  <p className="font-body text-base text-slate-900">
                    <span className="font-medium">Description: </span>
                    {thematicBundle.description}
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => openFormModal(thematicBundleLabel)}
                      className="inline-flex items-center justify-center rounded-md bg-[#1D26FF] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#131bdb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D26FF]/70"
                    >
                      Learn more
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <div className="hidden flex-col gap-4 md:flex">
        <div className="flex flex-row items-start gap-8">
          {labelColumns.map((columnLabels, columnIndex) => (
            <div key={`column-${columnIndex}`} className="mt-0 flex w-full flex-col">
              <h4 className="mb-2 text-18 font-medium text-slate-700 md:mb-3">
                {columnHeaders[columnIndex]}
              </h4>
              <div className="flex flex-col overflow-hidden rounded-2xl bg-white">
              <div className="flex flex-col divide-y divide-[var(--color-lightGrey)]">
              {columnLabels.map((label, index) => {
              const isOpen = desktopOpenId === label;
              const panelId = `moment-panel-${columnIndex}-${index}`;
              const details = detailsByLabel[label] ?? {
                trigger: "Moment trigger details for this selection.",
                description:
                  "Moment description placeholder explaining how this in-game event connects your message to fan emotion."
              };

              return (
                <div
                  key={label}
                  className="overflow-hidden bg-white"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() =>
                      setDesktopOpenId((current) => (current === label ? null : label))
                    }
                    className="flex w-full flex-col bg-white px-5 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/80"
                  >
                    <span className="flex items-center gap-3">
                      <PlusMinusIcon isOpen={isOpen} />
                      <h3 className="m-0 text-left text-18 text-slate-900">
                        {toTitleCase(label)}
                      </h3>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={panelId}
                        key={panelId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: reducedMotion ? 0.12 : 0.22,
                          ease: "easeOut"
                        }}
                        className="overflow-hidden bg-white"
                      >
                        <div className="mx-auto max-w-3xl space-y-2 px-6 pb-4 pt-3 text-left">
                          <p className="font-body text-base text-slate-900">
                            <span className="font-medium">Trigger: </span>
                            {details.trigger}
                          </p>
                          <p className="font-body text-base text-slate-900">
                            <span className="font-medium">Description: </span>
                            {details.description}
                          </p>
                          <div className="pt-2">
                            <button
                              type="button"
                              onClick={() => openFormModal(label)}
                              className="inline-flex items-center justify-center rounded-md bg-[#1D26FF] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#131bdb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D26FF]/70"
                            >
                              Learn more
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
              </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 w-full overflow-hidden rounded-2xl bg-[#f0f4ff] md:mt-6">
          <button
            type="button"
            aria-expanded={desktopOpenId === thematicBundleLabel}
            aria-controls="desktop-thematic-bundle-panel"
            onClick={() =>
              setDesktopOpenId((current) => (current === thematicBundleLabel ? null : thematicBundleLabel))
            }
            className="flex w-full flex-col px-5 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/80"
          >
            <span className="flex items-center gap-3">
              <PlusMinusIcon isOpen={desktopOpenId === thematicBundleLabel} />
              <h3 className="m-0 text-left text-18 text-navy">
                {toTitleCase(thematicBundleLabel)}
              </h3>
            </span>
          </button>
          <AnimatePresence initial={false}>
            {desktopOpenId === thematicBundleLabel ? (
              <motion.div
                id="desktop-thematic-bundle-panel"
                key="desktop-thematic-bundle-panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: reducedMotion ? 0.12 : 0.22,
                  ease: "easeOut"
                }}
                className="overflow-hidden bg-[#f0f4ff]"
              >
                <div className="mx-auto max-w-3xl space-y-2 px-6 pb-4 pt-3 text-left">
                  <p className="font-body text-base text-slate-900">
                    <span className="font-medium">What it is: </span>
                    {thematicBundle.trigger}
                  </p>
                  <p className="font-body text-base text-slate-900">
                    <span className="font-medium">Description: </span>
                    {thematicBundle.description}
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => openFormModal(thematicBundleLabel)}
                      className="inline-flex items-center justify-center rounded-md bg-[#1D26FF] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#131bdb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D26FF]/70"
                    >
                      Learn more
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {isFormModalOpen ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(13,18,38,0.62)] px-4 py-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="moments-form-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.1 : 0.2, ease: "easeOut" }}
            onClick={closeFormModal}
          >
            <motion.div
              className="w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-[0_20px_60px_rgba(2,6,23,0.35)]"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: reducedMotion ? 0.1 : 0.2, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between border-b border-[var(--color-lightGrey)] px-4 py-3 md:px-6 md:py-4">
                <h3 id="moments-form-modal-title" className="m-0 pr-4 font-heading text-brand-h3 text-slate-900">
                  {modalTitle}
                </h3>
                <button
                  type="button"
                  onClick={closeFormModal}
                  className="rounded-md px-2 py-1 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D26FF]/70"
                >
                  Close
                </button>
              </div>
              <div className="px-4 pb-4 pt-4 md:px-6 md:pb-6">
                <iframe
                  src={MOMENTS_FORM_IFRAME_SRC}
                  width="100%"
                  height="500"
                  title="Genius Sports moments form"
                  frameBorder={0}
                  allowTransparency
                  style={{ border: 0 }}
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default MomentsAccordion;
