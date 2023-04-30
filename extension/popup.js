chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	chrome.scripting.executeScript(
		{
			target: { tabId: tabs[0].id },
			function: countLinks,
		},
		(results) => {
			document.getElementById("link-count").innerText = results[0].result;
		}
	);
});

function countLinks() {
	const links = document.getElementsByTagName("a");
	return links.length;
}
