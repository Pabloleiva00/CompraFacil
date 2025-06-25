export const useToast = () => {
    return {
      toast: ({ title, description }: { title?: string; description?: string }) => {
        alert(`${title ? title + '\n' : ''}${description || ''}`)
      }
    }
  }
  