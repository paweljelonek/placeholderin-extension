export type Action = {
  label: string;
  icon: string;
  handler: (tab: chrome.tabs.Tab | null) => Promise<string | void>;
  primary?: boolean;
  settings?: boolean;
};
