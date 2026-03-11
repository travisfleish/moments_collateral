import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CINEMATIC_ACTIVATING_HOLD_MS, CINEMATIC_ACTIVATING_SCROLL_MS } from '../../tokens'

type AnimationMode = 'node-fade' | 'graph-build'

interface AnimatedFanCloudProps {
  animate: boolean
  reducedMotion?: boolean
  className?: string
  alt?: string
  mode?: AnimationMode
  replayToken?: number
}

const SVG_URL = '/fan-cloud.svg'
const SVG_VIEWBOX_WIDTH = 1200
const SVG_VIEWBOX_HEIGHT = 675
const NODE_SELECTOR = 'path.cls-6, path.cls-18'
const BRANCH_SELECTOR = '.cls-2, .cls-3'
const ATTRIBUTE_SELECTOR = `${NODE_SELECTOR}, text.cls-5, text.cls-7, text.cls-8, text.cls-10, text.cls-11, text.cls-12, text.cls-13, text.cls-14, text.cls-15, text.cls-16, text.cls-17, path.cls-19, path.cls-20, path.cls-21, path.cls-22, path.cls-23, path.cls-24, path.cls-25, path.cls-26, path.cls-27, path.cls-28, path.cls-32, path.cls-39, path.cls-40, path.cls-41, path.cls-47, path.cls-54, image`
const CENTER_INFO_TEXT_CLASSNAMES = new Set(['cls-7', 'cls-10', 'cls-11'])
const CENTER_INFO_REGION = { minX: 520, maxX: 690, minY: 360, maxY: 520 }
const CENTER_PHOTO_REGION = { minX: 500, maxX: 700, minY: 180, maxY: 420 }

function getElementCenter(element: SVGElement): { x: number; y: number } | null {
  try {
    const box = (element as unknown as SVGGraphicsElement).getBBox()
    return { x: box.x + box.width / 2, y: box.y + box.height / 2 }
  } catch {
    return null
  }
}

function isWithinRegion(
  point: { x: number; y: number } | null,
  region: { minX: number; maxX: number; minY: number; maxY: number }
) {
  if (!point) return false
  return (
    point.x >= region.minX &&
    point.x <= region.maxX &&
    point.y >= region.minY &&
    point.y <= region.maxY
  )
}

function isCenterStaticAttribute(attribute: SVGElement) {
  if (
    attribute.tagName.toLowerCase() === 'text' &&
    Array.from(CENTER_INFO_TEXT_CLASSNAMES).some((className) => attribute.classList.contains(className))
  ) {
    return true
  }

  if (attribute.tagName.toLowerCase() === 'image') {
    const width = Number(attribute.getAttribute('width') ?? 0)
    const height = Number(attribute.getAttribute('height') ?? 0)
    const isPortraitSource = width >= 2000 && height >= 2000
    return isPortraitSource && isWithinRegion(getElementCenter(attribute), CENTER_PHOTO_REGION)
  }

  if (
    (attribute.classList.contains('cls-6') || attribute.classList.contains('cls-18')) &&
    isWithinRegion(getElementCenter(attribute), CENTER_INFO_REGION)
  ) {
    return true
  }

  return false
}

function getNearestBranchIndex(
  attributeCenter: { x: number; y: number } | null,
  branchCenters: Array<{ x: number; y: number } | null>
) {
  if (!attributeCenter || !branchCenters.length) {
    return -1
  }

  let nearestIndex = -1
  let nearestDistance = Number.POSITIVE_INFINITY

  branchCenters.forEach((branchCenter, index) => {
    if (!branchCenter) {
      return
    }

    const dx = attributeCenter.x - branchCenter.x
    const dy = attributeCenter.y - branchCenter.y
    const distance = dx * dx + dy * dy

    if (distance < nearestDistance) {
      nearestDistance = distance
      nearestIndex = index
    }
  })

  return nearestIndex
}

