class FloatingPanel {
  constructor({
    button,
    panel,
    openClass,
    closeDelay = 300,
    gap = 8,
    viewportPadding = 12,
    align = 'auto',
  }) {
    this.align = align;
    this.button = button;
    this.panel = panel;
    this.openClass = openClass;
    this.closeDelay = closeDelay;
    this.gap = gap;
    this.viewportPadding = viewportPadding;
    this.isOpen = false;
    this.closeTimer = null;
    this.pointerInsideButton = false;
    this.pointerInsidePanel = false;
    this.handleResize = this.handleResize.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleButtonMouseEnter = this.handleButtonMouseEnter.bind(this);
    this.handleButtonMouseLeave = this.handleButtonMouseLeave.bind(this);
    this.handlePanelMouseEnter = this.handlePanelMouseEnter.bind(this);
    this.handlePanelMouseLeave = this.handlePanelMouseLeave.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleOutsidePointerDown = this.handleOutsidePointerDown.bind(this);
    this.addEventListeners();
  }

  addEventListeners() {
    this.button.addEventListener('mouseenter', this.handleButtonMouseEnter);
    this.button.addEventListener('mouseleave', this.handleButtonMouseLeave);
    this.panel.addEventListener('mouseenter', this.handlePanelMouseEnter);
    this.panel.addEventListener('mouseleave', this.handlePanelMouseLeave);
    this.button.addEventListener('click', this.handleButtonClick);
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll, true);
    document.addEventListener('pointerdown', this.handleOutsidePointerDown);
  }

  handleButtonMouseEnter() {
    this.pointerInsideButton = true;

    if (this.isHoverDevice()) {
      this.clearCloseTimer();
      this.open();
    }
  }

  handleButtonMouseLeave() {
    this.pointerInsideButton = false;

    if (this.isHoverDevice()) {
      this.scheduleClose();
    }
  }

  handleOutsidePointerDown(event) {
    if (this.isHoverDevice() || !this.isOpen) {
      return;
    }
    if (this.panel.contains(event.target) || this.button.contains(event.target)) {
      return;
    }
    this.close();
  }

  handlePanelMouseEnter() {
    this.pointerInsidePanel = true;
    this.clearCloseTimer();
  }

  handlePanelMouseLeave() {
    this.pointerInsidePanel = false;

    if (this.isHoverDevice()) {
      this.scheduleClose();
    }
  }

  handleButtonClick(event) {
    if (this.isHoverDevice()) {
      event.preventDefault();
      return;
    }

    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  isHoverDevice() {
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }

  open() {
    this.clearCloseTimer();

    if (!this.panel.isConnected) {
      document.body.append(this.panel);
    }

    this.isOpen = true;
    this.panel.classList.add(this.openClass);
    this.panel.setAttribute('aria-hidden', 'false');
    this.button.setAttribute('aria-expanded', 'true');
    this.positionPanel();
  }

  close() {
    this.clearCloseTimer();

    if (this.panel.contains(document.activeElement)) {
      this.button.focus();
    }

    this.isOpen = false;
    this.panel.classList.remove(this.openClass);
    this.panel.setAttribute('aria-hidden', 'true');
    this.button.setAttribute('aria-expanded', 'false');
  }

  scheduleClose() {
    this.clearCloseTimer();

    this.closeTimer = setTimeout(() => {
      if (!this.isPointerInside()) {
        this.close();
      }
    }, this.closeDelay);
  }

  clearCloseTimer() {
    if (this.closeTimer === null) {
      return;
    }

    clearTimeout(this.closeTimer);
    this.closeTimer = null;
  }

  isPointerInside() {
    return this.pointerInsideButton || this.pointerInsidePanel;
  }

  handleResize() {
    if (!this.isOpen) {
      return;
    }

    this.positionPanel();
  }

  handleScroll() {
    if (!this.isOpen) {
      return;
    }

    this.positionPanel();
  }

  positionPanel() {
    const rect = this.button.getBoundingClientRect();
    const panelWidth = this.panel.offsetWidth;
    const panelHeight = this.panel.offsetHeight;

    let top = rect.bottom + this.gap;

    const minLeft = this.viewportPadding;
    const maxLeft = window.innerWidth - panelWidth - this.viewportPadding;
    const maxTop = window.innerHeight - panelHeight - this.viewportPadding;

    const alignedToEnd = rect.right - panelWidth;
    const alignedToStart = rect.left;
    let left;

    if (this.align === 'start') {
      left = alignedToStart;
    } else if (this.align === 'end') {
      left = alignedToEnd;
    } else {
      left = alignedToEnd >= minLeft ? alignedToEnd : alignedToStart;
    }

    left = Math.max(minLeft, Math.min(left, maxLeft));

    if (top > maxTop) {
      top = rect.top - panelHeight - this.gap;
    }

    top = Math.max(this.viewportPadding, top);

    this.panel.style.left = `${left}px`;
    this.panel.style.right = 'auto';
    this.panel.style.top = `${top}px`;
  }

  destroy() {
    this.clearCloseTimer();
    this.button.removeEventListener('mouseenter', this.handleButtonMouseEnter);
    this.button.removeEventListener('mouseleave', this.handleButtonMouseLeave);
    this.panel.removeEventListener('mouseenter', this.handlePanelMouseEnter);
    this.panel.removeEventListener('mouseleave', this.handlePanelMouseLeave);
    this.button.removeEventListener('click', this.handleButtonClick);
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll, true);
    document.removeEventListener('pointerdown', this.handleOutsidePointerDown);
    if (this.panel.isConnected) {
      this.panel.remove();
    }
  }
}

export { FloatingPanel };
