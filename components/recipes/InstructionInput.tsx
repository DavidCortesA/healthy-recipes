'use client'

import { useState } from 'react';
import { Plus, X, ChevronDown, ChevronUp } from 'lucide-react';

// ============================================
// INSTRUCTION INPUT COMPONENT
// ============================================

interface Instruction {
  id: string;
  step: number;
  description: string;
  time?: number;
  image?: string;
}

interface InstructionInputProps {
  value: Instruction[];
  onChange: (instructions: Instruction[]) => void;
}

export function InstructionInput({ value, onChange }: InstructionInputProps) {
  const [instructions, setInstructions] = useState<Instruction[]>(value);

  const addInstruction = () => {
    const newInstruction: Instruction = {
      id: Date.now().toString(),
      step: instructions.length + 1,
      description: ''
    };
    const updated = [...instructions, newInstruction];
    setInstructions(updated);
    onChange(updated);
  };

  const removeInstruction = (id: string) => {
    const updated = instructions
      .filter(inst => inst.id !== id)
      .map((inst, index) => ({ ...inst, step: index + 1 }));
    setInstructions(updated);
    onChange(updated);
  };

  const updateInstruction = (id: string, field: keyof Instruction, value: string | number) => {
    const updated = instructions.map(inst =>
      inst.id === id ? { ...inst, [field]: value } : inst
    );
    setInstructions(updated);
    onChange(updated);
  };

  const moveInstruction = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= instructions.length) return;

    const updated = [...instructions];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    
    // Renumerar pasos
    const renumbered = updated.map((inst, idx) => ({ ...inst, step: idx + 1 }));
    setInstructions(renumbered);
    onChange(renumbered);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-neutral-700">
          Instrucciones
        </label>
        <button
          type="button"
          onClick={addInstruction}
          className="btn-ghost text-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Agregar Paso
        </button>
      </div>

      <div className="space-y-3">
        {instructions.map((instruction, index) => (
          <div key={instruction.id} className="flex gap-3 items-start bg-neutral-50 p-4 rounded-lg">
            {/* Step number and controls */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">
                {instruction.step}
              </div>
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => moveInstruction(index, 'up')}
                  disabled={index === 0}
                  className="text-neutral-400 hover:text-neutral-600 disabled:opacity-30"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveInstruction(index, 'down')}
                  disabled={index === instructions.length - 1}
                  className="text-neutral-400 hover:text-neutral-600 disabled:opacity-30"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-3">
              <textarea
                placeholder="Describe este paso..."
                value={instruction.description}
                onChange={(e) => updateInstruction(instruction.id, 'description', e.target.value)}
                rows={3}
                className="textarea"
              />
              
              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="Tiempo (min, opcional)"
                  value={instruction.time || ''}
                  onChange={(e) => updateInstruction(instruction.id, 'time', parseInt(e.target.value))}
                  className="input w-48"
                />
              </div>
            </div>

            {/* Remove button */}
            <button
              type="button"
              onClick={() => removeInstruction(instruction.id)}
              className="p-2 text-error hover:bg-error-light/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {instructions.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-neutral-200 rounded-lg">
          <p className="text-neutral-600 mb-4">No hay instrucciones agregadas</p>
          <button
            type="button"
            onClick={addInstruction}
            className="btn-primary"
          >
            <Plus className="w-5 h-5 inline mr-2" />
            Agregar Primer Paso
          </button>
        </div>
      )}
    </div>
  );
}