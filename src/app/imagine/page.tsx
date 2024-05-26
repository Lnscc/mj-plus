import ChatInput from '@/components/ChatInput';
import ChatBox from '@/components/ChatBox';
import { checkAuth } from '@/utils/checkAuth';
import { sendPrompt } from '@/lib/actions';

export default async function Page() {
  const { permissions } = await checkAuth();
  if (!permissions.createImage) return <>Not Authenticated</>;

  return (
    <div className="flex flex-col h-[calc(92dvh)]">
      <div className="flex flex-col flex-grow overflow-hidden">
        <ChatBox />
        <ChatInput sendPrompt={sendPrompt} />
      </div>
    </div>
  );
};

