import React, { Suspense }  from 'react'
import { NewPasswordForm } from '../_components/new-password-form'

function NewPassword() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <NewPasswordForm />
    </Suspense>
  )
}

export default NewPassword