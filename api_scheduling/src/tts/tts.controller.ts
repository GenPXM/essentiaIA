import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { exec } from "child_process";
import path from "path";

@ApiTags("TTS")
@Controller("tts")
export class TtsController {
  @ApiOperation({ summary: "Converte texto em fala (MP3)" })
  @Post()
  async generateAudio(@Body() body: { text: string }) {
    const filename = path.resolve("tts-output.mp3");
    await import("./elevenlabs-tts.js").then((m: any) =>
      m.tts(body.text, filename)
    );

    const publicUrl = `https://7c168768c9c8.ngrok-free.app/audio/tts-output.mp3`;

    return { success: true, url: publicUrl };
  }
}
