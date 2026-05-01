export async function openSettings(): Promise<void> {
  chrome.runtime.openOptionsPage();
}
