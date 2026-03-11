import { AnimatePresence, motion } from 'framer-motion';

type ScannerOverlayProps = {
  active: boolean;
  durationMs?: number;
};

export function ScannerOverlay({
  active,
  durationMs = 3000,
}: ScannerOverlayProps) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="scanner-overlay"
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0 } }}
          exit={{ opacity: 1, transition: { duration: 0 } }}
        >
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: '28%',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(0,204,255,0.2) 32%, rgba(0,204,255,0.55) 50%, rgba(0,204,255,0.2) 68%, transparent 100%)',
              boxShadow: '0 0 36px rgba(0,204,255,0.35)',
            }}
            initial={{ left: '-28%' }}
            animate={{
              left: ['-28%', '100%'],
              transition: {
                duration: durationMs / 1000,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'reverse',
              },
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
