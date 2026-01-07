'use client';

import { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Alert from '@/components/ui/Alert';
import { forgotPassword } from '@/lib/actions/auth';
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/lib/validations/auth';
import { ZodError } from 'zod';
import Button from '../ui/Button';

export default function ForgotForm() {
  const [email, setEmail] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof ForgotPasswordInput, string>>>({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors.email) {
      setErrors(prev => ({
        ...prev,
        email: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);
    setErrors({});

    try {

      // Validar con Zod
      const validatedData = forgotPasswordSchema.parse({ email });

      // Llamar a la acción de servidor
      const result = await forgotPassword(validatedData.email);

      if (result.success) {
        setAlert({
          type: 'success',
          message: result.message || 'Instrucciones enviadas a tu email',
        });
      } else {
        setAlert({
          type: 'error',
          message: result.error || 'Ocurrió un error al intentar recuperar la contraseña',
        });
      }
    } catch (error) {
      if (error instanceof ZodError) {
        // Convertir errores de Zod a objeto de errores
        const newErrors: Partial<Record<keyof ForgotPasswordInput, string>> = {};
        error.issues.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof ForgotPasswordInput] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        setAlert({
          type: 'error',
          message: 'Ocurrió un error inesperado',
        });
      }
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary-600">
          Recuperar Contraseña
        </h2>

        {alert && (
          <Alert type={alert.type} message={alert.message} className="mb-4" />
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="tu@email.com"
            value={email || ''}
            onChange={(e) => handleInputChange(e)}
            error={errors.email}
            required
            className="text-primary-700 active:text-primary-400 focus:text-primary-400"
          />

          <Button type="submit" variant="primary" size="md" fullWidth isLoading={loading} className="w-full">
            {loading ? 'Cargando...' : 'Enviar Instrucciones'}
          </Button>
        </form>

        <div className="mt-6 space-y-4">
          <Link href="/login" className="link text-sm">
            ¿Recordaste tu contraseña? Inicia sesión aquí
          </Link>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-neutral-500">O</span>
            </div>
          </div>

          <p className="text-center text-neutral-600 text-sm">
            ¿No tienes cuenta?{' '}
            <Link href="/register" className="link font-medium">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
