import React, { useState } from 'react';
import { Survey, SurveyControl } from '../types/Survey';
import { Button } from '@/components/ui/Button';
import { PhoneFrame } from '@/components/ui/PhoneFrame';

interface SurveyPreviewProps {
  survey: Survey;
  onClose: () => void;
}

interface SurveyResponse {
  [key: string]: string;
}

export function SurveyPreview({ survey, onClose }: SurveyPreviewProps) {
  const [responses, setResponses] = useState<SurveyResponse>({});

  const handleInputChange = (controlId: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [controlId]: value
    }));
  };

  const renderControl = (control: SurveyControl) => {
    if (control.type === 'section') {
      return (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">{control.title}</h3>
          {control.subtitle && (
            <p className="mt-1 text-sm text-gray-500">{control.subtitle}</p>
          )}
        </div>
      );
    }

    if (control.type === 'radio') {
      return (
        <div className="space-y-2">
          {control.options.map(option => (
            <div key={option.id} className="flex items-center">
              <input
                type="radio"
                id={`${control.id}-${option.id}`}
                name={control.id}
                value={option.value}
                checked={responses[control.id] === option.value}
                onChange={(e) => handleInputChange(control.id, e.target.value)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <label
                htmlFor={`${control.id}-${option.id}`}
                className="ml-2 block text-sm text-gray-700"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      );
    }

    if (control.type === 'text') {
      return control.multiline ? (
        <textarea
          value={responses[control.id] || ''}
          onChange={(e) => handleInputChange(control.id, e.target.value)}
          placeholder={control.placeholder}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      ) : (
        <input
          type="text"
          value={responses[control.id] || ''}
          onChange={(e) => handleInputChange(control.id, e.target.value)}
          placeholder={control.placeholder}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="relative">
        <PhoneFrame>
          <div className="p-4 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{survey.title}</h2>
              {survey.description && (
                <p className="mt-1 text-sm text-gray-600">{survey.description}</p>
              )}
            </div>

            <div className="space-y-6">
              {survey.controls.map((control) => (
                <div key={control.id} className="space-y-2">
                  {control.type !== 'section' && (
                    <label className="block text-sm font-medium text-gray-700">
                      {control.title}
                      {control.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                  )}
                  {renderControl(control)}
                </div>
              ))}
            </div>
          </div>
        </PhoneFrame>

        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
          <Button variant="secondary" onClick={onClose}>
            Close Preview
          </Button>
        </div>
      </div>
    </div>
  );
}