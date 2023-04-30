document.getElementById('count-button').addEventListener('click', () => {
	const cssSelector = document.getElementById('css-selector').value;
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.tabs.executeScript(tabs[0].id, {
			code: `document.querySelectorAll('${cssSelector.replace(/'/g, "\\'")}').length`
		}, (results) => {
			document.getElementById('result').textContent = `Total elements: ${results[0]}`;
		});
	});
});
