import ChatInput from '@/components/ChatInput';
import ChatBox from '@/components/ChatBox';
import { addMessage } from '@/lib/messages';
import { checkAuth } from '@/utils/checkAuth';

export default async function Page() {
  const { permissions } = await checkAuth();
  if (!permissions.createImage) return <>Not Authenticated</>;

  const sendPrompt = async (formData: FormData) => {
    "use server";
    const prompt = formData.get('prompt') as string;
    addMessage(prompt, (uri, progress) => {
      console.log("Progress: ", progress);
    });
  }

  return (
    <div className="flex flex-col h-[calc(100dvh)]">
      <div className="flex flex-col flex-grow overflow-hidden">
        <h1 className='font-bold text-center bg-orange-500'>Midjourney Plus</h1>
        <ChatBox />
        <ChatInput sendPrompt={sendPrompt} />
      </div>
    </div>
  );
};

