import { ELEVEN_LABS_API_KEY } from "../../constants"

export class AIAudioService {
  private static instance: AIAudioService
  private apiKey: string = ELEVEN_LABS_API_KEY || ""

  // Voice IDs that work well for breathing sounds
  private voiceIds = {
    breathing: "uYFJyGaibp4N2VwYQshk", // Adam - deep, calm voice
    ambient: "ymDCYd8puC7gYjxIamPt", // Fin - soft, airy voice
  }

  static getInstance(): AIAudioService {
    if (!AIAudioService.instance) {
      AIAudioService.instance = new AIAudioService()
    }
    return AIAudioService.instance
  }

  async generateBreathingSound(
    duration: number,
    type: "inhale" | "exhale",
    customPrompt?: string,
  ): Promise<ArrayBuffer> {
    try {
      // Check if API key is available
      if (!this.apiKey) {
        throw new Error("ElevenLabs API key is missing")
      }

      // Use custom prompt if provided, otherwise use default
      const text = customPrompt || this.getBreathingPrompt(type, duration)

      // Use the breathing voice ID
      const voiceId = this.voiceIds.breathing

      console.log(`Calling ElevenLabs API for ${type} sound, duration: ${duration}s`)

      const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/" + voiceId, {
        method: "POST",
        headers: {
          Accept: "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": this.apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.3, // Lower stability for more natural breathing
            similarity_boost: 0.7, // Higher similarity for consistent sound
            style: 0.0, // No style to keep it natural
            use_speaker_boost: true,
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error("ElevenLabs API error:", errorData)
        throw new Error(`Failed to generate audio: ${response.status} ${response.statusText}`)
      }

      console.log("ElevenLabs API call successful")
      return await response.arrayBuffer()
    } catch (error) {
      console.error("AI audio generation failed:", error)
      throw error
    }
  }

  // Get optimized prompts for natural breathing sounds
  private getBreathingPrompt(type: "inhale" | "exhale", duration: number): string {
    if (type === "inhale") {
      return `[natural deep inhale breath sound through nose, ${duration} seconds long, no speaking, just breathing sound]`
    } else {
      return `[natural relaxed exhale breath sound through mouth, ${duration} seconds long, no speaking, just breathing sound]`
    }
  }
}
