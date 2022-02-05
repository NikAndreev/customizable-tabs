document.addEventListener('DOMContentLoaded', function(){

	const tabContainerGroup = document.querySelectorAll('.tabs'); 

	tabContainerGroup.forEach( tabContainer => {

		const tabInfo = {
			tab_index_current: 1
		}

		const tabHeaderGroup = tabContainer.querySelectorAll('.tabs__header');
		const tabItemGroup = tabContainer.querySelectorAll('.tabs__item');

		switchTabs();

		tabContainer.addEventListener('click', function(event) {
			if (event.target.closest('.tabs__header')) {
				tabInfo.tab_index_current = Number(event.target.closest('.tabs__header').dataset.tabIndex);
				switchTabs();
			}
		});

		function switchTabs() {
			switchTabHeaders();
			switchTabItems();
		}

		function switchTabHeaders() {
			tabHeaderGroup.forEach( tabHeader => {
				Number(tabHeader.dataset.tabIndex) === tabInfo.tab_index_current ? tabHeader.classList.add('active') : tabHeader.classList.remove('active')
			})
		}

		function switchTabItems() {
			tabItemGroup.forEach( tabItem => {
				Number(tabItem.dataset.tabIndex) === tabInfo.tab_index_current ? tabItem.classList.add('active') : tabItem.classList.remove('active')
			})
		}

	})
	
});