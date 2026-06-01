import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const signUp = async (email: string, password: string, fullName: string, campus: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          campus,
        },
      },
    })
    return { data, error }
  } catch (error) {
    return { data: null, error }
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  } catch (error) {
    return { data: null, error }
  }
}

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    return { error }
  } catch (error) {
    return { error }
  }
}

export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser()
    return { data: data?.user, error }
  } catch (error) {
    return { data: null, error }
  }
}

// User profile helpers
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  return { data, error }
}

export const updateUserProfile = async (userId: string, updates: Record<string, any>) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  return { data, error }
}

// Jobs helpers
export const createJob = async (jobData: Record<string, any>) => {
  const { data, error } = await supabase
    .from('jobs')
    .insert([jobData])
    .select()
    .single()
  return { data, error }
}

export const getJobs = async (filters?: Record<string, any>) => {
  let query = supabase.from('jobs').select('*, employer:users(*)')
  
  if (filters?.campus) query = query.eq('campus', filters.campus)
  if (filters?.category) query = query.eq('category', filters.category)
  if (filters?.urgent) query = query.eq('urgent', true)
  if (filters?.status) query = query.eq('status', filters.status)
  
  const { data, error } = await query.order('created_at', { ascending: false })
  return { data, error }
}

export const getJobById = async (jobId: string) => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*, employer:users(*)')
    .eq('id', jobId)
    .single()
  return { data, error }
}

// Products helpers
export const createProduct = async (productData: Record<string, any>) => {
  const { data, error } = await supabase
    .from('products')
    .insert([productData])
    .select()
    .single()
  return { data, error }
}

export const getProducts = async (filters?: Record<string, any>) => {
  let query = supabase.from('products').select('*, seller:users(*)')
  
  if (filters?.campus) query = query.eq('campus', filters.campus)
  if (filters?.condition) query = query.eq('condition', filters.condition)
  
  const { data, error } = await query.order('created_at', { ascending: false })
  return { data, error }
}

export const getProductById = async (productId: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*, seller:users(*)')
    .eq('id', productId)
    .single()
  return { data, error }
}

// Orders helpers
export const createOrder = async (orderData: Record<string, any>) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select()
    .single()
  return { data, error }
}

export const getOrders = async (userId: string, type: 'buyer' | 'seller') => {
  const column = type === 'buyer' ? 'buyer_id' : 'seller_id'
  const { data, error } = await supabase
    .from('orders')
    .select('*, product:products(*), buyer:users(*), seller:users(*)')
    .eq(column, userId)
    .order('created_at', { ascending: false })
  return { data, error }
}

// Escrow helpers
export const createEscrowTransaction = async (escrowData: Record<string, any>) => {
  const { data, error } = await supabase
    .from('escrow_transactions')
    .insert([escrowData])
    .select()
    .single()
  return { data, error }
}

// Wallet helpers
export const getWallet = async (userId: string) => {
  const { data, error } = await supabase
    .from('wallets')
    .select('*')
    .eq('user_id', userId)
    .single()
  return { data, error }
}

// Chat helpers
export const sendMessage = async (messageData: Record<string, any>) => {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert([messageData])
    .select()
    .single()
  return { data, error }
}

export const getMessages = async (userId1: string, userId2: string) => {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .or(`and(sender_id.eq.${userId1},receiver_id.eq.${userId2}),and(sender_id.eq.${userId2},receiver_id.eq.${userId1})`)
    .order('created_at', { ascending: true })
  return { data, error }
}