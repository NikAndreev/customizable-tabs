document.addEventListener('DOMContentLoaded', function(){

	let tabContainerGroup = document.querySelectorAll('.js-tab-container'); 

	tabContainerGroup.forEach(tabContainer => {

		let tabInfo = {
			current_tab_index: 1
		}

		let tabHeaderGroup = tabContainer.querySelectorAll('.js-tab-header');
		let tabItemGroup = tabContainer.querySelectorAll('.js-tab-item');

		switchTabs();

		tabHeaderGroup.forEach(tabHeader => {
			tabHeader.addEventListener('click', function() {
				tabInfo.current_tab_index = this.dataset.tabIndex;
				switchTabs();
			});
		});

		function switchTabs() {
			switchTabHeaders();
			switchTabItems();
		}


		function switchTabHeaders() {
			let currentTabIndex = tabInfo.current_tab_index;

		    tabHeaderGroup.forEach( tabHeader => {
		      if (tabHeader.dataset.tabIndex == currentTabIndex) {
		        tabHeader.classList.add('active');
		      } else {
		        tabHeader.classList.remove('active');
		      }
		    })
		}

		function switchTabItems() {
			let currentTabIndex = tabInfo.current_tab_index;

			tabItemGroup.forEach( tabItem => {
		      if (tabItem.dataset.tabIndex == currentTabIndex) {
		        tabItem.classList.add('active');
		        setTimeout(() => {
		          tabItem.classList.add('transition');
		        });
		      } else {
		        tabItem.classList.remove('active');
		        tabItem.classList.remove('transition');
		      }
		    })
		}

	})
	
});