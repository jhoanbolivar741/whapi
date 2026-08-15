import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { PasswordInput } from '@/components/ui/password-input'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import { useSelector } from '@tanstack/react-form'
import { useFieldContext, useFormContext } from './form-context'

export function TextField({
  label,
  type,
  description,
  labelIcon,
  ...props
}: React.ComponentProps<typeof Input> & {
  label: string
  description?: string
  labelIcon?: React.ReactNode
}) {
  const field = useFieldContext<string | number>()

  const errors = useSelector(field.store, (state) => state.meta.errors)

  const isInvalid = useSelector(
    field.store,
    (state) => !state.meta.isValid && state.meta.isTouched,
  )

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel
        htmlFor={field.name}
        className="[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
      >
        {labelIcon}
        {label}
      </FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onChange={(e) =>
          field.handleChange(
            type === 'number' && e.target.value !== ''
              ? Number(e.target.value)
              : e.target.value,
          )
        }
        onBlur={field.handleBlur}
        aria-invalid={isInvalid}
        type={type}
        {...props}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
      {isInvalid && <FieldError errors={errors} />}
    </Field>
  )
}

export function TextFieldGroup({
  label,
  type,
  description,
  labelIcon,
  startAddon,
  endAddon,
  ...props
}: React.ComponentProps<typeof Input> & {
  label: string
  description?: string
  labelIcon?: React.ReactNode
  startAddon?: React.ReactNode
  endAddon?: React.ReactNode
}) {
  const field = useFieldContext<string | number>()

  const errors = useSelector(field.store, (state) => state.meta.errors)

  const isInvalid = useSelector(
    field.store,
    (state) => !state.meta.isValid && state.meta.isTouched,
  )

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel
        htmlFor={field.name}
        className="[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
      >
        {labelIcon}
        {label}
      </FieldLabel>
      <FieldContent>
        <InputGroup>
          <InputGroupInput
            id={field.name}
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) =>
              field.handleChange(
                type === 'number' && e.target.value !== ''
                  ? Number(e.target.value)
                  : e.target.value,
              )
            }
            aria-invalid={isInvalid}
            placeholder={props.placeholder}
            type={type}
            step={1}
          />
          {startAddon && (
            <InputGroupAddon align="inline-start">{startAddon}</InputGroupAddon>
          )}
          {endAddon && (
            <InputGroupAddon align="inline-end">{endAddon}</InputGroupAddon>
          )}
        </InputGroup>
        {description && <FieldDescription>{description}</FieldDescription>}
        {isInvalid && <FieldError errors={errors} />}
      </FieldContent>
    </Field>
  )
}

export function PasswordField({
  label,
  ...props
}: React.ComponentProps<'input'> & {
  label: string
}) {
  const field = useFieldContext<string>()

  const errors = useSelector(field.store, (state) => state.meta.errors)

  const isInvalid = useSelector(
    field.store,
    (state) => !state.meta.isValid && state.meta.isTouched,
  )

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <PasswordInput
        id={field.name}
        name={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        aria-invalid={isInvalid}
        {...props}
      />
      {isInvalid && <FieldError errors={errors} />}
    </Field>
  )
}

export function TextAreaField({
  label,
  description,
  labelIcon,
  ...props
}: React.ComponentProps<typeof Textarea> & {
  label: string
  description?: string
  labelIcon?: React.ReactNode
}) {
  const field = useFieldContext<string>()

  const errors = useSelector(field.store, (state) => state.meta.errors)

  const isInvalid = useSelector(
    field.store,
    (state) => !state.meta.isValid && state.meta.isTouched,
  )

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel
        htmlFor={field.name}
        className="[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
      >
        {labelIcon}
        {label}
      </FieldLabel>
      <Textarea
        id={field.name}
        name={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        aria-invalid={isInvalid}
        {...props}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
      {isInvalid && <FieldError errors={errors} />}
    </Field>
  )
}

export function SelectField({
  items,
  label,
  description,
  labelIcon,
  options,
  contentProps,
  ...props
}: React.ComponentProps<typeof Select> & {
  label: string
  description?: string
  labelIcon?: React.ReactNode
  options: { value: string; label: string }[]
  contentProps?: React.ComponentProps<typeof SelectContent>
  nullable?: boolean
}) {
  const field = useFieldContext<string | null>()

  const errors = useSelector(field.store, (state) => state.meta.errors)

  const isInvalid = useSelector(
    field.store,
    (state) => !state.meta.isValid && state.meta.isTouched,
  )

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel
        htmlFor={field.name}
        className="[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
      >
        {labelIcon}
        {label}
      </FieldLabel>
      <Select
        items={items ?? options}
        name={field.name}
        value={field.state.value}
        onValueChange={(value) => {
          if (typeof value === 'string' && value.length > 0) {
            field.handleChange(value)
          } else if (value === null || value === undefined) {
            field.handleChange(null)
          }
        }}
        {...props}
      >
        <SelectTrigger id={field.name} aria-invalid={isInvalid}>
          <SelectValue placeholder="Selecciona una opción" />
        </SelectTrigger>
        <SelectContent {...contentProps}>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {description && <FieldDescription>{description}</FieldDescription>}
      {isInvalid && <FieldError errors={errors} />}
    </Field>
  )
}

export function BigCheckboxField({
  label,
  description,
  ...props
}: React.ComponentProps<typeof Checkbox> & {
  label: string
  description?: string
}) {
  const field = useFieldContext<boolean | undefined>()

  const errors = useSelector(field.store, (state) => state.meta.errors)

  const isInvalid = useSelector(
    field.store,
    (state) => !state.meta.isValid && state.meta.isTouched,
  )

  return (
    <FieldGroup>
      <FieldLabel
        id={field.name}
        className="hover:bg-accent/50 has-aria-checked:border-primary has-aria-checked:bg-primary/10 flex w-full cursor-pointer items-start gap-3 rounded-lg border p-3"
      >
        <Checkbox
          id={field.name}
          name={field.name}
          checked={field.state.value}
          onCheckedChange={(checked) => field.handleChange(checked === true)}
          className="data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
          {...props}
        />
        <div className="grid gap-1.5 font-normal">
          <p className="text-muted-foreground text-sm leading-none font-semibold">
            {label}
          </p>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </FieldLabel>
      {isInvalid && <FieldError errors={errors} />}
    </FieldGroup>
  )
}

export function SubmitButton({
  label,
  type = 'submit',
  icon,
  ...props
}: React.ComponentProps<typeof Button> & {
  label: string
  icon?: React.ReactNode
}) {
  const form = useFormContext()
  return (
    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
      {([canSubmit, isSubmitting]) => (
        <Button type={type} disabled={!canSubmit || isSubmitting} {...props}>
          {isSubmitting ? <Spinner /> : icon}
          {label}
        </Button>
      )}
    </form.Subscribe>
  )
}
