'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Alert from '@/components/ui/Alert';
import { registerUser } from '@/lib/actions/auth';
import { registerSchema, type RegisterInput } from '@/lib/validations/auth';
import { ZodError } from 'zod';
import Button from '../ui/Button';

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    username: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Omit<RegisterInput, 'confirmPassword'>, string>>>({});
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
    if (errors[name as keyof typeof errors]) {
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
      // Validar con Zod
      const validatedData = registerSchema.parse(formData);

      // Llamar a la acción de servidor
      const result = await registerUser(validatedData);

      if (result.success) {
        setAlert({
          type: 'success',
          message: result.message || 'Registro completado. Por favor verifica tu email',
        });
        // Limpiar formulario
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          fullName: '',
          username: '',
        });
        // Redirigir después de 2 segundos
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setAlert({
          type: 'error',
          message: result.error || 'Error al registrarse',
        });
      }
    } catch (error) {
      if (error instanceof ZodError) {
        // Convertir errores de Zod a objeto de errores
        const newErrors: Partial<Record<keyof typeof errors, string>> = {};
        error.issues.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof typeof errors] = err.message;
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
          Crear Cuenta
        </h2>

        {alert && (
          <Alert 
            type={alert.type} 
            message={alert.message} 
            className="mb-4"
            onClose={() => setAlert(null)}
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nombre Completo"
            type="text"
            placeholder="Tu nombre completo"
            value={formData.fullName}
            onChange={(e) => {
              handleInputChange({
                ...e,
                target: { ...e.target, name: 'fullName' }
              });
            }}
            error={errors.fullName}
            required
            className="text-primary-700 active:text-primary-400 focus:text-primary-400"
          />

          <Input
            label="Email"
            type="email"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={(e) => {
              handleInputChange({
                ...e,
                target: { ...e.target, name: 'email' }
              });
            }}
            error={errors.email}
            required
            className="text-primary-700 active:text-primary-400 focus:text-primary-400"
          />

          <Input
            label="Nombre de Usuario (Opcional)"
            type="text"
            placeholder="usuario_123"
            value={formData.username}
            onChange={(e) => {
              handleInputChange({
                ...e,
                target: { ...e.target, name: 'username' }
              });
            }}
            error={errors.username}
            helperText="Solo letras, números, guiones y guiones bajos"
            className="text-primary-700 active:text-primary-400 focus:text-primary-400"
          />

          <Input
            label="Contraseña"
            type="password"
            placeholder="Mínimo 8 caracteres, con mayúscula y número"
            value={formData.password}
            onChange={(e) => {
              handleInputChange({
                ...e,
                target: { ...e.target, name: 'password' }
              });
            }}
            error={errors.password}
            required
            helperText="Debe contener mayúscula y número"
            className="text-primary-700 active:text-primary-400 focus:text-primary-400"
          />

          <Input
            label="Confirmar Contraseña"
            type="password"
            placeholder="Repite tu contraseña"
            value={formData.confirmPassword}
            onChange={(e) => {
              handleInputChange({
                ...e,
                target: { ...e.target, name: 'confirmPassword' }
              });
            }}
            error={errors.password}
            required
            className="text-primary-700 active:text-primary-400 focus:text-primary-400"
          />

          <Button type="submit" variant="primary" size="md" fullWidth isLoading={loading} className="w-full">
            {loading ? 'Cargando...' : 'Crear Cuenta'}
          </Button>
        </form>

        <div className="mt-6 space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-neutral-500">O</span>
            </div>
          </div>

          <p className="text-center text-neutral-600 text-sm">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="link font-medium">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
