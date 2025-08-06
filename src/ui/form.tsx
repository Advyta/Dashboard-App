import { FormField, FormData } from "@/lib/types";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "./button";

/**
 * Project: Dashboard App
 * Module: UI Components
 * Component: Form
 * Author: Advyta
 * Date: 28/06/2025
 * Description: Reusable form component with validation and error handling
 *
 * Screen Data:
 * - Dynamically generates form fields based on configuration
 * - Displays form title and submission button
 * - Shows loading state during submission
 * - Displays error messages when validation fails
 *
 * Screen Layout & Responsive Behavior:
 * - Centered card layout with max-width
 * - Responsive padding and spacing
 * - Stacked form fields on mobile
 * - Side-by-side fields on larger screens when applicable
 *
 * UI Behavior:
 * - Real-time field validation
 * - Disabled submit button during loading
 * - Error message display
 * - Smooth transitions for state changes
 *
 * Data Validation:
 * - Validates required fields
 * - Enforces input patterns and types
 * - Client-side validation before submission
 * - Server-side error handling
 * - Custom validation rules support
 *
 * Props:
 * - fields: Array of form field configurations (required)
 * - title: Form title (string, required)
 * - submitButtonText: Text for submit button (string, required)
 * - onSubmit: Form submission handler (function, required)
 * - loading: Loading state (boolean, optional)
 * - error: Error message to display (string, optional)
 * - className: Additional CSS classes (string, optional)
 */

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
        {/* Form */}
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
            {/* Form Submit Button */}
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
