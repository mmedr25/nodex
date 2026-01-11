import { FormInput } from "./form-input";

export function FormEmail() {
  return (
    <FormInput
      name="email"
      label="Email"
      placeholder="you@example.com"
      type="email"
    />
  );
}
