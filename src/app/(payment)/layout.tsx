import type { ReactNode } from 'react'

function PaymentResultLayout({children}: Readonly<{children: ReactNode}>) {
  return (
    <div>{children}</div>
  )
}

export default PaymentResultLayout