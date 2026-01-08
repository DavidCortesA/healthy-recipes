'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import { loginUser } from '@/lib/actions/auth';
import { loginSchema, type LoginInput } from '@/lib/validations/auth';
import { ZodError } from 'zod';
import Button from '../ui/Button';
import { Alert } from '../ui/Alert';

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginInput, string>>>({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name as keyof LoginInput]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);
    setErrors({});

    try {
      const validatedData = loginSchema.parse(formData);
      const result = await loginUser(validatedData);

      if (result.success) {
        setAlert({
          type: 'success',
          message: result.message || 'Iniciando sesión...',
        });
        
        setTimeout(() => {
          router.refresh(); // ← Forzar refresh del servidor
          router.push('/');
        }, 1000);
      } else {
        setAlert({
          type: 'error',
          message: result.error || 'Error al iniciar sesión',
        });
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: Partial<Record<keyof LoginInput, string>> = {};
        error.issues.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof LoginInput] = err.message;
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
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary-600">
          Inicia Sesión
        </h2>

        {alert && (
          <Alert variant={alert.type} className="mb-4">{alert.message}</Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={(e) => handleInputChange({...e, target: {...e.target, name: 'email'}})}
            error={errors.email}
            required
            className="text-primary-700 active:text-primary-400 focus:text-primary-400"
          />

          <Input
            label="Contraseña"
            type="password"
            placeholder="Tu contraseña"
            value={formData.password}
            onChange={(e) => handleInputChange({...e, target: {...e.target, name: 'password'}})}
            error={errors.password}
            required
            className="text-primary-700 active:text-primary-400 focus:text-primary-400"
          />

          <Button type="submit" variant="primary" size="md" fullWidth isLoading={loading} className="w-full">
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </Button>
        </form>

        <div className="mt-6 space-y-4">
          <Link
            href="/forgot-password"
            className="link text-center block text-sm"
          >
            ¿Olvidaste tu contraseña?
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
