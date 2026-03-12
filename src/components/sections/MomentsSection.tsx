import { useMemo, useState } from 'react'
import GeniusStripeRail from '../ui/GeniusStripeRail'
import MomentsAccordion from '../ui/MomentsAccordion'
import type { MomentEngineContent } from '../../content/momentEngine'
import type { MarchMadnessMomentsContent } from '../../content/marchMadnessMoments'

type MomentsSectionProps = {
  content: MomentEngineContent['sportsMoments']
  marchMadnessMoments: MarchMadnessMomentsContent['moments']
  marchMadnessAudiences: MarchMadnessMomentsContent['audiences']
}

const highlightedPhrases = ['Genius Moments', 'Fan Graph'] as const
const stepTitleClassName = 'font-heading text-brand-h3 font-light text-navy'

const marchMadnessMomentDetailsByLabel: Record<string, { trigger: string; description: string }> = {
  'LATE GAME RALLY': {
    trigger: 'Trailing team closing the gap late in the game',
    description:
      'Activates when a trailing team starts mounting a serious late push, delivering high-attention moments filled with tension, hope, and rising excitement.',
  },
  'DOWN TO THE WIRE': {
    trigger: 'Between 45% and 55% win probability within last 10 minutes',
    description:
      'Own the most intense moments of the game. This package activates during tight contests where the outcome is uncertain, capturing peak fan attention as every possession matters.',
  },
  'BUZZER BEATER WIN': {
    trigger: 'Points scored to win in final 10 seconds',
    description:
      'Own the most iconic moment in sports. Activates instantly when a last-second shot wins the game, aligning brands with unforgettable, viral, highlight-worthy moments.',
  },
  ELIMINATION: {
    trigger: 'Team loses and is eliminated',
    description:
      'Reach fans during emotional turning points as seasons come to an end. This package captures moments of reflection, loyalty, and heightened engagement following elimination games.',
  },
  UPSET: {
    trigger: 'Lower seed beats higher seed',
    description:
      'Align with the thrill of the unexpected. Activates when underdogs take down favorites, generating national attention, conversation, and strong emotional reactions.',
  },
  'CINDERELLA STORY': {
    trigger: '10 seed or lower advances',
    description:
      'Follow the magic of underdog runs. Activates as unexpected teams continue advancing, capturing widespread fan support, optimism, and tournament storytelling.',
  },
  'ELITE 8': {
    trigger: 'Reach fans of Elite 8 teams',
    description:
      'Engage deeply invested audiences as teams push toward the Final Four. Delivers premium reach during one of the most competitive stages of the tournament.',
  },
  'FINAL FOUR': {
    trigger: 'Reach fans of Final Four teams',
    description:
      'Own the spotlight moments. Activates during the week of the Final Four when attention peaks and the stakes are highest, delivering massive engagement and national scale.',
  },
  CHAMPIONSHIP: {
    trigger: 'Reach fans of teams in Championship game',
    description:
      'Align with the biggest stage. Activates around the championship matchup, capturing peak viewership, emotion, and fan attention across the entire tournament.',
  },
  'HERO GAME': {
    trigger: 'Double-double, triple-double, 20+ points, 10+ rebounds, 5+ threes, 3+ steals',
    description:
      'Align with standout player performances. Activates when athletes deliver exceptional stat lines, capturing moments of greatness, highlight-worthy plays, and fan admiration.',
  },
}

function renderHighlightedIntro(text: string) {
  const segments = text.split(new RegExp(`(${highlightedPhrases.join('|')})`, 'g'))

  return segments.map((segment, index) =>
    highlightedPhrases.includes(segment as (typeof highlightedPhrases)[number]) ? (
      <strong key={`${segment}-${index}`} className="font-medium text-slate-900">
        {segment}
      </strong>
    ) : (
      <span key={`${segment}-${index}`}>{segment}</span>
    )
  )
}

function toUpperLabels(values: string[]) {
  return values.map((value) => value.toUpperCase())
}

