import { z } from 'zod'

export const employeeSchema = z.object({
    name: z.string().min(1, 'İsim zorunludur'),
    email: z.string().email('Geçerli bir e-posta adresi giriniz'),
    password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır').optional(),
    title: z.string().optional(), // "Grafik Tasarımcı", "Yazılımcı" etc.
    phone: z.string().optional(),
    image: z.string().optional(),
})

export type EmployeeFormData = z.infer<typeof employeeSchema>
