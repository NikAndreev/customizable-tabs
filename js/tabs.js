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
			const target = event.target;

			if (target.closest('.tabs__header')) {
				const tabHeaderCurrent = target.closest('.tabs__header');
				tabInfo.tab_index_current = Number(tabHeaderCurrent.dataset.tabIndex);
				switchTabs();
			}
		});

		function switchTabs() {
			switchTabHeaders();
			switchTabItems();
		}


		function switchTabHeaders() {
			const tabIndexСurrent = tabInfo.tab_index_current;

		    tabHeaderGroup.forEach( tabHeader => {
		      if ( Number(tabHeader.dataset.tabIndex) === tabIndexСurrent ) {
		        tabHeader.classList.add('active');
		      } else {
		        tabHeader.classList.remove('active');
		      }
		    })
		}

		function switchTabItems() {
			const tabIndexСurrent = tabInfo.tab_index_current;

			tabItemGroup.forEach( tabItem => {
		      if ( Number(tabItem.dataset.tabIndex) === tabIndexСurrent ) {
		        tabItem.classList.add('active');
		      } else {
		        tabItem.classList.remove('active');
		      }
		    })
		}

	})
	
});