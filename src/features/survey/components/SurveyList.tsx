import React, { useState } from 'react';
import { ClipboardList, Pencil, Trash2, FileSearch } from 'lucide-react';
import { Survey } from '@/features/survey/types/Survey';
import { Button } from '@/components/ui/Button';
import { SurveyPreview } from './SurveyPreview';

interface SurveyListProps {
  surveys: Survey[];
  onEdit: (survey: Survey) => void;
  onDelete: (id: string) => void;
}

export function SurveyList({ surveys, onEdit, onDelete }: SurveyListProps) {
  const [previewSurvey, setPreviewSurvey] = useState<Survey | null>(null);

  if (surveys.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-gray-100">
          <ClipboardList className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No surveys</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new survey.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {surveys.map((survey) => (
        <div
          key={survey.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{survey.title}</h3>
              {survey.description && (
                <p className="mt-1 text-sm text-gray-500">{survey.description}</p>
              )}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                size="sm"
                icon={FileSearch}
                onClick={(e) => {
                  e.stopPropagation();
                  setPreviewSurvey(survey);
                }}
              />
              <Button
                variant="secondary"
                size="sm"
                icon={Pencil}
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(survey);
                }}
              />
              <Button
                variant="danger"
                size="sm"
                icon={Trash2}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(survey.id);
                }}
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-sm text-gray-500">
              {survey.controls.length} questions
            </div>
            <div className="text-sm text-gray-500">
              Created: {survey.createdAt.toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}

      {previewSurvey && (
        <SurveyPreview
          survey={previewSurvey}
          onClose={() => setPreviewSurvey(null)}
        />
      )}
    </div>
  );
}