import React, {
  forwardRef,
  useRef,
  useLayoutEffect,
  useState,
  useEffect,
} from 'react'
import { Props as ModalProps } from 'vtex.styleguide/react/components/EXPERIMENTAL_Modal'
import { EXPERIMENTAL_Modal as StyleguideModal, utils } from 'vtex.styleguide'

import { useFadeEffect } from './hooks/useFadeEffect'
import styles from './Modal.css'

const Modal = forwardRef<
  HTMLDivElement,
  Omit<Partial<ModalProps>, 'container' | 'translate'>
>(function Modal(
  { isOpen = false, onClose = () => {}, children, title, ...props },
  forwardedRef
) {
  const [modalContainer] = useState(() => {
    const container = document.createElement('div')

    container.classList.add(styles.modal)

    document.body.append(container)

    if (isOpen) {
      container.classList.add(styles.open)
    } else {
      container.classList.add(styles.closed)
    }

    return container
  })

  useEffect(() => {
    return () => {
      document.body.removeChild(modalContainer)
    }
  }, [modalContainer])

  const [shouldRender, visible, fadeEffectRef] = useFadeEffect(isOpen)

  const containerRef = useRef<HTMLDivElement>(null)

  const ref = utils.useMergeRefs<HTMLDivElement | null>(
    fadeEffectRef,
    containerRef,
    forwardedRef
  )

  useLayoutEffect(() => {
    if (!containerRef.current) {
      return
    }

    if (visible) {
      modalContainer.classList.remove(styles.closed)
      modalContainer.classList.add(styles.open)
    } else {
      modalContainer.classList.remove(styles.open)
      modalContainer.classList.add(styles.closed)
    }
  }, [visible, modalContainer])

  if (!shouldRender) {
    return null
  }

  return (
    <StyleguideModal
      {...props}
      ref={ref}
      isOpen
      onClose={onClose}
      title={title}
      container={modalContainer}
    >
      {children}
    </StyleguideModal>
  )
})

export default Modal
