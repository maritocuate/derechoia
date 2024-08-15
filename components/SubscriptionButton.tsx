'use client'

import { Zap } from 'lucide-react'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'

interface SubscriptionButtonProps {
  isPro: boolean
}

export const SubscriptionButton = ({
  isPro = false,
}: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false)

  const onClick = async () => {
    try {
      const { data } = await axios.post('/api/mercadoPago')
      console.log('-----------')
      console.log(data)
      window.location.href = data.init_point
    } catch (error) {
      toast.error('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant={isPro ? 'link' : 'default'} onClick={onClick}>
      {isPro ? 'Pause Subscription' : 'Upgrade'}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  )
}
