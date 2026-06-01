'use client'

import { create } from 'zustand'
import { Wallet } from '@/lib/types'

interface WalletStore {
  wallet: Wallet | null
  loading: boolean
  setWallet: (wallet: Wallet | null) => void
  setLoading: (loading: boolean) => void
  updateBalance: (amount: number, type: 'add' | 'subtract') => void
}

export const useWalletStore = create<WalletStore>((set) => ({
  wallet: null,
  loading: false,
  setWallet: (wallet) => set({ wallet }),
  setLoading: (loading) => set({ loading }),
  updateBalance: (amount, type) => set((state) => {
    if (!state.wallet) return state
    return {
      wallet: {
        ...state.wallet,
        balance: type === 'add' 
          ? state.wallet.balance + amount 
          : state.wallet.balance - amount,
      },
    }
  }),
}))