document.addEventListener('DOMContentLoaded', function(){

	class Tabs {
		#tabIndex
		#indexes = []
		#tabsEl
		#control
		#controlActiveClass
		#controlEl
		#itemEl
		#itemActiveClass
		#history

		constructor(tabs, config) {
			this.#tabsEl = tabs
			this.#control = config.control
			this.#controlActiveClass = config.controlActiveClass
			this.#controlEl = this.#tabsEl.querySelectorAll(this.#control)
			this.#itemEl =  this.#tabsEl.querySelectorAll(config.tab)
			this.#itemActiveClass = config.tabActiveClass
			
			this.#controlEl.forEach(control => {
				this.#indexes.push(control.dataset.index)
			})

			this.#history = config.history
			if (this.#history) {
				this.#tabIndex = this.#indexes.find(index => index === location.hash.slice(1)) || this.#indexes[0]
				
				window.addEventListener('hashchange', () => {
					const hash = location.hash.slice(1)

					if (!hash) {
						this.#tabIndex = this.#indexes[0]
						this.#switchTabs()
					}

					if (this.#indexes.find(index => index === hash)) {
						this.#tabIndex = hash
						this.#switchTabs()
					}
				})
			} else {
				this.#tabIndex = this.#indexes[0]
			}

			this.#switchTabs()

			this.#tabsEl.addEventListener('click', event => {
				if (event.target.closest(this.#control)) {
					const index = event.target.closest(this.#control).dataset.index

					if (this.#history) {
						location.hash = index
					} else {
						this.#tabIndex = index
						this.#switchTabs()
					}
				}
			})
		}

		#switchTabs() {
			this.#switchControl()
			this.#switchItems()
		}

		#switchControl() {
			this.#controlEl.forEach( control => {
				String(this.#tabIndex) === control.dataset.index ? control.classList.add(this.#controlActiveClass) : control.classList.remove(this.#controlActiveClass)
			})
		}

		#switchItems() {
			this.#itemEl.forEach( item => {
				String(this.#tabIndex) === item.dataset.index ? item.classList.add(this.#itemActiveClass) : item.classList.remove(this.#itemActiveClass) 
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
