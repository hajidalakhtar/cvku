'use client';

import { Input } from '@/packages/components/ui/input'; // gunakan Input lokal
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface InputFormProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}

export default function InputForm<T extends FieldValues>({
  control,
  name,
  label,
  isRequired = false,
  placeholder,
  type,
  disabled = false
}: Readonly<InputFormProps<T>>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <div className="flex gap-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">
                {label}{' '}
                <span className="text-red-400">{isRequired && '*'}</span>
              </span>
            </label>
            <Input
              className="bg-white"
              onChange={onChange}
              value={value ?? ''}
              placeholder={placeholder}
              type={type}
              disabled={disabled}
              ref={ref}
              aria-invalid={!!error}
            />
            {error && (
              <p className="text-xs text-red-400 mt-2">
                * {error?.message?.toString()}
              </p>
            )}
          </div>
        </div>
      )}
    />
  );
}
