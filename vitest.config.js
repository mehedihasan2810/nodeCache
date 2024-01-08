import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['./__tests__/*.{test,spec}.?(c|m)[jt]s?(x)'],
    coverage: {
        provider: "istanbul"
    }
  },
})