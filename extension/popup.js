document.getElementById('count-button').addEventListener('click', async () => {
	const cssSelector = document.getElementById('css-selector').value;
	const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	const code = `document.querySelectorAll('${cssSelector.replace(/'/g, "\\'")}').length`;

	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: new Function(code)
	}, ([result]) => {
		document.getElementById('result').textContent = `Total elements: ${result.result}`;
	});
});
