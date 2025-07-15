import type { TemplateUsage } from "@/types"

export const saveAgentName = (name: string): void => {
  localStorage.setItem("bfl_agent_name", name)
}

export const getAgentName = (): string | null => {
  return localStorage.getItem("bfl_agent_name")
}

export const saveWaitTime = (time: string): void => {
  localStorage.setItem("bfl_wait_time", time)
}

export const getWaitTime = (): string | null => {
  return localStorage.getItem("bfl_wait_time")
}

export const saveTemplateUsageHistory = (history: TemplateUsage[]): void => {
  localStorage.setItem("bfl_template_usage_history", JSON.stringify(history))
}

export const getTemplateUsageHistory = (): TemplateUsage[] => {
  try {
    const saved = localStorage.getItem("bfl_template_usage_history")
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}
