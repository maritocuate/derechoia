'use client'

import { Zap } from 'lucide-react'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'

interface SubscriptionButtonProps {
  isPro: boolean
}

export const SubscriptionButton = ({
  isPro = false,
}: SubscriptionButtonProps) => {
  const { toast } = useToast()
  const onClick = async () => {
    try {
      const { data } = await axios.post('/api/mercadoPago')
      window.location.href = data.init_point
    } catch (error) {
      toast({ title: 'Something went wrong.', variant: 'destructive' })
    } finally {
      console.log('finally')
    }
  }

  return (
    <Button variant={isPro ? 'link' : 'default'} onClick={onClick}>
      {isPro ? 'Pause Subscription' : 'Upgrade'}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  )
}
