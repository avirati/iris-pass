interface IWebsite {
  heroLetter: string;
  hostname: string;
}

export const copyToClipboard = async (content: Optional<string>) => {
  if (!content) return;

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
};

export const waitForSeconds = (durationInSeconds: number): Promise<void> =>
  new Promise((resolve) =>
    setTimeout(() => resolve(), durationInSeconds * 1000)
  );

export const parseWebsite = (website: string): IWebsite => {
  const out: IWebsite = {
    heroLetter: '',
    hostname: '',
  };
  try {
    const url = new URL(website);
    out.heroLetter = url.hostname[0];
    out.hostname = url.hostname;
  } catch (error) {
    out.heroLetter = website[0];
    out.hostname = website;
  }

  return out;
};

export const validateIP = (ip: string) => {
  const regex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/g;
  return regex.test(ip);
};

export const toDictionary = <T>(
  array: T[],
  key: keyof T
): Record<string, T> => {
  const out: Record<string, T> = {};

  array.forEach((object) => {
    out[String(object[key])] = object;
  });

  return out;
};
