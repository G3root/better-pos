import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext, useFormContext } from "~/components/ui/form-context";
import { Button } from "~/components/ui/button";
import { TextField } from "~/components/ui/text-field";
import { TextareaField } from "~/components/ui/textarea-field";

interface SubscribeButtonProps extends React.ComponentProps<typeof Button> {
  label: string;
}

function SubscribeButton({ label, type = "submit", ...props }: SubscribeButtonProps) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button {...props} disabled={isSubmitting} type={type}>
          {label}
        </Button>
      )}
    </form.Subscribe>
  );
}

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField,
    TextareaField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});
