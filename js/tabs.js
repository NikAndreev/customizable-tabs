document.addEventListener('DOMContentLoaded', function(){

	class Tabs {
		tabIndex = ''

		constructor(tabs, config) {
			this._tabsEl = tabs
			this._controlsEl = this._tabsEl.querySelectorAll(config.control)
			this._controlActiveClass = config.controlActiveClass
			this._containersEl = this._tabsEl.querySelectorAll(config.container)
			this._containerActiveClass = config.containerActiveClass

			if (typeof config.on === 'object') {
				this._setCallbacks(config.on)
			}

			this._setIndexes()

			this._init(config.history)

			this._setHandler(config.history)

			if (config.history) {
				this._hashObserverHandler = this._hashObserverHandler.bind(this)
				this._setHashObserver()
			}

			this._controlsClickHandler = this._controlsClickHandler.bind(this)
			this._setControlsClickHandler()

			if (this._onInit) {
				this._onInit()
			}
		}

		destroy() {
			this._removeControlsClickHandler()
			this._removeHashObserver()

			this._tabsEl = null
			this._controlsEl = null
			this._controlActiveClass = null
			this._containersEl = null
			this._containerActiveClass = null

			if (this._onDestroy) {
				this._onDestroy()
			}

			this._removeCallbacks()
		}

		_toggleTabs(index) {
			this.tabIndex = index
			this._switchTabs()

			if (this._onToggle) {
				this._onToggle()
			}
		}

		_setCallbacks(config) {
			if (typeof config.init === 'function') {
				this._onInit = config.init
			}

			if (typeof config.toggle === 'function') {
				this._onToggle = config.toggle
			}

			if (typeof config.destroy === 'function') {
				this._onDestroy = config.destroy
			}
		}

		_removeCallbacks() {
			if (this._onInit) {
				this._onInit = null
			}
			
			if (this._onToggle) {
				this._onToggle = null
			}

			if (this._onDestroy) {
				this._onDestroy = null
			}
		}

		_setIndexes() {
			this.indexes = []
			this._controlsEl.forEach(control => {
				this.indexes.push(control.dataset.index)
			})
		}

		_init(history) {
			if (history) {
				this._toggleTabs(this.indexes.find(index => index === location.hash.slice(1)) || this.indexes[0])
			} else {
				this._toggleTabs(this.indexes[0])
			}
		}

		_setHandler(history) {
			if (history) {
				this.handler = index => location.hash = index
			} else {
				this.handler = index => this._toggleTabs(index) 
			}
		}

		_setHashObserver() {
			window.addEventListener('hashchange', this._hashObserverHandler)
		}

		_removeHashObserver() {
			window.removeEventListener('hashchange', this._hashObserverHandler)
		}

		_hashObserverHandler() {
			const hash = location.hash.slice(1)

			if (!hash) {
				this._toggleTabs(this.indexes[0])
			}

			if (this.indexes.find(index => index === hash)) {
				this._toggleTabs(hash)
			}
		}

		_setControlsClickHandler() {
			this._controlsEl.forEach(el => el.addEventListener('click', this._controlsClickHandler))
		}

		_removeControlsClickHandler() {
			this._controlsEl.forEach(el => el.removeEventListener('click', this._controlsClickHandler))
		}

		_controlsClickHandler(e) {
			this.handler(e.currentTarget.dataset.index)
		}

		_switchTabs() {
			this._switchControls()
			this._switchContainers()
		}

		_switchControls() {
			this._controlsEl.forEach( control => {
				String(this.tabIndex) === control.dataset.index ? control.classList.add(this._controlActiveClass) : control.classList.remove(this._controlActiveClass)
			})
		}

		_switchContainers() {
			this._containersEl.forEach( container => {
				String(this.tabIndex) === container.dataset.index ? container.classList.add(this._containerActiveClass) : container.classList.remove(this._containerActiveClass) 
			})
		}
	}

	const config = {
		control: '[data-control]',
		controlActiveClass: 'active',
		container: '[data-container]',
		containerActiveClass: 'active',
		history: true,
		on: {
			init: function () {
				console.log('Tabs initialized');
			},
			toggle: function () {
				console.log('Tabs toggled');
			},
			destroy: function () {
				console.log('Tabs destroyed');
			}
		},
	}

	document.querySelectorAll('[data-tabs]').forEach( tabs => {
		new Tabs(tabs, config)
	})

})
