'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWindowSize } from 'usehooks-ts';

import { ModelSelector } from '@/components/model-selector';
import { SidebarToggle } from '@/components/sidebar-toggle';
import { Button } from '@/components/ui/button';
import { PlusIcon, VercelIcon } from './icons';
import { useSidebar } from '@/components/ui/sidebar';
import { memo, useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { VisibilityType, VisibilitySelector } from './visibility-selector';
import { useDeepResearch } from '@/lib/deep-research-context';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { saveReasoningEffort } from '@/app/(chat)/actions'; // Import saveReasoningEffort action - ADDED

function PureChatHeader({
  chatId,
  selectedModelId,
  selectedVisibilityType,
  isReadonly,
  selectedReasoningEffort, // Add selectedReasoningEffort prop - ADDED
}: {
  chatId: string;
  selectedModelId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
  selectedReasoningEffort: string; // Add selectedReasoningEffort prop - ADDED
}) {
  const router = useRouter();
  const { open } = useSidebar();

  const { width: windowWidth } = useWindowSize();

  const { clearState } = useDeepResearch();

  const [outputTokens, setOutputTokens] = useState<number>(30000); // Example initial value
  const [reasoningEffort, setReasoningEffort] = useState<string>(selectedReasoningEffort); // Use prop as initial value - UPDATED

  return (
    <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2">
      <SidebarToggle />

      {(!open || windowWidth < 768) && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="order-2 md:order-1 md:px-2 px-2 md:h-fit ml-auto md:ml-0"
              onClick={() => {
                router.push('/');
                clearState();
                saveReasoningEffort('medium'); // Reset reasoning effort to default on new chat - ADDED
                router.refresh();
              }}
            >
              <PlusIcon />
              <span className="md:sr-only">New Chat</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip>
      )}

      {/* {!isReadonly && (
        <ModelSelector>
          selectedModelId={selectedModelId}
          className="order-1 md:order-2"
        />
      )} */}

      {!isReadonly && (
        <VisibilitySelector
          chatId={chatId}
          selectedVisibilityType={selectedVisibilityType}
          className="order-1 md:order-3"
        />
      )}

      <div className="order-2 md:order-4 ml-auto md:ml-2 hidden md:flex flex-col gap-2">
        <Label htmlFor="output-tokens">Output Tokens</Label>
        <Slider
          id="output-tokens"
          defaultValue={[outputTokens]}
          max={40000} // Example max value, adjust based on model - UPDATED
          step={1000}
          onValueChange={(value) => setOutputTokens(value[0])} // Update outputTokens state - ADDED
        />
        <div className="text-xs text-muted-foreground">{outputTokens} tokens</div>
      </div>

      <div className="order-3 md:order-5 ml-2 hidden md:flex flex-col gap-2">
        <Label htmlFor="reasoning-effort">Reasoning Effort</Label>
        <Select onValueChange={(value) => {
          setReasoningEffort(value)
          saveReasoningEffort(value); // Save reasoning effort to cookie - ADDED
        }} defaultValue={reasoningEffort}> // Use prop as initial value - UPDATED
          <SelectTrigger className="w-[180px] h-[34px]">
            <SelectValue placeholder="Reasoning Effort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* <Button
        className="bg-orange-500 dark:bg-zinc-100 hover:bg-orange-800 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-900 hidden md:flex py-1.5 px-2 h-fit md:h-[34px] order-4 md:ml-auto"
        asChild
      >
        <Link
          href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnickscamara%2Fextract-chat&env=AUTH_SECRET,OPENAI_API_KEY&envDescription=Learn%20more%20about%20how%20to%20get%20the%20API%20Keys%20for%20the%20application&envLink=https%3A%2F%2Fgithub.com%2Fvercel%2Fai-chatbot%2Fblob%2Fmain%2F.env.example&demo-title=AI%20Chatbot&demo-description=An%20Open-Source%20AI%20Chatbot%20Template%20Built%20With%20Next.js%20and%20the%20AI%20SDK%20by%20Vercel.&demo-url=https%3A%2F%2Fchat.vercel.ai&stores=%5B%7B%22type%22:%22postgres%22%7D,%7B%22type%22:%22blob%22%7D%5D"
          target="_noblank"
        >
          <VercelIcon size={16} />
          Deploy with Vercel
        </Link>
      </Button> */}

      <Button
        variant="outline"
        className="hidden md:flex py-1.5 px-2 h-fit md:h-[34px] order-4 md:ml-auto"
        asChild
      >
        <Link
          href="https://github.com/nickscamara/extract-chat"
          target="_blank"
        >
          <span className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            Star on GitHub
          </span>
        </Link>
      </Button>

      <Button
        variant="outline"
        className="hidden md:flex py-1.5 px-2 h-fit md:h-[34px] order-4 "
        asChild
      >
        <Link href="https://firecrawl.dev/" target="_blank">
          <span className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
            </svg>
            Get Firecrawl API Key
          </span>
        </Link>
      </Button>
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return prevProps.selectedModelId === nextProps.selectedModelId;
});
