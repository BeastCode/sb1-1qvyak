import React from 'react';
import { Trash2 } from 'lucide-react';
import { SurveyControl } from '@/types/Survey';
import { Button } from '@/components/ui/Button';

interface SurveyQuestionCardProps {
  control: SurveyControl;
  index: number;
  onDelete: () => void;
}

export function SurveyQuestionCard({ control, index, onDelete }: SurveyQuestionCardProps) {
  const renderContent = () => {
    if (control.type === 'section') {
      return control.subtitle && (
        <p className="text-sm text-gray-600">{control.subtitle}</p>
      );
    }

    if (control.type === 'radio') {
      return (
        <div className="space-y-2">
          {control.options.map(option => (
            <div key={option.id} className="flex items-center space-x-2">
              <input
                type="radio"
                disabled
                className="h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label className="text-gray-700">{option.label}</label>
            </div>
          ))}
        </div>
      );
    }

    if (control.type === 'text') {
      return control.multiline ? (
        <textarea
          disabled
          rows={3}
          placeholder={control.placeholder}
          className="w-full p-2 border rounded-md bg-white resize-none"
        />
      ) : (
        <input
          type="text"
          disabled
          placeholder={control.placeholder}
          className="w-full p-2 border rounded-md bg-white"
        />
      );
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <span className="text-gray-500 mr-3">Q{index + 1}.</span>
          <div>
            <h3 className="font-medium text-gray-900">{control.title}</h3>
            <div className="flex items-center mt-1">
              <span className="text-sm text-gray-500 mr-2">Type: {control.type}</span>
              {control.required && (
                <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">Required</span>
              )}
            </div>
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          icon={Trash2}
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500"
        />
      </div>
      <div className="ml-8 mt-2">
        {renderContent()}
      </div>
    </div>
  );
}