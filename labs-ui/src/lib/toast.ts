import { useToast } from "@/components/ui/toaster"

export function toastSuccess(title: string, description?: string) {
  // Hook can't be used outside React, so we provide a function wrapper for components to call.
  // Usage inside a component: const { add } = useToast(); add({ title, description })
  console.warn("toastSuccess helper requires useToast() inside a component. Use: const { add } = useToast(); add({ title, description })")
}

export function toastError(title: string, description?: string) {
  console.warn("toastError helper requires useToast() inside a component. Use: const { add } = useToast(); add({ title, description })")
}