export function AnimatedFanCloud({
  animate,
  reducedMotion = false,
  className,
  alt,
  mode = 'node-fade',
  replayToken = 0,
}: AnimatedFanCloudProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [svgMarkup, setSvgMarkup] = useState<string>('')

  useEffect(() => {
    let isMounted = true

    fetch(SVG_URL)
      .then((response) => response.text())
      .then((markup) => {
        if (isMounted) {
          setSvgMarkup(markup)
        }
      })
      .catch(() => {
        // Keep silent in UI; fallback state is just an empty container.
      })

    return () => {
      isMounted = false
    }
  }, [])

  useLayoutEffect(() => {
    if (!svgMarkup || !containerRef.current) {
      return
    }

    const container = containerRef.current
    const nodes = Array.from(container.querySelectorAll<SVGElement>(NODE_SELECTOR))
    const branches = Array.from(container.querySelectorAll<SVGElement>(BRANCH_SELECTOR))
    const attributes = Array.from(container.querySelectorAll<SVGElement>(ATTRIBUTE_SELECTOR))

    if (!nodes.length && !branches.length && !attributes.length) {
      return
    }

    const timers: number[] = []

    const clearTimers = () => {
      timers.forEach((timerId) => window.clearTimeout(timerId))
    }

    const resetNodes = () => {
      nodes.forEach((node) => {
        node.style.opacity = '0'
        node.style.transitionProperty = 'opacity'
        node.style.transitionDuration = '0ms'
        node.style.transitionTimingFunction = 'ease-out'
        node.style.transitionDelay = '0ms'
      })
    }

    const revealNodes = () => {
      nodes.forEach((node, index) => {
        node.style.transitionDuration = '320ms'
        node.style.transitionDelay = `${index * 30}ms`
        node.style.opacity = '1'
      })
    }

    const resetGraphBuild = () => {
      branches.forEach((branch) => {
        branch.style.opacity = '0'
        branch.style.transitionProperty = 'opacity'
        branch.style.transitionDuration = '0ms'
        branch.style.transitionTimingFunction = 'ease-out'
        branch.style.transitionDelay = '0ms'
      })

      attributes.forEach((attribute) => {
        if (!isCenterStaticAttribute(attribute)) {
          attribute.style.opacity = '0'
        } else {
          attribute.style.opacity = '1'
        }
        attribute.style.transitionProperty = 'opacity'
        attribute.style.transitionDuration = '0ms'
        attribute.style.transitionTimingFunction = 'ease-out'
        attribute.style.transitionDelay = '0ms'
      })
    }

    const revealGraphBuild = () => {
      const overlayTotalMs =
        CINEMATIC_ACTIVATING_SCROLL_MS + CINEMATIC_ACTIVATING_HOLD_MS
      const finalSettleLeadMs = 260
      const targetFinalAttributeCompleteMs = Math.max(0, overlayTotalMs - finalSettleLeadMs)
      const branchFadeMs = 1100
      const attributeFadeMs = 1320
      const attributeLeadMs = 140
      const branchDelayStepMs =
        branches.length > 1
          ? Math.max(
              120,
              Math.round(
                (targetFinalAttributeCompleteMs - attributeFadeMs + attributeLeadMs) /
                  (branches.length - 1)
              )
            )
          : 0
      const branchCenters = branches.map((branch) => getElementCenter(branch))

      branches.forEach((branch, index) => {
        branch.style.transitionDuration = `${branchFadeMs}ms`
        branch.style.transitionDelay = `${index * branchDelayStepMs}ms`
        branch.style.opacity = '1'
      })

      attributes.forEach((attribute, index) => {
        if (isCenterStaticAttribute(attribute)) {
          return
        }

        const nearestBranchIndex = getNearestBranchIndex(getElementCenter(attribute), branchCenters)
        const baseDelay =
          nearestBranchIndex >= 0 ? nearestBranchIndex * branchDelayStepMs : index * branchDelayStepMs

        attribute.style.transitionDuration = `${attributeFadeMs}ms`
        attribute.style.transitionDelay = `${Math.max(0, baseDelay - attributeLeadMs)}ms`
        attribute.style.opacity = '1'
      })
    }

    if (reducedMotion) {
      branches.forEach((branch) => {
        branch.style.opacity = '1'
      })
      attributes.forEach((attribute) => {
        attribute.style.opacity = '1'
      })
      nodes.forEach((node) => {
        node.style.opacity = '1'
      })
      return
    }

    if (mode === 'graph-build') {
      resetGraphBuild()
    } else {
      resetNodes()
    }

    if (!animate) {
      return () => {
        clearTimers()
      }
    }

    const frameId = window.requestAnimationFrame(() => {
      if (mode === 'graph-build') {
        revealGraphBuild()
      } else {
        revealNodes()
      }
    })

    return () => {
      window.cancelAnimationFrame(frameId)
      clearTimers()
    }
  }, [animate, mode, reducedMotion, replayToken, svgMarkup])

  return (
    <div
      ref={containerRef}
      className={className}
      role="img"
      aria-label={alt}
      style={{
        // Keep a stable render box while SVG markup is loading.
        aspectRatio: `${SVG_VIEWBOX_WIDTH} / ${SVG_VIEWBOX_HEIGHT}`,
        minHeight: '220px',
        backgroundColor: 'var(--color-navy)',
      }}
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  )
}
