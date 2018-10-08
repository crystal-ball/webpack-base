import React from 'react'
import { Icon, Text } from 'componentry'

const Footer = () => (
  <>
    <div className="d-flex justify-content-center">
      <Text size="lg">
        <Icon id="cog" mr={1} />
        Configuration Generator
      </Text>
    </div>
    <footer className="mx-3">
      <Text textAlign="right">
        <Icon id="warning" className="text-warning" /> Warning: This package contains
        awesomeness!
      </Text>
    </footer>
  </>
)

export default Footer
