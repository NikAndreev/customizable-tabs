document.addEventListener("DOMContentLoaded", function(){

	let tabContainerGroup = document.querySelectorAll(".js-tab-container"); 

	tabContainerGroup.forEach(tabContainer => {

		let tabInfo = {
			current_tab: 1
		}

		let tabHeaderGroup = tabContainer.querySelectorAll(".js-tab-header");
		let tabItemGroup = tabContainer.querySelectorAll(".js-tab-item");

		switchTabs();

		tabHeaderGroup.forEach(tabHeader => {
			tabHeader.addEventListener("click", function() {
				tabInfo.current_tab = this.dataset.tabIndex;
				switchTabs();
			});
		});

		function switchTabs() {
			switchTabHeaders();
			switchTabItems();
		}


		function switchTabHeaders() {
		    tabHeaderGroup.forEach( tabHeader => {
		      if (tabHeader.dataset.tabIndex == tabInfo.current_tab) {
		        tabHeader.classList.add("active");
		      } else {
		        tabHeader.classList.remove("active");
		      }
		    })
		}

		function switchTabItems() {
			tabItemGroup.forEach( tabItem => {
		      if (tabItem.dataset.tabIndex == tabInfo.current_tab) {
		        tabItem.classList.add("active");
		        setTimeout(() => {
		          tabItem.classList.add("transition");
		        });
		      } else {
		        tabItem.classList.remove("active");
		        tabItem.classList.remove("transition");
		      }
		    })
		}

	})
	
});