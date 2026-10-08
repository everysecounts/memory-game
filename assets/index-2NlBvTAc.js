//#region \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
//#endregion
//#region src/utils/createSvg.js
var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
function createSvg(tagName, attributes = {}, ...children) {
	const element = document.createElementNS(SVG_NAMESPACE, tagName);
	Object.entries(attributes).forEach(([name, value]) => {
		element.setAttribute(name, value);
	});
	(children.length === 1 && Array.isArray(children[0]) ? children[0] : children).forEach((child) => {
		element.append(child);
	});
	return element;
}
//#endregion
//#region src/utils/createSettingsIcon.js
function createSettingsIcon() {
	return {
		svg: createSvg("svg", {
			viewBox: "0 0 32 32",
			"aria-hidden": "true"
		}, [createSvg("path", {
			d: `
      M11.982 6.299
      L13.569 2.213
      L18.431 2.213
      L20.018 6.299

      L24.030 4.532
      L27.468 7.970
      L25.701 11.982

      L29.787 13.569
      L29.787 18.431
      L25.701 20.018

      L27.468 24.030
      L24.030 27.468
      L20.018 25.701

      L18.431 29.787
      L13.569 29.787
      L11.982 25.701

      L7.970 27.468
      L4.532 24.030
      L6.299 20.018

      L2.213 18.431
      L2.213 13.569
      L6.299 11.982

      L4.532 7.970
      L7.970 4.532
      Z

      M16 10.75
      A5.25 5.25 0 1 0 16 21.25
      A5.25 5.25 0 1 0 16 10.75
      Z
    `,
			"fill-rule": "evenodd"
		})]),
		muteLines: []
	};
}
//#endregion
//#region src/utils/shuffle.js
function shuffle(array) {
	const shuffled = [...array];
	for (let index = shuffled.length - 1; index > 0; index -= 1) {
		const randomIndex = Math.floor(Math.random() * (index + 1));
		[shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
	}
	return shuffled;
}
//#endregion
//#region src/utils/createElement.js
function createElement(tagName, options = {}, children = []) {
	const element = document.createElement(tagName);
	const { className, textContent, attributes = {} } = options;
	if (className) element.className = className;
	if (textContent) element.textContent = textContent;
	Object.entries(attributes).forEach(([name, value]) => {
		element.setAttribute(name, value);
	});
	children.forEach((child) => {
		element.append(child);
	});
	return element;
}
//#endregion
//#region src/data/cards.js
var BASE_URL = "/memory-game/";
var CARD_SETS = {
	ancientGreece: {
		id: "ancientGreece",
		name: "Ancient Greece",
		folder: "ancient-greece",
		back: "back.avif",
		cards: [
			{
				id: 1,
				pairId: 1,
				image: "amphora.avif"
			},
			{
				id: 2,
				pairId: 1,
				image: "amphora.avif"
			},
			{
				id: 3,
				pairId: 2,
				image: "temple-ruins.avif"
			},
			{
				id: 4,
				pairId: 2,
				image: "temple-ruins.avif"
			},
			{
				id: 5,
				pairId: 3,
				image: "hoplite.avif"
			},
			{
				id: 6,
				pairId: 3,
				image: "hoplite.avif"
			},
			{
				id: 7,
				pairId: 4,
				image: "olives.avif"
			},
			{
				id: 8,
				pairId: 4,
				image: "olives.avif"
			},
			{
				id: 9,
				pairId: 5,
				image: "theater.avif"
			},
			{
				id: 10,
				pairId: 5,
				image: "theater.avif"
			},
			{
				id: 11,
				pairId: 6,
				image: "trireme.avif"
			},
			{
				id: 12,
				pairId: 6,
				image: "trireme.avif"
			},
			{
				id: 13,
				pairId: 7,
				image: "laurel-mosaic.avif"
			},
			{
				id: 14,
				pairId: 7,
				image: "laurel-mosaic.avif"
			},
			{
				id: 15,
				pairId: 8,
				image: "discobolus.avif"
			},
			{
				id: 16,
				pairId: 8,
				image: "discobolus.avif"
			}
		]
	},
	godsOfOlympus: {
		id: "godsOfOlympus",
		name: "Gods of Olympus",
		folder: "gods-of-olympus",
		back: "back.avif",
		cards: [
			{
				id: 1,
				pairId: 1,
				image: "zeus.avif"
			},
			{
				id: 2,
				pairId: 1,
				image: "zeus.avif"
			},
			{
				id: 3,
				pairId: 2,
				image: "aphrodite.avif"
			},
			{
				id: 4,
				pairId: 2,
				image: "aphrodite.avif"
			},
			{
				id: 5,
				pairId: 3,
				image: "ares.avif"
			},
			{
				id: 6,
				pairId: 3,
				image: "ares.avif"
			},
			{
				id: 7,
				pairId: 4,
				image: "artemis.avif"
			},
			{
				id: 8,
				pairId: 4,
				image: "artemis.avif"
			},
			{
				id: 9,
				pairId: 5,
				image: "demeter.avif"
			},
			{
				id: 10,
				pairId: 5,
				image: "demeter.avif"
			},
			{
				id: 11,
				pairId: 6,
				image: "hephaestus.avif"
			},
			{
				id: 12,
				pairId: 6,
				image: "hephaestus.avif"
			},
			{
				id: 13,
				pairId: 7,
				image: "hera.avif"
			},
			{
				id: 14,
				pairId: 7,
				image: "hera.avif"
			},
			{
				id: 15,
				pairId: 8,
				image: "poseidon.avif"
			},
			{
				id: 16,
				pairId: 8,
				image: "poseidon.avif"
			}
		]
	},
	greekHeritage: {
		id: "greekHeritage",
		name: "Greek Heritage",
		folder: "greek-heritage",
		back: "back.avif",
		cards: [
			{
				id: 1,
				pairId: 1,
				image: "eagle.avif"
			},
			{
				id: 2,
				pairId: 1,
				image: "eagle.avif"
			},
			{
				id: 3,
				pairId: 2,
				image: "athena.avif"
			},
			{
				id: 4,
				pairId: 2,
				image: "athena.avif"
			},
			{
				id: 5,
				pairId: 3,
				image: "ancient-bell.avif"
			},
			{
				id: 6,
				pairId: 3,
				image: "ancient-bell.avif"
			},
			{
				id: 7,
				pairId: 4,
				image: "helmet.avif"
			},
			{
				id: 8,
				pairId: 4,
				image: "helmet.avif"
			},
			{
				id: 9,
				pairId: 5,
				image: "armillary-sphere.avif"
			},
			{
				id: 10,
				pairId: 5,
				image: "armillary-sphere.avif"
			},
			{
				id: 11,
				pairId: 6,
				image: "acropolis.avif"
			},
			{
				id: 12,
				pairId: 6,
				image: "acropolis.avif"
			},
			{
				id: 13,
				pairId: 7,
				image: "athena-warrior.avif"
			},
			{
				id: 14,
				pairId: 7,
				image: "athena-warrior.avif"
			},
			{
				id: 15,
				pairId: 8,
				image: "hoplite.avif"
			},
			{
				id: 16,
				pairId: 8,
				image: "hoplite.avif"
			}
		]
	},
	kingdomOfHades: {
		id: "kingdomOfHades",
		name: "Kingdom Of Hades",
		folder: "kingdom-of-hades",
		back: "back.avif",
		cards: [
			{
				id: 1,
				pairId: 1,
				image: "hades.avif"
			},
			{
				id: 2,
				pairId: 1,
				image: "hades.avif"
			},
			{
				id: 3,
				pairId: 2,
				image: "athena.avif"
			},
			{
				id: 4,
				pairId: 2,
				image: "athena.avif"
			},
			{
				id: 5,
				pairId: 3,
				image: "apollo.avif"
			},
			{
				id: 6,
				pairId: 3,
				image: "apollo.avif"
			},
			{
				id: 7,
				pairId: 4,
				image: "hypnos.avif"
			},
			{
				id: 8,
				pairId: 4,
				image: "hypnos.avif"
			},
			{
				id: 9,
				pairId: 5,
				image: "dionysus.avif"
			},
			{
				id: 10,
				pairId: 5,
				image: "dionysus.avif"
			},
			{
				id: 11,
				pairId: 6,
				image: "hestia.avif"
			},
			{
				id: 12,
				pairId: 6,
				image: "hestia.avif"
			},
			{
				id: 13,
				pairId: 7,
				image: "hecate.avif"
			},
			{
				id: 14,
				pairId: 7,
				image: "hecate.avif"
			},
			{
				id: 15,
				pairId: 8,
				image: "nike.avif"
			},
			{
				id: 16,
				pairId: 8,
				image: "nike.avif"
			}
		]
	}
};
var DEFAULT_CARD_SET_ID = "ancientGreece";
//#endregion
//#region src/data/cursor.js
var CURSOR_URL = `${BASE_URL}assets/cursor/olympus-cursor.svg`;
var POINTER_URL = `${BASE_URL}assets/cursor/olympus-pointer.svg`;
//#endregion
//#region src/utils/soundManager.js
var SOUND_BASE_URL = `${BASE_URL}assets/sounds/`;
var THEME_URL = `${SOUND_BASE_URL}theme.ogg`;
var STORAGE_KEY$1 = "memory-game-sound-settings";
var VOLUME_LEVELS = [
	0,
	.2,
	.5,
	1
];
var SOUNDS = {
	cardFlip: "card-flip.ogg",
	cardMatch: "card-match.ogg",
	cardMismatch: "card-mismatch.ogg",
	buttonClick: "button-click.ogg",
	victory: "victory.ogg"
};
var DEFAULT_SETTINGS = {
	effectsLevel: 3,
	musicLevel: 2,
	themePaused: false,
	masterMuted: false,
	mutedEffectsLevel: 3,
	mutedMusicLevel: 2
};
function clampLevel(level) {
	return Math.min(Math.max(level, 0), VOLUME_LEVELS.length - 1);
}
var SoundManager = class {
	constructor() {
		this.sounds = /* @__PURE__ */ new Map();
		this.listeners = /* @__PURE__ */ new Set();
		this.theme = null;
		this.settings = { ...DEFAULT_SETTINGS };
		this.audioUnlocked = false;
		this.unlockHandler = this.handleAudioUnlock.bind(this);
		this.themeTimeUpdateHandler = this.handleThemeTimeUpdate.bind(this);
		this.themeMetadataHandler = this.handleThemeMetadata.bind(this);
		this.loadSettings();
		this.preload();
		this.enableButtonSounds();
		this.enableAudioUnlock();
	}
	loadSettings() {
		const data = localStorage.getItem(STORAGE_KEY$1);
		if (!data) return;
		try {
			const settings = JSON.parse(data);
			if (Number.isInteger(settings.effectsLevel)) this.settings.effectsLevel = clampLevel(settings.effectsLevel);
			else if (Number.isInteger(settings.volumeLevel)) this.settings.effectsLevel = clampLevel(settings.volumeLevel);
			if (Number.isInteger(settings.musicLevel)) this.settings.musicLevel = clampLevel(settings.musicLevel);
			if (typeof settings.themePaused === "boolean") this.settings.themePaused = settings.themePaused;
			if (typeof settings.masterMuted === "boolean") this.settings.masterMuted = settings.masterMuted;
			if (Number.isInteger(settings.mutedEffectsLevel)) this.settings.mutedEffectsLevel = clampLevel(settings.mutedEffectsLevel);
			else this.settings.mutedEffectsLevel = this.settings.effectsLevel;
			if (Number.isInteger(settings.mutedMusicLevel)) this.settings.mutedMusicLevel = clampLevel(settings.mutedMusicLevel);
			else this.settings.mutedMusicLevel = this.settings.musicLevel;
			if (this.settings.masterMuted) {
				this.settings.effectsLevel = 0;
				this.settings.musicLevel = 0;
			}
		} catch {
			localStorage.removeItem(STORAGE_KEY$1);
		}
	}
	saveSettings() {
		localStorage.setItem(STORAGE_KEY$1, JSON.stringify({
			effectsLevel: this.settings.effectsLevel,
			musicLevel: this.settings.musicLevel,
			themePaused: this.settings.themePaused,
			masterMuted: this.settings.masterMuted,
			mutedEffectsLevel: this.settings.mutedEffectsLevel,
			mutedMusicLevel: this.settings.mutedMusicLevel
		}));
	}
	preload() {
		Object.entries(SOUNDS).forEach(([name, fileName]) => {
			const audio = new Audio(`${SOUND_BASE_URL}${fileName}`);
			audio.preload = "auto";
			audio.volume = this.getEffectsVolume();
			this.sounds.set(name, audio);
		});
		this.theme = new Audio(THEME_URL);
		this.theme.preload = "auto";
		this.theme.loop = true;
		this.theme.playsInline = true;
		this.theme.volume = this.getMusicVolume();
		this.theme.addEventListener("timeupdate", this.themeTimeUpdateHandler);
		this.theme.addEventListener("loadedmetadata", this.themeMetadataHandler);
	}
	enableButtonSounds() {
		document.addEventListener("click", (event) => {
			const button = event.target.closest("button");
			if (!button) return;
			if (button.dataset.noSound === "true" || button.getAttribute("aria-selected") === "true") return;
			this.play("buttonClick");
		}, true);
	}
	enableAudioUnlock() {
		document.addEventListener("pointerdown", this.unlockHandler, { passive: true });
		document.addEventListener("keydown", this.unlockHandler);
	}
	handleAudioUnlock() {
		if (this.audioUnlocked) return;
		this.syncThemePlayback();
	}
	disableAudioUnlock() {
		document.removeEventListener("pointerdown", this.unlockHandler);
		document.removeEventListener("keydown", this.unlockHandler);
	}
	handleThemeTimeUpdate() {
		this.notify("theme");
	}
	handleThemeMetadata() {
		this.notify("theme");
	}
	subscribe(listener) {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
	notify(type = "all") {
		this.listeners.forEach((listener) => {
			listener(type);
		});
	}
	getEffectsLevel() {
		return this.settings.effectsLevel;
	}
	getMusicLevel() {
		return this.settings.musicLevel;
	}
	getEffectsVolume() {
		if (this.settings.masterMuted) return 0;
		return VOLUME_LEVELS[this.settings.effectsLevel];
	}
	getMusicVolume() {
		if (this.settings.masterMuted) return 0;
		return VOLUME_LEVELS[this.settings.musicLevel];
	}
	getEffectsPercent() {
		return VOLUME_LEVELS[this.settings.effectsLevel] * 100;
	}
	getMusicPercent() {
		return VOLUME_LEVELS[this.settings.musicLevel] * 100;
	}
	getVolumeLevels() {
		return VOLUME_LEVELS.map((volume) => volume * 100);
	}
	isMasterMuted() {
		return this.settings.masterMuted;
	}
	isThemePaused() {
		return this.settings.themePaused;
	}
	getThemeCurrentTime() {
		if (!this.theme || !Number.isFinite(this.theme.currentTime)) return 0;
		return this.theme.currentTime;
	}
	getThemeDuration() {
		if (!this.theme || !Number.isFinite(this.theme.duration)) return 0;
		return this.theme.duration;
	}
	play(name) {
		const volume = this.getEffectsVolume();
		if (volume === 0) return;
		const sound = this.sounds.get(name);
		if (!sound) return;
		sound.pause();
		sound.currentTime = 0;
		sound.volume = volume;
		const playPromise = sound.play();
		if (playPromise !== void 0) playPromise.catch(() => {});
	}
	setEffectsLevel(level) {
		if (!Number.isInteger(level)) return;
		const nextLevel = clampLevel(level);
		if (this.settings.masterMuted) {
			this.settings.mutedEffectsLevel = nextLevel;
			this.saveSettings();
			this.notify();
			return;
		}
		this.settings.effectsLevel = nextLevel;
		const volume = this.getEffectsVolume();
		this.sounds.forEach((sound) => {
			sound.volume = volume;
		});
		this.saveSettings();
		this.notify();
	}
	setMusicLevel(level) {
		if (!Number.isInteger(level)) return;
		const nextLevel = clampLevel(level);
		if (this.settings.masterMuted) {
			this.settings.mutedMusicLevel = nextLevel;
			this.saveSettings();
			this.notify();
			return;
		}
		this.settings.musicLevel = nextLevel;
		if (this.theme) this.theme.volume = this.getMusicVolume();
		this.syncThemePlayback();
		this.saveSettings();
		this.notify();
	}
	setMasterMuted(isMuted) {
		const nextMuted = Boolean(isMuted);
		if (nextMuted === this.settings.masterMuted) return;
		if (nextMuted) {
			this.settings.mutedEffectsLevel = this.settings.effectsLevel;
			this.settings.mutedMusicLevel = this.settings.musicLevel;
			this.settings.effectsLevel = 0;
			this.settings.musicLevel = 0;
			this.settings.masterMuted = true;
		} else {
			this.settings.masterMuted = false;
			this.settings.effectsLevel = clampLevel(this.settings.mutedEffectsLevel);
			this.settings.musicLevel = clampLevel(this.settings.mutedMusicLevel);
		}
		const effectsVolume = this.getEffectsVolume();
		const musicVolume = this.getMusicVolume();
		this.sounds.forEach((sound) => {
			sound.volume = effectsVolume;
		});
		if (this.theme) this.theme.volume = musicVolume;
		this.syncThemePlayback();
		this.saveSettings();
		this.notify();
	}
	toggleMasterMute() {
		this.setMasterMuted(!this.settings.masterMuted);
	}
	setThemePaused(isPaused) {
		this.settings.themePaused = Boolean(isPaused);
		this.syncThemePlayback();
		this.saveSettings();
		this.notify("theme");
	}
	toggleThemePlayback() {
		this.setThemePaused(!this.settings.themePaused);
	}
	restartTheme() {
		if (!this.theme) return;
		this.theme.currentTime = 0;
		this.settings.themePaused = false;
		this.syncThemePlayback();
		this.saveSettings();
		this.notify("theme");
	}
	setThemeCurrentTime(time) {
		if (!this.theme || !Number.isFinite(time)) return;
		const duration = this.getThemeDuration();
		if (duration <= 0) return;
		this.theme.currentTime = Math.min(Math.max(time, 0), duration);
		this.notify("theme");
	}
	syncThemePlayback() {
		if (!this.theme) return;
		const shouldPlay = !this.settings.masterMuted && this.settings.musicLevel > 0 && !this.settings.themePaused;
		this.theme.volume = this.getMusicVolume();
		if (!shouldPlay) {
			this.theme.pause();
			return;
		}
		if (!this.theme.paused) return;
		const playPromise = this.theme.play();
		if (playPromise !== void 0) playPromise.then(() => {
			this.audioUnlocked = true;
			this.disableAudioUnlock();
			this.notify("theme");
		}).catch(() => {});
	}
};
var soundManager = new SoundManager();
//#endregion
//#region src/components/FloatingPanel/FloatingPanel.js
var FloatingPanel = class {
	constructor({ button, panel, openClass, closeDelay = 300, gap = 8, viewportPadding = 12, align = "auto" }) {
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
		this.addEventListeners();
	}
	addEventListeners() {
		this.button.addEventListener("mouseenter", this.handleButtonMouseEnter);
		this.button.addEventListener("mouseleave", this.handleButtonMouseLeave);
		this.panel.addEventListener("mouseenter", this.handlePanelMouseEnter);
		this.panel.addEventListener("mouseleave", this.handlePanelMouseLeave);
		this.button.addEventListener("click", this.handleButtonClick);
		window.addEventListener("resize", this.handleResize);
		window.addEventListener("scroll", this.handleScroll, true);
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
		if (this.isHoverDevice()) this.scheduleClose();
	}
	handlePanelMouseEnter() {
		this.pointerInsidePanel = true;
		this.clearCloseTimer();
	}
	handlePanelMouseLeave() {
		this.pointerInsidePanel = false;
		if (this.isHoverDevice()) this.scheduleClose();
	}
	handleButtonClick(event) {
		if (this.isHoverDevice()) {
			event.preventDefault();
			return;
		}
		if (this.isOpen) this.close();
		else this.open();
	}
	isHoverDevice() {
		return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
	}
	open() {
		this.clearCloseTimer();
		if (!this.panel.isConnected) document.body.append(this.panel);
		this.isOpen = true;
		this.panel.classList.add(this.openClass);
		this.panel.setAttribute("aria-hidden", "false");
		this.button.setAttribute("aria-expanded", "true");
		this.positionPanel();
	}
	close() {
		this.clearCloseTimer();
		if (this.panel.contains(document.activeElement)) this.button.focus();
		this.isOpen = false;
		this.panel.classList.remove(this.openClass);
		this.panel.setAttribute("aria-hidden", "true");
		this.button.setAttribute("aria-expanded", "false");
	}
	scheduleClose() {
		this.clearCloseTimer();
		this.closeTimer = setTimeout(() => {
			if (!this.isPointerInside()) this.close();
		}, this.closeDelay);
	}
	clearCloseTimer() {
		if (this.closeTimer === null) return;
		clearTimeout(this.closeTimer);
		this.closeTimer = null;
	}
	isPointerInside() {
		return this.pointerInsideButton || this.pointerInsidePanel;
	}
	handleResize() {
		if (!this.isOpen) return;
		this.positionPanel();
	}
	handleScroll() {
		if (!this.isOpen) return;
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
		if (this.align === "start") left = alignedToStart;
		else if (this.align === "end") left = alignedToEnd;
		else left = alignedToEnd >= minLeft ? alignedToEnd : alignedToStart;
		left = Math.max(minLeft, Math.min(left, maxLeft));
		if (top > maxTop) top = rect.top - panelHeight - this.gap;
		top = Math.max(this.viewportPadding, top);
		this.panel.style.left = `${left}px`;
		this.panel.style.right = "auto";
		this.panel.style.top = `${top}px`;
	}
	destroy() {
		this.clearCloseTimer();
		this.button.removeEventListener("mouseenter", this.handleButtonMouseEnter);
		this.button.removeEventListener("mouseleave", this.handleButtonMouseLeave);
		this.panel.removeEventListener("mouseenter", this.handlePanelMouseEnter);
		this.panel.removeEventListener("mouseleave", this.handlePanelMouseLeave);
		this.button.removeEventListener("click", this.handleButtonClick);
		window.removeEventListener("resize", this.handleResize);
		window.removeEventListener("scroll", this.handleScroll, true);
		if (this.panel.isConnected) this.panel.remove();
	}
};
var RulesControl_module_default = {
	control: "_control_11ues_1",
	button: "_button_11ues_7",
	icon: "_icon_11ues_53",
	panel: "_panel_11ues_64",
	open: "_open_11ues_109",
	ornament: "_ornament_11ues_115",
	title: "_title_11ues_125",
	subtitle: "_subtitle_11ues_137",
	rules: "_rules_11ues_147",
	rule: "_rule_11ues_147",
	tip: "_tip_11ues_185",
	tipTitle: "_tipTitle_11ues_194",
	tipText: "_tipText_11ues_203"
};
//#endregion
//#region src/components/RulesControl/RulesControl.js
function createRulesIcon() {
	return createSvg("svg", {
		class: RulesControl_module_default.icon,
		viewBox: "0 0 32 32",
		"aria-hidden": "true"
	}, [
		createSvg("path", { d: "M7 8h18v18H7z" }),
		createSvg("path", { d: "M10 5h12v3H10z" }),
		createSvg("path", { d: "M11 13h10M11 17h10M11 21h7" }),
		createSvg("path", { d: "M7 8 5 10v16h18l4-4V8" })
	]);
}
var RulesControl = class {
	constructor() {
		this.element = this.createElement();
	}
	createElement() {
		const wrapper = createElement("div", { className: RulesControl_module_default.control });
		const button = createElement("button", {
			className: RulesControl_module_default.button,
			attributes: {
				type: "button",
				"aria-label": "How to play",
				"aria-expanded": "false",
				"aria-haspopup": "dialog",
				"data-no-sound": "true"
			}
		});
		button.append(createRulesIcon());
		const panel = createElement("div", {
			className: RulesControl_module_default.panel,
			attributes: {
				role: "dialog",
				"aria-label": "How to play",
				"aria-hidden": "true"
			}
		});
		const ornament = createElement("div", {
			className: RulesControl_module_default.ornament,
			textContent: "✦",
			attributes: { "aria-hidden": "true" }
		});
		const title = createElement("h2", {
			className: RulesControl_module_default.title,
			textContent: "How to Play"
		});
		const subtitle = createElement("p", {
			className: RulesControl_module_default.subtitle,
			textContent: "The path to Olympus"
		});
		const rules = createElement("ol", { className: RulesControl_module_default.rules });
		[
			"Flip two cards.",
			"Find matching pairs.",
			"Remember their positions.",
			"Match all pairs to win."
		].forEach((text) => {
			const rule = createElement("li", { className: RulesControl_module_default.rule });
			const ruleText = createElement("span", { textContent: text });
			rule.append(ruleText);
			rules.append(rule);
		});
		const tip = createElement("div", { className: RulesControl_module_default.tip });
		const tipTitle = createElement("span", {
			className: RulesControl_module_default.tipTitle,
			textContent: "Tip"
		});
		const tipText = createElement("span", {
			className: RulesControl_module_default.tipText,
			textContent: "Fewer moves mean a better result."
		});
		tip.append(tipTitle, tipText);
		panel.append(ornament, title, subtitle, rules, tip);
		this.floatingPanel = new FloatingPanel({
			button,
			panel,
			openClass: RulesControl_module_default.open,
			align: "start"
		});
		wrapper.append(button);
		return wrapper;
	}
	destroy() {
		this.floatingPanel.destroy();
	}
};
var Settings_module_default = {
	control: "_control_5qnq4_1",
	button: "_button_5qnq4_7",
	icon: "_icon_5qnq4_53",
	panel: "_panel_5qnq4_64",
	open: "_open_5qnq4_91",
	panelHeader: "_panelHeader_5qnq4_97",
	title: "_title_5qnq4_106",
	masterButton: "_masterButton_5qnq4_114",
	tabs: "_tabs_5qnq4_154",
	tab: "_tab_5qnq4_154",
	active: "_active_5qnq4_192",
	tabPanel: "_tabPanel_5qnq4_207",
	audioSection: "_audioSection_5qnq4_218",
	cardSets: "_cardSets_5qnq4_229",
	cardSet: "_cardSet_5qnq4_229",
	cardSetImage: "_cardSetImage_5qnq4_280",
	cardSetName: "_cardSetName_5qnq4_309",
	cardSetNote: "_cardSetNote_5qnq4_321",
	row: "_row_5qnq4_328",
	description: "_description_5qnq4_335",
	value: "_value_5qnq4_343",
	levels: "_levels_5qnq4_349",
	level: "_level_5qnq4_349",
	dot: "_dot_5qnq4_400",
	levelLabel: "_levelLabel_5qnq4_414",
	player: "_player_5qnq4_430",
	progress: "_progress_5qnq4_438",
	playerControls: "_playerControls_5qnq4_503",
	playerButton: "_playerButton_5qnq4_509",
	playButton: "_playButton_5qnq4_551",
	playerIcon: "_playerIcon_5qnq4_566",
	time: "_time_5qnq4_576",
	currentTime: "_currentTime_5qnq4_587",
	timeSeparator: "_timeSeparator_5qnq4_591",
	duration: "_duration_5qnq4_595"
};
//#endregion
//#region src/components/Settings/Settings.js
function createPlayIcon() {
	return createSvg("svg", {
		class: Settings_module_default.playerIcon,
		viewBox: "0 0 24 24",
		"aria-hidden": "true"
	}, [createSvg("path", { d: "M8 5.5v13l10-6.5L8 5.5Z" })]);
}
function createPauseIcon() {
	return createSvg("svg", {
		class: Settings_module_default.playerIcon,
		viewBox: "0 0 24 24",
		"aria-hidden": "true"
	}, [createSvg("path", { d: "M8 6v12M16 6v12" })]);
}
function createRestartIcon() {
	return createSvg("svg", {
		class: Settings_module_default.playerIcon,
		viewBox: "0 0 24 24",
		"aria-hidden": "true"
	}, [createSvg("path", { d: "M19 8a8 8 0 1 0 1 6" }), createSvg("path", { d: "M19 4v4h-4" })]);
}
function formatTime(time) {
	if (!Number.isFinite(time) || time < 0) return "0:00";
	const totalSeconds = Math.floor(time);
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
var Settings = class {
	constructor(onCardSetChange = () => {}) {
		this.onCardSetChange = onCardSetChange;
		this.cardSetId = this.loadCardSetId();
		this.activeTab = null;
		this.element = this.createElement();
		this.unsubscribe = soundManager.subscribe((type) => {
			if (type === "theme") {
				this.updateThemePlayer(soundManager.isThemePaused());
				return;
			}
			this.update();
			this.updateThemePlayer(soundManager.isThemePaused());
		});
		this.update();
		this.updateThemePlayer(soundManager.isThemePaused());
		this.updateCardSetSelection();
		this.setActiveTab("audio");
	}
	createElement() {
		const wrapper = createElement("div", { className: Settings_module_default.control });
		const button = createElement("button", {
			className: Settings_module_default.button,
			attributes: {
				type: "button",
				"aria-label": "Settings",
				"aria-expanded": "false",
				"aria-haspopup": "dialog",
				"data-no-sound": "true"
			}
		});
		const icon = createSettingsIcon();
		icon.svg.classList.add(Settings_module_default.icon);
		button.append(icon.svg);
		const panel = createElement("div", {
			className: Settings_module_default.panel,
			attributes: {
				role: "dialog",
				"aria-label": "Settings",
				"aria-hidden": "true"
			}
		});
		const panelHeader = createElement("div", { className: Settings_module_default.panelHeader });
		const title = createElement("h2", {
			className: Settings_module_default.title,
			textContent: "Settings"
		});
		const masterButton = createElement("button", {
			className: Settings_module_default.masterButton,
			attributes: {
				type: "button",
				"aria-label": "Mute all sounds",
				"aria-pressed": "false"
			}
		});
		const masterLabel = createElement("span", { textContent: "Mute all" });
		masterButton.append(masterLabel);
		panelHeader.append(title, masterButton);
		const tabs = createElement("div", {
			className: Settings_module_default.tabs,
			attributes: {
				role: "tablist",
				"aria-label": "Settings"
			}
		});
		const audioTab = this.createTab("audio", "Audio");
		const cardsTab = this.createTab("cards", "Cards");
		tabs.append(audioTab, cardsTab);
		const audioPanel = this.createAudioPanel();
		const cardsPanel = this.createCardsPanel();
		panel.append(panelHeader, tabs, audioPanel, cardsPanel);
		masterButton.addEventListener("click", () => {
			soundManager.toggleMasterMute();
		});
		this.masterButton = masterButton;
		this.masterLabel = masterLabel;
		this.audioTab = audioTab;
		this.cardsTab = cardsTab;
		this.audioPanel = audioPanel;
		this.cardsPanel = cardsPanel;
		this.floatingPanel = new FloatingPanel({
			button,
			panel,
			openClass: Settings_module_default.open
		});
		wrapper.append(button);
		return wrapper;
	}
	createTab(name, label) {
		const tab = createElement("button", {
			className: Settings_module_default.tab,
			textContent: label,
			attributes: {
				type: "button",
				role: "tab",
				"aria-selected": "false"
			}
		});
		tab.addEventListener("click", () => {
			this.setActiveTab(name);
		});
		return tab;
	}
	createAudioPanel() {
		const panel = createElement("section", {
			className: Settings_module_default.tabPanel,
			attributes: {
				role: "tabpanel",
				"aria-label": "Audio settings"
			}
		});
		const effectsPanel = this.createEffectsPanel();
		const musicPanel = this.createMusicPanel();
		panel.append(effectsPanel, musicPanel);
		return panel;
	}
	createEffectsPanel() {
		const panel = createElement("section", {
			className: Settings_module_default.audioSection,
			attributes: { "aria-label": "Effects settings" }
		});
		const description = createElement("p", {
			className: Settings_module_default.description,
			textContent: "Game sounds"
		});
		const value = createElement("span", { className: Settings_module_default.value });
		const header = createElement("div", { className: Settings_module_default.row });
		header.append(description, value);
		const levels = this.createLevelControl("effects");
		panel.append(header, levels);
		this.effectsValue = value;
		return panel;
	}
	createMusicPanel() {
		const panel = createElement("section", {
			className: Settings_module_default.audioSection,
			attributes: { "aria-label": "Music settings" }
		});
		const description = createElement("p", {
			className: Settings_module_default.description,
			textContent: "Theme music"
		});
		const value = createElement("span", { className: Settings_module_default.value });
		const header = createElement("div", { className: Settings_module_default.row });
		header.append(description, value);
		const levels = this.createLevelControl("music");
		const player = this.createThemePlayer();
		panel.append(header, levels, player);
		this.musicValue = value;
		return panel;
	}
	createCardsPanel() {
		const panel = createElement("section", {
			className: Settings_module_default.tabPanel,
			attributes: {
				role: "tabpanel",
				"aria-label": "Cards settings"
			}
		});
		const description = createElement("p", {
			className: Settings_module_default.description,
			textContent: "Card set"
		});
		const cardSets = createElement("div", { className: Settings_module_default.cardSets });
		this.cardSetButtons = [];
		Object.values(CARD_SETS).forEach((cardSet) => {
			const button = this.createCardSetButton(cardSet);
			cardSets.append(button);
			this.cardSetButtons.push({
				button,
				id: cardSet.id
			});
		});
		const note = createElement("p", {
			className: Settings_module_default.cardSetNote,
			textContent: "Changing the card set starts a new game."
		});
		panel.append(description, cardSets, note);
		return panel;
	}
	createCardSetButton(cardSet) {
		const button = createElement("button", {
			className: Settings_module_default.cardSet,
			attributes: {
				type: "button",
				"aria-label": `Select ${cardSet.name} card set`,
				"aria-pressed": "false"
			}
		});
		const image = createElement("img", {
			className: Settings_module_default.cardSetImage,
			attributes: {
				src: `/memory-game/assets/cards/${cardSet.folder}/${cardSet.back}`,
				alt: "",
				draggable: "false"
			}
		});
		const name = createElement("span", {
			className: Settings_module_default.cardSetName,
			textContent: cardSet.name
		});
		button.append(image, name);
		button.addEventListener("click", () => {
			if (cardSet.id === this.cardSetId) return;
			this.cardSetId = cardSet.id;
			localStorage.setItem("memory-game-card-set", this.cardSetId);
			this.updateCardSetSelection();
			this.onCardSetChange(this.cardSetId);
		});
		return button;
	}
	loadCardSetId() {
		const savedCardSetId = localStorage.getItem("memory-game-card-set");
		return CARD_SETS[savedCardSetId] ? savedCardSetId : DEFAULT_CARD_SET_ID;
	}
	getCardSetId() {
		return this.cardSetId;
	}
	updateCardSetSelection() {
		this.cardSetButtons.forEach(({ button, id }) => {
			const isActive = id === this.cardSetId;
			button.classList.toggle(Settings_module_default.active, isActive);
			button.setAttribute("aria-pressed", String(isActive));
			if (isActive) button.dataset.noSound = "true";
			else delete button.dataset.noSound;
		});
	}
	createThemePlayer() {
		const player = createElement("div", { className: Settings_module_default.player });
		const progress = createElement("input", {
			className: Settings_module_default.progress,
			attributes: {
				type: "range",
				min: "0",
				max: "0",
				step: "0.1",
				value: "0",
				"aria-label": "Theme music progress"
			}
		});
		const playerControls = createElement("div", { className: Settings_module_default.playerControls });
		const restartButton = createElement("button", {
			className: Settings_module_default.playerButton,
			attributes: {
				type: "button",
				"aria-label": "Restart theme"
			}
		});
		const playButton = createElement("button", {
			className: `${Settings_module_default.playerButton} ${Settings_module_default.playButton}`,
			attributes: {
				type: "button",
				"aria-label": "Play theme"
			}
		});
		const time = createElement("div", { className: Settings_module_default.time });
		const currentTime = createElement("span", {
			className: Settings_module_default.currentTime,
			textContent: "0:00"
		});
		const separator = createElement("span", {
			className: Settings_module_default.timeSeparator,
			textContent: "/"
		});
		const duration = createElement("span", {
			className: Settings_module_default.duration,
			textContent: "0:00"
		});
		restartButton.append(createRestartIcon());
		playButton.append(createPlayIcon());
		time.append(currentTime, separator, duration);
		playerControls.append(restartButton, playButton, time);
		player.append(progress, playerControls);
		progress.addEventListener("input", () => {
			soundManager.setThemeCurrentTime(Number(progress.value));
		});
		restartButton.addEventListener("click", () => {
			soundManager.restartTheme();
		});
		playButton.addEventListener("click", () => {
			soundManager.toggleThemePlayback();
		});
		this.progress = progress;
		this.restartButton = restartButton;
		this.playButton = playButton;
		this.currentTime = currentTime;
		this.duration = duration;
		return player;
	}
	createLevelControl(type) {
		const levels = createElement("div", {
			className: Settings_module_default.levels,
			attributes: {
				role: "group",
				"aria-label": type === "effects" ? "Effects volume" : "Music volume"
			}
		});
		this.levelButtons = this.levelButtons || {};
		this.levelButtons[type] = [];
		soundManager.getVolumeLevels().forEach((volume, index) => {
			const levelButton = createElement("button", {
				className: Settings_module_default.level,
				attributes: {
					type: "button",
					"aria-label": `${volume}%`,
					"aria-pressed": "false"
				}
			});
			const dot = createElement("span", { className: Settings_module_default.dot });
			const label = createElement("span", {
				className: Settings_module_default.levelLabel,
				textContent: `${volume}%`
			});
			levelButton.append(dot, label);
			levelButton.addEventListener("click", () => {
				const previousLevel = type === "effects" ? soundManager.getEffectsLevel() : soundManager.getMusicLevel();
				if (type === "effects") soundManager.setEffectsLevel(index);
				else soundManager.setMusicLevel(index);
				if (previousLevel === 0 && index > 0) soundManager.play("buttonClick");
			});
			levels.append(levelButton);
			this.levelButtons[type].push(levelButton);
		});
		return levels;
	}
	setActiveTab(tabName) {
		if (this.activeTab === tabName) return;
		this.activeTab = tabName;
		const isAudio = tabName === "audio";
		const isCards = tabName === "cards";
		this.audioTab.classList.toggle(Settings_module_default.active, isAudio);
		this.cardsTab.classList.toggle(Settings_module_default.active, isCards);
		this.audioTab.setAttribute("aria-selected", String(isAudio));
		this.cardsTab.setAttribute("aria-selected", String(isCards));
		this.audioPanel.hidden = !isAudio;
		this.cardsPanel.hidden = !isCards;
	}
	updateControlsState(isMuted, musicLevel) {
		const musicDisabled = isMuted || musicLevel === 0;
		this.levelButtons.effects.forEach((button) => {
			button.disabled = isMuted;
		});
		this.levelButtons.music.forEach((button) => {
			button.disabled = isMuted;
		});
		this.progress.disabled = musicDisabled;
		this.restartButton.disabled = musicDisabled;
		this.playButton.disabled = musicDisabled;
	}
	update() {
		const effectsLevel = soundManager.getEffectsLevel();
		const musicLevel = soundManager.getMusicLevel();
		const masterMuted = soundManager.isMasterMuted();
		this.updateLevels("effects", effectsLevel);
		this.updateLevels("music", musicLevel);
		this.effectsValue.textContent = `${soundManager.getEffectsPercent()}%`;
		this.musicValue.textContent = `${soundManager.getMusicPercent()}%`;
		this.masterButton.setAttribute("aria-pressed", String(masterMuted));
		this.masterButton.setAttribute("aria-label", masterMuted ? "Enable all sounds" : "Mute all sounds");
		this.masterLabel.textContent = masterMuted ? "Sound on" : "Mute all";
		this.updateControlsState(masterMuted, musicLevel);
	}
	updateThemePlayer(themePaused) {
		const currentTime = soundManager.getThemeCurrentTime();
		const duration = soundManager.getThemeDuration();
		this.progress.max = String(Math.max(duration, 0));
		this.progress.value = String(duration > 0 ? Math.min(currentTime, duration) : 0);
		this.currentTime.textContent = formatTime(currentTime);
		this.duration.textContent = formatTime(duration);
		this.playButton.setAttribute("aria-label", themePaused ? "Play theme" : "Pause theme");
		this.playButton.replaceChildren(themePaused ? createPlayIcon() : createPauseIcon());
	}
	updateLevels(type, activeLevel) {
		this.levelButtons[type].forEach((button, index) => {
			const isActive = index === activeLevel;
			button.classList.toggle(Settings_module_default.active, isActive);
			button.setAttribute("aria-pressed", String(isActive));
			if (isActive) button.dataset.noSound = "true";
			else delete button.dataset.noSound;
		});
	}
	destroy() {
		this.unsubscribe();
		this.floatingPanel.destroy();
	}
};
var Header_module_default = {
	header: "_header_18d2k_1",
	brand: "_brand_18d2k_12",
	brandText: "_brandText_18d2k_22",
	title: "_title_18d2k_34",
	subtitle: "_subtitle_18d2k_53",
	leftActions: "_leftActions_18d2k_89",
	rightActions: "_rightActions_18d2k_90",
	button: "_button_18d2k_110",
	icon: "_icon_18d2k_158",
	buttonLabel: "_buttonLabel_18d2k_169"
};
//#endregion
//#region src/components/Header/Header.js
function createTempleIcon() {
	return createSvg("svg", {
		class: Header_module_default.icon,
		viewBox: "0 0 32 32",
		"aria-hidden": "true"
	}, [
		createSvg("path", { d: "M4 10h24L16 4 4 10Z" }),
		createSvg("path", { d: "M6 12h20" }),
		createSvg("path", { d: "M8 12v12M13 12v12M19 12v12M24 12v12" }),
		createSvg("path", { d: "M5 24h22M3 27h26" })
	]);
}
function createLeaderboardIcon() {
	return createSvg("svg", {
		class: Header_module_default.icon,
		viewBox: "0 0 32 32",
		"aria-hidden": "true"
	}, [
		createSvg("path", { d: "M6 27V17h5v10H6Z" }),
		createSvg("path", { d: "M14 27V11h5v16h-5Z" }),
		createSvg("path", { d: "M22 27V5h5v22h-5Z" }),
		createSvg("path", { d: "M4 27h24" })
	]);
}
var Header = class {
	constructor(onNewGame, onLeaderboard, onCardSetChange) {
		this.onNewGame = onNewGame;
		this.onLeaderboard = onLeaderboard;
		this.rulesControl = new RulesControl();
		this.settings = new Settings((cardSetId) => {
			this.updateCardSetName(cardSetId);
			onCardSetChange(cardSetId);
		});
		this.element = this.createElement();
		this.updateCardSetName(this.settings.getCardSetId());
	}
	updateCardSetName(cardSetId) {
		const cardSet = CARD_SETS[cardSetId];
		if (cardSet) this.subtitle.textContent = cardSet.name;
	}
	createElement() {
		const header = createElement("header", { className: Header_module_default.header });
		const brand = createElement("div", { className: Header_module_default.brand });
		const brandText = createElement("div", { className: Header_module_default.brandText });
		const title = createElement("span", {
			className: Header_module_default.title,
			textContent: "Memory of Olympus"
		});
		this.subtitle = createElement("span", {
			className: Header_module_default.subtitle,
			textContent: "Ancient Greece"
		});
		const leftActions = createElement("div", { className: Header_module_default.leftActions });
		const rightActions = createElement("div", { className: Header_module_default.rightActions });
		const newGameButton = createElement("button", {
			className: Header_module_default.button,
			attributes: {
				type: "button",
				"aria-label": "New Game"
			}
		});
		const newGameLabel = createElement("span", {
			className: Header_module_default.buttonLabel,
			textContent: "New Game"
		});
		const leadersButton = createElement("button", {
			className: Header_module_default.button,
			attributes: {
				type: "button",
				"aria-label": "Leaderboard"
			}
		});
		const leadersLabel = createElement("span", {
			className: Header_module_default.buttonLabel,
			textContent: "Leaderboard"
		});
		newGameButton.append(createTempleIcon(), newGameLabel);
		leadersButton.append(createLeaderboardIcon(), leadersLabel);
		newGameButton.addEventListener("click", this.onNewGame);
		leadersButton.addEventListener("click", this.onLeaderboard);
		brandText.append(title, this.subtitle);
		brand.append(brandText);
		leftActions.append(this.rulesControl.element, newGameButton);
		rightActions.append(leadersButton, this.settings.element);
		header.append(leftActions, brand, rightActions);
		return header;
	}
};
var Card_module_default = {
	card: "_card_9t8fu_1",
	open: "_open_9t8fu_17",
	matched: "_matched_9t8fu_18",
	inner: "_inner_9t8fu_24",
	front: "_front_9t8fu_33",
	back: "_back_9t8fu_34",
	image: "_image_9t8fu_56",
	pulse: "_pulse_9t8fu_90"
};
//#endregion
//#region src/components/Card/Card.js
var Card = class {
	constructor(cardData, backImage, onSelect) {
		this.id = cardData.id;
		this.pairId = cardData.pairId;
		this.image = cardData.image;
		this.backImage = backImage;
		this.onSelect = onSelect;
		this.isOpen = false;
		this.isMatched = false;
		this.element = this.createElement();
	}
	createElement() {
		const card = createElement("article", {
			className: Card_module_default.card,
			attributes: {
				tabindex: "0",
				"aria-label": "Open card"
			}
		});
		card.addEventListener("click", () => {
			this.onSelect(this);
		});
		card.addEventListener("keydown", (event) => {
			if (event.key !== "Enter" && event.key !== " ") return;
			event.preventDefault();
			this.onSelect(this);
		});
		this.inner = createElement("span", { className: Card_module_default.inner });
		const front = createElement("span", { className: Card_module_default.front });
		const back = createElement("span", { className: Card_module_default.back });
		const frontImage = createElement("img", {
			className: Card_module_default.image,
			attributes: {
				src: this.image,
				alt: "",
				draggable: "false"
			}
		});
		const backImage = createElement("img", {
			className: Card_module_default.image,
			attributes: {
				src: this.backImage,
				alt: "",
				draggable: "false"
			}
		});
		front.append(frontImage);
		back.append(backImage);
		this.inner.append(front, back);
		card.append(this.inner);
		return card;
	}
	open() {
		if (this.isOpen || this.isMatched) return false;
		this.isOpen = true;
		this.element.classList.add(Card_module_default.open);
		this.element.setAttribute("aria-label", "Opened card");
		soundManager.play("cardFlip");
		return true;
	}
	close() {
		if (!this.isOpen || this.isMatched) return false;
		this.isOpen = false;
		this.element.classList.remove(Card_module_default.open);
		this.element.setAttribute("aria-label", "Open card");
		return true;
	}
	match() {
		if (this.isMatched) return;
		this.isMatched = true;
		this.element.classList.add(Card_module_default.matched);
		this.element.setAttribute("aria-label", "Matched card");
		this.pulse();
	}
	pulse() {
		this.element.classList.remove(Card_module_default.pulse);
		requestAnimationFrame(() => {
			this.element.classList.add(Card_module_default.pulse);
		});
	}
	waitForFlip(callback) {
		const handleTransitionEnd = (event) => {
			if (event.propertyName !== "transform") return;
			this.inner.removeEventListener("transitionend", handleTransitionEnd);
			callback();
		};
		this.inner.addEventListener("transitionend", handleTransitionEnd);
	}
};
//#endregion
//#region src/components/Game/GameState.js
var GameState = class {
	constructor() {
		this.reset();
	}
	reset() {
		this.moves = 0;
		this.foundPairs = 0;
		this.selectedCards = [];
		this.isLocked = false;
		this.isFinished = false;
	}
};
var Game_module_default = {
	game: "_game_1hmkj_1",
	board: "_board_1hmkj_15"
};
//#endregion
//#region src/components/Game/Game.js
var Game = class {
	constructor(score, onFinish, onProgress = () => {}, cardSetId = DEFAULT_CARD_SET_ID) {
		this.score = score;
		this.onFinish = onFinish;
		this.onProgress = onProgress;
		this.cardSetId = cardSetId;
		this.state = new GameState();
		this.mismatchTimer = null;
		this.generation = 0;
		this.element = this.createElement();
		this.start();
	}
	createElement() {
		const game = createElement("section", {
			className: Game_module_default.game,
			attributes: { "aria-label": "Game board" }
		});
		this.board = createElement("div", { className: Game_module_default.board });
		game.append(this.board);
		return game;
	}
	start() {
		this.clearMismatchTimer();
		this.generation += 1;
		this.state.reset();
		this.score.reset();
		this.onProgress(0);
		const cardSet = CARD_SETS[this.cardSetId] ?? CARD_SETS["ancientGreece"];
		const shuffledCards = shuffle(cardSet.cards.map((cardData) => ({
			...cardData,
			image: `${BASE_URL}assets/cards/${cardSet.folder}/${cardData.image}`
		})));
		const backImage = `${BASE_URL}assets/cards/${cardSet.folder}/${cardSet.back}`;
		this.cards = shuffledCards.map((cardData) => new Card(cardData, backImage, this.handleCardSelect.bind(this)));
		this.renderCards();
	}
	renderCards() {
		this.board.replaceChildren();
		this.cards.forEach((card) => {
			this.board.append(card.element);
		});
	}
	handleCardSelect(card) {
		if (this.state.isLocked || this.state.isFinished) return;
		if (!card.open()) return;
		this.state.selectedCards.push(card);
		if (this.state.selectedCards.length === 2) {
			this.state.moves += 1;
			this.score.updateMoves(this.state.moves);
			this.checkMatch();
		}
	}
	checkMatch() {
		const [firstCard, secondCard] = this.state.selectedCards;
		this.state.isLocked = true;
		if (firstCard.pairId === secondCard.pairId) {
			const currentGeneration = this.generation;
			secondCard.waitForFlip(() => {
				if (this.generation !== currentGeneration) return;
				soundManager.play("cardMatch");
				firstCard.match();
				secondCard.match();
				this.state.foundPairs += 1;
				this.score.updatePairs(this.state.foundPairs, 8);
				this.onProgress(this.state.foundPairs);
				this.state.selectedCards = [];
				if (this.state.foundPairs === 8) {
					this.finish();
					return;
				}
				this.state.isLocked = false;
			});
			return;
		}
		this.mismatchTimer = setTimeout(() => {
			soundManager.play("cardMismatch");
			firstCard.close();
			secondCard.close();
			this.state.selectedCards = [];
			this.state.isLocked = false;
			this.mismatchTimer = null;
		}, 1e3);
	}
	finish() {
		if (this.state.isFinished) return;
		this.state.isFinished = true;
		this.state.isLocked = true;
		this.onFinish(this.state.moves);
	}
	clearMismatchTimer() {
		if (this.mismatchTimer === null) return;
		clearTimeout(this.mismatchTimer);
		this.mismatchTimer = null;
	}
	restart(cardSetId = this.cardSetId) {
		this.cardSetId = cardSetId;
		this.start();
	}
};
var Score_module_default = {
	score: "_score_162d7_1",
	item: "_item_162d7_15"
};
//#endregion
//#region src/components/Score/Score.js
var Score = class {
	constructor() {
		this.element = this.createElement();
	}
	createElement() {
		const score = createElement("div", { className: Score_module_default.score });
		const movesLabel = createElement("span", { textContent: "Moves:" });
		const pairsLabel = createElement("span", { textContent: "Pairs:" });
		this.movesElement = createElement("span", { textContent: "0" });
		this.pairsElement = createElement("span", { textContent: `0 / 8` });
		const moves = createElement("div", { className: Score_module_default.item });
		const pairs = createElement("div", { className: Score_module_default.item });
		moves.append(movesLabel, this.movesElement);
		pairs.append(pairsLabel, this.pairsElement);
		score.append(moves, pairs);
		return score;
	}
	updateMoves(moves) {
		this.movesElement.textContent = String(moves);
	}
	updatePairs(pairs, totalPairs) {
		this.pairsElement.textContent = `${pairs} / ${totalPairs}`;
	}
	reset() {
		this.updateMoves(0);
		this.updatePairs(0, 8);
	}
};
var Modal_module_default = {
	overlay: "_overlay_jglws_1",
	content: "_content_jglws_21",
	scene: "_scene_jglws_43"
};
//#endregion
//#region src/components/Modal/Modal.js
var Modal = class {
	constructor({ variant } = {}) {
		this.variant = variant;
		this.handleOverlayClick = this.handleOverlayClick.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.element = this.createElement();
	}
	createElement() {
		const overlay = createElement("div", {
			className: this.variant === "scene" ? `${Modal_module_default.overlay} ${Modal_module_default.scene}` : Modal_module_default.overlay,
			attributes: {
				role: "dialog",
				"aria-modal": "true"
			}
		});
		this.content = createElement("div", { className: Modal_module_default.content });
		overlay.append(this.content);
		overlay.addEventListener("click", this.handleOverlayClick);
		return overlay;
	}
	handleOverlayClick(event) {
		if (event.target === this.element) this.close();
	}
	handleKeyDown(event) {
		if (event.key === "Escape") this.close();
	}
	open(content) {
		this.content.replaceChildren(content);
		if (!this.element.isConnected) document.body.append(this.element);
		document.removeEventListener("keydown", this.handleKeyDown);
		document.addEventListener("keydown", this.handleKeyDown);
		document.body.classList.add("modal-open");
	}
	close() {
		this.element.remove();
		document.removeEventListener("keydown", this.handleKeyDown);
		document.body.classList.remove("modal-open");
	}
};
//#endregion
//#region src/components/ornaments/ornaments.js
var uid = 0;
var nextId = (prefix) => `${prefix}-${uid++}`;
var WREATH_COLORS = {
	gold: {
		fill: "#c9a45c",
		highlight: "#f3dc9a"
	},
	silver: {
		fill: "#9da3ad",
		highlight: "#e4e7eb"
	},
	bronze: {
		fill: "#a85f32",
		highlight: "#e6a06d"
	}
};
function createDivider(className) {
	const id = nextId("divider");
	const svg = createSvg("svg", {
		viewBox: "0 0 260 14",
		fill: "none",
		"aria-hidden": "true",
		focusable: "false"
	}, createSvg("defs", {}, createSvg("linearGradient", {
		id: `${id}-l`,
		gradientUnits: "userSpaceOnUse",
		x1: "0",
		x2: "108"
	}, createSvg("stop", {
		offset: "0",
		"stop-color": "#c9a45c",
		"stop-opacity": "0"
	}), createSvg("stop", {
		offset: "1",
		"stop-color": "#f3dc9a"
	})), createSvg("linearGradient", {
		id: `${id}-r`,
		gradientUnits: "userSpaceOnUse",
		x1: "152",
		x2: "260"
	}, createSvg("stop", {
		offset: "0",
		"stop-color": "#f3dc9a"
	}), createSvg("stop", {
		offset: "1",
		"stop-color": "#c9a45c",
		"stop-opacity": "0"
	}))), createSvg("path", {
		d: "M0 7H108",
		stroke: `url(#${id}-l)`
	}), createSvg("path", {
		d: "M152 7H260",
		stroke: `url(#${id}-r)`
	}), createSvg("path", {
		d: "M130 1 137 7 130 13 123 7Z",
		fill: "#f3dc9a"
	}), createSvg("path", {
		d: "M130 4 133.5 7 130 10 126.5 7Z",
		fill: "#14100b"
	}), createSvg("circle", {
		cx: "113",
		cy: "7",
		r: "2",
		fill: "#f3dc9a"
	}), createSvg("circle", {
		cx: "147",
		cy: "7",
		r: "2",
		fill: "#f3dc9a"
	}));
	if (className) svg.classList.add(...className.split(/\s+/).filter(Boolean));
	return svg;
}
function createLaurelWreath(className, variant = "gold") {
	const colors = WREATH_COLORS[variant] ?? WREATH_COLORS.gold;
	const svg = createSvg("svg", {
		viewBox: "0 0 100 100",
		fill: "none",
		"aria-hidden": "true",
		focusable: "false"
	}, createSvg("g", {
		fill: colors.fill,
		stroke: colors.highlight,
		"stroke-width": "1.2",
		"stroke-linejoin": "round"
	}, createSvg("path", {
		d: "M35 82C22 75 15 63 15 48C15 32 23 18 36 10",
		fill: "none",
		"stroke-width": "2"
	}), createSvg("path", {
		d: "M65 82C78 75 85 63 85 48C85 32 77 18 64 10",
		fill: "none",
		"stroke-width": "2"
	}), createSvg("path", { d: "M25 70Q15 68 10 60Q20 59 28 65Z" }), createSvg("path", { d: "M20 58Q10 55 7 46Q17 48 24 54Z" }), createSvg("path", { d: "M18 45Q9 40 9 31Q18 34 23 41Z" }), createSvg("path", { d: "M21 32Q14 25 17 17Q24 23 26 30Z" }), createSvg("path", { d: "M28 21Q23 13 28 7Q33 14 32 21Z" }), createSvg("path", { d: "M75 70Q85 68 90 60Q80 59 72 65Z" }), createSvg("path", { d: "M80 58Q90 55 93 46Q83 48 76 54Z" }), createSvg("path", { d: "M82 45Q91 40 91 31Q82 34 77 41Z" }), createSvg("path", { d: "M79 32Q86 25 83 17Q76 23 74 30Z" }), createSvg("path", { d: "M72 21Q77 13 72 7Q67 14 68 21Z" })));
	if (className) svg.classList.add(...className.split(/\s+/).filter(Boolean));
	return svg;
}
function createHourglass(className) {
	const svg = createSvg("svg", {
		viewBox: "0 0 80 120",
		fill: "none",
		"aria-hidden": "true",
		focusable: "false"
	}, createSvg("path", {
		d: "M21 14H59C59 40 44 49 40 60C36 49 21 40 21 14Z",
		fill: "#f0cf86",
		"fill-opacity": "0.08",
		stroke: "#e8d3a0",
		"stroke-width": "1.6"
	}), createSvg("path", {
		d: "M40 60C44 71 59 80 59 106H21C21 80 36 71 40 60Z",
		fill: "#f0cf86",
		"fill-opacity": "0.08",
		stroke: "#e8d3a0",
		"stroke-width": "1.6"
	}), createSvg("path", {
		d: "M29 20H51C50 32 44 40 40 47C36 40 30 32 29 20Z",
		fill: "#f0cf86",
		"fill-opacity": "0.35"
	}), createSvg("path", {
		d: "M40 52V88",
		stroke: "#f0cf86",
		"stroke-width": "1.2",
		"stroke-opacity": "0.8"
	}), createSvg("path", {
		d: "M24 106C26 92 34 84 40 80C46 84 54 92 56 106Z",
		fill: "#f0cf86"
	}), createSvg("rect", {
		x: "12",
		y: "5",
		width: "56",
		height: "9",
		rx: "3",
		fill: "#8a6a35"
	}), createSvg("rect", {
		x: "12",
		y: "106",
		width: "56",
		height: "9",
		rx: "3",
		fill: "#8a6a35"
	}), createSvg("rect", {
		x: "12",
		y: "5",
		width: "56",
		height: "2.5",
		rx: "1.2",
		fill: "#e0c681"
	}), createSvg("rect", {
		x: "12",
		y: "106",
		width: "56",
		height: "2.5",
		rx: "1.2",
		fill: "#e0c681"
	}), createSvg("rect", {
		x: "15",
		y: "14",
		width: "3.5",
		height: "92",
		fill: "#b8924a"
	}), createSvg("rect", {
		x: "61.5",
		y: "14",
		width: "3.5",
		height: "92",
		fill: "#b8924a"
	}));
	if (className) svg.classList.add(...className.split(/\s+/).filter(Boolean));
	return svg;
}
var VictoryModal_module_default = {
	victory: "_victory_1536t_1",
	iconWrap: "_iconWrap_1536t_85",
	icon: "_icon_1536t_85",
	title: "_title_1536t_121",
	divider: "_divider_1536t_139",
	moves: "_moves_1536t_149",
	actions: "_actions_1536t_163",
	button: "_button_1536t_177"
};
//#endregion
//#region src/components/VictoryModal/VictoryModal.js
var VictoryModal = class {
	constructor(onNewGame) {
		this.onNewGame = onNewGame;
		this.modal = new Modal({ variant: "scene" });
		this.element = this.createElement();
	}
	createElement() {
		const content = createElement("div", { className: VictoryModal_module_default.victory });
		const iconWrap = createElement("div", { className: VictoryModal_module_default.iconWrap });
		iconWrap.append(createLaurelWreath(VictoryModal_module_default.icon));
		this.title = createElement("h2", {
			className: VictoryModal_module_default.title,
			textContent: "Victory!"
		});
		const divider = createDivider(VictoryModal_module_default.divider);
		this.movesElement = createElement("p", { className: VictoryModal_module_default.moves });
		const actions = createElement("div", { className: VictoryModal_module_default.actions });
		const newGameButton = createElement("button", {
			className: VictoryModal_module_default.button,
			textContent: "New Game",
			attributes: { type: "button" }
		});
		const closeButton = createElement("button", {
			className: VictoryModal_module_default.button,
			textContent: "Close",
			attributes: { type: "button" }
		});
		newGameButton.addEventListener("click", () => {
			this.close();
			this.onNewGame();
		});
		closeButton.addEventListener("click", () => {
			this.close();
		});
		actions.append(newGameButton, closeButton);
		content.append(iconWrap, this.title, divider, this.movesElement, actions);
		return content;
	}
	open(moves, isPerfect = false) {
		this.title.textContent = isPerfect ? "Perfect Memory!" : "Victory!";
		this.movesElement.textContent = `Moves: ${moves}`;
		this.modal.open(this.element);
	}
	close() {
		this.modal.close();
	}
};
//#endregion
//#region src/components/Leaderboard/Leaderboard.js
var STORAGE_KEY = "memory-game-leaderboard";
var MAX_RESULTS = 10;
var Leaderboard = class {
	getResults() {
		const data = localStorage.getItem(STORAGE_KEY);
		if (!data) return [];
		try {
			return JSON.parse(data);
		} catch {
			return [];
		}
	}
	saveResult(moves) {
		if (!Number.isInteger(moves) || moves < 8) return this.getResults();
		const results = this.getResults();
		const date = this.getCurrentDate();
		if (results.some((result) => result.moves === moves && result.date === date)) return results;
		results.push({
			moves,
			date
		});
		results.sort((first, second) => {
			if (first.moves !== second.moves) return first.moves - second.moves;
			return this.parseDate(first.date) - this.parseDate(second.date);
		});
		const topResults = results.slice(0, MAX_RESULTS);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(topResults));
		return topResults;
	}
	getCurrentDate() {
		const date = /* @__PURE__ */ new Date();
		return `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;
	}
	parseDate(dateString) {
		const [day, month, year] = dateString.split(".");
		return new Date(year, month - 1, day).getTime();
	}
};
var LeaderboardModal_module_default = {
	frame: "_frame_co7u5_1",
	leaderboard: "_leaderboard_co7u5_71",
	header: "_header_co7u5_91",
	title: "_title_co7u5_101",
	divider: "_divider_co7u5_123",
	body: "_body_co7u5_135",
	list: "_list_co7u5_147",
	item: "_item_co7u5_161",
	rank: "_rank_co7u5_213",
	wreath: "_wreath_co7u5_227",
	rankNumber: "_rankNumber_co7u5_243",
	moves: "_moves_co7u5_341",
	date: "_date_co7u5_343",
	empty: "_empty_co7u5_365",
	emptyIcon: "_emptyIcon_co7u5_379",
	hourglass: "_hourglass_co7u5_393",
	emptyTitle: "_emptyTitle_co7u5_407",
	emptyText: "_emptyText_co7u5_417",
	isEmpty: "_isEmpty_co7u5_433",
	footer: "_footer_co7u5_445",
	button: "_button_co7u5_457"
};
//#endregion
//#region src/components/LeaderboardModal/LeaderboardModal.js
var RANK_VARIANTS = [
	"gold",
	"silver",
	"bronze"
];
var LeaderboardModal = class {
	constructor(leaderboard) {
		this.leaderboard = leaderboard;
		this.modal = new Modal({ variant: "scene" });
		this.element = this.createElement();
	}
	createElement() {
		const frame = createElement("div", { className: LeaderboardModal_module_default.frame });
		const content = createElement("div", { className: LeaderboardModal_module_default.leaderboard });
		const header = createElement("header", { className: LeaderboardModal_module_default.header });
		const title = createElement("h2", {
			className: LeaderboardModal_module_default.title,
			textContent: "Leaderboard"
		});
		header.append(title);
		this.body = createElement("div", { className: LeaderboardModal_module_default.body });
		const closeButton = createElement("button", {
			className: LeaderboardModal_module_default.button,
			textContent: "Close",
			attributes: { type: "button" }
		});
		closeButton.addEventListener("click", () => {
			this.close();
		});
		const footer = createElement("footer", { className: LeaderboardModal_module_default.footer });
		footer.append(closeButton);
		content.append(header, createDivider(LeaderboardModal_module_default.divider), this.body, footer);
		frame.append(content);
		return frame;
	}
	open() {
		this.renderResults();
		this.modal.open(this.element);
	}
	renderResults() {
		this.body.replaceChildren();
		const results = this.leaderboard.getResults();
		if (results.length === 0) {
			this.body.append(this.createEmptyState());
			this.element.classList.add(LeaderboardModal_module_default.isEmpty);
			return;
		}
		this.element.classList.remove(LeaderboardModal_module_default.isEmpty);
		const list = createElement("ol", { className: LeaderboardModal_module_default.list });
		results.forEach((result, index) => {
			const rank = index + 1;
			const item = createElement("li", {
				className: LeaderboardModal_module_default.item,
				attributes: { "data-rank": String(rank) }
			});
			const rankElement = createElement("span", { className: LeaderboardModal_module_default.rank });
			if (rank <= RANK_VARIANTS.length) rankElement.append(createLaurelWreath(LeaderboardModal_module_default.wreath, RANK_VARIANTS[index]));
			rankElement.append(createElement("span", {
				className: LeaderboardModal_module_default.rankNumber,
				textContent: String(rank)
			}));
			const moves = createElement("span", {
				className: LeaderboardModal_module_default.moves,
				textContent: `${result.moves} moves`
			});
			const date = createElement("span", {
				className: LeaderboardModal_module_default.date,
				textContent: result.date
			});
			item.append(rankElement, moves, date);
			list.append(item);
		});
		this.body.append(list);
	}
	createEmptyState() {
		const empty = createElement("div", { className: LeaderboardModal_module_default.empty });
		const icon = createElement("div", { className: LeaderboardModal_module_default.emptyIcon });
		icon.append(createHourglass(LeaderboardModal_module_default.hourglass));
		const heading = createElement("p", {
			className: LeaderboardModal_module_default.emptyTitle,
			textContent: "No results yet"
		});
		const text = createElement("p", {
			className: LeaderboardModal_module_default.emptyText,
			textContent: `Find all 8 pairs — and your result will be the first in this leaderboard.`
		});
		empty.append(icon, heading, text);
		return empty;
	}
	close() {
		this.modal.close();
	}
};
var Main_module_default = { main: "_main_1f44g_1" };
//#endregion
//#region src/components/Main/Main.js
var Main = class {
	constructor(onProgress, cardSetId = DEFAULT_CARD_SET_ID) {
		this.score = new Score();
		this.cardSetId = cardSetId;
		this.leaderboard = new Leaderboard();
		this.leaderboardModal = new LeaderboardModal(this.leaderboard);
		this.victoryModal = new VictoryModal(() => {
			this.handleNewGame();
		});
		this.game = new Game(this.score, (moves) => {
			this.handleGameFinish(moves);
		}, onProgress, this.cardSetId);
		this.element = this.createElement();
	}
	createElement() {
		const main = createElement("main", { className: Main_module_default.main });
		main.append(this.score.element, this.game.element);
		return main;
	}
	handleGameFinish(moves) {
		soundManager.play("victory");
		this.leaderboard.saveResult(moves);
		const isPerfect = moves === 8;
		this.victoryModal.open(moves, isPerfect);
	}
	handleCardSetChange(cardSetId) {
		this.cardSetId = cardSetId;
		this.handleNewGame();
	}
	handleNewGame() {
		this.victoryModal.close();
		this.leaderboardModal.close();
		this.game.restart(this.cardSetId);
	}
	openLeaderboard() {
		this.leaderboardModal.open();
	}
};
var World_module_default = {
	world: "_world_bwj78_1",
	background: "_background_bwj78_17",
	hidden: "_hidden_bwj78_33",
	reveal: "_reveal_bwj78_41",
	light: "_light_bwj78_51",
	active: "_active_bwj78_101"
};
//#endregion
//#region src/components/World/World.js
var WORLD_STATES = {
	NIGHT: "night",
	DAWN: "dawn",
	DAY: "day"
};
var WORLD_IMAGES = {
	[WORLD_STATES.NIGHT]: `${BASE_URL}assets/world/night.avif`,
	[WORLD_STATES.DAWN]: `${BASE_URL}assets/world/dawn.avif`,
	[WORLD_STATES.DAY]: `${BASE_URL}assets/world/day.avif`
};
var World = class {
	constructor() {
		this.currentState = WORLD_STATES.NIGHT;
		this.isTransitioning = false;
		this.element = this.createElement();
	}
	createElement() {
		const world = createElement("div", {
			className: World_module_default.world,
			attributes: { "aria-hidden": "true" }
		});
		this.background = createElement("div", { className: `${World_module_default.background} ${World_module_default[this.currentState]}` });
		this.nextBackground = createElement("div", { className: World_module_default.background });
		this.light = createElement("div", { className: World_module_default.light });
		this.setBackgroundImage(this.background, this.currentState);
		world.append(this.background, this.nextBackground, this.light);
		return world;
	}
	setBackgroundImage(element, state) {
		element.style.backgroundImage = `url('${WORLD_IMAGES[state]}')`;
	}
	setProgress(foundPairs) {
		let nextState = WORLD_STATES.NIGHT;
		const dawnThreshold = Math.floor(4);
		if (foundPairs >= Math.floor(7)) nextState = WORLD_STATES.DAY;
		else if (foundPairs >= dawnThreshold) nextState = WORLD_STATES.DAWN;
		if (nextState === this.currentState || this.isTransitioning) return;
		this.transitionTo(nextState);
	}
	transitionTo(nextState) {
		this.isTransitioning = true;
		this.nextBackground.className = `${World_module_default.background} ${World_module_default[nextState]} ${World_module_default.hidden}`;
		this.setBackgroundImage(this.nextBackground, nextState);
		this.nextBackground.offsetWidth;
		this.nextBackground.classList.remove(World_module_default.hidden);
		this.nextBackground.classList.add(World_module_default.reveal);
		this.light.classList.add(World_module_default.active);
		const finishTransition = () => {
			this.background.className = `${World_module_default.background} ${World_module_default[nextState]}`;
			this.setBackgroundImage(this.background, nextState);
			this.nextBackground.className = World_module_default.background;
			this.light.className = World_module_default.light;
			this.currentState = nextState;
			this.isTransitioning = false;
		};
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			finishTransition();
			return;
		}
		const handleTransitionEnd = (event) => {
			if (event.propertyName !== "clip-path") return;
			this.nextBackground.removeEventListener("transitionend", handleTransitionEnd);
			finishTransition();
		};
		this.nextBackground.addEventListener("transitionend", handleTransitionEnd);
	}
};
//#endregion
//#region src/App.js
var App = class {
	constructor(container) {
		this.container = container;
		this.world = new World();
		this.header = new Header(() => {
			this.main.handleNewGame();
		}, () => {
			this.main.openLeaderboard();
		}, (cardSetId) => {
			this.main.handleCardSetChange(cardSetId);
		});
		this.main = new Main((foundPairs) => {
			this.world.setProgress(foundPairs);
		}, this.header.settings.getCardSetId());
	}
	start() {
		this.container.replaceChildren(this.world.element, this.header.element, this.main.element);
	}
};
//#endregion
//#region src/main.js
document.documentElement.style.setProperty("--cursor-url", `url("${CURSOR_URL}")`);
document.documentElement.style.setProperty("--pointer-url", `url("${POINTER_URL}")`);
var root = document.body;
new App(root).start();
//#endregion

//# sourceMappingURL=index-2NlBvTAc.js.map