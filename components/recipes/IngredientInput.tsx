'use client'

import { useState } from 'react';
import { Plus, X, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';

// ============================================
// INGREDIENT INPUT COMPONENT
// ============================================

interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  group?: string;
  notes?: string;
  isOptional?: boolean;
}

interface IngredientInputProps {
  value: Ingredient[];
  onChange: (ingredients: Ingredient[]) => void;
}

const units = [
  'gr', 'kg', 'ml', 'l', 'tazas', 'cucharadas', 'cucharaditas',
  'piezas', 'unidades', 'dientes', 'rebanadas', 'al gusto', 'pizca'
];

const ingredientGroups = [
  'Proteína', 'Vegetales', 'Carbohidratos', 'Lácteos',
  'Condimentos', 'Especias', 'Grasas', 'Otros'
];

export function IngredientInput({ value, onChange }: IngredientInputProps) {
  const [ingredients, setIngredients] = useState<Ingredient[]>(value);

  const addIngredient = () => {
    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      name: '',
      quantity: 0,
      unit: 'gr',
      group: 'Otros'
    };
    const updated = [...ingredients, newIngredient];
    setIngredients(updated);
    onChange(updated);
  };

  const removeIngredient = (id: string) => {
    const updated = ingredients.filter(ing => ing.id !== id);
    setIngredients(updated);
    onChange(updated);
  };

  const updateIngredient = (id: string, field: keyof Ingredient, value: string | number | boolean) => {
    const updated = ingredients.map(ing =>
      ing.id === id ? { ...ing, [field]: value } : ing
    );
    setIngredients(updated);
    onChange(updated);
  };

  const moveIngredient = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= ingredients.length) return;

    const updated = [...ingredients];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setIngredients(updated);
    onChange(updated);
  };

  // Agrupar ingredientes
  const groupedIngredients = ingredients.reduce((acc, ing, index) => {
    const group = ing.group || 'Otros';
    if (!acc[group]) acc[group] = [];
    acc[group].push({ ...ing, index });
    return acc;
  }, {} as Record<string, (Ingredient & { index: number })[]>);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-neutral-700">
          Ingredientes
        </label>
        <button
          type="button"
          onClick={addIngredient}
          className="btn-ghost text-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Agregar Ingrediente
        </button>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedIngredients).map(([group, groupIngredients]) => (
          <div key={group} className="space-y-3">
            <h4 className="text-sm font-bold text-primary-700 bg-primary-50 px-3 py-2 rounded-lg">
              {group}
            </h4>
            {groupIngredients.map(({ index, ...ing }) => (
              <div key={ing.id} className="flex gap-2 items-start bg-neutral-50 p-3 rounded-lg">
                {/* Drag handle */}
                <div className="flex flex-col gap-1 pt-2">
                  <button
                    type="button"
                    onClick={() => moveIngredient(index, 'up')}
                    disabled={index === 0}
                    className="text-neutral-400 hover:text-neutral-600 disabled:opacity-30"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <GripVertical className="w-4 h-4 text-neutral-400" />
                  <button
                    type="button"
                    onClick={() => moveIngredient(index, 'down')}
                    disabled={index === ingredients.length - 1}
                    className="text-neutral-400 hover:text-neutral-600 disabled:opacity-30"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-2">
                  {/* Name */}
                  <input
                    type="text"
                    placeholder="Nombre del ingrediente"
                    value={ing.name}
                    onChange={(e) => updateIngredient(ing.id, 'name', e.target.value)}
                    className="input md:col-span-5"
                  />

                  {/* Quantity */}
                  <input
                    type="number"
                    placeholder="Cant."
                    value={ing.quantity || ''}
                    onChange={(e) => updateIngredient(ing.id, 'quantity', parseFloat(e.target.value))}
                    className="input md:col-span-2"
                  />

                  {/* Unit */}
                  <select
                    value={ing.unit}
                    onChange={(e) => updateIngredient(ing.id, 'unit', e.target.value)}
                    className="select md:col-span-2"
                  >
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>

                  {/* Group */}
                  <select
                    value={ing.group || 'Otros'}
                    onChange={(e) => updateIngredient(ing.id, 'group', e.target.value)}
                    className="select md:col-span-3"
                  >
                    {ingredientGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>

                  {/* Notes */}
                  <input
                    type="text"
                    placeholder="Notas (opcional)"
                    value={ing.notes || ''}
                    onChange={(e) => updateIngredient(ing.id, 'notes', e.target.value)}
                    className="input md:col-span-9"
                  />

                  {/* Optional checkbox */}
                  <label className="flex items-center gap-2 md:col-span-3">
                    <input
                      type="checkbox"
                      checked={ing.isOptional || false}
                      onChange={(e) => updateIngredient(ing.id, 'isOptional', e.target.checked)}
                      className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-neutral-600">Opcional</span>
                  </label>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeIngredient(ing.id)}
                  className="p-2 text-error hover:bg-error-light/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>

      {ingredients.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-neutral-200 rounded-lg">
          <p className="text-neutral-600 mb-4">No hay ingredientes agregados</p>
          <button
            type="button"
            onClick={addIngredient}
            className="btn-primary"
          >
            <Plus className="w-5 h-5 inline mr-2" />
            Agregar Primer Ingrediente
          </button>
        </div>
      )}
    </div>
  );
}