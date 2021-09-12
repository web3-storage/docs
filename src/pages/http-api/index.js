
import React from 'react'

import RedocPage from './redoc'
import ApiDocLayout from './layout'

function HttpApi() {
  return (
    <ApiDocLayout>
      <RedocPage />
    </ApiDocLayout>
  )
}

export default HttpApi