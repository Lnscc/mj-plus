export default function ChatInput({ sendPrompt }: { sendPrompt: ((formData: FormData) => void) | undefined }) {
  return (
    <form action={sendPrompt}>
      <input 
        type="text" 
        name="prompt" 
        className="px-4 py-2 mb-3" 
        placeholder="Prompt..." 
        required
      />
      <button className="bg-blue-500 rounded px-4 py-2 text-white">
        Send
      </button>
    </form>
  );
}
