'use client'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Callback() {
  const [subscription, setSubscription] = useState<{ status: string } | null>(
    null
  )
  const searchParams = useSearchParams()
  const preapprovalId = searchParams.get('preapproval_id')

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const { data } = await axios.post('/api/getSubscription', {
          preapproval_id: preapprovalId,
        })
        console.log('RESPONSE')
        console.log(data)
        setSubscription(data)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchSubscription()
  }, [])

  return (
    <>
      <div>CALLBACK</div>
      {subscription ? (
        subscription.status !== 'authorized' ? (
          <div>Subscription not authorized :(</div>
        ) : (
          <div>Subscription authorized :)</div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}
