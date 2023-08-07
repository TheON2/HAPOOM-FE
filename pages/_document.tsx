import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <title>Hapoom</title>
      <link rel="manifest" href="/manifest.json" />
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
