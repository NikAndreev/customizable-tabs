document.addEventListener('DOMContentLoaded', function(){

	class Tabs {
		constructor(tabs, config) {
			this._tabsEl = tabs
			this._controlsEl = this._tabsEl.querySelectorAll(config.control)
			this._controlActiveClass = config.controlActiveClass
			this._containersEl = this._tabsEl.querySelectorAll(config.container)
			this._containerActiveClass = config.containerActiveClass

			this._setIndexes()

			this._initTabIndex(config.history)

			this._setHandler(config.history)

			if (config.history) {
				this._setHashObserver()
			}

			this._switchTabs()

			this._setControlsClickHandler()
		}

		_setIndexes() {
			this._indexes = []
			this._controlsEl.forEach(control => {
				this._indexes.push(control.dataset.index)
			})
		}

		_initTabIndex(history) {
			if (history) {
				this._tabIndex = this._indexes.find(index => index === location.hash.slice(1)) || this._indexes[0]
			} else {
				this._tabIndex = this._indexes[0]
			}
		}

		_setHandler(history) {
			if (history) {
				this._handler = e => location.hash = e.currentTarget.dataset.index
			} else {
				this._handler = e => {
					this._tabIndex = e.currentTarget.dataset.index
					this._switchTabs()
				}
			}
		}

		_setHashObserver() {
			window.addEventListener('hashchange', () => {
				const hash = location.hash.slice(1)

				if (!hash) {
					this._tabIndex = this._indexes[0]
					this._switchTabs()
				}

				if (this._indexes.find(index => index === hash)) {
					this._tabIndex = hash
					this._switchTabs()
				}
			})
		}

		_setControlsClickHandler() {
			this._controlsEl.forEach(el => el.addEventListener('click', this._handler))
		}

		_switchTabs() {
			this._switchControls()
			this._switchContainers()
		}

		_switchControls() {
			this._controlsEl.forEach( control => {
				String(this._tabIndex) === control.dataset.index ? control.classList.add(this._controlActiveClass) : control.classList.remove(this._controlActiveClass)
			})
		}

		_switchContainers() {
			this._containersEl.forEach( container => {
				String(this._tabIndex) === container.dataset.index ? container.classList.add(this._containerActiveClass) : container.classList.remove(this._containerActiveClass) 
			})
		}
	}

	const config = {
		control: '[data-control]',
		controlActiveClass: 'active',
		container: '[data-container]',
		containerActiveClass: 'active',
		history: true
	}

	document.querySelectorAll('[data-tabs]').forEach( tabs => {
		new Tabs(tabs, config)
	})

})
