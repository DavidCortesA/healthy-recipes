'use server';

import { loginSchema, registerSchema, type LoginInput, type RegisterInput } from '@/lib/validations/auth';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
export async function loginUser(credentials: LoginInput) {
  try {
    const validatedData = loginSchema.parse(credentials);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: validatedData.email,
      password: validatedData.password,
    });

    if (error) {
      return {
        success: false,
        error: error.message || 'Error al iniciar sesión',
      };
    }

    return {
      success: true,
      data,
      message: 'Sesión iniciada correctamente',
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return {
      success: false,
      error: message,
    };
  }
}

export async function registerUser(credentials: RegisterInput) {
  try {
    const validatedData = registerSchema.parse(credentials);

    const { data, error } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        data: {
          full_name: validatedData.fullName,
          username: validatedData.username || validatedData.email.split('@')[0],
        },
      },
    });

    if (error) {
      return {
        success: false,
        error: error.message || 'Error al registrarse',
      };
    }

    // Crear el perfil del usuario en la tabla profiles
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          full_name: validatedData.fullName,
          username: validatedData.username || validatedData.email.split('@')[0],
          created_at: new Date().toISOString(),
        });

      if (profileError) {
        console.error('Error al crear perfil:', profileError);
        // No retornamos error aquí porque el registro de auth fue exitoso
      }
    }

    return {
      success: true,
      data,
      message: 'Registro completado. Por favor verifica tu email',
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return {
      success: false,
      error: message,
    };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      message: 'Sesión cerrada correctamente',
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return {
      success: false,
      error: message,
    };
  }
}

export async function forgotPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      return {
        success: false,
        error: error.message || 'Error al enviar el correo de recuperación',
      };
    }

    return {
      success: true,
      message: 'Correo de recuperación enviado correctamente',
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return {
      success: false,
      error: message,
    };
  }
}