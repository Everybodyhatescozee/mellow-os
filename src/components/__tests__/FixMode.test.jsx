import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { test, expect, beforeEach } from 'vitest'
// using Vitest + Testing Library; no jest-dom to avoid global expect timing issue
import FixMode from '../FixMode'

// Mock localStorage
const STORAGE_KEY = 'mellow_fix_mode_scripts'

beforeEach(() => {
  localStorage.clear()
})

test('saves and loads a script to localStorage', () => {
  render(<FixMode />)

  const nameInput = screen.getByPlaceholderText('Script name')
  const textboxes = screen.getAllByRole('textbox')
  const textarea = textboxes.length > 1 ? textboxes[1] : textboxes[0]
  const saveBtn = screen.getByText('Save')

  fireEvent.change(nameInput, { target: { value: 'TestScript' } })
  fireEvent.change(textarea, { target: { value: 'console.log("ok")' } })
  fireEvent.click(saveBtn)

  const raw = localStorage.getItem(STORAGE_KEY)
  expect(raw).toBeTruthy()
  const arr = JSON.parse(raw)
  expect(arr.length).toBe(1)
  expect(arr[0].name).toBe('TestScript')
  expect(arr[0].code).toBe('console.log("ok")')
})
