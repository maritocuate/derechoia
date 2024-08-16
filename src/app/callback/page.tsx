'use client'
import axios from 'axios'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Callback() {
  const [subscription, setSubscription] = useState<{ status: string } | null>(
    null
  )

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const preapprovalId = searchParams.get('preapproval_id')

    const fetchSubscription = async () => {
      try {
        console.log(preapprovalId)
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
