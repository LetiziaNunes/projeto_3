import React from 'react'
import Link from 'next/link'

export default function page() {
  return <>
  <div className='Cabeca'>
    <p>
    <Link href="/tecnologias">Tecnologias</Link>
    </p>
    <p>
    <Link href="/produtos">Produtos</Link>
    </p>
    </div>
  </>
}
