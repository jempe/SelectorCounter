// Check the last saved selector and set it as the default value
chrome.storage.sync.get("lastSelector", (data) => {
	if (data.lastSelector) {
		document.getElementById("selector").value = data.lastSelector;
	}
});

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	const selector = document.getElementById("selector").value;

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

document.getElementById("count-button").addEventListener("click", () => {
	const selector = document.getElementById("selector").value;

	// Save the entered CSS selector to storage
	chrome.storage.sync.set({ lastSelector: selector });

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

function countElementsBySelector(selector) {
	const elements = document.querySelectorAll(selector);
	return elements.length;
}
