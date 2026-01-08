'use server';

import { loginSchema, registerSchema, type LoginInput, type RegisterInput } from '@/lib/validations/auth';
import { createClient } from '../supabase/server';

export async function loginUser(credentials: LoginInput) {
  try {
    const validatedData = loginSchema.parse(credentials);
    const supabase = await createClient();

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
    const supabase = await createClient();

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
        });

      if (profileError) {
        console.error('Error al crear perfil:', profileError);
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
  const supabase = await createClient();
  
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