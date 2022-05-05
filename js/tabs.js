document.addEventListener('DOMContentLoaded', function(){

	class Tabs {
		constructor(tabs, config) {
			this._tabsEl = tabs
			this._control = config.control
			this._controlActiveClass = config.controlActiveClass
			this._controlEl = this._tabsEl.querySelectorAll(this._control)
			this._itemEl =  this._tabsEl.querySelectorAll(config.tab)
			this._itemActiveClass = config.tabActiveClass

			this._indexes = []
			this._controlEl.forEach(control => {
				this._indexes.push(control.dataset.index)
			})

			this._history = config.history
			if (this._history) {
				this._tabIndex = this._indexes.find(index => index === location.hash.slice(1)) || this._indexes[0]
				
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
			} else {
				this._tabIndex = this._indexes[0]
			}

			this._switchTabs()

			this._tabsEl.addEventListener('click', event => {
				if (event.target.closest(this._control)) {
					const index = event.target.closest(this._control).dataset.index

					if (this._history) {
						location.hash = index
					} else {
						this._tabIndex = index
						this._switchTabs()
					}
				}
			})
		}

		_switchTabs() {
			this._switchControl()
			this._switchItems()
		}

		_switchControl() {
			this._controlEl.forEach( control => {
				String(this._tabIndex) === control.dataset.index ? control.classList.add(this._controlActiveClass) : control.classList.remove(this._controlActiveClass)
			})
		}

		_switchItems() {
			this._itemEl.forEach( item => {
				String(this._tabIndex) === item.dataset.index ? item.classList.add(this._itemActiveClass) : item.classList.remove(this._itemActiveClass) 
			})
		}
	}

	new Tabs(document.querySelector('[data-tabs]'), {
		control: '[data-control]',
		controlActiveClass: 'active',
		tab: '[data-tab]',
		tabActiveClass: 'active',
		history: true
	})

})
