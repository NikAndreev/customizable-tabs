document.addEventListener("DOMContentLoaded", function(){

	let tabContainerGroup = document.querySelectorAll(".tab-container"); 

	tabContainerGroup.forEach(tabContainer => {
		let tabHeaderGroup = tabContainer.querySelectorAll(".tab-header");
		let tabItemGroup = tabContainer.querySelectorAll(".tab-item");

		tabHeaderGroup[0].classList.add("active");
		tabItemGroup[0].classList.add("active");
		tabItemGroup[0].classList.add("transition");

		tabHeaderGroup.forEach(tabHeader => {
			tabHeader.addEventListener("click", function() {
				let currentTabIndex = this.dataset.tabIndex;

				tabHeaderGroup.forEach(tabHeader => {
					let tabHeaderIndex = tabHeader.dataset.tabIndex;

					(currentTabIndex === tabHeaderIndex) ? tabHeader.classList.add("active") : tabHeader.classList.remove("active"); 
				})

				tabItemGroup.forEach( tabItem => {
					let tabItemIndex = tabItem.dataset.tabIndex;

					if (currentTabIndex === tabItemIndex) {
						tabItem.classList.add("active");
						setTimeout(() => {
							tabItem.classList.add("transition");
						});
					} else {
						tabItem.classList.remove("active");
						tabItem.classList.remove("transition");
					}

				})
			});
		});
	})
	
});