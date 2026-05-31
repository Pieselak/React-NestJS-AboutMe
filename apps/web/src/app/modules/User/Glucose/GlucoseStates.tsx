import { AlertCircle, LoaderCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export function GlucoseLoadingState() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-40 items-center justify-center rounded-xl border border-border bg-muted/30 p-6 text-muted-foreground">
      <LoaderCircle className="mr-2 size-5 animate-spin" />
      {t("pages.user.glucose.loading")}
    </div>
  );
}

type GlucoseMessageStateProps = {
  message: string;
};

export function GlucoseMessageState({ message }: GlucoseMessageStateProps) {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center text-muted-foreground">
      {message}
    </div>
  );
}

export function GlucoseErrorState({ message }: GlucoseMessageStateProps) {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-xl border border-destructive/40 bg-destructive/10 p-6 text-center text-destructive">
      <AlertCircle className="mr-2 size-5 shrink-0" />
      {message}
    </div>
  );
}
