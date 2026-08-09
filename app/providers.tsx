"use client";

import type { ReactNode } from "react";
import type { ThemeProviderProps } from "next-themes/dist/types";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export interface ProvidersProps {
  children: ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </NextUIProvider>
  );
}
