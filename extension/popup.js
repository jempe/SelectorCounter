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

document.getElementById("count-button").addEventListener("click", () => {
	const selector = document.getElementById("selector").value;
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.scripting.executeScript(
			{
				target: { tabId: tabs[0].id },
				function: countElementsBySelector,
				args: [selector],
			},
			(results) => {
				document.getElementById("matching-count").innerText = results[0].result;
			}
		);
	});
});

function countLinks() {
	const links = document.getElementsByTagName("a");
	return links.length;
}

function countElementsBySelector(selector) {
	const elements = document.querySelectorAll(selector);
	return elements.length;
}
