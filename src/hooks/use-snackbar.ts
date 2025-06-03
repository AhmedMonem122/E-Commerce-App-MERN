import { useState } from "react";

type Severity = "success" | "error" | "warning" | "info";

type SnackbarState = {
  open: boolean;
  message: string;
  severity: Severity;
};

type SnackbarHook = {
  snackbar: SnackbarState;
  setSnackbar: (state: SnackbarState) => void;
  closeSnackbar: () => void;
};

export const useSnackbar = (): SnackbarHook => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });

  const closeSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return {
    snackbar,
    setSnackbar,
    closeSnackbar,
  };
};