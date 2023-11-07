import bcrypt from 'bcryptjs' 

export const bcryptHash = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 12)
}
