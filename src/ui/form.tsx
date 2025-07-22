import { FormField, FormData } from "@/lib/types";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "./button";

//Project: Dashboard APP
// Module: UI
// Component: Form.tsx
// Author: Advyta
// Date: 28/06/2025
// Logic:
// This module is a reusable form component that can be used across different pages
// It accepts props for fields, title, submit button text, and onSubmit handler

interface FormProps {
  fields: FormField[];
  title: string;
  submitButtonText: string;
  onSubmit: (data: FormData) => void;
  loading?: boolean;
  error?: string;
  className?: string;
}

const Form: React.FC<FormProps> = React.memo(
  ({
    fields,
    title,
    submitButtonText,
    onSubmit,
    loading = false,
    error,
    className = "",
  }) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>();

    const handleFormSubmit: SubmitHandler<FormData> = (data) => {
      onSubmit(data);
    };

    return (
      <div className={`max-w-md w-full space-y-8 ${className}`}>
        <div className="text-center">
          <h1 className="text-3xl font-bold">{title}</h1>
          {loading && <p className="text-blue-400">Loading...</p>}
          {error && <p className="text-red-400">{error}</p>}
        </div>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="mt-8 space-y-6"
        >
          <fieldset className="space-y-4 border-1 border-gray-400 rounded-lg p-4">
            <div className="rounded-md space-y-4">
              {fields.map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block text-m font-medium text-gray-100"
                  >
                    {field.label}
                    {field.required && <span className="text-red-400">*</span>}
                  </label>
                  <input
                    type={field.type}
                    id={field.name}
                    {...register(field.name, { required: field.required })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-200 focus:border-indigo-200"
                    placeholder={
                      field.placeholder || `Enter your ${field.name}`
                    }
                  />
                  {errors[field.name] && (
                    <span className="text-red-400 text-sm">
                      {field.error || "This field is required"}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={loading}
                loadingText="Processing..."
                fullWidth
              >
                {submitButtonText}
              </Button>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
);

Form.displayName = "Form";

export default Form;
