import { cookies } from 'next/headers';

import { Chat } from '@/components/chat';
import { DEFAULT_MODEL_NAME, models } from '@/lib/ai/models';
import { generateUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/data-stream-handler';

export default async function Page() {
  const id = generateUUID();

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('model-id')?.value;
  const reasoningEffortFromCookie = cookieStore.get('reasoning-effort')?.value; // Get reasoning effort from cookie - ADDED

  const selectedModelId =
    models.find((model) => model.id === modelIdFromCookie)?.id ||
    DEFAULT_MODEL_NAME;

  const selectedReasoningEffort = reasoningEffortFromCookie || 'medium'; // Default reasoning effort if no cookie - ADDED
  return (
    <>
      <Chat
        key={id}
        id={id}
        initialMessages={[]}
        selectedModelId={selectedModelId}
        selectedVisibilityType="private"
        isReadonly={false}
        selectedReasoningEffort="medium" // Default reasoning effort - ADDED
      />
      <DataStreamHandler id={id} />
    </>
  );
}
