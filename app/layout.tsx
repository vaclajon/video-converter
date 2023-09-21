import { Theme } from "@/components/Theme";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MP4 to MP3 converter",
  description: "Simple converter from MP4 to MP3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Video converter</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
