export function loadRemoteCss(_href: string[]) {
  return _href.map((href) => {
    return new Promise<void>((resolve, reject) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.onload = () => resolve();
      link.onerror = (err) => reject(err);
      document.head.appendChild(link);
    });
  });
}
