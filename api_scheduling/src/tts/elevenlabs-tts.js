const fetch = require('node-fetch');
const fs = require('fs');

async function tts(text, filename = 'out.mp3') {
  const key = process.env.ELEVEN_API_KEY;
  const voiceId = process.env.ELEVEN_VOICE_ID;

  if (!key) throw new Error('Missing ELEVEN_API_KEY');
  if (!voiceId) throw new Error('Missing ELEVEN_VOICE_ID');

  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'xi-api-key': key,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      model: 'eleven_monolingual_v1',
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error('ElevenLabs error: ' + txt);
  }

  const buffer = await res.arrayBuffer();
  fs.writeFileSync(filename, Buffer.from(buffer));
  console.log('TTS gerado em:', filename);
}

module.exports = { tts };
