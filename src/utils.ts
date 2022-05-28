export const copyToClipboard = async (content: string) => {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(content);
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = content;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    document.execCommand('copy');

    document.body.removeChild(textArea);
  }
}

export const waitForSeconds = (durationInSeconds: number): Promise<void> =>
  new Promise(
    (resolve) => setTimeout(() => resolve(), durationInSeconds * 1000),
  );