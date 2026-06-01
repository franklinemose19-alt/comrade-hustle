'use client'

import { useWalletStore } from '@/store/walletStore'
import { getWallet } from '@/lib/supabase'

export const useWallet = () => {
  const { wallet, loading, setWallet, setLoading, updateBalance } = useWalletStore()

  const fetchWallet = async (userId: string) => {
    setLoading(true)
    try {
      const { data, error } = await getWallet(userId)
      if (error) throw error
      setWallet(data)
      return data
    } catch (error) {
      console.error('Error fetching wallet:', error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const deposit = (amount: number) => {
    updateBalance(amount, 'add')
  }

  const withdraw = (amount: number) => {
    updateBalance(amount, 'subtract')
  }

  return {
    wallet,
    loading,
    fetchWallet,
    deposit,
    withdraw,
  }
}