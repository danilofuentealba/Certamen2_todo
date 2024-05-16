import { setLocale } from 'yup';
import { es } from 'yup-locales';
import { object, string, boolean } from 'yup';

setLocale(es);

export const createTodoSchema = object({
  title: string().required()
});

export const updateTodoSchema = object({
  title: string().optional(),
  completed: boolean().required(),
  id: string().required()
});

export const idTodoSchema = object({
  id: string().required()
});

export const loginSchema = object({
  username: string().required(),
  password: string().required()
});
