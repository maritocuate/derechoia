'use client'
import axios from 'axios'
import { redirect, useSearchParams } from 'next/navigation'
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
        setSubscription(data)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchSubscription()
  }, [])

  return (
    <>
      <div>Subscription Status</div>
      {subscription ? (
        subscription.status !== 'authorized' ? (
          <div>Subscription not authorized :(</div>
        ) : (
          redirect('/dashboard')
        )
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}