function buildFallbackDetails(
  sport: string,
  labels: string[]
): Record<string, { trigger: string; description: string }> {
  return labels.reduce<Record<string, { trigger: string; description: string }>>((acc, label) => {
    acc[label] = {
      trigger: `${sport} event signal: ${label.toLowerCase()}`,
      description: `Activates when ${sport} games hit a ${label.toLowerCase()} scenario, so messaging can match fan emotion in real time.`,
    }
    return acc
  }, {})
}

function MomentsSection({
  content,
  marchMadnessMoments,
  marchMadnessAudiences,
}: MomentsSectionProps) {
  const [activeSportIndex, setActiveSportIndex] = useState(0)
  const [hoveredStepThreeCard, setHoveredStepThreeCard] = useState<string | null>(null)

  const activePlan = content.plans[activeSportIndex] ?? content.plans[0]
  if (!activePlan) {
    return null
  }
  const isMarchMadness = activePlan.sport === 'March Madness'
  const activeLabels = isMarchMadness
    ? marchMadnessMoments.labels
    : toUpperLabels(activePlan.moments)
  const activeDetailsByLabel = useMemo(
    () =>
      isMarchMadness
        ? marchMadnessMomentDetailsByLabel
        : buildFallbackDetails(activePlan.sport, activeLabels),
    [activeLabels, activePlan.sport, isMarchMadness]
  )
  const stepOneTitle = content.stepOneTitle
  const stepOneIntro = isMarchMadness
    ? 'Select the March Madness moments you want to align your brand with.'
    : `Select the key ${activePlan.sport} moments you want to align your brand with.`

  return (
    <section id="moments" className="scroll-mt-24 py-24">
      <div className="section-shell">
        <div className="mb-8 px-2 py-2 md:px-0">
          <h2 className="section-title">{content.headline}</h2>
          <p className="section-copy mt-4 max-w-3xl">{content.description}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {content.plans.map((plan, index) => {
              const isActive = index === activeSportIndex
              return (
                <button
                  key={plan.sport}
                  type="button"
                  onClick={() => setActiveSportIndex(index)}
                  className="rounded-full border px-4 py-2 font-body text-sm transition-colors"
                  style={{
                    borderColor: isActive ? 'var(--color-gs-accent-500)' : 'var(--color-lightGrey)',
                    backgroundColor: isActive ? 'rgba(0,17,225,0.08)' : '#ffffff',
                    color: isActive ? 'var(--color-gs-accent-500)' : 'var(--color-text-muted)',
                  }}
                >
                  {plan.sport}
                </button>
              )
            })}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gs-surface">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#f3f4f6] via-[#f3f4f6] to-transparent" />
            <GeniusStripeRail
              theme="blue"
              className="absolute inset-y-0 right-0 hidden lg:block lg:w-[26%] lg:translate-x-8 xl:w-[38%] xl:translate-x-10"
              dimmed
            />
          </div>

          <div className="relative z-10 px-8 pb-8 pt-4 md:px-10 md:pb-10 md:pt-6">
            <h2 className={stepTitleClassName}>{stepOneTitle}</h2>
            <div className="mt-4 max-w-3xl space-y-3">
              <p className="m-0 font-body text-sm leading-[1.45] text-[var(--color-text-muted)] md:text-base">
                {renderHighlightedIntro(stepOneIntro)}
              </p>
            </div>
          </div>

          <div className="relative z-10 px-8 pb-8 md:px-10 md:pb-10">
            <MomentsAccordion
              labels={activeLabels}
              detailsByLabel={activeDetailsByLabel}
              modalTitlePrefix={`${activePlan.sport} Moments`}
            />
          </div>
        </div>

        <article className="relative mt-8 overflow-hidden rounded-2xl bg-gs-surface">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#f8f9fb] via-[#f8f9fb] to-transparent" />
            <GeniusStripeRail
              theme="blue"
              className="absolute inset-y-0 right-0 hidden lg:block lg:w-[45%]"
              dimmed
            />
          </div>

          <div className="relative z-10 grid gap-8 px-8 py-8 md:px-10 md:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)] lg:items-start">
            <div>
              <h3 className={stepTitleClassName}>{marchMadnessAudiences.header}</h3>
              {marchMadnessAudiences.subtitle ? (
                <p className="mt-3 max-w-2xl font-body text-sm leading-[1.45] text-[var(--color-text-muted)] md:text-base">
                  {marchMadnessAudiences.subtitle}
                </p>
              ) : null}
              <h4 className="mt-7 font-heading text-lg text-navy md:text-xl">
                {isMarchMadness
                  ? (marchMadnessAudiences.leftHeader ?? content.stepTwoTitle)
                  : `Popular ${activePlan.sport} Audiences`}
              </h4>
              <ul className="mt-3 space-y-2.5">
                {(isMarchMadness
                  ? marchMadnessAudiences.leftList
                  : activePlan.audiences
                ).map((audience) => (
                  <li
                    key={audience}
                    className="flex items-start gap-2.5 font-body text-sm leading-[1.45] tracking-[-0.01125em] text-[var(--color-text-muted)] md:text-base"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.62em] h-2 w-2 flex-none rounded-full bg-[var(--color-gs-accent-500)]"
                    />
                    <span>{audience}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-2 self-start rounded-xl bg-white p-6 shadow-[0_8px_28px_rgba(13,18,38,0.08)] md:p-7 lg:mt-12 lg:self-end">
              <h4 className="font-heading text-lg text-navy md:text-xl">{marchMadnessAudiences.rightHeader}</h4>
              <ul className="mt-3 space-y-2.5">
                {marchMadnessAudiences.rightList.map((segment) => (
                  <li
                    key={segment}
                    className="flex items-start gap-2.5 font-body text-sm leading-[1.45] tracking-[-0.01125em] text-[var(--color-text-muted)] md:text-base"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.62em] h-2 w-2 flex-none rounded-full bg-[var(--color-gs-accent-500)]"
                    />
                    <span>{segment}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>

        <article className="relative mt-8 overflow-hidden rounded-2xl bg-gs-surface">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#f8f9fb] via-[#f8f9fb] to-transparent" />
            <GeniusStripeRail
              theme="blue"
              className="absolute inset-y-0 right-0 hidden lg:block lg:w-[36%]"
              dimmed
            />
          </div>

          <div className="relative z-10 p-8 md:p-10">
            <h3 className={stepTitleClassName}>{content.stepThreeTitle}</h3>
            <p className="mt-3 max-w-3xl whitespace-pre-line font-body text-sm leading-[1.45] text-[var(--color-text-muted)] md:text-base">
              {content.stepThreeSubhead}
            </p>
            <div className="mt-5">
              <div className="flex justify-end">
                <span className="rounded-md border border-[#c7d9f8] bg-white px-3 py-1 font-body text-[11px] text-[var(--color-text-muted)] md:text-xs">
                  Automatic • Premium • Audience-led
                </span>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                {content.stepThreeCards.map((card) => {
                  const isDimmed =
                    hoveredStepThreeCard !== null && hoveredStepThreeCard !== card.step
                  return (
                    <article
                      key={card.step}
                      onMouseEnter={() => setHoveredStepThreeCard(card.step)}
                      onMouseLeave={() => setHoveredStepThreeCard(null)}
                      className={`rounded-lg border border-[#2f64be] bg-[#0a2f73] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-[opacity,filter,transform] duration-200 ${
                        isDimmed
                          ? 'opacity-100 brightness-[0.58] saturate-[0.55] contrast-[0.88]'
                          : 'opacity-100 brightness-100 saturate-100 contrast-100'
                      } ${hoveredStepThreeCard === card.step ? '-translate-y-0.5' : ''}`}
                    >
                    <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-white/35 px-2 font-body text-[11px] font-semibold text-white/95">
                      {card.step}
                    </span>
                    <h4 className="mt-3 whitespace-pre-line font-heading text-base font-light leading-[1.06] text-white md:min-h-[2.12em] md:text-lg">
                      {card.title}
                    </h4>
                    <p className="mt-2 font-body text-sm leading-[1.45] text-[#bfd4ff] md:min-h-[2.9em]">
                      {card.description}
                    </p>
                    <span className="mt-4 inline-flex rounded-sm border border-[#4b7fd5] bg-[#173f91] px-2 py-1 font-body text-[11px] text-[#d2e3ff]">
                      {card.tag}
                    </span>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export default MomentsSection
