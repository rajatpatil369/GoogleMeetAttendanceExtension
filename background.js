const rules = [
    {
        conditions: [
            new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {
                    urlMatches: "https:\/\/meet\.google\.com\/[[:lower:]]{3}\-[[:lower:]]{4}\-[[:lower:]]{3}",
                    ports: [443]
                },
                css: [
                    // "div[class='MQKmmc SudKRc L7osyb wYNW7d']"
                    // "div[class='ThdJC kaAt2 c0XF8e s7PhZd sVoT0c KKjvXb']"
                    "div[class='CYZUZd']"
                ]
            })
        ],
        actions: [
            new chrome.declarativeContent.ShowPageAction()
        ]
    }
];

chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        chrome.declarativeContent.onPageChanged.addRules(rules);
    });
});

chrome.pageAction.onClicked.addListener(() => {
    console.log('background.js: Executing content script...');
    chrome.tabs.executeScript({
        file: "content.js"
    });
});
