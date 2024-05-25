import ChatInput from '@/components/ChatInput';
import ChatBox from '@/components/ChatBox';
import { addMessage } from '@/lib/messages';

const ChatComponent = () => {

  const sendPrompt = async (formData: FormData) => {
    "use server";
    const prompt = formData.get('prompt') as string;
    addMessage(prompt);
  }

  return (
    <div>
      <h1>Chat</h1>
      <ChatBox />
      <ChatInput sendPrompt={sendPrompt}></ChatInput>
    </div>
  );
};

export default ChatComponent;
