import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

test('renders Button with text', () => {
  render(<Button>Test</Button>)
  expect(screen.getByText('Test')).toBeInTheDocument()
})
