const vTitle = {
  created(el: HTMLElement, binding: { value?: string }) {
    if (!binding.value) return
    el.style.paddingTop = '45px'
    el.style.position = 'relative'
    el.style.boxSizing = 'border-box'
    const spanEl = document.createElement('span')
    spanEl.className = 'ps-box-title'
    spanEl.innerText = binding.value
    el.append(spanEl)
  },
  updated(el: HTMLElement, binding: { value?: string }) {
    const spanEl = el.querySelector('.ps-box-title') as HTMLElement
    if (spanEl && binding.value && spanEl.innerText !== binding.value)
      spanEl.innerText = binding.value
  }
}

export { vTitle }
