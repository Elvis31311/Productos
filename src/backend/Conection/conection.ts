import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://omhjwgusqwodicnqetpl.supabase.co' 
const supabaseAnonKey = 'sb_publishable_dKWylgDonrzcp6CVKSexOw_R2OcM_dR'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)