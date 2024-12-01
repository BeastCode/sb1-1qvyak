import React, { useState } from 'react';
import { Plus, ArrowLeft } from 'lucide-react';
import { Survey, SurveyControl } from '@/types/Survey';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { QuestionForm } from './QuestionForm';
import { SurveyQuestionCard } from './SurveyQuestionCard';

interface SurveyEditorProps {
  survey: Survey;
  onBack: () => void;
  onAddControl: (surveyId: string, control: Omit<SurveyControl, 'id' | 'order'>) => void;
  onUpdateControl: (surveyId: string, controlId: string, updates: Partial<SurveyControl>) => void;
  onDeleteControl: (surveyId: string, controlId: string) => void;
}

export function SurveyEditor({ survey, onBack, onAddControl, onUpdateControl, onDeleteControl }: SurveyEditorProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddQuestion = (control: Omit<SurveyControl, 'id' | 'order'>) => {
    onAddControl(survey.id, control);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="secondary"
            onClick={onBack}
            icon={ArrowLeft}
          >
            Back to Surveys
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">{survey.title}</h1>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          icon={Plus}
        >
          Add Question
        </Button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        {survey.description && (
          <p className="text-gray-600 mb-6">{survey.description}</p>
        )}

        <div className="space-y-6">
          {survey.controls.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">No questions yet. Add your first question above!</p>
            </div>
          ) : (
            survey.controls.map((control, index) => (
              <SurveyQuestionCard
                key={control.id}
                control={control}
                index={index}
                onDelete={() => onDeleteControl(survey.id, control.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* Debug Information */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Debug Information</h3>
        <pre className="whitespace-pre-wrap text-xs bg-white p-4 rounded border overflow-auto max-h-96">
          {JSON.stringify(survey, null, 2)}
        </pre>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Question"
      >
        <QuestionForm onSubmit={handleAddQuestion} />
      </Modal>
    </div>
  );
}