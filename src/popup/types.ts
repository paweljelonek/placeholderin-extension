export type Action = {
  label: string;
  handler: (tab: chrome.tabs.Tab | null) => Promise<string | void>;
};
