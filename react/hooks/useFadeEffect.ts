import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
} from 'react'

const TRANSITION_DURATION = 1000

interface State {
  isTransitioning: boolean
  shouldBeVisible: boolean
}

type Action = { type: 'start'; shouldBeVisible: boolean } | { type: 'finish' }

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'start':
      return { isTransitioning: true, shouldBeVisible: action.shouldBeVisible }
    case 'finish':
      return { isTransitioning: false, shouldBeVisible: state.shouldBeVisible }
    default:
      return state
  }
}

export const useFadeEffect = (visible: boolean) => {
  const elementRef = useRef<HTMLElement | null>(null)

  const [state, dispatch] = useReducer(reducer, {
    isTransitioning: false,
    shouldBeVisible: false,
  })

  const { isTransitioning, shouldBeVisible } = state

  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rafIdRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null)

  useEffect(
    () => () => {
      if (timeoutIdRef.current != null) {
        clearTimeout(timeoutIdRef.current)
      }

      if (rafIdRef.current != null) {
        window.cancelAnimationFrame(rafIdRef.current)
      }
    },
    [timeoutIdRef]
  )

  const endTransition = useCallback(() => {
    dispatch({ type: 'finish' })

    if (timeoutIdRef.current != null) {
      clearTimeout(timeoutIdRef.current)
    }

    timeoutIdRef.current = null
  }, [])

  const startTransition = useCallback(
    (isVisible: boolean) => {
      if (rafIdRef.current != null) {
        window.cancelAnimationFrame(rafIdRef.current)
      }

      rafIdRef.current = window.requestAnimationFrame(() => {
        dispatch({ shouldBeVisible: isVisible, type: 'start' })

        rafIdRef.current = null

        if (timeoutIdRef.current != null) {
          clearTimeout(timeoutIdRef.current)
        }

        timeoutIdRef.current = setTimeout(endTransition, TRANSITION_DURATION)
      })
    },
    [endTransition]
  )

  const prevVisible = useRef(false)

  useLayoutEffect(() => {
    if (
      prevVisible.current !== visible &&
      (!visible || elementRef.current != null)
    ) {
      startTransition(visible)
    }

    prevVisible.current = visible
  }, [visible, startTransition])

  const ref = useCallback(
    <T extends HTMLElement>(node: T | null) => {
      const prevNode = elementRef.current
      elementRef.current = node

      if (node != null) {
        const handleTransitionEnd = (evt: Event) => {
          if (evt.target !== node) {
            return
          }

          endTransition()
        }

        node.addEventListener?.('transitionend', handleTransitionEnd)
        node.addEventListener?.('webkitTransitionEnd', handleTransitionEnd)

        if (prevVisible.current === true) {
          startTransition(true)
        }
      } else if (prevNode != null) {
        const handleTransitionEnd = (evt: Event) => {
          if (evt.target !== prevNode) {
            return
          }

          endTransition()
        }

        prevNode.removeEventListener?.('transitionend', handleTransitionEnd)
        prevNode.removeEventListener?.(
          'webkitTransitionEnd',
          handleTransitionEnd
        )
      }
    },
    [endTransition, startTransition]
  )

  const shouldShow = isTransitioning || shouldBeVisible || visible

  return [shouldShow, shouldBeVisible, ref] as const
}
