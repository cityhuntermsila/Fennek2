import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing large JSON payloads (for base64 webcam frames and audio)
app.use(express.json({ limit: '25mb' }));

// Helper to get GoogleGenAI client
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

/**
 * CAMERA ACTIVITY: Flashcard Recognition (OCR & Vision)
 * System Prompt:
 * "Analyze the webcam image. The child must show a flashcard with '[TARGET]'. Check if the printed text on the card matches the target word/letter. Respond STRICTLY in JSON: {"detected": string, "is_correct": boolean, "feedback_fr": string, "feedback_en": string}"
 */
app.post('/api/gemini/vision', async (req, res) => {
  try {
    const { imageBase64, target, mimeType = 'image/jpeg' } = req.body;
    if (!imageBase64 || !target) {
      return res.status(400).json({ error: 'Missing imageBase64 or target' });
    }

    const ai = getGenAI();
    if (!ai) {
      // Graceful simulated response when running without an API key in dev/preview
      const cleanedTarget = target.trim();
      return res.json({
        detected: cleanedTarget,
        is_correct: true,
        feedback_fr: `Bravo ! Tu montres bien la carte "${cleanedTarget}" !`,
        feedback_en: `Super job! You are showing "${cleanedTarget}"!`,
        mock: true
      });
    }

    // Clean base64 string if it includes data URL prefix
    const cleanBase64 = imageBase64.replace(/^data:[a-zA-Z0-9/+-]+;base64,/, '');

    const prompt = `Analyze the webcam image. The child must show a flashcard with '${target}'. Check if the printed text on the card matches the target word/letter. Respond STRICTLY in JSON: {"detected": string, "is_correct": boolean, "feedback_fr": string, "feedback_en": string}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            {
              inlineData: {
                data: cleanBase64,
                mimeType: mimeType
              }
            }
          ]
        }
      ],
      config: {
        responseMimeType: 'application/json'
      }
    });

    const responseText = response.text || '{}';
    let parsed;
    try {
      parsed = JSON.parse(responseText);
    } catch {
      // Fallback regex parsing if needed
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        parsed = {
          detected: 'Unknown',
          is_correct: false,
          feedback_fr: 'Essaie de tenir la carte bien droite devant la caméra.',
          feedback_en: 'Hold your card still and clear in front of the camera.'
        };
      }
    }

    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/gemini/vision:', error);
    return res.status(500).json({
      detected: '',
      is_correct: false,
      feedback_fr: 'Oups, réessaie en plaçant la carte bien en face !',
      feedback_en: 'Oops, hold the card clearly in front of the camera and try again!',
      error: error.message || 'Vision analysis failed'
    });
  }
});

/**
 * AUDIO ACTIVITY: Pronunciation Check
 * System Prompt:
 * "Evaluate the spoken audio of an Algerian 3rd grader pronouncing '[TARGET_WORD]'. Be encouraging and lenient with young learners. Respond STRICTLY in JSON: {"recognized_speech": string, "is_correct": boolean, "score": number, "feedback_fr": string, "feedback_en": string}"
 */
app.post('/api/gemini/pronunciation', async (req, res) => {
  try {
    const { audioBase64, target, mimeType = 'audio/webm' } = req.body;
    if (!audioBase64 || !target) {
      return res.status(400).json({ error: 'Missing audioBase64 or target' });
    }

    const ai = getGenAI();
    if (!ai) {
      // Graceful simulated response when running without an API key in dev/preview
      return res.json({
        recognized_speech: target,
        is_correct: true,
        score: 95,
        feedback_fr: `Très bien prononcé ! Massi est très fier de toi !`,
        feedback_en: `Awesome pronunciation! Massi is super proud of you!`,
        mock: true
      });
    }

    const cleanBase64 = audioBase64.replace(/^data:[a-zA-Z0-9/+-]+;base64,/, '');

    const prompt = `Evaluate the spoken audio of an Algerian 3rd grader pronouncing '${target}'. Be encouraging and lenient with young learners. Respond STRICTLY in JSON: {"recognized_speech": string, "is_correct": boolean, "score": number, "feedback_fr": string, "feedback_en": string}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            {
              inlineData: {
                data: cleanBase64,
                mimeType: mimeType
              }
            }
          ]
        }
      ],
      config: {
        responseMimeType: 'application/json'
      }
    });

    const responseText = response.text || '{}';
    let parsed;
    try {
      parsed = JSON.parse(responseText);
    } catch {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        parsed = {
          recognized_speech: target,
          is_correct: true,
          score: 85,
          feedback_fr: 'Bon travail ! Continue de t\'entraîner !',
          feedback_en: 'Good job! Keep practicing!'
        };
      }
    }

    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/gemini/pronunciation:', error);
    return res.status(500).json({
      recognized_speech: '',
      is_correct: false,
      score: 50,
      feedback_fr: 'Parle bien fort près de ton micro et réessaie !',
      feedback_en: 'Speak loudly into the microphone and try again!',
      error: error.message || 'Pronunciation evaluation failed'
    });
  }
});

// Mount Vite middleware in development, or serve built assets in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

startServer();
