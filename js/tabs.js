document.addEventListener('DOMContentLoaded', function(){

	const tabContainerGroup = document.querySelectorAll('.tabs'); 

	tabContainerGroup.forEach( tabContainer => {

		const tabInfo = {
			current_tab_index: 1
		}

		const tabHeaderGroup = tabContainer.querySelectorAll('.tabs__header');
		const tabItemGroup = tabContainer.querySelectorAll('.tabs__item');

		switchTabs();

		tabContainer.addEventListener('click', function(event) {
			const target = event.target;

			if (target.closest('.tabs__header')) {
				const currentTabHeader = target.closest('.tabs__header');
				tabInfo.current_tab_index = Number(currentTabHeader.dataset.tabIndex);
				switchTabs();
			}
		});

		function switchTabs() {
			switchTabHeaders();
			switchTabItems();
		}


		function switchTabHeaders() {
			const currentTabIndex = tabInfo.current_tab_index;

		    tabHeaderGroup.forEach( tabHeader => {
		      if ( Number(tabHeader.dataset.tabIndex) === currentTabIndex ) {
		        tabHeader.classList.add('active');
		      } else {
		        tabHeader.classList.remove('active');
		      }
		    })
		}

		function switchTabItems() {
			const currentTabIndex = tabInfo.current_tab_index;

			tabItemGroup.forEach( tabItem => {
		      if ( Number(tabItem.dataset.tabIndex) === currentTabIndex ) {
		        tabItem.classList.add('active');
		      } else {
		        tabItem.classList.remove('active');
		      }
		    })
		}

	})
	
});