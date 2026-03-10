import { useEffect, useRef, useState } from 'react'

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

  useEffect(() => {
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
        node.style.transitionDuration = '320ms'
        node.style.transitionTimingFunction = 'ease-out'
        node.style.transitionDelay = '0ms'
      })
    }

    const revealNodes = () => {
      nodes.forEach((node, index) => {
        node.style.transitionDelay = `${index * 30}ms`
        node.style.opacity = '1'
      })
    }

    const resetGraphBuild = () => {
      branches.forEach((branch) => {
        branch.style.opacity = '0'
        branch.style.transitionProperty = 'opacity'
        branch.style.transitionDuration = '260ms'
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
        attribute.style.transitionDuration = '320ms'
        attribute.style.transitionTimingFunction = 'ease-out'
        attribute.style.transitionDelay = '0ms'
      })
    }

    const revealGraphBuild = () => {
      branches.forEach((branch, index) => {
        branch.style.transitionDelay = `${index * 36}ms`
        branch.style.opacity = '1'
      })

      const branchPhaseMs = branches.length * 36 + 180
      const attributeTimer = window.setTimeout(() => {
        attributes.forEach((attribute, index) => {
          attribute.style.transitionDelay = `${index * 28}ms`
          attribute.style.opacity = '1'
        })
      }, branchPhaseMs)
      timers.push(attributeTimer)
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
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  )
}
